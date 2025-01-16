import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import CustomTableEditDisplay from './editForm/CustomTable.edit.display';
import CustomTableEditData from './editForm/CustomTable.edit.data';

export default function(...extend) {
  let customFileEditForm= nestedComponentForm([
    {
      key: 'display',
      components: CustomTableEditDisplay
    },
    {
      key: 'data',
      components: CustomTableEditData,
      ignore: false
    },
    {
      key: 'addons',
      ignore: true
    },
  ], ...extend);
  const tabIndex = customFileEditForm.components.findIndex(component => component.key === 'tabs');
  const dataIndex = customFileEditForm.components[tabIndex].components.findIndex(component => component.key === 'data');
  customFileEditForm.components[tabIndex].components[dataIndex].components=CustomTableEditData;
  customFileEditForm.components[tabIndex].components[dataIndex].ignore=false;
  customFileEditForm.components[tabIndex].components[dataIndex].weight=10;
  customFileEditForm.components[tabIndex].components[dataIndex].label="Data";
  customFileEditForm.components[tabIndex].components=customFileEditForm.components[tabIndex].components.sort((a,b)=>a.weight-b.weight);
  return customFileEditForm;
}
