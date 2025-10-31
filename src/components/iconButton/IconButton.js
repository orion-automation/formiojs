import FieldComponent from '../_classes/field/Field';
import _ from 'lodash';

export default class IconButton extends FieldComponent {

  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'IconButton', key: 'iconButton', type: 'iconButton',
    }, ...extend);
  }

  static builderInfo = {
    title: 'IconButton',
    group: 'advanced',
    icon: 'icons',
    weight: 70,
    schema: IconButton.schema()
  };

  render(children) {
    return super.render(this.renderTemplate('iconButton'));
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
      titleContainer:"single",
      iconButtonContainer: "single"
    };
    this.loadRefs(element, refs);
    const dataContainer = this.refs.iconButtonContainer;
    if (dataContainer) {
      const clickEventType = this.component['click-event-type'];
      if (clickEventType) {
        this.addEventListener(dataContainer, 'click', (event) => {
          // 点击事件
          let params;
          switch (clickEventType) {
            case 'newPage':
              try {
                params=JSON.parse(this.parseTpl(this.component['page_params'],{data:this.rootValue,row: this.data}))
              }catch (e) {
                console.log(`json转换失败:${e}`);
              }
              window.openNewPage(this.component['click-event-form-id'],params);
              break;
            case 'bottomSheet':
              try {
                params=JSON.parse(this.parseTpl(this.component['page_params'],{data:this.rootValue,row: this.data}))
              }catch (e) {
                console.log(`json转换失败:${e}`);
              }
              window.openBottomSheet(this.component['click-event-form-id'],params);
              break;
            case 'newIntent':
              const elink = document.createElement('a');
              elink.style.display = 'none';
              elink.target = "_blank";
              elink.href = this.parseTpl(this.component['click-event-url'],{data:this.rootValue,row: this.data});
              document.body.appendChild(elink);
              elink.click();
              break;
            case 'openUrl':
              if (window.openNewUrlByQmx){
                window.openNewUrlByQmx(this.parseTpl(this.component['click-event-url'],{data:this.rootValue,row: this.data}))
              } else {
                window.open(this.parseTpl(this.component['click-event-url'],{data:this.rootValue,row: this.data}))
              }
              break;
          }
        });
      }
    }
    setTimeout(() => {
      this.setValue();
    }, 100);
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
      let strTmp = _.get(map, path)??'--';
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
    try {
      let customContainerStyle=JSON.parse(this.component["container-custom-style"]||"{}");
      _.forEach(customContainerStyle,(value,key)=>{
        this.refs.iconButtonContainer.style[key]=value;
      })
    }catch (e) {
    }
    try {
      let customStyle=JSON.parse(this.component["title-custom-style"]||"{}");
      _.forEach(customStyle,(value,key)=>{
        this.refs.titleContainer.style[key]=value;
      })
    }catch (e) {
    }
    if (this.refs.titleContainer){
      this.refs.titleContainer.innerText=this.parseTpl(this.component['title'],{data:this.rootValue,row: this.data});
    }
    return true;
  }
}
