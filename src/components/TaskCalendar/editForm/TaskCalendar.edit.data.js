export default [
  {
    type: "panel",
    title: "数据源",
    weight: 10,
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
    weight: 10,
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
      {
        type: "input",
        label: "Search Key",
        key: "search-key",
        input: true,
        conditional: {
          json: {
            in: [
              {var: "data.dataSource"},
              [
                "url",
              ],
            ],
          },
        },
      },
    ]
  },
  {
    type: "panel",
    title: "操作",
    weight: 11,
    collapsible: true,
    collapsed: true,
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
      }
    ]
  },
  {
    type: "panel",
    title: "字段映射",
    weight: 11,
    collapsible: true,
    collapsed: false,
    components:[
      {
        type: "input",
        label: "ID Key",
        key: "result_id_key",
        input: true,
        validate: {
          required: true
        }
      },
      {
        type: "input",
        label: "Title Key",
        key: "result_title_key",
        input: true,
        validate: {
          required: true
        }
      },
      {
        type: "input",
        label: "Start Key",
        key: "result_start_key",
        input: true,
        validate: {
          required: true
        }
      },
      {
        type: "input",
        label: "End Key",
        key: "result_end_key",
        input: true,
        validate: {
          required: true
        }
      },
    ]
  },
  {
    key: "multiple",
    ignore: true
  },
  {
    key: "defaultValue",
    ignore: true
  },
  {
    key: "persistent",
    ignore: true
  },
  {
    key: "protected",
    ignore: true
  },
  {
    key: "dbIndex",
    ignore: true
  },
  {
    key: "encrypted",
    ignore: true
  },
  {
    key: "clearOnHide",
    ignore: true
  },
  {
    key: "calculateValue-js",
    ignore: true
  },
  {
    key: "customDefaultValue-js",
    ignore: true
  },
  {
    key: "calculateServer",
    ignore: true
  },
  {
    key: "allowCalculateOverride",
    ignore: true
  },
];
