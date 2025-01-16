import baseEditForm from '../_classes/component/Component.form';

import TaskCalendarEditData from './editForm/TaskCalendar.edit.data';
export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: TaskCalendarEditData
    }
  ], ...extend);
}
