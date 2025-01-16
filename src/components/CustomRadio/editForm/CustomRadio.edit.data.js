export default [
    {
        type: 'select',
        label: 'Default Value Src',
        key: 'defaultValueSrc',
        weight: 0,
        data: {
            values: [
                { label: 'URL', value: 'url' },
                { label: 'Value', value: 'value' },
            ]
        },
        defaultValue: 'value',
    },
    {
        type: 'input',
        label: 'Default Value Request URL',
        key: 'defaultValueUrl',
        input: true,
        weight: 0,
        placeholder: 'https://...',
        tooltip: '输入请求的url',
        conditional: {
            json: { '===': [{ var: 'data.defaultValueSrc' }, 'url'] },
        },
    },
    {
        type: 'select',
        label: 'Default Value Request Methods',
        key: 'defaultValueMethod',
        weight: 0,
        data: {
            values: [
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
            ]
        },
        defaultValue: 'GET',
        conditional: {
            json: { '===': [{ var: 'data.defaultValueSrc' }, 'url'] },
        },
    },
    {
        type: 'textarea',
        key: 'defaultValueOptions',
        label: 'Default Value Request options',
        tooltip: 'Pass your custom xhr options(optional)',
        rows: 5,
        editor: 'ace',
        input: true,
        weight: 0,
        placeholder: `{
        "ignoreCache": true,
        "headers": {"Authorization": "\${data.token"}
      }`,
        conditional: {
            json: { '===': [{ var: 'data.defaultValueSrc' }, 'url'] },
        },
    },
    {
        type: 'textarea',
        label: 'Default Value Request Body',
        key: 'defaultValueBody',
        input: true,
        weight: 0,
        tooltip: '输入请求的body(json)',
        conditional: {
            json: { '===': [{ var: 'data.defaultValueSrc' }, 'url'] },
        },
    },
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
            json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
    },
    {
        type: 'textarea',
        label: 'Data Source Request Body',
        key: 'data.body',
        input: true,
        weight: 11,
        tooltip: '输入请求的body(json)',
        conditional: {
            json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
    },
];
