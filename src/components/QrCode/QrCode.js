import FieldComponent from '../_classes/field/Field';
import QRCode from 'qrcodejs2-fix';
import _ from 'lodash';

import editForm from './QrCode.form';

export default class QrCode extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: '二维码', key: 'qrCode', type: 'qrCode',
    }, ...extend);
  }

  static builderInfo = {
    title: '二维码',
    group: 'advanced',
    icon: 'qrcode',
    weight: 70,
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

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return _.get(map,path)??'--';
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
      text: this.parseTpl(this.component.value, {data: this.rootValue,row: this.data}),
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
