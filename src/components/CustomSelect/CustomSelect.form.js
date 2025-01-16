import selectEditForm from '../select/Select.form';
import CustomSelectEditData from './editForm/CustomSelect.edit.data';

export default function(...extend) {
    const customSelectEditForm = selectEditForm([
        {
            key: 'data',
            components: CustomSelectEditData,
        },
    ], ...extend);
    const tabIndex = customSelectEditForm.components.findIndex(component => component.key === 'tabs');
    const dataIndex = customSelectEditForm.components[tabIndex].components.findIndex(component => component.key === 'data');
    const dataSrcIndex = customSelectEditForm.components[tabIndex].components[dataIndex].components.findIndex(component => component.key === 'dataSrc');
    customSelectEditForm.components[tabIndex].components[dataIndex].components[dataSrcIndex].data.values=customSelectEditForm.components[tabIndex].components[dataIndex].components[dataSrcIndex].data.values
      .filter(item=>item.value!=="resource");
    const dataTypeIndex = customSelectEditForm.components[tabIndex].components[dataIndex].components.findIndex(component => component.key === 'dataType');
    customSelectEditForm.components[tabIndex].components[dataIndex].components[dataTypeIndex].data.values=[
        { label: 'Autotype', value: 'auto' },
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Object', value: 'object' },
        { label: 'StringArray', value: 'stringarray' },
    ];
    return customSelectEditForm;
}
