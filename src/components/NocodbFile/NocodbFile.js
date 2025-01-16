import { uniqueName } from '../../utils/utils';
import FileComponent from '../file/File';

import fileProcessor from '../../providers/processor/fileProcessor';
import BMF from 'browser-md5-file';

export default class NocodbFile extends FileComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema() {
    return FileComponent.schema({
      label: 'Nocodb File',
      'key': 'ncoodbFile',
      'type': 'nocodbFile',
    });
  }

  static get builderInfo() {
    return {
      title: 'Nocodb File',
      icon: 'file',
      weight: 100,
      group: 'advanced',
      schema: NocodbFile.schema()
    };
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {
      fileLinkDiv: 'multi',
    };
    this.loadRefs(element, refs);
    this.refs.fileLinkDiv.forEach(fileLink => {
      // 点击事件
      fileLink.addEventListener('click', (event) => {
        let currentIndex = this.dataValue.findIndex(item => {
          return fileLink.href.endsWith(encodeURI(item.url));
        });
        let file = this.dataValue[currentIndex];
        let { options = {} } = this.component;
        try {
          options = JSON.parse(this.parseTpl(options, { data: this.rootValue }, null));
        } catch (e) {
          console.log(e);
        }
        let xhr = new XMLHttpRequest();
        xhr.open('GET', fileLink.href, true);
        //设置请求头参数的方式,如果没有可忽略此行代码
        if (options && options.headers) {
          Object.keys(options.headers).forEach(headerKey => {
            xhr.setRequestHeader(headerKey, options.headers[`${headerKey}`]);
          });
        }
        //设置响应类型为 blob   xhr.open必须为 异步
        xhr.responseType = 'blob';
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        //关键部分
        xhr.onload = function(e) {
          //如果请求执行成功
          if (this.status == 200) {
            let blob = this.response;
            let a = document.createElement('a');
            // blob.type = "application/octet-stream";
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = file.originalName || file.name;
            document.body.appendChild(a); // 火狐浏览器 必须把元素插入body中
            a.click();
            document.body.removeChild(a);
            //释放之前创建的URL对象
            window.URL.revokeObjectURL(url);
          }
        };
        xhr.send(); // 发送ajax请求
        event.returnValue = false;
      });
    });
    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  getValue() {
    return this.component.value;
  }

  get(path, obj, fb = `$\{${path}}`) {
    return path.split('.').reduce((res, key) => {
      return res[key] || fb;
    }, obj);
  }

  parseTpl(template, map, fallback) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return this.get(path, map, fallback);
    });
  }

  upload(files) {
    // Only allow one upload if not multiple.
    if (!this.component.multiple) {
      if (this.statuses.length) {
        this.statuses = [];
      }
      files = Array.prototype.slice.call(files, 0, 1);
    }

    if (this.component.storage && files && files.length) {
      this.fileDropHidden = true;

      // files is not really an array and does not have a forEach method, so fake it.
      /* eslint-disable max-statements */
      Array.prototype.forEach.call(files, async(file) => {
        const bmf = new BMF();
        const hash = await new Promise((resolve, reject) => {
          bmf.md5(file, (err, md5) => {
            if (err) {
              return reject(err);
            }
            return resolve(md5);
          });
        });
        const fileName = uniqueName(file.name, this.component.fileNameTemplate, this.evalContext());
        const fileUpload = {
          originalName: file.name,
          name: fileName,
          size: file.size,
          status: 'info',
          message: this.t('Processing file. Please wait...'),
          hash,
          progress: 0,
        };

        // Check if file with the same name is being uploaded
        const fileWithSameNameUploaded = this.dataValue.some(fileStatus => fileStatus.originalName === file.name);
        const fileWithSameNameUploadedWithError = this.statuses.findIndex(fileStatus =>
          fileStatus.originalName === file.name
          && fileStatus.status === 'error'
        );

        if (fileWithSameNameUploaded) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File with the same name is already uploaded');
        }

        if (fileWithSameNameUploadedWithError !== -1) {
          this.statuses.splice(fileWithSameNameUploadedWithError, 1);
          this.redraw();
        }

        // Check file pattern
        if (this.component.filePattern && !this.validatePattern(file, this.component.filePattern)) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File is the wrong type; it must be {{ pattern }}', {
            pattern: this.component.filePattern,
          });
        }

        // Check file minimum size
        if (this.component.fileMinSize && !this.validateMinSize(file, this.component.fileMinSize)) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File is too small; it must be at least {{ size }}', {
            size: this.component.fileMinSize,
          });
        }

        // Check file maximum size
        if (this.component.fileMaxSize && !this.validateMaxSize(file, this.component.fileMaxSize)) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File is too big; it must be at most {{ size }}', {
            size: this.component.fileMaxSize,
          });
        }

        // Get a unique name for this file to keep file collisions from occurring.
        const dir = this.interpolate(this.component.dir || '');
        const { fileService } = this;
        if (!fileService) {
          fileUpload.status = 'error';
          fileUpload.message = this.t('File Service not provided.');
        }

        this.statuses.push(fileUpload);
        this.redraw();

        if (fileUpload.status !== 'error') {
          if (this.component.privateDownload) {
            file.private = true;
          }
          const { storage } = this.component;
          let { options = {} } = this.component;
          try {
            options = JSON.parse(this.parseTpl(options, { data: this.rootValue }, null));
          } catch (e) {
            console.log(e);
          }
          // 解析options变量
          const url = this.interpolate(this.component.url, { file: fileUpload });
          let groupKey = null;
          let groupPermissions = null;

          // Iterate through form components to find group resource if one exists
          this.root.everyComponent((element) => {
            if (element.component?.submissionAccess || element.component?.defaultPermission) {
              groupPermissions = !element.component.submissionAccess ? [
                {
                  type: element.component.defaultPermission,
                  roles: [],
                },
              ] : element.component.submissionAccess;

              groupPermissions.forEach((permission) => {
                groupKey = ['admin', 'write', 'create'].includes(permission.type) ? element.component.key : null;
              });
            }
          });

          const fileKey = this.component.fileKey || 'file';
          const groupResourceId = groupKey ? this.currentForm.submission.data[groupKey]._id : null;
          let processedFile = null;

          if (this.root.options.fileProcessor) {
            try {
              if (this.refs.fileProcessingLoader) {
                this.refs.fileProcessingLoader.style.display = 'block';
              }
              const fileProcessorHandler = fileProcessor(this.fileService, this.root.options.fileProcessor);
              processedFile = await fileProcessorHandler(file, this.component.properties);
            } catch (err) {
              fileUpload.status = 'error';
              fileUpload.message = this.t('File processing has been failed.');
              this.fileDropHidden = false;
              this.redraw();
              return;
            } finally {
              if (this.refs.fileProcessingLoader) {
                this.refs.fileProcessingLoader.style.display = 'none';
              }
            }
          }

          fileUpload.message = this.t('Starting upload.');
          this.redraw();

          const filePromise = fileService.uploadFile(
            storage,
            processedFile || file,
            fileName,
            dir,
            // Progress callback
            (evt) => {
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(String(100.0 * evt.loaded / evt.total));
              delete fileUpload.message;
              this.redraw();
            },
            url,
            options,
            fileKey,
            groupPermissions,
            groupResourceId,
            // Upload start callback
            () => {
              this.emit('fileUploadingStart', filePromise);
            },
            // Abort upload callback
            (abort) => this.abortUpload = abort,
          ).then((fileInfo) => {
            if (fileInfo.data.length > 0) {
              fileInfo.data = fileInfo.data[0];
            }
            const index = this.statuses.indexOf(fileUpload);
            if (index !== -1) {
              this.statuses.splice(index, 1);
            }
            fileInfo.originalName = file.name;
            fileInfo.hash = fileUpload.hash;
            fileInfo.url = `${url.split("/api/")[0]}/${fileInfo.data.signedPath}`;
            if (!this.hasValue()) {
              this.dataValue = [];
            }
            this.dataValue.push(fileInfo);
            this.fileDropHidden = false;
            this.redraw();
            this.triggerChange();
            this.emit('fileUploadingEnd', filePromise);
          })
            .catch((response) => {
              fileUpload.status = 'error';
              fileUpload.message = typeof response === 'string' ? response : response.toString();
              delete fileUpload.progress;
              this.fileDropHidden = false;
              this.redraw();
              this.emit('fileUploadingEnd', filePromise);
            });
        }
      });
    }
  }
}

