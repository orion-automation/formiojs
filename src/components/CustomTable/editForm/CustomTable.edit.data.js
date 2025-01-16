export default [
  {
    key: 'dataSrc',
    data: {
      values: [
        { label: 'Value', value: 'value' },
        { label: 'URL', value: 'url' },
        { label: '表单字段', value: 'field' },
      ],
    },
    weight:0,
    type: 'select',
    input: true,
    defaultValue: 'value',
    label: 'Data Src',
    dataSrc: 'values'
  },
  {
    type: 'input',
    label: 'Data Source URL',
    key: 'data.url',
    input: true,
    weight:0,
    tooltip: '',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'textarea',
    label: 'Data Source Request Headers',
    key: 'data.headers',
    input: true,
    weight:0,
    tooltip: '',
    placeholder: '{"token": "\${data.token}"}',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'textarea',
    label: 'Table Value',
    key: 'data.value',
    input: true,
    editor: 'ace',
    weight: 0,
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'value'] },
    },
  },
  {
    type: 'input',
    label: '表单字段id',
    key: 'data.field',
    input: true,
    weight: 0,
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'field'] },
    },
  }
];
