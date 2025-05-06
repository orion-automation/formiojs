export default [
  {
    type: 'textfield',
    label: '宽度',
    key: 'width',
    input: true,
    weight: 1,
    defaultValue: "100%",
  },
  {
    type: 'textfield',
    label: '高度',
    key: 'height',
    input: true,
    weight: 1,
    defaultValue: "50px",
  },
  {
    key: 'buttons',
    type: 'datagrid',
    input: true,
    label: '按钮组',
    weight: 1,
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'title',
        label: 'Label'
      },
      {
        type: 'textfield',
        input: true,
        key: 'key',
        label: 'Key',
        validate: {
          required: true
        }
      }
    ]
  },
  {
    type: 'panel',
    title: '点击事件',
    collapsible: true,
    collapsed: false,
    weight: 1,
    components: [
      {
        key: 'click-event-type',
        data: {
          values: [
            { label: '切换标签', value: 'setTab' },
          ],
        },
        type: 'select',
        input: true,
        label: '事件类型',
        dataSrc: 'values'
      },
      {
        type: 'select',
        input: true,
        key: 'click-event-tab-id',
        label: '选择切换的tabs',
        dataSrc: 'custom',
        valueProperty: 'value',
        data: {
          custom(context) {
            var values = [];
            context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
              if (component.key !== context.data.key && component.type==='customTabs') {
                values.push({
                  label: component.label || component.key,
                  value: path
                });
              }
            },true);
            return values;
          }
        },
        conditional: {
          json: { in: [
              { var: 'data.click-event-type' },
              [
                'setTab',
              ],
            ], },
        },
      },
    ]
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
