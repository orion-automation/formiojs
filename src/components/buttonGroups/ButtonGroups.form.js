import nestedComponentForm from '../_classes/component/Component.form';
import EChartsEditDisplay from './editForm/ButtonGroups.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: EChartsEditDisplay
    }
  ], ...extend);
}
