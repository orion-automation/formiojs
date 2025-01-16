import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import FlexEditDisplay from './editForm/Flex.edit.display';

export default function(...extend) {
    return nestedComponentForm([
        {
            key: 'display',
            components: FlexEditDisplay
        },
        {
            key: 'addons',
            ignore: true
        },
    ], ...extend);
}
