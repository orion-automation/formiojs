export default [
  {
    type: 'input',
    label: 'Title',
    key: 'header',
    input: true,
    tooltip: '',
    weight: 1,
  },
  {
    type: 'input',
    label: 'URL',
    key: 'url',
    input: true,
    tooltip: '',
    weight: 2,
  },
  {
    type: 'input',
    label: 'Height',
    key: 'height',
    input: true,
    tooltip: '',
    weight: 3,
  },
  {
    type: 'input',
    label: 'Interval',
    key: 'interval',
    input: true,
    tooltip: '',
    weight: 4,
  },
  {
    type: 'select',
    input: true,
    key: 'redrawOn',
    label: 'Redraw On',
    weight: 5,
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
