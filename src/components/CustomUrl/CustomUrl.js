import UrlComponent from '../url/Url';

export default class CustomUrl extends UrlComponent {
    constructor(component, options, data) {
        super(component, options, data);
    }

    init() {
        super.init();
    }

    renderElement(value, index) {
        // Double quotes cause the input value to close so replace them with html quote char.
        if (value && typeof value === 'string') {
            value = value.replace(/"/g, '&quot;');
        }
        const info = this.inputInfo;
        info.attr = info.attr || {};
        info.attr.value = this.getValueAsString(this.formatValue(this.parseValue(value)))
            .replace(/"/g, '&quot;');

        const valueMask = this.component.inputMask;
        const displayMask = this.component.displayMask;
        const hasDifferentDisplayAndSaveFormats = valueMask && displayMask && valueMask !== displayMask;

        if (this.isMultipleMasksField) {
            info.attr.class += ' formio-multiple-mask-input';
        }

        return this.isMultipleMasksField
            ? this.renderTemplate('multipleMasksInput', {
                input: info,
                value,
                index,
                selectOptions: this.getMaskOptions() || [],
            }, this.isHtmlRenderMode() ? 'html' : null)
            : this.renderTemplate('customUrl', {
                prefix: this.prefix,
                suffix: this.suffix,
                input: info,
                value: this.formatValue(this.parseValue(value)),
                hasValueMaskInput: hasDifferentDisplayAndSaveFormats,
                index
            }, this.isHtmlRenderMode() ? 'html' : null);
    }

    attach(element) {
        /**
         * This method will look for an element that has the 'ref="customRef"' as an
         * attribute (like <div ref="customRef"></div>) and then assign that DOM
         * element to the variable "this.refs". After this method is executed, the
         * following will point to the DOM element of that reference.
         *
         * this.refs.customRef
         *
         * For DOM elements that have multiple in the component, you would make this
         * say 'customRef: "multiple"' which would then turn "this.refs.customRef" into
         * an array of DOM elements.
         */
        this.loadRefs(element, {
            linkUrl: 'single',
        });

        /**
         * It is common to attach events to your "references" within your template.
         * This can be done with the "addEventListener" method and send the template
         * reference to that object.
         */
        if (this.refs.linkUrl) {
            this.addEventListener(this.refs.linkUrl, 'click', () => {
                window.open(this.refs.linkUrl.value, '_blank');
            });
        }
        return super.attach(element);
    }

    static schema() {
        return UrlComponent.schema({
            label: 'Custom Url',
            'key': 'customUrl',
            'type': 'customUrl',
        });
    }

    static get builderInfo() {
        return {
            title: 'Custom Url',
            icon: 'link',
            weight: 20,
            group: 'advanced',
            schema: CustomUrl.schema()
        };
    }
}

