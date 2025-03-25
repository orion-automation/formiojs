import nestedComponentForm from '../_classes/component/Component.form';
import ProgressEditDisplay from './editForm/Progress.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: ProgressEditDisplay
    }
  ], ...extend);
}
