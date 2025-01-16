export default [
    {
        type: 'input',
        label: 'Data Source Url',
        key: 'url',
        input: true,
        tooltip: '',
        weight: 2,
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
    },
    {
        type: 'textarea',
        key: 'options',
        label: 'Value Request options',
        tooltip: 'Pass your custom xhr options(optional)',
        rows: 5,
        editor: 'ace',
        input: true,
        weight: 4,
        placeholder: `{\n  "ignoreCache": true,\n  "headers": {"Authorization": "\${data.token}"\n}`,
    },
    {
        type: 'textarea',
        label: 'Value Request body',
        key: 'body',
        input: true,
        editor: 'ace',
        weight: 4,
        placeholder: `{\n  "token": "\${data.token}"\n}`,
        tooltip: '输入请求的body(json)',
    },
    {
        key: 'labelPosition',
        ignore: true
    },
    {
        key: 'customClass',
        ignore: true
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
