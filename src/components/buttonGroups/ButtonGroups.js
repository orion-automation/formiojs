import FieldComponent from '../_classes/field/Field';
import _ from 'lodash';

export default class ButtonGroups extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: '标签切换按钮', key: 'buttonGroups', type: 'buttonGroups',
    }, ...extend);
  }

  static builderInfo = {
    title: '标签切换按钮',
    group: 'advanced',
    icon: 'folders',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#buttonGroups',
    schema: ButtonGroups.schema()
  };

  render(children) {
    return super.render(this.renderTemplate('buttonGroups'));
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {
      btnOptions: 'multi'
    };
    this.loadRefs(element, refs);
    if (this.refs.btnOptions){
      const clickEventType = this.component['click-event-type'];
      this.refs.btnOptions.forEach(btnOption=>{
        this.addEventListener(btnOption,'click',(event)=>{
          let currentKey=btnOption.getAttribute('data-value');
          // 切换tab
          switch (clickEventType) {
            case 'setTab':
              Formio.forms[this.currentForm.id].getComponent(this.component['click-event-tab-id']).setTabByKey(currentKey);
              break;
          }
          this.refs.btnOptions.forEach(item=>{
            if (item.getAttribute('data-value')===btnOption.getAttribute('data-value')) {
              item.classList.remove('btn-outline-primary');
              item.classList.add('btn-primary');
            } else {
              item.classList.remove('btn-primary');
              item.classList.add('btn-outline-primary');
            }
          });
        });
      });
    }
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    return this.component.value;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    return true;
  }
}
