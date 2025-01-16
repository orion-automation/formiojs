import FieldComponent from '../_classes/component/Component';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class ProcessTable extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema() {
    return FieldComponent.schema({
      type: 'processTable',
      icon: '',
      color: '#ff7754',
      header: '',
      url: '',
      field: '',
      limit: 1000,
      filter: ""
    });
  }

  static get builderInfo() {
    return {
      title: 'Process Table',
      group: 'basic',
      icon: 'table',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#table',
      schema: ProcessTable.schema()
    };
  }

  render(children) {
    return super.render(this.renderTemplate('processTable'));
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

  getField = function(url, token, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('xc-token', token);

    xhr.onload = function() {
      var status = xhr.status;

      if (status === 200) {
        callback(xhr.response);
      }
      else {
        callback(xhr.response, status);
      }
    };
    xhr.send();
  };

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.component.field;
  }

  getIcon(type) {
    const mappings = {
      copy: 'copy',
      edit: 'edit',
      modify: 'edit',
      delete: 'trash',
    };
    let icon = '';
    Object.keys(mappings).forEach(key => {
      if (type.toLowerCase().indexOf(key) >= 0) {
        icon = mappings[key];
      }
    });
    return icon;
  }
  readCookie() {
    var cookies = document.cookie.split('; ');
    var cookieData = {};
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i]) {
        var parts = cookies[i].split('=');
        var name = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1]);
        cookieData[name] = value;
      }
    }
    return cookieData;
  }
  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    const container = this.element.querySelector('.processtable');
    const element = container.querySelector('.processtable .process-table');

    const ignoreFieldTypes = [
      'Attachment',
      'AutoNumber',
      'Barcode',
      'Button',
      'Count',
      'CreateTime',
      'Formula',
      'ForeignKey',
      'GeoData',
      'Geometry',
      //"ID",
      'LastModifiedTime',
      'Rollup',
      'SpecificDBType',
      'QrCode',
      'Links',
    ];
    const table = $(element);

    if (this.component.url) {
      //let table = new DataTable('#myTable');
      this.getField(this.component.url, this.component.token, response => {
        let cookie = this.readCookie();
        let filter = (this.component.filter || "").replaceAll(/\${.*}/ig, match => {
          let key = match.replaceAll(/[${} ]/ig, "");
          if (key == "userId") {
            return cookie.token || "";
          }
        });
        var api = `${this.component.url.replace(/\/$/, "").replace(/meta\//, "")
          }/records?limit=${this.component.limit || 1000}&where=${filter}`;
        this.getField(api, this.component.token, dataResponse => {

          let columns = response.columns.filter(
            (column) =>

              // !column.au &&
              // !column.ai &&
              // !column.system &&
              // column.column_name !== "created_at" &&
              ignoreFieldTypes.indexOf(column.uidt) < 0
          ).map(column => {
            return {
              title: column.title,
            };
          });


          let field = this.component.key;
          let keys = Object.keys(this.component.properties || {}).filter(key => key.indexOf("DT") == 0);
          let createKey = keys.find(key => key.toLowerCase() === "dtcreate");
          let otherKeys = keys.filter(key => key !== createKey);
          let actions = null;
          if (otherKeys.length) {
            actions = {};
            otherKeys.forEach(key => actions[key] = JSON.parse(this.component.properties[key]));
          }
          let columnDefs = [];
          if (actions) {
            columns.push({
              title: "Actions",
              sortable: false
            });
            let buttons = Object.keys(actions).map(
              key => {
                let icon = this.getIcon(key);
                return `<button type="button" data-field="${field}" data-key="${key}" data-label="${actions[key].label}"  data-process-key="${actions[key].processKey}" class="btn fw-bold">${icon ? `<i class="fa fa-${icon}" style="color: ${key.toLowerCase().indexOf("delete") >= 0 ? "#FF7754" : "#444262"}"></i>` : ""}</button>`;
              }
            );
            columnDefs.push({
              data: null,
              defaultContent: buttons.join(""),
              targets: -1
            });
          }

          let data = dataResponse.list.map(item => {
            let row = columns.map(column => {
              return item[column.title];
            });
            if (actions) {
              row.push(actions);
            }
            return row;
          });

          let tableInstance = new DataTable(table, {
            scrollX: true,
            columns,
            columnDefs,
            data,
            destroy: true,
          });

          if (createKey) {
            let setting = JSON.parse(this.component.properties[createKey]);
            let createButton = `<div class="dataTables_create"><button class="btn btn-primary" style="font-size: 14px;--bs-btn-bg:#FF7754;--bs-btn-border-color:#FF7754;--bs-btn-hover-bg:#FF7754;--bs-btn-hover-border-color:#FF7754;--bs-btn-active-bg:#FF7754;--bs-btn-active-border-color:#FF7754;--bs-btn-disabled-bg:#FF7754;--bs-btn-disabled-border-color:#FF7754;" data-field="${field}" data-key="${createKey}" data-label="${setting.label}"  data-process-key="${setting.processKey}">${setting.label}</button></div>`;
            $(container).find(".dataTables_filter").after(createButton);
            //table.closest(".processtable").find(".dataTables_filter").prepend(createButton);
          }
        });
      });
    }
    return true;
  }
}
