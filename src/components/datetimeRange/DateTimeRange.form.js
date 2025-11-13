import Components from '../Components';
import DateTimeEditData from './editForm/DateTimeRange.edit.data';
import DateTimeEditDate from './editForm/DateTimeRange.edit.date';
import DateTimeEditDisplay from './editForm/DateTimeRange.edit.display';
import DateTimeEditTime from './editForm/DateTimeRange.edit.time';
import DateTimeEditValidation from './editForm/DateTimeRange.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: DateTimeEditDisplay
    },
    {
      label: 'Date',
      key: 'date',
      weight: 1,
      components: DateTimeEditDate
    },
    {
      label: 'Time',
      key: 'time',
      weight: 2,
      components: DateTimeEditTime
    },
    {
      key: 'data',
      components: DateTimeEditData
    },
    {
      key: 'validation',
      components: DateTimeEditValidation
    },
    {
      key: 'addons',
      ignore: true
    },
  ], ...extend);
}
