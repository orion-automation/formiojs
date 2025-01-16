import Button from '../button/Button';
import Component from '../_classes/field/Field';
import _ from 'lodash';

export default class FileDownload extends Component {
  constructor(component, options, data) {
    super(component, options, data);
  }

  init() {
    super.init();
  }

  render() {
    return super.render(this.renderTemplate('fileDownload'));
  }

  readCookie() {
    var cookies = document.cookie.split('; ');
    var cookieData = {};
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i]) {
        var parts = cookies[i].split('=');
        var name = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1]);
        cookieData[name] = value;
      }
    }
    return cookieData;
  }

  attach(element) {
    this.loadRefs(element, {
      downloadLink: 'single',
    });
    let self = this;
    if (this.refs.downloadLink) {
      this.addEventListener(this.refs.downloadLink, 'click', () => {
        let file = self.dataValue;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `../engine-rest/history/variable-instance/${file.id}/data`, true);
        xhr.responseType = 'blob';
        let cookie=self.readCookie();
        xhr.setRequestHeader('Authorization', cookie.basicToken);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.onload = function() {
          const status = xhr.status;
          if (status == '200') {
            let result = xhr.response;
            const blob = new Blob([result]);
            const fileName = file.filename;
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
          }
        };
        xhr.send();
      });
    }
    return super.attach(element);
  }

  setValue(value) {
    if (this.refs.downloadLink && value && value.filename) {
      this.refs.downloadLink.innerHTML = value.filename;
    } else {
      this.refs.downloadLink.innerHTML = '没有文件';
    }
  }

  static schema() {
    return Button.schema({
      label: 'File Download',
      key: 'fileDownload',
      type: 'fileDownload',
    });
  }

  static get builderInfo() {
    return {
      title: 'File Download',
      icon: 'file',
      weight: 110,
      group: 'basic',
      schema: FileDownload.schema()
    };
  }
}

