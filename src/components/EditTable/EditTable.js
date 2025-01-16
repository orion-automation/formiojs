import EditGridComponent from '../editgrid/EditGrid';

export default class EditTable extends EditGridComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema() {
    return EditGridComponent.schema({
      label: 'Edit Table',
      'key': 'editTable',
      'type': 'editgrid',
      'modal': true,
      'displayAsTable': true,
      'templates': {
        'tableHeader': "<tr>\n    {% if (document.getElementsByClassName(\"editgrid-table-body\").length && document.getElementsByClassName(\"editgrid-table-body\")[0].clientWidth<=500) { %}\n    {% } else{ %}\n    {% util.eachComponent(components, function(component) { %}\n    {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n      <td class=\"editgrid-table-column\">{{ component.label }}</td>\n    {% } %}\n    {% }) %}\n    {% if (!instance.options.readOnly && !instance.disabled) { %}\n        <td class=\"editgrid-table-column\">Actions</td>\n    {% } %}\n    {% } %}\n  </tr>",
        'tableRow': "{% if (document.getElementsByClassName(\"editgrid-table-body\").length && document.getElementsByClassName(\"editgrid-table-body\")[0].clientWidth<=500) { %}\n{% util.eachComponent(components, function(component) { %}\n{% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n  <td class=\"editgrid-table-mobile-row\">\n  <div class=\"editgrid-table-mobile-header\">\n    {{ component.label }}\n  </div>\n  <div class=\"editgrid-table-mobile-cell\">\n    {{ getView(component, row[component.key]) }}\n  </div>\n  </td>\n{% } %}\n{% }) %}\n{% if (!instance.options.readOnly && !instance.disabled) { %}\n  <td class=\"editgrid-table-mobile-row\">\n  <div class=\"editgrid-table-mobile-header\">\n    Action\n  </div>\n  <div class=\"editgrid-table-mobile-cell\">\n    <div class=\"btn-group\">\n      <button class=\"btn btn-default btn-light btn-sm editRow\" aria-label=\"{{ t('Edit row') }}\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n      {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n      <button class=\"btn btn-danger btn-sm removeRow\" aria-label=\"{{ t('Remove row') }}\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n      {% } %}\n    </div>\n  </div>\n  </td>\n{% } %}\n{% } else{ %}\n{% util.eachComponent(components, function(component) { %}\n{% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n  <td class=\"editgrid-table-column\">\n    {{ getView(component, row[component.key]) }}\n  </td>\n{% } %}\n{% }) %}\n{% if (!instance.options.readOnly && !instance.disabled) { %}\n<td class=\"editgrid-table-column\">\n  <div class=\"btn-group\">\n    <button class=\"btn btn-default btn-light btn-sm editRow\" aria-label=\"{{ t('Edit row') }}\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n    {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n    <button class=\"btn btn-danger btn-sm removeRow\" aria-label=\"{{ t('Remove row') }}\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n    {% } %}\n  </div>\n</td>\n{% } %}\n{% } %}"
      },

    });
  }

  static get builderInfo() {
    return {
      title: 'Edit Table',
      icon: 'th',
      weight: 70,
      group: 'data',
      schema: EditTable.schema()
    };
  }

  /**
 * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
 * elements to attach functionality to.
 *
 * @param element
 * @returns {Promise}
 */
  attach(element) {
    const refs = {};
    this.loadRefs(element, refs);
    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  render(children) {
    // return super.render(this.renderTemplate('editgrid'));
    const result = super.render(children);
    return result;
  }

  // componentSchema(...extend) {
  //   return TextAreaComponent.schema({
  //   }, ...extend);
  // }

  buildRows() {
    super.buildRows();
  }

  /** @override **/
  buildRow(row, index, state = {}) {
    super.buildRow(row, index, state);
    // if (this.builderMode) {
    //   return null;
    // }

    // this.rows[index] = {};

    // const colSchemes = this.componentComponents;
    // const lastIndex = colSchemes.length - 1;
    // const columns = colSchemes.map(
    //   (col, colIndex) => {
    //     const colContainer = this.buildComponent(
    //       col,
    //       colIndex,
    //       row,
    //       index,
    //       this.getComponentState(col, state)
    //     );

    //     if (this.hasRemoveButtons() && colIndex === lastIndex) {
    //       colContainer.append(this.removeButton(index));
    //     }

    //     return colContainer;
    //   }
    // );

    // return this.ce('tr', null, columns);
  }
}

//EditTable.editForm = EditTableForm;
