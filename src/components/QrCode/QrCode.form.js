import nestedComponentForm from '../_classes/component/Component.form';
import QrCodeEditDisplay from './editForm/QrCode.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: QrCodeEditDisplay
    }
  ], ...extend);
}
