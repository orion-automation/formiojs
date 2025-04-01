export default [
  {
    type: 'textarea',
    label: '自定义样式',
    key: 'custom-style',
    editor: 'ace',
    input: true,
    weight: 1,
    defaultValue: "{}",
    tooltip: '自定义的style:json格式,ex:{"border":"none","border-radius":"30px"}',
  },
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
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
    key: 'tableView',
    ignore: true
  },
];
