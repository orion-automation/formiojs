import checkBoxEditForm from '../checkbox/Checkbox.form';
import CustomCheckBoxEditData from './editForm/CustomCheckBox.edit.data';

export default function(...extend) {
    return checkBoxEditForm([{
        key: 'data',
        components: CustomCheckBoxEditData,
    },], ...extend);
}
