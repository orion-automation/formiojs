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
    let element = $(`#${id}`);
    element.attr("setting", JSON.stringify(setting));
    element.data("setting", "setting");
    return result;
  }

  static schema() {
    return Button.schema({
      label: '动作按钮',
      key: 'actionButton',
      type: 'actionButton',
    });
  }

  static get builderInfo() {
    return {
      title: '动作按钮',
      icon: 'stop',
      weight: 110,
      group: 'basic',
      schema: ActionButton.schema()
    };


  }
}

