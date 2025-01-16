export default [
  {
    type: 'input',
    label: 'Title',
    key: 'header',
    input: true,
    tooltip: '',
    weight: 1,
  },
  {
    type: 'input',
    label: 'Sub Title',
    key: 'sub-header',
    input: true,
    tooltip: '',
    weight: 1,
  },
  {
    type: 'input',
    label: 'Footer',
    key: 'footer',
    input: true,
    tooltip: '',
    weight: 1,
  },
  {
    type: 'input',
    label: 'BackgroundImageUrl',
    key: 'bg-img',
    input: true,
    tooltip: '',
    weight: 2,
    defaultValue: '#ffffff',
  },
  {
    type: 'select',
    label: 'BackgroundImage ScaleType',
    key: 'bg-img-scale-type',
    tooltip: '',
    defaultValue: 'auto',
    weight: 2,
    data: {
      values: [
        { label: '自动', value: 'auto' },
        { label: '覆盖', value: 'cover' },
        { label: '包含', value: 'contain' },
      ],
    },
    dataSrc: 'values'
  },
  {
    type: 'input',
    label: '背景图宽度',
    key: 'bg-img-scale-type-width',
    input: true,
    tooltip: '100%/10px/auto',
    defaultValue: 'auto',
    conditional: {
      json: { '===': [{ var: 'data.bg-img-scale-type' }, 'auto'] },
    },
    weight: 3,
  },
  {
    type: 'input',
    label: '背景图高度',
    key: 'bg-img-scale-type-height',
    input: true,
    tooltip: '100%/10px/auto',
    defaultValue: 'auto',
    conditional: {
      json: { '===': [{ var: 'data.bg-img-scale-type' }, 'auto'] },
    },
    weight: 3,
  },
  {
    type: 'input',
    label: 'Url',
    key: 'click-url',
    input: true,
    tooltip: '跳转url',
    weight: 3,
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
    key: 'hideLabel',
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
  },
  {
    key: 'label',
    ignore: true
  },
  {
    key: 'key',
    ignore: true
  },
];
