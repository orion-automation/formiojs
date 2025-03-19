export default [
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
    key: 'disabled',
    ignore: true
  },
  {
    key: 'tableView',
    ignore: true
  },
  {
    key: 'components',
    type: 'datagrid',
    input: true,
    label: 'Tabs',
    weight: 50,
    reorder: true,
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'label',
        label: 'Label'
      },
      {
        type: 'textfield',
        input: true,
        key: 'key',
        label: 'Key',
        allowCalculateOverride: true,
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }
    ]
  },
  {
    type: 'panel',
    weight: 51,
    label: '头部设置',
    components: [
      {
        type: 'checkbox',
        key:'hideHeader',
        label: '隐藏头部',
        input: true
      },
      {
        type: 'select',
        label: '对齐方式',
        data: {
          values: [
            { label: '居中', value: 'center' },
            { label: '左对齐', value: 'start' },
            { label: '右对齐', value: 'end' },
          ],
        },
        key: 'headerAlign',
        input: true,
        defaultValue: 'center',
        dataSrc: 'values'
      },
      {
        type: 'textfield',
        key:'headerBackgroundColor',
        label: '背景色',
        defaultValue:'white',
        input: true
      },
      {
        type: 'textfield',
        key:'headerColor',
        tooltip:'文字和下标颜色',
        label: '主题色',
        defaultValue:'#333',
        input: true
      },
      {
        type: 'textfield',
        key:'headerNormalColor',
        tooltip:'未选中tab颜色',
        label: '未选中主题色',
        defaultValue:'#999',
        input: true
      },
      {
        type: 'textfield',
        key:'headerHoverColor',
        tooltip:'鼠标经过时颜色',
        label: 'hover颜色',
        defaultValue:'#999',
        input: true
      },
    ]
  },
];
