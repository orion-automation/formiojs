export default [
  {
    type: 'number',
    label: 'Size',
    key: 'width',
    input: true,
    weight: 1,
    defaultValue: 128,
    placeholder: 'Size of Qr Code',
    tooltip: 'Enter the size that should be displayed by this Qr Code.'
  },
  {
    type: 'select',
    label: '对齐方式',
    key: 'align',
    weight: 2,
    defaultValue: "start",
    data: {
      values: [
        { label: 'left', value: 'start' },
        { label: 'right', value: 'end' },
        { label: 'mid', value: 'center' },
      ]
    },
  },
  {
    type: 'input',
    label: 'Value',
    key: 'value',
    input: true,
    placeholder: "https://${data.name}-hh.com",
    tooltip: 'Value',
    weight: 3
  },
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'customClass',
    ignore: false
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'hidden',
    ignore: true
  },
  {
    key: 'modalEdit',
    ignore: true
  },
  {
    key: 'tableView',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'tabindex',
    ignore: true
  },
  {
    key: 'disabled',
    ignore: true
  }
];
