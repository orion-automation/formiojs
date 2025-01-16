import DateTimeComponent from '../datetime/DateTime';

export default class CustomDateTime extends DateTimeComponent {
    constructor(component, options, data) {
        super(component, options, data);
    }

    static schema() {
        return DateTimeComponent.schema({
            label: 'Custom DateTime',
            'key': 'customDateTime',
            'type': 'customDateTime',
        });
    }

    static get builderInfo() {
        return {
            title: 'Custom DateTime',
            icon: 'calendar',
            weight: 40,
            group: 'advanced',
            schema: CustomDateTime.schema()
        };
    }
}

