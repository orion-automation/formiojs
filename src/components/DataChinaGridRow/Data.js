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
export default class DataChinaGridRow extends Component {
  constructor(component, options, data) {
    super(component, options, data);
    this.isLoadingSparkLine = false;
  }

  static schema(...extend) {
    return Component.schema({
      type: 'data_china_grid_row',  color: '#ff7754',
      "title-content": "低压问题综合治理率 <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>",
      "value-content": "160 <i style='font-size: 10px;color: #0a6ebd'>%</i>",
      "footer-content1": "name",
      "footer-content2": "<div style='color:red'>up</div>",
      "footer-content3": "info",
      "footer-content": "开始时间",
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Info Block ChinaFrid Row',
      group: 'advanced',
      icon: 'square-info',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#table',
      schema: DataChinaGridRow.schema()
    };
  }

  render() {
    return super.render(this.renderTemplate('dataChinaGridRow'));
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
      dataContainer: 'single',
    };

    this.loadRefs(element, refs);
    const dataContainer = this.refs.dataContainer;
    if (dataContainer) {
      const clickEventType = this.component['click-event-type'];
      if (clickEventType) {
        this.addEventListener(dataContainer, 'click', (event) => {
          // 点击事件
          let params;
          switch (clickEventType) {
            case 'newPage':
              try {
                params=JSON.parse(this.parseTpl(this.component['page_params'],{data:this.rootValue}))
              }catch (e) {
                console.log(`json转换失败:${e}`);
              }
              window.openNewPage(this.component['click-event-form-id'],params);
              break;
            case 'bottomSheet':
              try {
                params=JSON.parse(this.parseTpl(this.component['page_params'],{data:this.rootValue}))
              }catch (e) {
                console.log(`json转换失败:${e}`);
              }
              window.openBottomSheet(this.component['click-event-form-id'],params);
              break;
            case 'setTab':
              // 切换tab
              Formio.forms[this.currentForm.id].getComponent(this.component['click-event-tab-id']).setTabByKey(this.component['click-event-tab-key']);
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

  parseTpl(template, map) {
    if (template && template.length > 0) {
      try {
        return template.replace(/\$\{.+?}/g, (match) => {
          const path = match.substr(2, match.length - 3).trim();
          return _.get(map, path);
        });
      } catch (e) {
        console.log(e);
      }
    }
    return '{}';
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.component.field;
  }

  resetSparkLine(){
    let self=this;
    const container = this.element.querySelector('.data-container');
    if (self.component['enable-sparkline']){
      if (self.isLoadingSparkLine) {
        return true;
      }
      self.isLoadingSparkLine = true;
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
      // values
      container.querySelector('.sparkline-container').innerHTML = `<span class="line">${self.parseTpl(self.component['sparkLine-value'],{data:self.rootValue})}</span>`;
      // 宽度计算
      let parentWidth=container.querySelector('#sparkline-container-parent').offsetWidth;
      parentWidth=parentWidth*self.component['sparkLine-width'];
      try {
        // @ts-ignore
        $(container).find('.line').peity(sparkLineType, {
          fill: fillColor,
          height: self.component['sparkLine-height'],
          max: self.parseTpl(self.component['sparkLine-max-value-count'],{data:self.rootValue}),
          min: 0,
          stroke: self.component['sparkLine-stroke-color'],
          strokeWidth: 2,
          width: parentWidth
        });
        self.isLoadingSparkLine = false;
      }catch (e) {
        container.querySelectorAll(".line").forEach(e => peity(e, sparkLineType, {
          fill: fillColor,
          height: self.component['sparkLine-height'],
          max: self.parseTpl(self.component['sparkLine-max-value-count'],{data:self.rootValue}),
          min: 0,
          stroke: self.component['sparkLine-stroke-color'],
          strokeWidth: 2,
          width: parentWidth
        }))
        self.isLoadingSparkLine = false;
      }
    }
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
      try {
        let customStyle=JSON.parse(this.component["custom-style"]||{});
        _.forEach(customStyle,(value,key)=>{
          this.refs.dataContainer.style[key]=value;
        })
      }catch (e) {
      }
      // 标题设置
      let element = container.querySelector('.title-container');
      element.innerHTML=self.parseTpl(self.component['title-content'],{data:self.rootValue});
      element = container.querySelector('.value-container');
      element.innerHTML=self.parseTpl(self.component['value-content'],{data:self.rootValue});
      element = container.querySelector('.footer-container-value1');
      element.innerHTML=self.parseTpl(self.component['footer-content1'],{data:self.rootValue});
      element = container.querySelector('.footer-container-value2');
      element.innerHTML=self.parseTpl(self.component['footer-content2'],{data:self.rootValue});
      element = container.querySelector('.footer-container-value3');
      if (element){
        element.innerHTML=self.parseTpl(self.component['footer-content3'],{data:self.rootValue});
      }
      // 图标
      self.resetSparkLine();
    } catch (e) {
      console.log(e);
    }
    return true;
  }
}
