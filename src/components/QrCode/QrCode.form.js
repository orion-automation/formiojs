import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import QrCodeEditDisplay from './editForm/QrCode.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: QrCodeEditDisplay
    }
  ], ...extend);
}
