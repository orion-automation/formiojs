import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

import editForm from './Flex.form';

export default class FlexComponent extends NestedComponent {
    constructor(component, options, data) {
        super(component, options, data);
        this.rows = [];
    }
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Flex',
      key: 'flex',
      type: 'flex',
      'column-height': 11,
      columns: [
        { components: [],ratio:'1'},
        { components: [],ratio:'2'}
      ],
      clearOnHide: false,
      input: false,
      tableView: false,
      persistent: false,
      autoAdjust: false
    }, ...extend);
  }
    static builderInfo = {
        title: 'Flex',
        icon: 'columns',
        group: 'layout',
        documentation: '/userguide/forms/layout-components#columns',
        weight: 11,
        schema: FlexComponent.schema()
    }

    render() {
        const child=this.columns.map(column => super.renderComponents(column));
        return super.render(this.renderTemplate('flex', {
            columnKey: this.columnKey,
            columnComponents: child
        }));
    }

    attach(element) {
        this.loadRefs(element, { [this.columnKey]: 'multiple' });
        const superAttach = super.attach(element);
        if (this.refs[this.columnKey]) {
            this.refs[this.columnKey].forEach((column, index) =>
                this.attachComponents(column, this.columns[index], this.component.columns[index].components)
            );
        }
        return superAttach;
    }

  get schema() {
    const schema = _.omit(super.schema, ['components']);
    schema.columns?.map((column, colIndex) => {
      column.components.map((comp, compIndex) => {
        const clonedComp = _.clone(comp);
        clonedComp.internal = true;
        const component = this.createComponent(clonedComp);
        delete component.component.internal;
        schema.columns[colIndex].components[compIndex] = component.schema;
      });
    });
    return schema;
  }

  get defaultSchema() {
    return FlexComponent.schema();
  }

    get isInputComponent() {
        return false;
    }

    get columnKey() {
        return `column-${this.id}`;
    }

    init() {
        super.init();
        this.columns = [];
        _.each(this.component.columns, (column, index) => {
            this.columns[index] = [];
            if (!column.size) {
                column.size = 'md';
            }
            column.currentWidth = column.width || 0;
            // Ensure there is a components array.
            if (!Array.isArray(column.components)) {
                column.components = [];
            }
            _.each(column.components, (comp) => {
                const component = this.createComponent(comp);
                component.column = index;
                this.columns[index].push(component);
            });
        });
        if (this.component.autoAdjust && this.options.display !== 'pdf') {
            this.justify();
        }
        this.rows = this.groupByRow();
    }

    labelIsHidden() {
        return true;
    }

    justifyColumn(items, index) {
        const toAdjust = _.every(items, item => !item.visible);
        const column = this.component.columns[index];
        const width = (toAdjust && items.length) ? 0 : column.width;
        const shouldRedraw = !_.isEqual(width, column.currentWidth);

        column.currentWidth = width;

        return shouldRedraw;
    }

    justify() {
        return this.columns.reduce((redraw, items, index) => this.justifyColumn(items, index) || redraw, false);
    }

    get gridSize() {
        return 12;
    }

    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */
    groupByRow() {
        const initVal = { stack: [], rows: [] };
        const width = x => x.component.width;
        const result = _.reduce(this.components, (acc, next) => {
            const stack = [...acc.stack, next];
            if (_.sumBy(stack, width) <= this.gridSize) {
                acc.stack = stack;
                return acc;
            }
 else {
                acc.rows = [...acc.rows, acc.stack];
                acc.stack = [next];
                return acc;
            }
        }, initVal);

        return _.concat(result.rows, [result.stack]);
    }

    checkData(data, flags, row, components) {
        const isValid = super.checkData(data, flags, row, components);

        if (this.component.autoAdjust && this.options.display !== 'pdf') {
            const redraw = this.justify();

            if (redraw) {
                this.redraw();
            }
        }

        return isValid;
    }

    detach(all) {
        super.detach(all);
    }

    destroy() {
        super.destroy();
        this.columns = [];
    }
}

FlexComponent.editForm = editForm;
