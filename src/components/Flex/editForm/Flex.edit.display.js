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
    weight: 149,
    type: 'number',
    key: 'column-height',
    defaultValue: '11',
    tooltip: 'Unit:rem',
    label: 'Column Height'
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
