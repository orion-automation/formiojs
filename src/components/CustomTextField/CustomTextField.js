import { GlobalFormio as Formio } from '../../Formio';
import TextFieldComponent from '../textfield/TextField';

export default class CustomTextField extends TextFieldComponent {
    constructor(component, options, data) {
        super(component, options, data);
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

    init() {
        super.init();
        const self = this;
        if (self.component.defaultValueSrc === 'url' && self.component.url) {
            const { options = '{"headers":{}}', body = '{}' } = this.component;
            let parsedOptions={ ignoreCache:true };
            let parsedBody={};
            try {
                parsedOptions = JSON.parse(this.parseTpl(options||'{"headers":{}}', { data: this.rootValue }, null));
                parsedBody = JSON.parse(this.parseTpl(body||'{}', { data: this.rootValue }, null));
            }
            catch (e) {
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
        return TextFieldComponent.schema({
            label: 'Custom TextField',
            'key': 'customTextField',
            'type': 'customTextField',
        });
    }

    static get builderInfo() {
        return {
            title: 'Custom TextField',
            icon: 'terminal',
            weight: 0,
            group: 'basic',
            schema: CustomTextField.schema()
        };
    }
}

