import { GlobalFormio as Formio } from '../../Formio';
import FieldComponent from '../_classes/field/Field';

export default class Data extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.isInitData = false;
  }

  get(path, obj, fb = `$\{${path}}`) {
    return path.split('.').reduce((res, key) => {
      return res[key] || fb;
    }, obj);
  }

  parseTpl(template, map, fallback) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return this.get(path, map, fallback);
    });
  }

  static schema() {
    return FieldComponent.schema({
      type: 'department',
      header: '',
      url: '',
      height: 500,
      interval: 0
    });
  }

  static get builderInfo() {
    return {
      title: 'Department',
      group: 'basic',
      icon: 'code-branch',
      weight: 70,
      documentation: '',
      schema: Data.schema()
    };
  }

  render(children) {
    return super.render(this.renderTemplate('department'));
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
    const self = this;
    this.loadRefs(element, refs);
    if (self.component.url) {
      const { options = '{"headers":{}}', body = '{}' } = this.component;
      let parsedOptions = { ignoreCache: true };
      let parsedBody = {};
      try {
        parsedOptions = JSON.parse(this.parseTpl(options || '{"headers":{}}', { data: this.rootValue }, null));
        parsedBody = JSON.parse(this.parseTpl(body || '{}', { data: this.rootValue }, null));
      }
      catch (e) {
        console.log(e);
      }
      // 取消请求缓存
      parsedOptions.ignoreCache = true;
      Formio.request(this.component.url, this.component.methods, this.component.methods !== 'GET' ? parsedBody : null, null, parsedOptions)
        .then(response => {
          const tree = response;
          const container = element.querySelector('#myUL');
          // 添加列表
          tree.forEach(parent => {
            container.insertAdjacentHTML('beforeend', `<li id="li-${parent.id}" data-id="${parent.id}"><input type="checkbox" class="tree-input"/><span class="box">${parent.name}</span></li>`);
            self.addChild(container, parent);
          });
          var toggler = container.getElementsByClassName('box');
          var i;

          for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener('click', function() {
              if (this.parentElement.querySelector('.nested')) {
                this.parentElement.querySelector('.nested').classList.toggle('active');
              }
            });
          }
          var inputs = container.getElementsByClassName('tree-input');
          for (const input of inputs) {
            input.addEventListener('change', function(val) {
              self.updateValue();
            });
          }
          self.isInitData = true;
          setTimeout(() => {
            self.setValue(self.initValue);
          }, 300);
          return super.attach(element);
        })
        .catch(e => {
          self.isInitData = true;
          return super.attach(element);
        });
    }
    // Allow basic component functionality to attach like field logic and tooltips.
  }

  addChild(container, parent) {
    const self = this;
    if (parent.children && parent.children.length > 0) {
      const parentNode = container.querySelector(`#li-${parent.id}`);
      if (parentNode) {
        parentNode.insertAdjacentHTML('beforeend', `<ul class="nested" id="ul-${parent.id}">`);
        parent.children.forEach(child => {
          parentNode.querySelector(`#ul-${parent.id}`).insertAdjacentHTML('beforeend', `<li id="li-${child.id}" data-id="${child.id}"><input type="checkbox" class="tree-input"/><span class="box">${child.name}</span></li>`);
          self.addChild(container, child);
        });
      }
    }
  }

  getValue() {
    var value = [];
    const container = this.element.querySelector('#myUL');
    const checked = container.getElementsByClassName('tree-input');
    for (const checkedElement of checked) {
      if (checkedElement.checked) {
        value.push(checkedElement.parentElement.dataset.id);
      }
    }
    return value;
  }

  get emptyValue() {
    return [];
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    const self = this;
    if (this.isInitData) {
      const checks = self.element.getElementsByClassName('tree-input');
      for (const check of checks) {
        if (value.includes(check.parentElement.dataset.id)) {
          check.checked = true;
        }
      }
      return true;
    }
    else {
      this.initValue = JSON.parse(JSON.stringify(value));
      return true;
    }
  }
}
