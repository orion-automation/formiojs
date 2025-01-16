export default [
  {
    input: true,
    key: "width",
    type: "textfield",
    label: "Width",
    clearOnHide: false,
    weight: 0,
    defaultValue: "100%",
    validate: {
      required: true
    }
  },
  {
    input: true,
    type: "textfield",
    key: "height",
    label: "Height",
    defaultValue: "500px",
    clearOnHide: false,
    weight: 0,
    validate: {
      required: true
    }
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
  }
];
