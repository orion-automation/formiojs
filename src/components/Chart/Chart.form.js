import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import DataEditDisplay from './editForm/Chart.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: DataEditDisplay
    }
  ], ...extend);
}
