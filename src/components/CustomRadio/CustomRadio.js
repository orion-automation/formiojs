import { GlobalFormio as Formio } from '../../Formio';
import RadioComponent from '../radio/Radio';
import _ from 'lodash';

export default class CustomRadio extends RadioComponent {
    constructor(component, options, data) {
        super(component, options, data);
    }

    init() {
        super.init();
        const self=this;
        if (self.component.defaultValueSrc === 'url' && self.component.defaultValueUrl) {
            const { defaultValueOptions = '{"headers":{}}', defaultValueBody = '{}' } = this.component;
            let parsedOptions = { ignoreCache: true };
            let parsedBody = {};
            try {
                parsedOptions = JSON.parse(this.parseTpl(defaultValueOptions || '{"headers":{}}', { data: this.rootValue }, null));
                parsedBody = JSON.parse(this.parseTpl(defaultValueBody || '{}', { data: this.rootValue }, null));
            }
            catch (e) {
                console.log(e);
            }
            // 取消请求缓存
            parsedOptions.ignoreCache = true;
            Formio.request(this.component.defaultValueUrl, this.component.defaultValueMethod, this.component.defaultValueMethod !== 'GET' ? parsedBody : null, null, parsedOptions)
                .then(response => {
                    if (!self.hasSetValue || (_.isEqual(self.component.defaultValue,self.getValue()))) {
                        self.updateValue(response[self.component.valueProperty], { resetValue:true });
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    setSelectedClasses() {
        if (this.refs.wrapper) {
            // add/remove selected option class
            const value = this.dataValue;
            this.refs.wrapper.forEach((wrapper, index) => {
                const input = this.refs.input[index];
                const checked  = (input.type === 'checkbox') ? value[input.value] : (input.value.toString() === value.toString());
                if (checked) {
                    // add class to container when selected
                    this.addClass(wrapper, this.optionSelectedClass);
                    // change "checked" attribute
                    // input.setAttribute('checked', 'true');
                    if (!input.checked) {
                        input.click();
                    }
                    input.setAttribute('checked', 'true');
                }
                else {
                    this.removeClass(wrapper, this.optionSelectedClass);
                    input.removeAttribute('checked');
                }
            });
        }
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

    loadItems(url, search, headers, options, method, body) {
        // Ensure we have a method and remove any body if method is get
        method = method || 'GET';
        if (method.toUpperCase() === 'GET') {
            body = null;
        }

        // Set ignoreCache if it is
        options.ignoreCache = this.component.ignoreCache;
        let parsedOptions = { header: null };
        let parsedBody = {};
        try {
            parsedOptions = JSON.parse(this.parseTpl(JSON.stringify(options), { data: this.rootValue }, null));
            parsedBody = JSON.parse(this.parseTpl(JSON.stringify(body), { data: this.rootValue }, null));
        }
          // eslint-disable-next-line no-empty
 catch (e) {
        }
        // Make the request.
        const self = this;
        headers.forEach(function(value, name) {
            headers.set(name, self.parseTpl(value, { data: self.rootValue }, null));
        });
        parsedOptions.header = headers;
        if (this.shouldLoad) {
            this.loading = true;
            Formio.makeRequest(this.options.formio, 'select', url, method, parsedBody, parsedOptions)
                .then((response) => {
                    this.loading = false;
                    this.error = null;
                    this.setItems(response);
                    this.shouldLoad = false;
                    this.redraw();
                })
                .catch((err) => {
                    this.handleLoadingError(err);
                });
        }
    }

    static schema() {
        return RadioComponent.schema({
            label: 'Custom Radio',
            'key': 'customRadio',
            'type': 'customRadio',
        });
    }

    static get builderInfo() {
        return {
            title: 'Custom Radio',
            icon: 'dot-circle-o',
            weight: 70,
            group: 'basic',
            schema: CustomRadio.schema()
        };
    }
}

