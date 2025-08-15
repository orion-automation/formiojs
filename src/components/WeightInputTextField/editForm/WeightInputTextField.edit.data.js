export default [
    {
        type: 'select',
        input: true,
        weight: 0,
        defaultValue: 'value',
        label: 'Default Value Src',
        dataSrc: 'values',
        key: 'defaultValueSrc',
        data: {
            values: [
                { label: 'Value', value: 'value' },
                { label: 'URL', value: 'url' },
            ],
        },
    },
    {
        type: 'input',
        label: 'Default Value Request URL',
        key: 'url',
        input: true,
        weight: 4,
        placeholder: 'https://...',
        tooltip: '输入请求的url',
        conditional: {
            json: { '===': [{ var: 'data.defaultValueSrc' }, 'url'] },
        },
    },
    {
        type: 'select',
        label: 'Default Value Request methods',
        key: 'methods',
        input: true,
        tooltip: 'rest api 方法',
        data: {
            values: [
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
            ]
        },
        weight: 4,
        defaultValue: 'GET',
        conditional: {
            json: { '===': [{ var: 'data.defaultValueSrc' }, 'url'] },
        },
    },
    {
        type: 'textarea',
        key: 'options',
        label: 'Default Value Request options',
        tooltip: 'Pass your custom xhr options(optional)',
        rows: 5,
        editor: 'ace',
        input: true,
        weight: 4,
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
        label: 'Default Value Request body',
        key: 'body',
        input: true,
        weight: 4,
        placeholder: `{
        "token": "\${data.token}"
      }`,
        tooltip: '输入请求的body(json)',
        conditional: {
            json: { '===': [{ var: 'data.methods' }, 'POST'] },
        },
    },
];
