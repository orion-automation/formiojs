import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class CustomTabsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'CustomTabs',
      type: 'customTabs',
      input: false,
      key: 'custom_tabs',
      persistent: false,
      tableView: false,
      components: [
        {
          label: 'Tab 1',
          key: 'tab1',
          components: [],
        },
      ],
      verticalLayout: false,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'CustomTabs',
      group: 'layout',
      icon: 'folder-o',
      weight: 50,
      documentation: '/userguide/forms/layout-components#custom-tabs',
      schema: CustomTabsComponent.schema(),
    };
  }

  get defaultSchema() {
    return CustomTabsComponent.schema();
  }

  get schema() {
    const schema = super.schema;
    // We need to clone this because the builder uses the "components" reference and this would reset that reference.
    const components = _.cloneDeep(this.component.components);
    schema.components = components.map((tab, index) => {
      tab.components = this.tabs[index].map((component) => component.schema);
      return tab;
    });

    return schema;
  }

  get tabKey() {
    return `tab-${this.key}`;
  }

  get tabLikey() {
    return `tabLi-${this.key}`;
  }

  get tabLinkKey() {
    return `tabLink-${this.key}`;
  }

  constructor(...args) {
    super(...args);
    this.currentTab = 0;
    this.noField = true;
  }

  init() {
    this.components = [];
    this.tabs = [];
    _.each(this.component.components, (tab, index) => {
      this.tabs[index] = [];
      // Initialize empty tabs.
      tab.components = tab.components || [];
      _.each(tab.components, (comp) => {
        const component = this.createComponent(comp);
        component.tab = index;
        this.tabs[index].push(component);
      });
    });
  }

  render() {
    return super.render(this.renderTemplate(
      'customTab',
      {
        tabKey: this.tabKey,
        tabLikey: this.tabLikey,
        tabLinkKey: this.tabLinkKey,
        currentTab: this.currentTab,
        tabComponents: this.tabs.map(tab => this.renderComponents(tab)),
      },
      (
        this.options.flatten || this.options.pdf ? 'flat' : null
      ),
    ));
  }

  attach(element) {
    this.loadRefs(
      element,
      {
        [this.tabLinkKey]: 'multiple',
        [this.tabKey]: 'multiple',
        [this.tabLikey]: 'multiple',
        'tabLine':'single',
      },
    );
    ['change', 'error'].forEach(event => this.on(event, this.handleTabsValidation.bind(this)));
    const superAttach = super.attach(element);
    this.refs[this.tabLinkKey].forEach((tabLink, index) => {
      this.addEventListener(tabLink, 'click', (event) => {
        event.preventDefault();
        this.setTab(index);
      });
      this.addEventListener(tabLink, 'mouseover', (event) => {
        tabLink.style.color=this.component["headerHoverColor"];
      });
      this.addEventListener(tabLink, 'mouseout', (event) => {
        if (index===this.currentTab){
          tabLink.style.color=this.component["headerColor"];
        }else {
          tabLink.style.color=this.component["headerNormalColor"];
        }
      });
    });
    this.refs[this.tabKey].forEach((tab, index) => {
      this.attachComponents(tab, this.tabs[index], this.component.components[index].components);
    });
    this.setTabLine();
    return superAttach;
  }

  detach(all) {
    super.detach(all);
  }

  /**
   * 通过childKey来设置tab选中
   * @param childKey
   */
  setTabByKey(childKey){
    _.each(this.component.components, (tab, index) => {
      if (tab.key===childKey){
        this.setTab(index);
      }
    });
  }

  setTabLine(){
    _.each(this.refs[this.tabLinkKey], (tabLink, tabIndex) => {
      // 设置下划线位置 //设置颜色
      if (tabIndex===this.currentTab){
        this.refs.tabLine.style.width = `${tabLink.offsetWidth}px`;
        // 10是容器的padding
        this.refs.tabLine.style.transform = `translateX(${tabLink.offsetLeft-15}px)`
        tabLink.style.color=this.component["headerColor"];
      } else {
        tabLink.style.color=this.component["headerNormalColor"];
      }
    });
  }

  /**
   * Set the current tab.
   *
   * @param index
   */
  setTab(index) {
    if (!this.tabs || !this.tabs[index] || !this.refs[this.tabKey] || !this.refs[this.tabKey][index]) {
      return;
    }

    this.currentTab = index;

    _.each(this.refs[this.tabKey], (tab) => {
      this.removeClass(tab, 'formio-tab-panel-active');
      tab.style.display = 'none';
    });
    this.addClass(this.refs[this.tabKey][index], 'formio-tab-panel-active');
    this.refs[this.tabKey][index].style.display = 'block';

    _.each(this.refs[this.tabLinkKey], (tabLink, tabIndex) => {
      if (this.refs[this.tabLinkKey][tabIndex]) {
        this.removeClass(tabLink, 'formio-tab-link-active');
      }
      if (this.refs[this.tabLikey][tabIndex]) {
        this.removeClass(this.refs[this.tabLikey][tabIndex], 'formio-tab-link-container-active');
      }
    });
    if (this.refs[this.tabLikey][index]) {
      this.addClass(this.refs[this.tabLikey][index], 'formio-tab-link-container-active');
    }
    if (this.refs[this.tabLinkKey][index]) {
      this.addClass(this.refs[this.tabLinkKey][index], 'formio-tab-link-active');
    }
    this.setTabLine();
    this.triggerChange();
  }

  beforeFocus(component) {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }
    const tabIndex = this.tabs.findIndex((tab) => {
      return tab.some((comp) => comp === component);
    });
    if (tabIndex !== -1 && this.currentTab !== tabIndex) {
      this.setTab(tabIndex);
    }
  }

  setErrorClasses(elements, dirty, hasErrors, hasMessages, element = this.element) {
    if (this.component.modalEdit) {
      super.setErrorClasses(elements, dirty, hasErrors, hasMessages, element);
    }

    elements.forEach((element) => {
      this.addClass(element, 'is-invalid');

      if (element.getAttribute('ref') !== 'openModal') {
        if (this.options.highlightErrors) {
          this.addClass(element, 'tab-error');
        }
        else {
          this.addClass(element, 'has-error');
        }
      }
    });
  }

  clearErrorClasses(elements) {
    if (this.options.server || !this.rendered) {
      return;
    }

    if (this.component.modalEdit) {
      const element = Array.isArray(elements) || elements instanceof NodeList ? this.element : elements;
      super.clearErrorClasses(element);
    }

    elements = Array.isArray(elements) || elements instanceof NodeList ? elements : [elements];

    elements.forEach((element) => {
      this.removeClass(element, 'is-invalid');
      this.removeClass(element, 'tab-error');
      this.removeClass(element, 'has-error');
    });
  }

  handleTabsValidation() {
    if (!this.refs[this.tabLinkKey] || !this.refs[this.tabLinkKey].length || !this.tabs.length) {
      return;
    }
    // 切换tab时，刷新taskCalendar组件，修复taskCalendar在tab中高度错乱的问题
    if (this.tabs[this.currentTab] && this.tabs[this.currentTab].length > 0 && this.tabs[this.currentTab][0].type === 'taskCalendar') {
      this.tabs[this.currentTab][0].refresh(new Date().getTime());
    }

    this.clearErrorClasses(this.refs[this.tabLinkKey]);

    const invalidTabsIndexes = this.tabs.reduce((invalidTabs, tab, tabIndex) => {
      const hasComponentWithError = tab.some(comp => !!comp.error);
      return hasComponentWithError ? [...invalidTabs, tabIndex] : invalidTabs;
    }, []);

    if (!invalidTabsIndexes.length) {
      return;
    }

    const invalidTabs = [...this.refs[this.tabLinkKey]].filter((_, tabIndex) => invalidTabsIndexes.includes(tabIndex));
    this.setErrorClasses(invalidTabs);
  }
}
