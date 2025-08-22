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
    key: 'hideLabel',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'disabled',
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
  {
    type: 'textfield',
    input: true,
    key: 'tag',
    weight: 50,
    label: 'HTML Tag',
    placeholder: 'HTML Element Tag',
    tooltip: 'The tag of this HTML element.'
  },
  {
    type: 'textfield',
    input: true,
    key: 'className',
    weight: 60,
    label: 'CSS Class',
    placeholder: 'CSS Class',
    tooltip: 'The CSS class for this HTML element.'
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Attributes',
    key: 'attrs',
    tooltip: 'The attributes for this HTML element. Only safe attributes are allowed, such as src, href, and title.',
    weight: 70,
    components: [
      {
        label: 'Attribute',
        key: 'attr',
        input: true,
        type: 'textfield'
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield'
      }
    ]
  },
  {
    type: 'textarea',
    input: true,
    editor: 'ace',
    rows: 10,
    as: 'html',
    label: 'Content',
    tooltip: 'The content of this HTML element.',
    defaultValue: '<div class="well">Content</div>',
    key: 'content',
    weight: 80
  },
  {
    type: 'panel',
    title: '点击事件',
    collapsible: true,
    collapsed: false,
    weight: 80,
    components: [
      {
        key: 'click-event-type',
        data: {
          values: [
            { label: '跳转新页面', value: 'newPage' },
            { label: '打开弹窗', value: 'bottomSheet' },
            { label: '切换标签', value: 'setTab' },
            { label: 'Open URL', value: 'openUrl' },
          ],
        },
        type: 'select',
        input: true,
        label: '事件类型',
        dataSrc: 'values'
      },
      {
        type: 'input',
        label: 'Url',
        key: 'click-event-url',
        input: true,
        tooltip: '',
        conditional: {
          json: {
            in: [
              { var: 'data.click-event-type' },
              [
                'newIntent','openUrl'
              ],
            ],
          },
        },
        validate: {
          required: true
        }
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
      {
        type: 'select',
        input: true,
        key: 'click-event-tab-key',
        label: '选择切换到的tab位置',
        dataSrc: 'custom',
        valueProperty: 'value',
        data: {
          custom(context) {
            var values = [];
            context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
              if (component.key === context.data['click-event-tab-id']) {
                component.components.forEach(tab=>{
                  values.push({
                    label: tab.label || tab.key,
                    value: tab.key
                  });
                })
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
      {
        type: 'input',
        label: 'FormId',
        key: 'click-event-form-id',
        input: true,
        tooltip: '',
        conditional: {
          json: {
            in: [
              { var: 'data.click-event-type' },
              [
                'newPage', 'bottomSheet'
              ],
            ],
          },
        },
        validate: {
          required: true
        }
      },
      {
        type: "textarea",
        label: "Page Params",
        key: "page_params",
        input: true,
        editor: "ace",
        tooltip: "传入下个页面的参数(json)",
        placeholder: `{
 "ignoreCache": true,
 "headers": {"Authorization": "\${data.token}"}
}`,
        conditional: {
          json: {
            in: [
              {var: "data.click-event-type"},
              [
                "newPage",
                "bottomSheet",
              ],
            ],
          },
        },
      },
      {
        type: 'input',
        label: '流程定义keys',
        key: 'click-event-process-def-keys',
        input: true,
        tooltip: '',
        conditional: {
          json: {
            in: [
              { var: 'data.click-event-type' },
              [
                'processDefList',
                'taskListPanel',
              ],
            ],
          },
        },
        validate: {
          required: true
        }
      },
      {
        type: 'input',
        label: '流程定义keys',
        key: 'click-event-task-keys',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.click-event-type' }, 'taskList'] },
        },
        validate: {
          required: true
        }
      },
      {
        type: 'input',
        label: '流程定义key',
        key: 'click-event-process-def-key',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.click-event-type' }, 'newProcessInstance'] },
        },
        validate: {
          required: true
        }
      },
    ]
  },
  {
    weight: 85,
    type: 'checkbox',
    label: 'Refresh On Change',
    tooltip: 'Rerender the field whenever a value on the form changes.',
    key: 'refreshOnChange',
    input: true
  },
];
