export default [
  {
    type: 'input',
    label: '标题',
    key: 'header',
    input: true,
    tooltip: '',
    weight: 1,
  },
  {
    type: 'textarea',
    label: '自定义标题样式',
    key: 'custom-style-title',
    editor: 'ace',
    input: true,
    defaultValue: '',
    tooltip: '自定义的style:json格式,ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}',
    weight: 1
  },
  {
    type: 'input',
    label: '副标题',
    key: 'sub-header',
    input: true,
    tooltip: '',
    weight: 1,
  },
  {
    type: 'textarea',
    label: '自定义副标题样式',
    key: 'custom-style-sub-title',
    editor: 'ace',
    input: true,
    defaultValue: '',
    tooltip: '自定义的style:json格式,ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}',
    weight: 1
  },
  {
    type: 'input',
    label: '背景颜色',
    key: 'bgColor',
    input: true,
    tooltip: '',
    weight: 2,
    defaultValue: '#ffffff',
  },
  {
    type: 'textarea',
    label: '自定义背景样式',
    key: 'custom-style-bg',
    editor: 'ace',
    input: true,
    defaultValue: '',
    tooltip: '自定义的style:json格式(支持变量),ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}',
    weight: 2
  },
  {
    type: 'panel',
    title: 'Icon',
    collapsible: true,
    collapsed: false,
    weight: 3,
    components: [
      {
        type: 'input',
        label: 'Field',
        key: 'icon-field',
        input: true,
        tooltip: '',
      },
      {
        type: 'input',
        label: 'Color',
        key: 'icon-color',
        input: true,
        tooltip: '',
      },
    ]
  },
  {
    type: 'panel',
    title: 'Value',
    collapsible: true,
    collapsed: false,
    weight: 4,
    components: [
      {
        type: 'input',
        label: 'URL',
        key: 'value-url',
        input: true,
        tooltip: '',
      },
      {
        type: 'datagrid',
        input: true,
        label: 'Request Headers',
        key: 'new-value-headers',
        defaultValue: [{ key: '', value: '' }],
        components: [
          {
            label: 'Key',
            key: 'key',
            input: true,
            type: 'textfield',
            validate: {
              required: false
            }
          },
          {
            label: 'Value',
            key: 'value',
            input: true,
            type: 'textfield',
            validate: {
              required: false
            }
          },
        ],
      },
      {
        type: 'input',
        label: 'Field',
        key: 'value-field',
        input: true,
        tooltip: '',
      },
      {
        type: 'input',
        label: 'Color',
        key: 'value-color',
        input: true,
        tooltip: '',
      },
      {
        type: 'textarea',
        label: '自定义样式',
        key: 'custom-style-value',
        editor: 'ace',
        input: true,
        defaultValue: '',
        tooltip: '自定义的style:json格式,ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}'
      },
    ]
  },
  {
    type: 'panel',
    title: 'SubValue',
    collapsible: true,
    collapsed: false,
    weight: 5,
    components: [
      {
        type: 'input',
        label: 'URL',
        key: 'subValue-url',
        input: true,
        tooltip: '',
      },
      {
        type: 'input',
        label: 'Field',
        key: 'subValue-field',
        input: true,
        tooltip: '',
      },
      {
        type: 'input',
        label: 'Color',
        key: 'subValue-color',
        input: true,
        tooltip: '',
      },
      {
        type: 'textarea',
        label: '自定义样式',
        key: 'custom-style-sub-value',
        editor: 'ace',
        input: true,
        defaultValue: '',
        tooltip: '自定义的style:json格式,ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}'
      },
    ]
  },
  {
    type: 'panel',
    title: 'SparkLine',
    collapsible: true,
    collapsed: false,
    weight: 6,
    components: [
      {
        type: 'input',
        label: 'Title',
        key: 'sparkLine-title',
        input: true,
        tooltip: '',
      },
      {
        key: 'sparkLine-type',
        data: {
          values: [
            { label: 'Line Charts', value: 'line' },
            { label: 'Pie Charts', value: 'pie' },
            { label: 'Donut Charts', value: 'donut' },
            { label: 'Bar Charts', value: 'bar' }
          ],
        },
        type: 'select',
        input: true,
        defaultValue: 'line',
        label: 'Type',
        dataSrc: 'values'
      },
      {
        type: 'number',
        label: 'width',
        key: 'sparkLine-width',
        input: true,
        tooltip: '',
        defaultValue: 32,
      },
      {
        type: 'number',
        label: 'height',
        key: 'sparkLine-height',
        input: true,
        tooltip: '',
        defaultValue: 16,
      },
      {
        type: 'input',
        label: 'MaxValueCount',
        key: 'sparkLine-max-value-count',
        defaultValue: '10',
        input: true,
        tooltip: '',
      },
      {
        key: 'sparkLine-dataSrc',
        data: {
          values: [
            { label: 'Values', value: 'values' },
            { label: 'URL', value: 'url' },
          ],
        },
        type: 'select',
        input: true,
        defaultValue: 'values',
        label: 'Data Src',
        dataSrc: 'values'
      },
      {
        type: 'input',
        label: 'URL',
        key: 'sparkLine-url',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.sparkLine-dataSrc' }, 'url'] },
        },
      },
      {
        type: 'datagrid',
        input: true,
        label: 'Request Headers',
        key: 'new-sparkLine-headers',
        defaultValue: [{ key: '', value: '' }],
        components: [
          {
            label: 'Key',
            key: 'key',
            input: true,
            type: 'textfield',
            validate: {
              required: true
            }
          },
          {
            label: 'Value',
            key: 'value',
            input: true,
            type: 'textfield',
            validate: {
              required: true
            }
          },
        ],
        conditional: {
          json: { '===': [{ var: 'data.sparkLine-dataSrc' }, 'url'] },
        },
      },
      {
        type: 'input',
        label: 'Field',
        key: 'sparkLine-field',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.sparkLine-dataSrc' }, 'url'] },
        },
      },
      {
        type: 'input',
        label: 'Array Field',
        key: 'sparkLine-array-field',
        input: true,
        tooltip: '接口结果是数组,展示数据为对数组的某一项的取值,不填表示直接展示接口结果',
        conditional: {
          json: { '===': [{ var: 'data.sparkLine-dataSrc' }, 'url'] },
        },
      },
      {
        type: 'input',
        label: 'Values',
        key: 'sparkLine-const-field',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.sparkLine-dataSrc' }, 'values'] },
        },
      },
      {
        type: 'input',
        label: 'FillColor',
        key: 'sparkLine-fill-color',
        input: true,
        tooltip: '多个颜色用逗号隔开',
        placeholder: '#c6d9fd,#000000',
        defaultValue: '',
      },
      {
        type: 'input',
        label: 'StrokeColor',
        key: 'sparkLine-stroke-color',
        input: true,
        tooltip: '',
        defaultValue: '',
      },
    ]
  },
  {
    type: 'panel',
    title: '点击事件',
    collapsible: true,
    collapsed: false,
    weight: 5,
    components: [
      {
        key: 'click-event-type',
        data: {
          values: [
            { label: '跳转url', value: 'url' },
            { label: '跳转流程定义列表', value: 'processDefList' },
            { label: '跳转任务列表', value: 'taskList' },
            { label: '新建流程实例', value: 'newProcessInstance' },
            { label: '打开任务列表panel', value: 'taskListPanel' },
            { label: '打开tab页面', value: 'newTab' },
          ],
        },
        type: 'select',
        input: true,
        label: '事件类型',
        dataSrc: 'values'
      },
      {
        label: '显示跳转图标',
        key: 'click-event-show-icon',
        type: 'checkbox',
        defaultValue: true
      },
      {
        label: '锁定抽屉',
        key: 'click-event-lock-drawer',
        type: 'checkbox',
        conditional: {
          json: {
            in: [
              { var: 'data.click-event-type' },
              [
                'newProcessInstance',
              ],
            ],
          },
        },
      },
      {
        label: '参数传递',
        key: 'click-event-params',
        type: 'textarea',
        editor: 'ace',
        tooltip: 'json格式,ex:{&quot;border&quot;:&quot;none&quot;,&quot;border-radius&quot;:&quot;30px&quot;}',
        conditional: {
          json: {
            in: [
              { var: 'data.click-event-type' },
              [
                'newProcessInstance',
              ],
            ],
          },
        },
      },
      {
        type: 'input',
        label: 'URL',
        key: 'click-event-url',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.click-event-type' }, 'url'] },
        },
        validate: {
          required: true
        }
      },
      {
        type: 'input',
        label: 'FormId',
        key: 'click-event-form-id',
        input: true,
        tooltip: '',
        conditional: {
          json: { '===': [{ var: 'data.click-event-type' }, 'newTab'] },
        },
        validate: {
          required: true
        }
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
