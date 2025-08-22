import _ from 'lodash';
import Field from '../_classes/field/Field';

export default class RangeComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'range',
      inputType: 'range',
      label: 'Range',
      key: 'range',
      fieldSet: false,
      max_val: 100,
      min_val: 0,
      step_val: 1,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Range',
      group: 'basic',
      icon: 'dot-circle-o',
      weight: 80,
      schema: RangeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.previousValue = this.dataValue || null;
  }

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return _.get(map, path) ?? '--';
    });
  }

  get defaultSchema() {
    return RangeComponent.schema();
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (!defaultValue && this.component.defaultValue === false) {
      defaultValue = this.component.defaultValue;
    }
    return defaultValue;
  }

  get labelClass() {
    let className = '';
    if (this.isInputComponent
      && !this.options.inputsOnly
      && this.component.validate
      && this.component.validate.required) {
      className += ' field-required';
    }
    return `${className}`;
  }

  get hasSetValue() {
    return this.hasValue();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'input';
    info.attr.type = this.component.inputType || 'range';
    info.attr.class = 'form-range-input';
    if (this.component.name) {
      info.attr.name = `data[${this.component.name}]`;
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    info.label = this.t(this.component.label, {_userInput: true});
    info.labelClass = this.labelClass;
    return info;
  }

  render() {
    return super.render(this.renderTemplate('range', {
      input: this.inputInfo,
      checked: this.checked,
      tooltip: this.interpolate(this.t(this.component.tooltip) || '', {_userInput: true}).replace(/(?:\r\n|\r|\n)/g, '<br />')
    }));
  }

  attach(element) {
    this.loadRefs(element, {input: 'single'});
    this.input = this.refs.input;
    if (this.refs.input) {
      this.addEventListener(this.input, this.inputInfo.changeEvent, () => this.updateValue(this.refs.input.value, {
        modified: true
      }));
      this.addShortcut(this.input);
    }
    return super.attach(element);
  }

  detach(element) {
    if (element && this.input) {
      this.removeShortcut(this.input);
    }
    super.detach();
  }

  get emptyValue() {
    return this.component.inputType === 'radio' ? null : false;
  }

  isEmpty(value = this.dataValue) {
    return super.isEmpty(value) || value === false;
  }

  get key() {
    return this.component.name ? this.component.name : super.key;
  }

  getValue() {
    return _.toNumber(this.dataValue);
  }

  setValue(value, flags = {}) {
    this.refs.input.value = value;
    // 手动触发更新
    this.refs.input.dispatchEvent(new Event('input'));
    const changed = this.updateValue(value, flags);
    if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
      this.redraw();
    }
    return changed;
  }

  updateValue(value, flags) {
    const changed = super.updateValue(_.toNumber(value), flags);
    if (changed && this.input) {
    }

    return changed;
  }
}
