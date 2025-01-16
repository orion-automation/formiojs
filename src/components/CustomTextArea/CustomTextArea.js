import { GlobalFormio as Formio } from '../../Formio';
import TextAreaComponent from '../textarea/TextArea';
import _ from 'lodash';

export default class CustomTextArea extends TextAreaComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return _.get(map, path);
    });
  }

  init() {
    super.init();
    const self = this;
    setTimeout(()=>{
      if (self.component.defaultValueSrc === 'value' && self.component.defaultValue) {
        let defaultValue = this.parseTpl(self.component.defaultValue, { data: this.rootValue });
        if (!self.hasSetValue || (self.getValue() === self.component.defaultValue)) {
          self.setValue(defaultValue, { resetValue: true });
        }
      }
    },200);
    if (self.component.defaultValueSrc === 'url' && self.component.url) {
      const { options = '{"headers":{}}', body = '{}' } = this.component;
      let parsedOptions = { ignoreCache: true };
      let parsedBody = {};
      try {
        parsedOptions = JSON.parse(this.parseTpl(options || '{"headers":{}}', { data: this.rootValue }, null));
        parsedBody = JSON.parse(this.parseTpl(body || '{}', { data: this.rootValue }, null));
      } catch (e) {
        console.log(e);
      }
      // 取消请求缓存
      parsedOptions.ignoreCache = true;
      Formio.request(this.component.url, this.component.methods, this.component.methods !== 'GET' ? parsedBody : null, null, parsedOptions)
        .then(response => {
          if (!self.hasSetValue || (self.getValue() === self.component.defaultValue)) {
            self.setValue(response, { resetValue: true });
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => {
        });
    }
  }

  static schema() {
    return TextAreaComponent.schema({
      label: 'Custom TextArea',
      'key': 'customTextArea',
      'type': 'customTextArea',
    });
  }

  static get builderInfo() {
    return {
      title: 'Custom TextArea',
      icon: 'font',
      weight: 20,
      group: 'basic',
      schema: CustomTextArea.schema()
    };
  }
}

