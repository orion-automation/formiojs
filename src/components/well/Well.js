import NestedComponent from '../_classes/nested/NestedComponent';
import _ from 'lodash';

export default class WellComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'well',
      key: 'well',
      input: false,
      persistent: false,
      components: []
    }, ...extend);
  }

  attach(element) {
    const refs = {
      wellCardContainer:'single'
    };
    this.loadRefs(element, refs);
    if (this.refs.wellCardContainer){
      if (!this.component['custom-style']||(this.component['custom-style']&&this.component['custom-style'].trim().length===0)){
        // 没有设置自定义样式
        this.refs.wellCardContainer.classList.add("bg-light");
        this.refs.wellCardContainer.classList.add("mb-3");
      }else {
        // 设置card样式
        try {
          let customStyle = JSON.parse(this.component['custom-style'] || '{}');
          _.forEach(customStyle, (value, key) => {
            this.refs.wellCardContainer.style[key] = value;
          });
        } catch (e) {
        }
      }
    }
    return super.attach(element);
  }

  static get builderInfo() {
    return {
      title: 'Well',
      icon: 'square-o',
      group: 'layout',
      documentation: '/userguide/forms/layout-components#well',
      weight: 60,
      schema: WellComponent.schema()
    };
  }

  get defaultSchema() {
    return WellComponent.schema();
  }

  get className() {
    return `${this.component.customClass}`;
  }

  get templateName() {
    return 'well';
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
  }
}
