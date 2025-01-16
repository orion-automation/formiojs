import textEditForm from '../textfield/TextField.form';
import TextAreaEditDisplay from './editForm/TextArea.edit.display';
import TextAreaEditValidation from './editForm/TextArea.edit.validation';

export default function(...extend) {
  const customSelectEditForm = textEditForm([
    {
      key: 'display',
      components: TextAreaEditDisplay
    },
    {
      key: 'validation',
      components: TextAreaEditValidation
    },
    {
      key: 'addons',
      ignore: true
    },
  ], ...extend);
  const tabIndex = customSelectEditForm.components.findIndex(component => component.key === 'tabs');
  const dataIndex = customSelectEditForm.components[tabIndex].components.findIndex(component => component.key === 'data');
  const dataSrcIndex = customSelectEditForm.components[tabIndex].components[dataIndex].components.findIndex(component => component.key === 'inputFormat');
  customSelectEditForm.components[tabIndex].components[dataIndex].components[dataSrcIndex].data.values=customSelectEditForm.components[tabIndex].components[dataIndex].components[dataSrcIndex].data.values
    .filter(item=>item.value==="html");
  return customSelectEditForm;
}
