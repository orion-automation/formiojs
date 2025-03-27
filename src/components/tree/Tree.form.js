import nestedComponentForm from '../_classes/component/Component.form';
import DataEditDisplay from './editForm/Tree.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: DataEditDisplay
    }
  ], ...extend);
}
