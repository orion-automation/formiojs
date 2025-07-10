import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';

export default class LocationInputTextField extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  parseTpl(template, map) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return _.get(map,path)??'--';
    });
  }

  attach(element) {
    const self = this;
    this.loadRefs(element, {
      buttonLocationInput: 'single',
    });
    this.addEventListener(this.refs.buttonLocationInput, 'click', () => {
      if (self.component['source-form']&&self.component['source-form'].length>0){
        // 30215716ed6a8631e1fb0183990a050f
        window._AMapSecurityConfig = {
          securityJsCode: self.component["amap-code"],
        };
        // bf743ba0e995351d6afa2d70408fe91c
        AMapLoader.load({
          key: self.component["amap-key"], //申请好的Web端开发者 Key，调用 load 时必填
          version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        })
          .then((AMap) => {
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
              });

              let address = self.parseTpl(self.component['source-form'], { data: self.rootValue });

              geocoder.getLocation(address, function (status, result) {
                if (status === "complete" && result.info === "OK") {
                  // result中对应详细地理坐标信息
                  self.setValue(`${result.geocodes[0].location.lng},${result.geocodes[0].location.lat}`);
                }
              });
            });
          })
          .catch((e) => {
            console.error(e); //加载错误提示
          });
      }
    });
    if (self.component['source-form']&&self.component['source-form'].length>0&&self.component['amap-key']&&self.component['amap-key'].length>0&&self.component['amap-code']&&self.component['amap-code'].length>0){
      // 30215716ed6a8631e1fb0183990a050f
      window._AMapSecurityConfig = {
        securityJsCode: self.component["amap-code"],
      };
      // bf743ba0e995351d6afa2d70408fe91c
      AMapLoader.load({
        key: self.component["amap-key"], //申请好的Web端开发者 Key，调用 load 时必填
        version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      })
        .then((AMap) => {
          AMap.plugin("AMap.Geocoder", function () {
            var geocoder = new AMap.Geocoder({
            });

            let address = self.parseTpl(self.component['source-form'], { data: self.rootValue });

            geocoder.getLocation(address, function (status, result) {
              if (status === "complete" && result.info === "OK") {
                // result中对应详细地理坐标信息
                self.setValue(`${result.geocodes[0].location.lng},${result.geocodes[0].location.lat}`);
              }
            });
          });
        })
        .catch((e) => {
          console.error(e); //加载错误提示
        });
    }
    return super.attach(element);
  }

  init() {
    super.init();
  }

  static schema() {
    return TextFieldComponent.schema({
      label: '地址解析',
      'key': 'locationInputTextField',
      'type': 'locationInputTextField',
      locationInput: true,
      disabled: true,
    });
  }

  static get builderInfo() {
    return {
      title: '地址解析',
      icon: 'location-dot',
      weight: 0,
      group: 'basic',
      schema: LocationInputTextField.schema()
    };
  }
}

