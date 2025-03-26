import nestedComponentForm from '../_classes/component/Component.form';
import IconButtonEditDisplay from './editForm/IconButton.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: IconButtonEditDisplay
    }
  ], ...extend);
}
