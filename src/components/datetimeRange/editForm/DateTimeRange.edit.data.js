export default [
  {
    key: 'multiple',
    ignore: true
  },
  {
    type: 'textfield',
    input: true,
    key: 'defaultStartDate',
    label: 'Default Start Date',
    placeholder: 'moment()',
    tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\')',
    weight: 6
  },
  {
    type: 'textfield',
    input: true,
    key: 'defaultEndDate',
    label: 'Default End Date',
    placeholder: 'moment()',
    tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\')',
    weight: 7
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 28,
    input: true,
    key: 'customOptions',
    label: 'Flatpickr options',
    tooltip: 'A raw JSON object to use as options for the Date / Time component (Flatpickr).',
    defaultValue: {},
  },
];
