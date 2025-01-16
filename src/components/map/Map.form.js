import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import CustomTextFieldEditData from './editForm/Map.edit.data';
import CustomTextFieldEditDisplay from './editForm/Map.edit.display';

export default function(...extend) {
  let customFileEditForm= nestedComponentForm([
    {
      key: 'data',
      components: CustomTextFieldEditData,
    },
    {
      key: 'display',
      components: CustomTextFieldEditDisplay,
    },
  ], ...extend);
  const tabIndex = customFileEditForm.components.findIndex(component => component.key === 'tabs');
  const dataIndex = customFileEditForm.components[tabIndex].components.findIndex(component => component.key === 'data');
  customFileEditForm.components[tabIndex].components[dataIndex].components=CustomTextFieldEditData;
  customFileEditForm.components[tabIndex].components[dataIndex].ignore=false;
  customFileEditForm.components[tabIndex].components[dataIndex].weight=10;
  customFileEditForm.components[tabIndex].components[dataIndex].label="Data";
  customFileEditForm.components[tabIndex].components=customFileEditForm.components[tabIndex].components.sort((a,b)=>a.weight-b.weight);
  return customFileEditForm;
}
