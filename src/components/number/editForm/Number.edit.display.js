export default [
  {
    key: 'spellcheck',
    ignore: true
  },
  {
    key: 'inputMask',
    ignore: true
  },
  {
    key: 'allowMultipleMasks',
    ignore: true
  },
  {
    key: 'showWordCount',
    ignore: true,
  },
  {
    key: 'showCharCount',
    ignore: true,
  },
  {
    weight: 1501,
    type: 'checkbox',
    label: '小计',
    key: 'sumRow',
    defaultValue: false,
    input: true,
    conditional: {
      json: { var: 'data.tableView' }
    },
  },
];
