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
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'autofocus',
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
    type: 'textarea',
    label: '自定义容器样式',
    key: 'container-custom-style',
    editor: 'ace',
    input: true,
    weight: 149,
    defaultValue: "{}",
    tooltip: '自定义的style:json格式,ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}',
  },
  {
    weight: 149,
    type: 'number',
    key: 'column-height',
    defaultValue: '11',
    tooltip: 'Unit:rem',
    label: 'Column Height'
  },
  {
    weight: 150,
    type: 'checkbox',
    key: 'flex-wrap',
    defaultValue: false,
    label: '可换行'
  },
  {
    weight: 150,
    type: 'checkbox',
    key: 'flex-scrollable',
    defaultValue: false,
    label: '可滚动'
  },
  {
    type: 'select',
    label: '对齐方式',
    weight: 150,
    data: {
      values: [
        { label: '居中', value: 'center' },
        { label: '左对齐', value: 'start' },
        { label: '右对齐', value: 'end' },
      ],
    },
    key: 'headerAlign',
    input: true,
    defaultValue: 'start',
    dataSrc: 'values'
  },
  {
    weight: 150,
    type: 'datagrid',
    input: true,
    key: 'columns',
    label: 'Column Properties',
    addAnother: 'Add Column',
    tooltip: 'The width, offset, push, and pull settings for each column.',
    reorder: true,
    components: [
      {
        type: 'hidden',
        key: 'components',
        defaultValue: []
      },
      {
        type: 'select',
        key: 'ratio',
        defaultValue: '1',
        label: 'Ratio',
        tooltip: 'Column width/Column height',
        data: {
          values: [
            { label: '1:1', value: '1' },
            { label: '2:1', value: '2' },
          ],
        },
      },
    ]
  },
  {
    weight: 160,
    key: 'autoAdjust',
    ignore: true
  }
];
