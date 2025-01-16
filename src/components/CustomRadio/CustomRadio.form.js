import textEditForm from '../radio/Radio.form';
import CustomRadioEditData from './editForm/CustomRadio.edit.data';

export default function(...extend) {
    return textEditForm([{
        key: 'data',
        components: CustomRadioEditData,
    },], ...extend);
}
