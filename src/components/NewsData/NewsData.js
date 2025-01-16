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
export default class NewsData extends Component {
  constructor(component, options, data) {
    super(component, options, data);
    this.isLoadingSparkLine = false;
  }

  static schema(...extend) {
    return Component.schema({
      type: 'newsData', icon: '', color: '#ff7754', header: '', url: '', field: '','bg-img':''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'News Info Block',
      group: 'advanced',
      icon: 'newspaper',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#table',
      schema: NewsData.schema()
    };
  }

  render() {
    return super.render(this.renderTemplate('newsData'));
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

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    const container = this.element.querySelector('.news-data-container');
    const clickEventType = this.component['click-url'];
    if (clickEventType) {
      container.addEventListener('click', function() {
        window.open(clickEventType, '_blank');
      });
    }
    return true;
  }
}
