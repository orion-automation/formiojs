export default [
  {
    type: 'textfield',
    label: '宽度',
    key: 'width',
    input: true,
    weight: 1,
    defaultValue: "100%",
    validate: {
      required: true
    }
  },
  {
    type: 'textfield',
    label: '高度',
    key: 'height',
    input: true,
    weight: 1,
    defaultValue: "50px",
    validate: {
      required: true
    }
  },
  {
    type: 'textarea',
    label: '配置项',
    key: 'option-value',
    editor: 'ace',
    input: true,
    tooltip: '配置项(json格式)',
    placeholder: `[{"value":10,"title":"demo","color":"black","unit":"个"}]`,
    weight: 1,
    validate: {
      required: true
    }
  },
  {
    type: 'textfield',
    label: '最大值',
    key: 'max-value',
    input: true,
    weight: 1,
    tooltip: '进度条最大值，若该值为空，则根据所有选项自动计算百分比',
    defaultValue: null,
  },
  {
    type: 'textfield',
    label: '字体大小',
    key: 'font-size',
    input: true,
    weight: 1,
    defaultValue: "20px",
  },
  {
    type: 'textfield',
    label: '进度条背景颜色',
    key: 'progress-color',
    input: true,
    weight: 1,
    defaultValue: "white",
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
