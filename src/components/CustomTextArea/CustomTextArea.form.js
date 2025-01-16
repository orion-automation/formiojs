import textEditForm from '../textarea/TextArea.form';
import CustomTextAreaEditData from './editForm/CustomTextArea.edit.data';

export default function(...extend) {
    return textEditForm([
        {
            key: 'data',
            components: CustomTextAreaEditData,
        },
    ], ...extend);
}
