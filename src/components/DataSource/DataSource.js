import editForm from './DataSource.form';
import FieldComponent from '../_classes/field/Field';
import _ from 'lodash';
import Papa from 'papaparse';
import * as XLSX from 'xlsx/xlsx.mjs';

export default class DataSourceComponent extends FieldComponent {

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'Data Source', key: 'dataSource', type: 'dataSource', clearOnHide: false, hidden: false, hideLabel: true,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Source',
      icon: 'database',
      group: 'data',
      documentation: '/userguide/forms/data-components#data-source',
      weight: 20,
      schema: DataSourceComponent.schema()
    };
  }

  render(children) {
    return super.render(this.renderTemplate('dataSource'));
  }

  setDataValueByManal(data) {
    let self = this;
    self.dataValue = data;
    self.getRoot().triggerChange({fromBlur: false}, {
      instance: self, component: self.component, value: self.dataValue, flags: {fromBlur: false}
    });
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    let self = this;
    const refs = {
      csvFileInput: "single"
    };

    this.loadRefs(element, refs);
    if (this.refs.csvFileInput) {
      this.refs.csvFileInput.addEventListener("change", (event) => {
        const files = event.target.files;
        if (files.length > 0) {
          if (files[0].type === "text/csv") {
            Papa.parse(files[0], {
              header: true, complete: function (results) {
                self.setDataValueByManal(results.data);
              }, error: () => {
                alert("解析csv文件失败");
              }
            });
          }
          if (files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            // excel
            const reader = new FileReader();
            reader.onload = function (eventRead) {
              try {
                const data = new Uint8Array(eventRead.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                self.setDataValueByManal(jsonData);
              } catch (e) {
                alert("解析表格文件失败");
              }
            };
            reader.readAsArrayBuffer(files[0]);
          }
        }
      })
    }
    if (this.component.dataSource !== "file") {
      setTimeout(() => {
        this.setValue(null);
      }, 100);
    }
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.dataValue;
  }

  /**
   *
   * @param template 模板字符串 ex:https://${data.url}
   * @param map 数据 ex:{data:{url:"***"}}
   * @param allRequired 是否都为必填项
   * @returns {string|null|*}
   */
  parseTpl(template, map, allRequired) {
    if (template && template.length > 0) {
      try {
        let hasNull = false;
        const parsedStr = template.replace(/\$\{.+?}/g, (match) => {
          const path = match.substr(2, match.length - 3).trim();
          if (_.get(map, path)) {
            return _.get(map, path);
          } else {
            hasNull = true;
            return '--';
          }
        });
        if (hasNull && allRequired) {
          return null;
        }
        return parsedStr;
      } catch (e) {
        console.log(e);
      }
    }
    return '{}';
  }

  setValue(value) {
    let self = this;
    if (value) {
      super.setValue(value, {
        noUpdateEvent: true, noValidate: true, resetValue: true
      });
    } else {
      if (self.component['dataSource'] === 'file') {
        return true;
      }
      if (self.component['data-source-url']) {
        let url = self.parseTpl(self.component['data-source-url'], {data: self.rootValue},true);
        if (!url){
          return true;
        }
        if (url.startsWith('http')) {
          url = new URL(url);
        } else {
          url = new URL(url, window.location.origin);
        }
        const searchParams = new URLSearchParams(url.search);
        let params = {};
        let headers = {};
        self.component.request['headers'].forEach(header => {
          headers[`${header.key}`] = self.parseTpl(header.value, {data: self.rootValue});
        });
        // 搜索
        if (self.component['dataSource'] === 'url') {
        } else if (self.component['dataSource'] === 'noco_db') {
          if (self.component.data['noco_db_conditions']) {
            let where = '';
            self.component.data['noco_db_conditions'].forEach((item, index) => {
              if (item.value && item.value.length > 0) {
                let conditionVal = self.parseTpl(item.value, {data: self.rootValue});
                if (index === 0 && item.logical_operator === '~not') {
                  where += `(${item.name},${item.operator},${conditionVal})`;
                } else {
                  where += `${item.logical_operator}(${item.name},${item.operator},${conditionVal})`;
                }
              }
            });
            params.where = where;
          }
        }
        Object.keys(params).forEach(key => {
          searchParams.set(key, params[`${key}`]);
        });
        try {
          let lastestReqTime = new Date().getTime();
          self.lastestReqTime = lastestReqTime;
          var xhr = new XMLHttpRequest();
          let reqMethod = self.component.request['method'];
          if (reqMethod === 'GET') {
            xhr.open('GET', `${url.origin}${url.pathname}?${searchParams.toString()}`, true);
            xhr.responseType = 'json';
            Object.keys(headers).forEach(key => {
              xhr.setRequestHeader(key, headers[`${key}`]);
            });
          } else if (reqMethod === 'POST') {
            xhr.open('POST', `${url.origin}${url.pathname}?${searchParams.toString()}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.responseType = 'json';
            Object.keys(headers).forEach(key => {
              xhr.setRequestHeader(key, headers[`${key}`]);
            });
          }

          xhr.onload = function () {
            let status = xhr.status;

            if (status === 200) {
              // 确保最后更新的数据是最新一次请求的接口数据
              if (lastestReqTime - self.lastestReqTime === 0) {
                let dataPath = self.component.request['dataPath'];
                if (dataPath && dataPath.length > 0) {
                  self.dataValue = _.get(xhr.response, dataPath);
                } else {
                  self.dataValue = xhr.response;
                }
                self.getRoot().triggerChange({fromBlur: false}, {
                  instance: self, component: self.component, value: self.dataValue, flags: {fromBlur: false}
                });
              }
            }
          };
          if (reqMethod === 'GET') {
            xhr.send();
          } else if (reqMethod === 'POST') {
            if (self.component.request['body'] && self.component.request['body'].length > 0) {
              try {
                let reqData = JSON.parse(this.parseTpl(self.component.request['body'], {data: self.rootValue}));
                xhr.send(JSON.stringify(reqData));
              } catch (e) {
                console.log(`request.body.JSON.parse失败:${e}`);
              }
            } else {
              xhr.send();
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
      return true;
    }
  }
}

DataSourceComponent.editForm = editForm;
