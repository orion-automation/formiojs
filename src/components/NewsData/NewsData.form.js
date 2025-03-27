import nestedComponentForm from '../_classes/component/Component.form';
import DataEditDisplay from './editForm/NewsData.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: DataEditDisplay
    }
  ], ...extend);
}
