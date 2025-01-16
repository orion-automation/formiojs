/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import Component from '../_classes/field/Field';
import $ from 'jquery';
import 'peity';
import _ from 'lodash';

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class Data extends Component {
  constructor(component, options, data) {
    super(component, options, data);
    this.isLoadingSparkLine = false;
  }

  static schema(...extend) {
    return Component.schema({
      type: 'data', icon: '', color: '#ff7754', header: '', url: '', field: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Info Block',
      group: 'advanced',
      icon: 'square-info',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#table',
      schema: Data.schema()
    };
  }

  render() {
    return super.render(this.renderTemplate('data'));
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    let self=this;
    const refs = {
      dataContainer: 'single',
    };

    this.loadRefs(element, refs);
    const dataContainer = this.refs.dataContainer;
    if (dataContainer) {
      const clickEventType = this.component['click-event-type'];
      if (clickEventType) {
        let clickEventUrl;
        let url = window.location.href;
        url = url.split('/index.html')[0];
        if (url.endsWith('/design')) {
          url = url.substring(0, url.length - '/design'.length);
        }
        else if (url.endsWith('/task')) {
          url = url.substring(0, url.length - '/task'.length);
        }
        else if (url.endsWith('/admin')) {
          url = url.substring(0, url.length - '/admin'.length);
        }
        else if (url.endsWith('/automation')) {
          url = url.substring(0, url.length - '/automation'.length);
        }
        switch (clickEventType) {
          case 'url':
            clickEventUrl = this.component['click-event-url'];
            break;
          case 'processDefList':
            clickEventUrl = `${url}/task/index.html#/application/list?defaultSearchProcessDefinitionKeyIn=${this.component['click-event-process-def-keys']}`;
            break;
          case 'taskList':
            clickEventUrl = `${url}/task/index.html#/task/list?defaultSearchProcessDefinitionKeyIn=${this.component['click-event-task-keys']}`;
            break;
        }
        this.addEventListener(dataContainer, 'click', (event) => {
          // 点击事件
          switch (clickEventType) {
            case 'newProcessInstance':
              window.startProcessByDrawer({
                processKey: self.component['click-event-process-def-key'],
                label: '启动',
                field: self.component['key'],
                lockDrawer: self.component['click-event-lock-drawer']
              });
              break;
            case 'taskListPanel':
              window.openTaskListByDrawer({
                processKey: self.component['click-event-process-def-keys'],
                label: '',
                field: self.component['key']
              });
              break;
            case 'newTab':
              window.openNewTab({
                formId: self.component['click-event-form-id'],
                label: '',
                field: self.component['key']
              });
              break;
            default:
              window.open(clickEventUrl, '_blank');
              break;
          }
        });
      }
    }
    setTimeout(() => {
      this.setValue('');
    }, 100);
    return super.attach(element);
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

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.component.field;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    const self = this;
    try {
      const container = this.element.querySelector('.data-container');
      this.component['icon-field'] = this.component['icon-field'] ?? this.component.icon;
      this.component['icon-color'] = this.component['icon-color'] ?? this.component.color;
      this.component['value-field'] = this.component['value-field'] ?? this.component.field;
      this.component['value-url'] = this.component['value-url'] ?? this.component.url;
      const sparkLineType = this.component['sparkLine-type'] || 'line';
      let fillColor;
      if (self.component['sparkLine-fill-color']) {
        switch (sparkLineType) {
          case 'line':
            fillColor = self.component['sparkLine-fill-color'].split(',')[0];
            break;
          case 'pie':
          case 'donut':
          case 'bar':
            fillColor = self.component['sparkLine-fill-color'].split(',');
            break;
        }
      }
      let element = container.querySelector('h2');

      if (this.component['value-url']) {
        let url=this.parseTpl(this.component['value-url'], { data: this.rootValue }, null)
        let headers = {};
        try {
          headers = this.parseTpl(this.component['value-headers'], { data: this.rootValue }, null);
          if (typeof headers === 'string') {
            headers = JSON.parse(headers);
          }
        } catch (e) {
          headers = {};
          console.log(e);
        }
        if (this.component['new-value-headers']){
          let newValueHeaders=this.component['new-value-headers'];
          newValueHeaders.forEach(header=>{
            if (header.key&&header.key.length>0&&header.value&&header.value.length>0){
              headers[`${header.key}`]=this.parseTpl(header.value, { data: this.rootValue }, null);
            }
          });
        }
        this.getField(url, this.component['value-field'], function(field) {
          container.querySelector('h2').textContent = field;
        }, headers);
      }
      else {
        element.textContent = this.component['value-field'];
      }
      element = container.querySelector('.unit-container');
      if (this.component['subValue-url']) {
        let url=this.parseTpl(this.component['subValue-url'], { data: this.rootValue }, null)
        this.getField(url, this.component['subValue-field'], function(field) {
          container.querySelector('.unit-container').textContent = field;
        }, {});
      }
      else {
        element.textContent = this.component['subValue-field'];
      }

      if (self.isLoadingSparkLine) {
        return true;
      }
      self.isLoadingSparkLine = true;
      if (self.component['sparkLine-dataSrc'] === 'values' && self.component['sparkLine-const-field'] && self.component['sparkLine-const-field'].length > 0) {
        // values
        container.querySelector('.sparkline-container').innerHTML = `<span class="line">${self.component['sparkLine-const-field']}</span>`;
        // @ts-ignore
        $(container).find('.line').peity(sparkLineType, {
          fill: fillColor,
          height: self.component['sparkLine-height'],
          max: self.component['sparkLine-max-value-count'],
          min: 0,
          stroke: self.component['sparkLine-stroke-color'],
          strokeWidth: 2,
          width: self.component['sparkLine-width']
        });
        self.isLoadingSparkLine = false;
      }
      else if (self.component['sparkLine-dataSrc'] === 'url' && self.component['sparkLine-url'] && self.component['sparkLine-url'].length > 0) {
        // url
        let url=this.parseTpl(this.component['sparkLine-url'], { data: this.rootValue }, null)
        let headers = {};
        try {
          headers = self.parseTpl(self.component['sparkLine-headers'], { data: self.rootValue }, null);
          if (typeof headers === 'string') {
            headers = JSON.parse(headers);
          }
        } catch (e) {
          headers = {};
          console.log(e);
        }
        if (this.component['new-sparkLine-headers']){
          let newValueHeaders=this.component['new-sparkLine-headers'];
          newValueHeaders.forEach(header=>{
            if (header.key&&header.key.length>0&&header.value&&header.value.length>0){
              headers[`${header.key}`]=this.parseTpl(header.value, { data: this.rootValue }, null);
            }
          });
        }
        self.getField(url, self.component['sparkLine-field'], function(field) {
          container.querySelector('.sparkline-container').innerHTML = `<span class="line">${field}</span>`;

          // @ts-ignore
          $(container).find('.line').peity(sparkLineType, {
            fill: fillColor,
            height: self.component['sparkLine-height'],
            max: self.component['sparkLine-max-value-count'],
            min: 0,
            stroke: self.component['sparkLine-stroke-color'],
            strokeWidth: 2,
            width: self.component['sparkLine-width']
          });
          self.isLoadingSparkLine = false;
        }, headers, self.component['sparkLine-array-field']);
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  }
}
