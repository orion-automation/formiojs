export default [
  {
    key: "multiple",
    weight: 0,
    tooltip: "组件值是否是数组",
  },
  {
    type: "panel",
    title: "数据源",
    weight: 0,
    collapsible: true,
    collapsed: true,
    components: [
      {
        key: "dataSource",
        data: {
          values: [
            {label: "URL", value: "url"},
            {label: "nocoDB", value: "noco_db"},
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
        defaultValue: [{key: "", value: ""}],
        components: [
          {
            label: "Key",
            key: "key",
            input: true,
            type: "textfield",
            validate: {
              required: true
            }
          },
          {
            label: "Value",
            key: "value",
            input: true,
            type: "textfield",
            validate: {
              required: true
            }
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
        label: "Table Data Path",
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
    title: "搜索设置",
    weight: 0,
    collapsible: true,
    collapsed: true,
    components: [
      {
        type: "datagrid",
        input: true,
        label: "nocoDb conditions",
        key: "data.noco_db_conditions",
        weight: 11,
        components: [
          {
            label: "Logical Operator",
            key: "logical_operator",
            input: true,
            type: "select",
            data: {
              values: [
                {label: "~or", value: "~or"},
                {label: "~and", value: "~and"},
                {label: "~not", value: "~not"}
              ],
            },
          },
          {
            label: "Name",
            key: "name",
            input: true,
            type: "textfield",
          },
          {
            label: "Operator",
            key: "operator",
            input: true,
            type: "select",
            data: {
              values: [
                {label: "equal", value: "eq"},
                {label: "not equal", value: "neq"},
                {label: "not equal (alias of neq)", value: "not"},
                {label: "greater than", value: "gt"},
                {label: "greater or equal", value: "ge"},
                {label: "less than", value: "lt"},
                {label: "less or equal", value: "le"},
                {label: "is", value: "is"},
                {label: "is not", value: "isnot"},
                {label: "in", value: "in"},
                {label: "between", value: "btw"},
                {label: "not between", value: "nbtw"},
                {label: "like", value: "like"},
                {label: "is Within (Available in Date and DateTime only)", value: "isWithin"},
                {label: "includes all of", value: "allof"},
                {label: "includes any of", value: "anyof"},
                {
                  label: "does not include all of (includes none or some, but not all of)",
                  value: "nallof"
                },
                {label: "does not include any of (includes none of)", value: "nanyof"}
              ],
            },
          },
          {
            label: "Value",
            key: "value",
            input: true,
            type: "textfield",
            tooltip: "nocoDb 查询参数值，有值时取当前输入值，否则取表格搜索框的输入值",
          },
        ],
        conditional: {
          json: {
            in: [
              {var: "data.dataSource"},
              [
                "noco_db",
              ],
            ],
          },
        },
      },
    ],
    conditional: {
      json: {
        in: [
          {var: "data.dataSource"},
          [
            "noco_db",
          ],
        ],
      },
    },
  },
  {
    key: "defaultValue",
    ignore: true,
  },
  {
    key: "persistent",
    ignore: true,
  },
  {
    key: "protected",
    ignore: true,
  },
  {
    key: "dbIndex",
    ignore: true,
  },
  {
    key: "encrypted",
    ignore: true,
  },
  {
    key: "customDefaultValue",
    ignore: true,
  },
  {
    key: "calculateValue",
    ignore: true,
  },
  {
    key: "calculateServer",
    ignore: true,
  },
  {
    key: "allowCalculateOverride",
    ignore: true,
  },
];
