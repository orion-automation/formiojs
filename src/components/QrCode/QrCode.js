import FieldComponent from '../_classes/field/Field';
import QRCode from 'qrcodejs2-fix';

import editForm from './QrCode.form';

export default class QrCode extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'QR Code', key: 'qrCode', type: 'qrCode',
    }, ...extend);
  }

  static builderInfo = {
    title: 'QR Code',
    group: 'advanced',
    icon: 'qrcode',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: QrCode.schema()
  };

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

  get(path, obj, fb = `$\{${path}}`) {
    return path.split('.').reduce((res, key) => {
      return res[key] || fb;
    }, obj);
  }

  parseTpl(template, map, fallback) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return this.get(path, map, fallback);
    });
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    var canvas = this.element.querySelector('#qr-code-container');
    canvas.innerHTML = '';
    new QRCode(canvas, {
      text: this.parseTpl(this.component.value, {data: this.rootValue}, null),
      width: this.component.width,
      height: this.component.width,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    return true;
  }
}

QrCode.editForm = editForm;
