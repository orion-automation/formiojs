import textEditForm from '../textfield/TextField.form';
import CustomTextFieldEditData from './editForm/WeightInputTextField.edit.data';

export default function(...extend) {
    return textEditForm([
        {
            key: 'data',
            components: CustomTextFieldEditData,
        },
    ], ...extend);
}
