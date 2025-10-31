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
    const self = this;
    const refs = {
      dataContainer: 'single',
      refHeader: 'single',
      refSubHeader: 'single',
      refValue: 'single',
      refSubValue: 'single',
      refHeaderContent: 'single',
      refSparkLineTitle: 'single',
      refIcon: 'single'
    };

    this.loadRefs(element, refs);
    const dataContainer = this.refs.dataContainer;
    if (dataContainer) {
      const rect = dataContainer.getBoundingClientRect();
      this.refs.dataContainer.style['background-size']=`${rect.width}px ${rect.height}px`;
      const clickEventType = self.component['click-event-type'];
      if (clickEventType) {
        let clickEventUrl;
        let url = window.location.href;
        url = url.split('/index.html')[0];
        if (url.endsWith('/design')) {
          url = url.substring(0, url.length - '/design'.length);
        } else if (url.endsWith('/task')) {
          url = url.substring(0, url.length - '/task'.length);
        } else if (url.endsWith('/admin')) {
          url = url.substring(0, url.length - '/admin'.length);
        } else if (url.endsWith('/automation')) {
          url = url.substring(0, url.length - '/automation'.length);
        }
        switch (clickEventType) {
          case 'url':
            clickEventUrl = self.parseTpl(self.component['click-event-url'],{ data:self.rootValue,row: self.data });
            break;
          case 'processDefList':
            clickEventUrl = `${url}/task/index.html#/application/list?defaultSearchProcessDefinitionKeyIn=${self.parseTpl(self.component['click-event-process-def-keys'],{ data:self.rootValue,row: self.data })}`;
            break;
          case 'taskList':
            clickEventUrl = `${url}/task/index.html#/task/list?defaultSearchProcessDefinitionKeyIn=${self.parseTpl(self.component['click-event-task-keys'],{ data:self.rootValue,row: self.data })}`;
            break;
        }
        this.addEventListener(dataContainer, 'click', (event) => {
          let params=self.component['click-event-params'];
          try {
            params=JSON.parse(self.parseTpl(params,{ data:self.rootValue,row: self.data },'{}'));
          } catch (e) {
            params={};
          }
          // 点击事件
          switch (clickEventType) {
            case 'newProcessInstance':
              window.startProcessByDrawer({
                processKey: self.parseTpl(self.component['click-event-process-def-key'],{ data:self.rootValue,row: self.data }),
                label: '启动',
                field: self.component['key'],
                lockDrawer: self.component['click-event-lock-drawer'],
                preData: params
              });
              break;
            case 'taskListPanel':
              window.openTaskListByDrawer({
                processKey: self.parseTpl(self.component['click-event-process-def-keys'],{ data:self.rootValue,row: self.data }),
                label: '',
                field: self.component['key']
              });
              break;
            case 'newTab':
              window.openNewTab({
                formId: self.parseTpl(self.component['click-event-form-id'],{ data:self.rootValue,row: self.data }),
                label: '',
                field: self.component['key'],
                preData: params
              });
              break;
            default:
              window.open(clickEventUrl, '_blank');
              break;
          }
        });
      }
    }
    let customStyleStr = this.component['custom-style-bg'];
    if (customStyleStr && customStyleStr.length > 0) {
      try {
        customStyleStr=this.parseTpl(customStyleStr,{data:this.rootValue,row: this.data},'{}');
        _.forEach(JSON.parse(customStyleStr), (value, key) => {
          this.refs.dataContainer.style[key] = value;
        });
      }
      catch (e) {
        console.warn(e);
      }
    }
    customStyleStr = this.component['custom-style-title'];
    if (customStyleStr && customStyleStr.length > 0) {
      try {
        customStyleStr=this.parseTpl(customStyleStr,{data:this.rootValue,row: this.data},'{}');
        _.forEach(JSON.parse(customStyleStr), (value, key) => {
          this.refs.refHeader.style[key] = value;
        });
      }
      catch (e) {
        console.warn(e);
      }
    }
    customStyleStr = this.component['custom-style-sub-title'];
    if (customStyleStr && customStyleStr.length > 0) {
      try {
        customStyleStr=this.parseTpl(customStyleStr,{data:this.rootValue,row: this.data},'{}');
        _.forEach(JSON.parse(customStyleStr), (value, key) => {
          this.refs.refSubHeader.style[key] = value;
        });
      }
      catch (e) {
        console.warn(e);
      }
    }
    customStyleStr = this.component['custom-style-value'];
    if (customStyleStr && customStyleStr.length > 0) {
      try {
        customStyleStr=this.parseTpl(customStyleStr,{data:this.rootValue,row: this.data},'{}');
        _.forEach(JSON.parse(customStyleStr), (value, key) => {
          this.refs.refValue.style[key] = value;
        });
      }
      catch (e) {
        console.warn(e);
      }
    }
    customStyleStr = this.component['custom-style-sub-value'];
    if (customStyleStr && customStyleStr.length > 0) {
      try {
        customStyleStr=this.parseTpl(customStyleStr,{data:this.rootValue,row: this.data},'{}');
        _.forEach(JSON.parse(customStyleStr), (value, key) => {
          this.refs.refSubValue.style[key] = value;
        });
      }
      catch (e) {
        console.warn(e);
      }
    }

    setTimeout(() => {
      this.setValue('');
    }, 100);
    return super.attach(element);
  }

  parseTpl(template, map, defaultVal) {
    if (template && template.length > 0) {
      try {
        return template.replace(/\$\{.+?}/g, (match) => {
          const path = match.substr(2, match.length - 3).trim();
          return _.get(map, path) ?? '--';
        });
      } catch (e) {
        console.log(e);
      }
    }
    return defaultVal??'';
  }

  getField = function (url, path, callback, headers, arrayKey) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[`${key}`]);
      });
    }
    xhr.onload = function () {
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
        } else {
          value = result;
        }
      } catch (e) {
        console.log(e);
      }
      if (status === 200) {
        callback(value);
      } else {
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

      // icon
      if (this.component['icon-field']){
        let icon = this.parseTpl(this.component['icon-field'], {data: this.rootValue,row: this.data});
        this.refs.refIcon.className=`fa-fw ${icon}`;
        let iconColor = this.parseTpl(this.component['icon-color'], {data: this.rootValue,row: this.data});
        this.refs.refIcon.style.color = iconColor;
      } else {
        this.refs.refIcon.style.display = 'none';
      }
      // header
      this.refs.refHeaderContent.innerHTML = self.interpolate(self.parseTpl(self.component['header'], {data: self.rootValue,row: self.data}), {data: self.rootValue,row: self.data});
      this.refs.refSubHeader.innerHTML = self.interpolate(self.parseTpl(self.component['sub-header'], {data: self.rootValue,row: self.data}), {data: self.rootValue,row: self.data});
      this.refs.refSparkLineTitle.innerHTML = self.interpolate(self.parseTpl(self.component['sparkLine-title'], {data: self.rootValue,row: self.data}), {data: self.rootValue,row: self.data});

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
        let url = this.parseTpl(this.component['value-url'], {data: this.rootValue,row: this.data})
        let headers = {};
        try {
          headers = this.parseTpl(this.component['value-headers'], {data: this.rootValue,row: this.data},'{}');
          if (typeof headers === 'string') {
            headers = JSON.parse(headers);
          }
        } catch (e) {
          headers = {};
          console.log(e);
        }
        if (this.component['new-value-headers']) {
          let newValueHeaders = this.component['new-value-headers'];
          newValueHeaders.forEach(header => {
            if (header.key && header.key.length > 0 && header.value && header.value.length > 0) {
              headers[`${header.key}`] = this.parseTpl(header.value, {data: this.rootValue,row: this.data});
            }
          });
        }
        this.getField(url, this.component['value-field'], function (field) {
          container.querySelector('h2').textContent = field;
        }, headers);
      } else {
        element.innerHTML = self.interpolate(self.parseTpl(self.component['value-field'], {data: self.rootValue,row: self.data}),{data: self.rootValue});;
      }
      element = container.querySelector('.unit-container');
      if (this.component['subValue-url']) {
        let url = this.parseTpl(this.component['subValue-url'], {data: this.rootValue,row: this.data})
        this.getField(url, this.component['subValue-field'], function (field) {
          container.querySelector('.unit-container').textContent = field;
        }, {});
      } else {
        element.innerHTML = self.interpolate(self.parseTpl(self.component['subValue-field'], {data: self.rootValue,row: self.data}),{data: self.rootValue});;
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
          max: _.toNumber(self.parseTpl(`${self.component['sparkLine-max-value-count']}`, {data: self.rootValue,row: self.data})),
          min: 0,
          stroke: self.component['sparkLine-stroke-color'],
          strokeWidth: 2,
          width: self.component['sparkLine-width']
        });
        self.isLoadingSparkLine = false;
      } else if (self.component['sparkLine-dataSrc'] === 'url' && self.component['sparkLine-url'] && self.component['sparkLine-url'].length > 0) {
        // url
        let url = this.parseTpl(this.component['sparkLine-url'], {data: this.rootValue,row: this.data})
        let headers = {};
        try {
          headers = self.parseTpl(self.component['sparkLine-headers'], {data: self.rootValue,row: self.data},'{}');
          if (typeof headers === 'string') {
            headers = JSON.parse(headers);
          }
        } catch (e) {
          headers = {};
          console.log(e);
        }
        if (this.component['new-sparkLine-headers']) {
          let newValueHeaders = this.component['new-sparkLine-headers'];
          newValueHeaders.forEach(header => {
            if (header.key && header.key.length > 0 && header.value && header.value.length > 0) {
              headers[`${header.key}`] = this.parseTpl(header.value, {data: this.rootValue,row: this.data});
            }
          });
        }
        self.getField(url, self.component['sparkLine-field'], function (field) {
          container.querySelector('.sparkline-container').innerHTML = `<span class="line">${field}</span>`;

          // @ts-ignore
          $(container).find('.line').peity(sparkLineType, {
            fill: fillColor,
            height: self.component['sparkLine-height'],
            max: _.toNumber(self.parseTpl(`${self.component['sparkLine-max-value-count']}`, {data: self.rootValue,row: self.data})),
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
