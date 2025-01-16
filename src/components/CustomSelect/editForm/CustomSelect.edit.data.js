export default [
  {
    type: 'select',
    label: 'Data Source Request Methods',
    key: 'data.method',
    weight: 10,
    data: {
      values: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
      ]
    },
    defaultValue: 'GET',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'noco_db'
          ],
        ],
      },
    },
  },
  {
    type: 'textarea',
    label: 'Data Source Request Body',
    key: 'data.body',
    input: true,
    weight: 11,
    placeholder: `{
        "token": "\${data.token}"
      }`,
    tooltip: '输入请求的body(json)',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'noco_db'
          ],
        ],
      },
    },
  },
];
