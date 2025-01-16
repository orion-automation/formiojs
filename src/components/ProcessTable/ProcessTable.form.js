import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import ProcessTableEditDisplay from './editForm/ProcessTable.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: ProcessTableEditDisplay
    }
  ], ...extend);
}
