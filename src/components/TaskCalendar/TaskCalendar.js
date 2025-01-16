/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import Component from '../_classes/field/Field';
import $ from 'jquery';
import 'peity';
import _ from 'lodash';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class TaskCalendar extends Component {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return Component.schema({
      type: 'taskCalendar',label: 'Task Calendar'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'TaskCalendar',
      group: 'advanced',
      icon: 'calendar-lines',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#taskCalendar',
      schema: TaskCalendar.schema()
    };
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

  getField = function(url, path, callback, headers, arrayKey) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[`${key}`]);
      });
    }
    xhr.onload = function() {
      const status = xhr.status;
      let result = xhr.response;
      result = _.get(result, path);
      if (arrayKey && arrayKey.trim().length > 0) {
        // result是数组,需要组合数组
        result = result.map(item => _.get(item, arrayKey)).join(',');
      }
      let value = `${result}`;
      try {
        if (!isNaN(Number(value))) {
          value = Number(value).toLocaleString();
        }
        else {
          value = result;
        }
      } catch (e) {
        console.log(e);
      }
      if (status === 200) {
        callback(value);
      }
      else {
        callback(value, status);
      }
    };
    xhr.send();
  };

  render() {
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
    element.querySelector('#qr-code-container').style.width = '100%';
    setTimeout(() => {
      this.setValue('');
    }, 100);
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.component.field;
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

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  async setValue(value) {
    const self = this;
    try {
      let locale = 'en';
      let cookies = self.readCookie();
      if (cookies['i18n-locale']) {
        locale = cookies['i18n-locale'];
        if (locale === 'jp') {
          locale = 'ja';
        }
        else if (locale === 'zh') {
          locale = 'zh-cn';
        }
      }
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
          self.loading = true;
          let lastestReqTime = new Date().getTime();
          self.lastestReqTime = lastestReqTime;
          self.getField(`${url.origin}${url.pathname}?${searchParams.toString()}`, self.component.request['dataPath'], function(result) {
            // 确保最后更新的数据是最新一次请求的接口数据
            if (lastestReqTime - self.lastestReqTime === 0) {
              self.items = result;
              let calendarEl = self.element.querySelector('#qr-code-container');
              let calendar = new Calendar(calendarEl, {
                plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,listWeek'
                },
                events: result.map(item => {
                  return {
                    id: item[`${self.component['result_id_key']}`],
                    title: item[`${self.component['result_title_key']}`],
                    start: new Date(item[`${self.component['result_start_key']}`]),
                    end: new Date(item[`${self.component['result_end_key']}`]),
                  };
                }),
                eventColor: '#FC775A',
                eventClick: function(info) {
                  // console.log('click event:', info.event, info.view);
                  if (!self.component['operate_process_key'] || self.component['operate_process_key'].length === 0) {
                    return;
                  }
                  let index=self.items.findIndex(child=>child.Id==info.event.id);
                  let item=self.items[index];
                  let processKey = self.component['operate_process_key'];
                  let label = item[`${self.component["result_title_key"]}`]||"";
                  let field = self.component.key;
                  let key = "modify";
                  let dataAction = Object.keys(item).map(key => item[`${key}`]);
                  let columns = Object.keys(item);
                  let action = {
                    field,
                    key,
                    label,
                    processKey,
                    data:dataAction,
                    columns
                  };
                  if (self.component['operate_type'] === 'dialog') {
                    window.editDataTableItemByDialog(action);
                  }
                  else if (self.component['operate_type'] === 'drawer') {
                    window.editDataTableItemByDrawer(action);
                  }
                },
                locales: allLocales,
                locale: locale
              });
              calendar.render();
              // setTimeout(()=>{
              //   calendar.updateSize();
              // },500);
            }
          }, headers);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  }
}
