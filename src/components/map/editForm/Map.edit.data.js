export default [
  {
    type: 'panel',
    title: '高德地图JS API',
    weight: 0,
    collapsible: true,
    collapsed: false,
    components: [
      {
        type: 'input',
        label: 'key',
        key: 'amap-key',
        input: true,
        validate: {
          required: true
        }
      }, {
        type: 'input',
        label: 'securityJsCode',
        key: 'amap-code',
        input: true,
        validate: {
          required: true
        }
      },
    ]
  },
  {
    type: 'panel',
    title: '标记点设置',
    weight: 0,
    collapsible: true,
    collapsed: false,
    components: [
      {
        type: "panel",
        title: "数据源",
        weight: 10,
        collapsible: true,
        collapsed: false,
        components: [
          {
            key: "dataSource",
            data: {
              values: [
                {label: "URL", value: "url"},
                {label: "Value", value: "value"},
              ],
            },
            type: "select",
            input: true,
            defaultValue: "url",
            label: "Data Source",
            dataSrc: "values"
          },
          {
            type: "input",
            label: "Data Source Value",
            key: "data-source-value",
            input: true,
            tooltip: "",
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "value",
                  ],
                ],
              },
            },
            validate: {
              required: true
            }
          },
          {
            type: "input",
            label: "Data Source Value Title",
            key: "data-source-value-title",
            input: true,
            tooltip: "",
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "value",
                  ],
                ],
              },
            },
            validate: {
              required: true
            }
          },
          {
            type: "input",
            label: "Data Source Url",
            key: "data-source-url",
            input: true,
            tooltip: "",
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "url",
                    "noco_db",
                  ],
                ],
              },
            },
            validate: {
              required: true
            }
          },
          {
            key: "request.method",
            data: {
              values: [
                {label: "GET", value: "GET"},
                {label: "POST", value: "POST"},
              ],
            },
            type: "select",
            input: true,
            defaultValue: "GET",
            label: "Request Method",
            dataSrc: "values",
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "url",
                    "noco_db",
                  ],
                ],
              },
            },
          },
          {
            type: "datagrid",
            input: true,
            label: "Request Headers",
            key: "request.headers",
            components: [
              {
                label: "Key",
                key: "key",
                input: true,
                type: "textfield"
              },
              {
                label: "Value",
                key: "value",
                input: true,
                type: "textfield"
              },
            ],
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "url",
                    "noco_db",
                  ],
                ],
              },
            },
          },
          {
            type: "textarea",
            label: "Request Body",
            key: "request.body",
            input: true,
            editor: "ace",
            as: "json",
            placeholder: `{
        "token": "\${data.token}"
      }`,
            tooltip: "输入请求的body(json)",
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "url",
                    "noco_db",
                  ],
                ],
              },
            },
          },
          {
            type: "textfield",
            input: true,
            label: "Data Path",
            key: "request.dataPath",
            description: "The object path to the iterable items.",
            tooltip: "The property within the source data, where iterable items reside. For example: results.items or results[0].items",
            conditional: {
              json: {
                in: [
                  {var: "data.dataSource"},
                  [
                    "url",
                    "noco_db",
                  ],
                ],
              },
            },
          },
        ]
      },
      {
        type: "panel",
        title: "字段映射",
        weight: 10,
        collapsible: true,
        collapsed: true,
        conditional: {
          json: {
            in: [
              {var: "data.dataSource"},
              [
                "url",
                "noco_db",
              ],
            ],
          },
        },
        components: [
          {
            key: "dataType",
            data: {
              values: [
                {label: "经度,纬度", value: "lng,lat"},
                {label: "经度字段和纬度字段", value: "lnglat"},
              ],
            },
            type: "select",
            input: true,
            defaultValue: "lnglat",
            label: "数据类型",
            dataSrc: "values"
          },
          {
            type: "input",
            input: true,
            label: "经纬度 Key",
            key: "key_lnglat",
            tooltip: "lng,lat",
            validate: {
              required: true
            },
            conditional: {
              json: {
                in: [
                  {var: "data.dataType"},
                  [
                    "lng,lat",
                  ],
                ],
              },
            },
          },
          {
            type: "input",
            input: true,
            label: "经度 Key",
            key: "key_lng",
            validate: {
              required: true
            },
            conditional: {
              json: {
                in: [
                  {var: "data.dataType"},
                  [
                    "lnglat",
                  ],
                ],
              },
            },
          },
          {
            type: "input",
            input: true,
            label: "纬度 Key",
            key: "key_lat",
            validate: {
              required: true
            },
            conditional: {
              json: {
                in: [
                  {var: "data.dataType"},
                  [
                    "lnglat",
                  ],
                ],
              },
            },
          },
          {
            type: "input",
            input: true,
            label: "标题 Key",
            key: "key_marker_title",
            validate: {
              required: true
            },
          },
        ]
      },
      {
        type: "panel",
        title: "点击事件",
        collapsible: true,
        collapsed: false,
        components: [
          {
            key: "operate_type",
            data: {
              values: [
                {label: "弹窗", value: "dialog"},
                {label: "抽屉", value: "drawer"},
              ],
            },
            type: "select",
            input: true,
            defaultValue: "dialog",
            label: "操作方式",
            dataSrc: "values",
          },
          {
            label: "相关流程Key",
            key: "operate_process_key",
            input: true,
            type: "textfield",
          },
          {
            label: "锁定抽屉",
            key: "operate_lock_drawer",
            type: "checkbox",
            defaultValue: false,
          },
        ]
      },
    ]
  },
  {
    type:"panel",
    title: '中心点设置',
    weight: 0,
    collapsible: true,
    collapsed: false,
    components:[
      {
        type: "checkbox",
        label: "默认定位中心点",
        key: "defaultCenter",
        weight: 10,
        defaultValue: true,
      },
      {
        type: "input",
        label: "自定义中心点坐标",
        key: "customCenter",
        input: true,
        tooltip: "format:lng,lat",
        conditional: {
          json: { '==': [{ var: 'data.defaultCenter' }, false] }
        },
      },
    ]
  },
  {
    type: 'select',
    input: true,
    key: 'redrawOn',
    label: 'Redraw On',
    weight: 600,
    tooltip: 'Redraw this component if another component changes. This is useful if interpolating parts of the component like the label.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
    conditional: {
      json: { '!' : [{ var: 'data.dataSrc' }] },
    },
  },
];
