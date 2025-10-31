/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import Component from '../_classes/field/Field';
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
  }

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return _.get(map, path)??'--';
    });
  }

  static schema() {
    return Component.schema({
      type: 'chart',
      header: '',
      url: '',
      height: 500,
      interval: 0
    });
  }

  static get builderInfo() {
    return {
      title: 'Iframe Content',
      group: 'advanced',
      icon: 'rectangle-code',
      weight: 70,
      schema: Data.schema()
    };
  }

  render() {
    return super.render(this.renderTemplate('chart'));
  }

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
    return this.component.url;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue() {
    let self=this;
    const container = this.element.querySelector('.chart-container');
    let header=this.component.header;
    let element;
    if (header&&header.length>0){
      element = container.querySelector('p');
      element.textContent = this.component.header;
    }

    element = container.querySelector('iframe');

    let url;
    url=JSON.parse(this.parseTpl(JSON.stringify({url:this.component.url}), {data: this.rootValue,row: this.data})).url;
    if (element) {
      element.src = url;
      element.height = this.component.height + "";
    } else {
      var tag = '<iframe  style="border-radius:6px" width="100%" height="' + this.component.height + '" src="' + url + '" frameborder="0"></iframe>';
      container.innerHTML += tag;
      element = container.querySelector("iframe");
    }

    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
    const isSetting = this.element.parentElement.parentElement.parentElement.className === 'component-preview';
    if (!isSetting && this.component.interval && this.component.interval.trim().length>0 && this.component.interval !== "0") {
      const interval = window.setInterval(function() {
        element.src = JSON.parse(self.parseTpl(JSON.stringify({url:self.component.url}), {data: self.rootValue,row: self.data})).url;
      }, this.component.interval * 1000);
      this.interval = interval;
    }

    return true;
  }
}
