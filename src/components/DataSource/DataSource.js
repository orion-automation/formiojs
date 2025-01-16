import editForm from './DataSource.form';
import FieldComponent from '../_classes/field/Field';
import _ from 'lodash';

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
    return super.render(this.renderTemplate('qrCode'));
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {};

    this.loadRefs(element, refs);
    setTimeout(() => {
      this.setValue("");
    }, 100);
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

  get(path, obj, fb = `$\{${path}}`) {
    return path.split('.').reduce((res, key) => {
      return res[key] || fb;
    }, obj);
  }

  parseTpl(template, map, fallback) {
    if (template && template.length > 0) {
      try {
        return template.replace(/\$\{.+?}/g, (match) => {
          const path = match.substr(2, match.length - 3).trim();
          return this.get(path, map, fallback);
        });
      } catch (e) {
        console.log(e);
      }
    }
    return '{}';
  }

  setValue(value) {
    var canvas = this.element.querySelector('#qr-code-container');
    canvas.innerHTML = '';
    let self = this;
    if (self.component['data-source-url']) {
      let url = self.parseTpl(self.component['data-source-url'], { data: self.rootValue }, null);
      if (url.startsWith('http')) {
        url = new URL(url);
      }
      else {
        url = new URL(url, window.location.origin);
      }
      const searchParams = new URLSearchParams(url.search);
      let params = {};
      let headers = {};
      self.component.request['headers'].forEach(header => {
        headers[`${header.key}`] = self.parseTpl(header.value, { data: self.rootValue }, null);
      });
      // 搜索
      if (self.component['dataSource'] === 'url') {
      }
      else if (self.component['dataSource'] === 'noco_db') {
        if (self.component.data['noco_db_conditions']) {
          let where = '';
          self.component.data['noco_db_conditions'].forEach((item, index) => {
            if (item.value && item.value.length > 0) {
              let conditionVal = self.parseTpl(item.value, { data: self.rootValue }, null);
              if (index === 0 && item.logical_operator === '~not') {
                where += `(${item.name},${item.operator},${conditionVal})`;
              }
              else {
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
        }
        else if (reqMethod === 'POST') {
          xhr.open('POST', `${url.origin}${url.pathname}?${searchParams.toString()}`, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.responseType = 'json';
          Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[`${key}`]);
          });
        }

        xhr.onload = function() {
          let status = xhr.status;

          if (status === 200) {
            // 确保最后更新的数据是最新一次请求的接口数据
            if (lastestReqTime - self.lastestReqTime === 0) {
              let dataPath = self.component.request['dataPath'];
              if (dataPath && dataPath.length > 0) {
                self.dataValue = _.get(xhr.response, dataPath);
              }
              else {
                self.dataValue = xhr.response;
              }
              self.getRoot().triggerChange({ fromBlur: false }, {
                instance: self,
                component: self.component,
                value: self.dataValue,
                flags: { fromBlur: false }
              });
            }
          }
        };
        if (reqMethod === 'GET') {
          xhr.send();
        }
        else if (reqMethod === 'POST') {
          let reqData = JSON.parse(this.parseTpl(JSON.stringify(self.component.request['body']) || '{}', { data: self.rootValue }, null));
          xhr.send(JSON.stringify(reqData));
        }
      } catch (e) {
        console.log(e);
      }
    }
    return true;
  }
}

DataSourceComponent.editForm = editForm;
