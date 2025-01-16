import textEditForm from '../textfield/TextField.form';
import CustomTextFieldEditData from './editForm/LocationInputTextField.edit.data';

export default function(...extend) {
    return textEditForm([
        {
            key: 'data',
            components: CustomTextFieldEditData,
        },
    ], ...extend);
}
