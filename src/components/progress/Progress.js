import FieldComponent from '../_classes/field/Field';
import editForm from './Progress.form';
import _ from 'lodash';

export default class Progress extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'Progress', key: 'progress', type: 'progress',
    }, ...extend);
  }

  static builderInfo = {
    title: 'Progress',
    group: 'advanced',
    icon: 'qrcode',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#progress',
    schema: Progress.schema()
  };

  render(children) {
    return super.render(this.renderTemplate('progress'));
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

    // Allow basic component functionality to attach like field logic and tooltips.
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
      return _.get(map, path);
    });
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    return true;
  }
}

Progress.editForm = editForm;
