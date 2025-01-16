import Button from '../button/Button';
import $ from 'jquery';

export default class ActionButton extends Button {
  constructor(component, options, data) {
    super(component, options, data);
  }

  init() {
    super.init();

  }

  setValue(value) {
    let result = super.setValue(value);
    let component = this.component;
    let setting = {
      action: component.action,
      url: component.url,
      page: component.page
    };

    const id = $(this.element).attr("id");
    //  setTimeout(() => {
    let element = $(`#${id}`);
    //let element = $(this.element);
    element.attr("setting", JSON.stringify(setting));
    element.data("setting", "setting");
    element.attr("test", "test");
    //}, 1000);
    return result;
  }

  static schema() {
    return Button.schema({
      label: 'Action Button',
      key: 'actionButton',
      type: 'actionButton',
    });
  }

  static get builderInfo() {
    return {
      title: 'Action Button',
      icon: 'stop',
      weight: 110,
      group: 'basic',
      schema: ActionButton.schema()
    };


  }
}

