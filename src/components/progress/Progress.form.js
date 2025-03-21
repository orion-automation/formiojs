import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import ProgressEditDisplay from './editForm/Progress.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: ProgressEditDisplay
    }
  ], ...extend);
}
