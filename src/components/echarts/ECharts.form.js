import nestedComponentForm from '../_classes/component/Component.form';
import EChartsEditDisplay from './editForm/ECharts.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: EChartsEditDisplay
    }
  ], ...extend);
}
