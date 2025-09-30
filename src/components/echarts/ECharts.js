import FieldComponent from '../_classes/field/Field';
import _ from 'lodash';
import * as echarts from 'echarts';
import 'echarts-gl';

export default class ECharts extends FieldComponent {

  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'ECharts', key: 'echarts', type: 'echarts',
    }, ...extend);
  }

  static builderInfo = {
    title: 'ECharts',
    group: 'advanced',
    icon: 'chart-line',
    weight: 70,
    schema: ECharts.schema()
  };

  render(children) {
    return super.render(this.renderTemplate('echarts'));
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
      this.setValue();
    }, 100);
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.component.value;
  }

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      let strTmp = _.get(map, path)??[];
      if (strTmp === undefined) {
        strTmp = null;
      }
      else {
        if (_.isArray(strTmp) || _.isObject(strTmp)) {
          strTmp = JSON.stringify(strTmp);
        }
      }
      return strTmp;
    });
  }

  resetEcharts(){
    let canvas = this.element.querySelector('#echarts-container');
    let chartInstance = echarts.getInstanceByDom(canvas);
    if (!chartInstance) {
      // 初始化 ECharts 实例
      chartInstance = echarts.init(canvas);
    }
    let optionsStr = this.component['option-value'];
    optionsStr = this.parseTpl(optionsStr, { data: this.rootValue });
    try {
      // 使用配置项渲染图表
      chartInstance.resize();
      // chartInstance.setOption({
      //   grid3D: {},
      //   xAxis3D: {},
      //   yAxis3D: {},
      //   zAxis3D: {},
      //   series: [{
      //     type: 'scatter3D',
      //     symbolSize: 50,
      //     data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
      //     itemStyle: {
      //       opacity: 1
      //     }
      //   }]
      // },true,true);
      chartInstance.setOption(JSON.parse(optionsStr), true,true);
    } catch (e) {
      console.log(`json解析错误:${e}`);
    }
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    this.resetEcharts();
    return true;
  }
}
