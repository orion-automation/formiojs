import Component from '../_classes/component/Component';
import _ from 'lodash';

export default class HTMLComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'HTML',
      type: 'htmlelement',
      tag: 'p',
      attrs: [],
      content: '',
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'HTML Element',
      group: 'layout',
      icon: 'code',
      weight: 0,
      documentation: '/userguide/forms/layout-components#html-element',
      schema: HTMLComponent.schema()
    };
  }

  get defaultSchema() {
    return HTMLComponent.schema();
  }

  get content() {
    if (this.builderMode) {
      return this.component.content;
    }

    // i18n returns error exactly with word 'select', spaces will be trimmed
    if (this.component.content.replace(/(<(\/?[^>]+)>)/g, '').trim() === 'select') {
      return ` ${this.component.content} `;
    }

    const submission = _.get(this.root, 'submission', {});
    const content = this.component.content ? this.interpolate(this.component.content, {
      metadata: submission.metadata || {},
      submission: submission,
      data: this.rootValue,
      row: this.data
    }) : '';
    return this.sanitize(content, this.shouldSanitizeValue);
  }

  get singleTags() {
    return ['br', 'img', 'hr'];
  }

  checkRefreshOn(changed) {
    super.checkRefreshOn(changed);
    if (!this.builderMode && this.component.refreshOnChange && this.element &&
      !_.isUndefined(changed) && ((_.isBoolean(changed) && changed) || !_.isEmpty(changed)) &&
      this.conditionallyVisible(this.data, this.row)) {
      this.setContent(this.element, this.renderContent());
    }
  }

  renderContent() {
    const submission = _.get(this.root, 'submission', {});
    return this.renderTemplate('html', {
      component: this.component,
      tag: this.component.tag,
      attrs: (this.component.attrs || []).map((attr) => {
        return {
          attr: attr.attr,
          value: this.interpolate(attr.value, {
            metadata: submission.metadata || {},
            submission: submission,
            data: this.rootValue,
            row: this.data
          })
        };
      }),
      content: this.content,
      singleTags: this.singleTags,
    });
  }

  parseTpl(template, map) {
    if (template && template.length > 0) {
      try {
        return template.replace(/\$\{.+?}/g, (match) => {
          const path = match.substr(2, match.length - 3).trim();
          return _.get(map, path) ?? '--';
        });
      }
 catch (e) {
        console.log(e);
      }
    }
    return '{}';
  }

  render() {
    return super.render(this.renderContent());
  }

  attach(element) {
    const self=this;
    this.loadRefs(element, { html: 'single' });
    const dataContainer = this.refs.html;
    if (dataContainer) {
      const clickEventType = this.component['click-event-type'];
      if (clickEventType) {
        this.addEventListener(dataContainer, 'click', (event) => {
          // 点击事件
          let params;
          switch (clickEventType) {
            case 'newPage':
              try {
                params = JSON.parse(this.parseTpl(this.component['page_params'], { data: this.rootValue,row: this.data }));
              }
 catch (e) {
                console.log(`json转换失败:${e}`);
              }
              window.openNewPage(this.component['click-event-form-id'], params);
              break;
            case 'bottomSheet':
              try {
                params = JSON.parse(this.parseTpl(this.component['page_params'], { data: this.rootValue,row: this.data }));
              }
 catch (e) {
                console.log(`json转换失败:${e}`);
              }
              window.openBottomSheet(this.component['click-event-form-id'], params);
              break;
            case 'setTab':
              // 切换tab
              Formio.forms[this.currentForm.id].getComponent(this.component['click-event-tab-id']).setTabByKey(this.component['click-event-tab-key']);
              break;
            case 'openUrl':
              if (window.openNewUrlByQmx) {
                window.openNewUrlByQmx(this.parseTpl(this.component['click-event-url'],{ data:this.rootValue,row: this.data }));
              }
 else {
                window.open(this.parseTpl(this.component['click-event-url'],{ data:this.rootValue,row: this.data }));
              }
              break;
          }
        });
      }
    }
    return super.attach(element);
  }
}
