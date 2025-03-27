import nestedComponentForm from '../_classes/component/Component.form';
import DataEditDisplay from './editForm/Department.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: DataEditDisplay
    }
  ], ...extend);
}
