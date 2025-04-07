import FieldComponent from '../_classes/field/Field';
import editForm from './Progress.form';
import _ from 'lodash';

export default class Progress extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'Progress', key: 'progress', type: 'progress',
    }, ...extend);
  }

  static builderInfo = {
    title: 'Progress',
    group: 'advanced',
    icon: 'bars-progress',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#progress',
    schema: Progress.schema()
  };

  render(children) {
    return super.render(this.renderTemplate('progress'));
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
      titleContainer: 'single',
      progressContainer: 'single'
    };

    this.loadRefs(element, refs);
    setTimeout(() => {
      this.setValue();
    }, 100);
    // Allow basic component functionality to attach like field logic and tooltips.
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

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      let strTmp = _.get(map, path);
      if (strTmp === undefined) {
        strTmp = null;
      }
      else {
        if (_.isArray(strTmp) || _.isObject(strTmp)) {
          strTmp = JSON.stringify(strTmp);
        }
      }
      return strTmp;
    });
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    if (this.refs.titleContainer){
      this.refs.titleContainer.innerHTML = ``;
    }
    if (this.refs.progressContainer){
      this.refs.progressContainer.innerHTML = ``;
    }
    let optionsStr = this.component['option-value'];
    try {
      optionsStr = this.parseTpl(optionsStr, { data: this.rootValue });
      optionsStr = JSON.parse(optionsStr);
      let sum = _.sumBy(optionsStr, 'value');
      if (this.component['max-value'] && this.component['max-value'].trim().length > 0) {
        sum = _.toNumber(this.parseTpl(this.component['max-value'], { data: this.rootValue }));
      }
      optionsStr.forEach(item => {
        let percent = _.floor(_.divide(item.value, sum) * 100, 1);
        if (this.refs.titleContainer){
          this.refs.titleContainer.insertAdjacentHTML('beforeend',
            `<div class="progress-title-container" style="display: flex;flex-direction: row;align-items: center;font-size: ${this.component['font-size']}">
            <div class="progress-title-item-indicator" style="width: 5px;height: 5px;background-color: ${item.color};margin-right: 10px"></div>
            <div class="progress-title-item-title" style="color: ${item.color}">${item.title}</div>
            <div class="progress-title-item-value" style="font-weight: bold;margin-left: 5px;margin-right: 5px;color: black">${item.value}</div>
            <div class="progress-title-item-unit" style="color: grey">${item.unit}</div>
            <div class="progress-title-item-percent" style="margin-left: 10px;color: grey">${percent}%</div>
        </div>`
          );
        }
        if (this.refs.progressContainer){
          this.refs.progressContainer.insertAdjacentHTML('beforeend',
            `<div class="progress-bar" role="progressbar" style="width: ${percent}%;background-color: ${item.color}" aria-valuenow="${item.value}" aria-valuemin="0" aria-valuemax="${sum}"></div>`
          );
        }
      });
    } catch (e) {
      console.log('json转换失败', e);
    }
    return true;
  }
}

Progress.editForm = editForm;
