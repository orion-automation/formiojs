import { GlobalFormio as Formio } from '../../Formio';
import CheckboxComponent from '../checkbox/Checkbox';

export default class CustomCheckBox extends CheckboxComponent {
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
            let parsedOptions = { ignoreCache: true };
            let parsedBody = {};
            try {
                parsedOptions = JSON.parse(this.parseTpl(options || '{"headers":{}}', { data: this.rootValue }, null));
                parsedBody = JSON.parse(this.parseTpl(body || '{}', { data: this.rootValue }, null));
            }
 catch (e) {
              console.log(e);
            }
            // 取消请求缓存
            parsedOptions.ignoreCache = true;
            Formio.request(this.component.url, this.component.method, this.component.method !== 'GET' ? parsedBody : null, null, parsedOptions)
                .then(response => {
                    if (!self.hasSetValue || (self.getValue() === self.component.defaultValue)) {
                        self.setValue(response === 'true', { resetValue: true });
                    }
                })
              // eslint-disable-next-line no-unused-vars
                .catch(e => {
                });
        }
    }

    static schema() {
        return CheckboxComponent.schema({
            label: 'Custom CheckBox',
            'key': 'customCheckBox',
            'type': 'customCheckBox',
        });
    }

    static get builderInfo() {
        return {
            title: 'Custom CheckBox',
            icon: 'check-square',
            weight: 50,
            group: 'basic',
            schema: CustomCheckBox.schema()
        };
    }
}

