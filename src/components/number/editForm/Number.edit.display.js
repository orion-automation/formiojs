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
  {
    weight: 1502,
    type: 'checkbox',
    label: '千分位(小计)',
    key: 'showLocale',
    input: true,
    defaultValue: false,
    conditional: {
      json: { var: 'data.sumRow' }
    },
  },
  {
    weight: 1502,
    type: 'number',
    label: '最小小数位数(小计)',
    key: 'decimalCountMin',
    input: true,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 16
    },
    conditional: {
      json: { var: 'data.sumRow' }
    },
  },
  {
    weight: 1502,
    type: 'number',
    label: '最大小数位数(小计)',
    key: 'decimalCountMax',
    input: true,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 16
    },
    conditional: {
      json: { var: 'data.sumRow' }
    },
  },
];
