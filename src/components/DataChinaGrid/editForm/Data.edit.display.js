export default [
  {
    type: 'panel',
    title: '标题',
    collapsible: true,
    collapsed: false,
    weight: 1,
    components: [
      {
        type: 'input',
        label: '显示值',
        key: 'title-content',
        tooltip: '可输入html元素 ex:${data.Id}-<a>${data.Name}</a>',
        input: true,
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
        key: 'title-align',
        input: true,
        defaultValue: 'center',
        dataSrc: 'values'
      },
      {
        key: 'title-color',
        type: 'input',
        input: true,
        defaultValue: '#000000',
        label: '字体颜色'
      },
      {
        key: 'title-font-size',
        type: 'input',
        input: true,
        defaultValue: '10px',
        label: '字体大小'
      },
      {
        key: 'title-font-weight',
        type: 'input',
        input: true,
        defaultValue: 'bold',
        label: '字体粗细'
      },
    ]
  },
  {
    type: 'panel',
    title: '内容',
    collapsible: true,
    collapsed: false,
    weight: 2,
    components: [
      {
        type: 'input',
        label: '显示值',
        key: 'value-content',
        tooltip: '可输入html元素 ex:${data.Id}-<a>${data.Name}</a>',
        input: true,
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
        key: 'value-align',
        input: true,
        defaultValue: 'center',
        dataSrc: 'values'
      },
      {
        key: 'value-color',
        type: 'input',
        input: true,
        defaultValue: '#000000',
        label: '字体颜色'
      },
      {
        key: 'value-size',
        type: 'input',
        input: true,
        defaultValue: '#000000',
        label: '字体大小'
      },
      {
        key: 'value-font-weight',
        type: 'input',
        input: true,
        defaultValue: 'bold',
        label: '字体粗细'
      },
    ]
  },
  {
    type: 'panel',
    title: '页脚',
    collapsible: true,
    collapsed: false,
    weight: 3,
    components: [
      {
        type: 'input',
        label: '显示值1',
        key: 'footer-content1',
        tooltip: '可输入html元素 ex:${data.Id}-<a>${data.Name}</a>',
        input: true,
      },
      {
        type: 'input',
        label: '显示值2',
        key: 'footer-content2',
        tooltip: '可输入html元素 ex:${data.Id}-<a>${data.Name}</a>',
        input: true,
      },
      {
        type: 'panel',
        title: '显示值3',
        collapsible: true,
        collapsed: false,
        weight: 3,
        components: [
          {
            type: 'input',
            label: '内容',
            key: 'footer-content3',
            tooltip: '可输入html元素 ex:${data.Id}-<a>${data.Name}</a>',
            input: true,
          },
          {
            type: 'select',
            label: '显示样式',
            data: {
              values: [
                { label: '普通文本', value: 'text' },
                { label: 'badge', value: 'badge' },
              ],
            },
            key: 'footer-content3-style',
            input: true,
            defaultValue: 'text',
            dataSrc: 'values'
          },
          {
            type: 'input',
            label: '圆角',
            key: 'footer-content3-radius',
            input: true,
            conditional: {
              json: {
                in: [
                  { var: 'data.footer-content3-style' },
                  [
                    'badge'
                  ],
                ],
              },
            },
          },
          {
            type: 'input',
            label: '颜色',
            key: 'footer-content3-color',
            input: true,
          },
        ]
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
        key: 'footer-align',
        input: true,
        defaultValue: 'center',
        dataSrc: 'values'
      },
      {
        key: 'footer-color',
        type: 'input',
        input: true,
        defaultValue: '#000000',
        label: '字体颜色'
      },
      {
        key: 'footer-size',
        type: 'input',
        input: true,
        defaultValue: '#000000',
        label: '字体大小'
      },
      {
        type: 'panel',
        title: '统计图表',
        collapsible: true,
        collapsed: false,
        components: [
          {
            type: 'checkbox',
            label: '启用',
            key: 'enable-sparkline',
            defaultValue: false,
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
            type: 'input',
            label: 'Values',
            key: 'sparkLine-value',
            input: true,
            tooltip: '',
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
    ]
  },
  {
    type: 'textarea',
    label: '自定义样式',
    key: 'custom-style',
    editor: 'ace',
    input: true,
    defaultValue: {},
    tooltip: '自定义的style:json格式,ex:{"border":"none","border-radius":"30px"}',
    weight: 2
  },
  {
    type: 'input',
    label: 'BackgroundColor',
    key: 'bgColor',
    input: true,
    tooltip: '',
    weight: 2,
    defaultValue: '#ffffff',
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
            { label: '跳转新页面', value: 'newPage' },
            { label: '打开弹窗', value: 'bottomSheet' },
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
