export default [
  {
    type: 'textarea',
    label: '自定义容器样式',
    key: 'container-custom-style',
    editor: 'ace',
    input: true,
    weight: 1,
    defaultValue: "{}",
    tooltip: '自定义的style:json格式,ex:{"border":"none","border-radius":"30px"}',
  },
  {
    type: 'panel',
    label: '图标设置',
    collapsible: true,
    collapsed: false,
    weight: 1,
    components: [
      {
        type: 'textfield',
        label: '宽度',
        key: 'icon-width',
        input: true
      },
      {
        type: 'textfield',
        label: '高度',
        key: 'icon-height',
        input: true
      },
      {
        type: 'textarea',
        label: '图标源(BASE64)',
        key: 'icon-src',
        editor: 'ace',
        input: true
      },
    ]
  },
  {
    type: 'panel',
    label: '标题设置',
    collapsible: true,
    collapsed: false,
    weight: 1,
    components: [
      {
        type: 'input',
        label: '标题',
        key: 'title',
        input: true,
      },
      {
        type: 'textarea',
        label: '自定义样式',
        key: 'title-custom-style',
        editor: 'ace',
        input: true,
        defaultValue: "{}",
        tooltip: '自定义的style:json格式,ex:{"border":"none","border-radius":"30px"}',
      },
    ]
  },
  {
    type: 'panel',
    label: '点击事件',
    collapsible: true,
    collapsed: false,
    weight: 2,
    components: [
      {
        key: 'click-event-type',
        data: {
          values: [
            { label: '跳转新页面', value: 'newPage' },
            { label: '打开弹窗', value: 'bottomSheet' },
            { label: '打开网址', value: 'newIntent' },
          ],
        },
        type: 'select',
        input: true,
        label: '事件类型',
        dataSrc: 'values'
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
        label: 'Url',
        key: 'click-event-url',
        input: true,
        tooltip: '',
        conditional: {
          json: {
            in: [
              { var: 'data.click-event-type' },
              [
                'newIntent'
              ],
            ],
          },
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
