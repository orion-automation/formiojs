import Components from '../Components';
import RangeEditData from './editForm/Range.edit.data';
import RangeEditDisplay from './editForm/Range.edit.display';

export default function(...extend) {
  return  Components.baseEditForm([
    {
      key: 'display',
      components: RangeEditDisplay
    },
    {
      key: 'data',
      components: RangeEditData
    },
    {
      key: 'addons',
      ignore: true
    },
  ], ...extend);
}
