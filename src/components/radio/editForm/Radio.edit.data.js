import BuilderUtils from '../../../utils/builder';
import _ from 'lodash';

export default [
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Refresh Options On',
    weight: 19,
    tooltip: 'Refresh data when another field changes.',
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
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values',
            'custom',
            'noco_db',
          ],
        ],
      },
    },
  },
  {
    key: 'multiple',
    ignore: true,
  },
  {
    key: 'dataSrc',
    data: {
      values: [
        { label: 'Values', value: 'values' },
        { label: 'URL', value: 'url' },
      ],
    },
    'validate': {
      'required': true
    },
    onChange(context) {
      if (context && context.flags && context.flags && context.flags.modified) {
        context.data.values = [{ label: '', value: '' }];
      }
    },
  },
  {
    type: 'textfield',
    input: true,
    label: 'Data Path',
    key: 'selectValues',
    weight: 12,
    description: 'The object path to the iterable items.',
    tooltip: 'The property within the source data, where iterable items reside. For example: results.items or results[0].items',
    conditional: {
      json: { in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'noco_db',
          ],
        ], },
    },
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Values',
    key: 'values',
    tooltip: 'The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form.',
    weight: 10,
    reorder: true,
    defaultValue: [{ label: '', value: '' }],
    components: [
      {
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield',
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        allowCalculateOverride: true,
        calculateValue: 'value = _.camelCase(row.label);',
        validate: {
          required: true
        }
      },
      {
        type: 'select',
        input: true,
        weight: 180,
        label: 'Shortcut',
        key: 'shortcut',
        tooltip: 'The shortcut key for this option.',
        dataSrc: 'custom',
        valueProperty: 'value',
        customDefaultValue: () => '',
        template: '{{ item.label }}',
        data: {
          custom(context) {
            return BuilderUtils.getAvailableShortcuts(
              _.get(context, 'instance.options.editForm', {}),
              _.get(context, 'instance.options.editComponent', {})
            );
          },
        },
      },
    ],
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'values'] },
    },
  },
  {
    type: 'select',
    input: true,
    label: 'Storage Type',
    key: 'dataType',
    clearOnHide: true,
    tooltip: 'The type to store the data. If you select something other than autotype, it will force it to that type.',
    weight: 12,
    template: '<span>{{ item.label }}</span>',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Autotype', value: 'auto' },
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Object', value: 'object' },
      ],
    },
  },
  {
    key: 'template',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  }
];
