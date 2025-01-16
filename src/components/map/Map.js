import FieldComponent from '../_classes/field/Field';

import editForm from './Map.form';
import _ from 'lodash';

export default class Map extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'Map', key: 'map', type: 'map',
    }, ...extend);
  }

  static builderInfo = {
    title: 'Map',
    group: 'advanced',
    icon: 'map',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#map',
    schema: Map.schema()
  };

  render(children) {
    return super.render(this.renderTemplate('customMap'));
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    let self = this;
    const refs = {};

    this.loadRefs(element, refs);
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

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    let self = this;
    if (!self.element){
      return true;
    }
    var canvas = self.element.querySelector('#map-container');
    if (self.component['amap-key'] && self.component['amap-key'].length > 0 && self.component['amap-code'] && self.component['amap-code'].length > 0) {
      window._AMapSecurityConfig = {
        securityJsCode: self.component['amap-code'],
      };
      let defaultCenter = self.component['defaultCenter'];
      let dataType = self.component['dataType'] ?? 'lnglat';
      AMapLoader.load({
        key: self.component['amap-key'], //申请好的Web端开发者 Key，调用 load 时必填
        version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      })
        .then((AMap) => {
          self.map = new AMap.Map(canvas, {
            resizeEnable: true,
            mapStyle: "amap://styles/whitesmoke",
            zoom: 12.9
          });
          // 获取标记点
          if (self.component['dataSource'] === 'url'){
            if (self.component['data-source-url']) {
              let url = self.parseTpl(self.component['data-source-url'], { data: self.rootValue }, null);
              if (url.startsWith('http')) {
                url = new URL(url);
              }
              else {
                url = new URL(url, window.location.origin);
              }
              const searchParams = new URLSearchParams(url.search);
              let params = {};
              let headers = {};
              if (self.component.request && self.component.request['headers']) {
                self.component.request['headers'].forEach(header => {
                  headers[`${header.key}`] = self.parseTpl(header.value, { data: self.rootValue }, null);
                });
              }
              // 搜索
              if (self.component['dataSource'] === 'url') {
              }
              else if (self.component['dataSource'] === 'noco_db') {
                if (self.component.data['noco_db_conditions']) {
                  let where = '';
                  self.component.data['noco_db_conditions'].forEach((item, index) => {
                    if (item.value && item.value.length > 0) {
                      let conditionVal = self.parseTpl(item.value, { data: self.rootValue }, null);
                      if (index === 0 && item.logical_operator === '~not') {
                        where += `(${item.name},${item.operator},${conditionVal})`;
                      }
                      else {
                        where += `${item.logical_operator}(${item.name},${item.operator},${conditionVal})`;
                      }
                    }
                  });
                  params.where = where;
                }
              }
              Object.keys(params).forEach(key => {
                searchParams.set(key, params[`${key}`]);
              });
              try {
                let lastestReqTime = new Date().getTime();
                self.lastestReqTime = lastestReqTime;
                var xhr = new XMLHttpRequest();
                let reqMethod = self.component.request['method'];
                if (reqMethod === 'GET') {
                  xhr.open('GET', `${url.origin}${url.pathname}?${searchParams.toString()}`, true);
                  xhr.responseType = 'json';
                  Object.keys(headers).forEach(key => {
                    if (key.length > 0 && headers[`${key}`].length > 0) {
                      xhr.setRequestHeader(key, headers[`${key}`]);
                    }
                  });
                }
                else if (reqMethod === 'POST') {
                  xhr.open('POST', `${url.origin}${url.pathname}?${searchParams.toString()}`, true);
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.responseType = 'json';
                  Object.keys(headers).forEach(key => {
                    if (key.length > 0 && headers[`${key}`].length > 0) {
                      xhr.setRequestHeader(key, headers[`${key}`]);
                    }
                  });
                }

                xhr.onload = function() {
                  let status = xhr.status;

                  if (status === 200) {
                    // 确保最后更新的数据是最新一次请求的接口数据
                    if (lastestReqTime - self.lastestReqTime === 0) {
                      let dataPath = self.component.request['dataPath'];
                      let results;
                      if (dataPath && dataPath.length > 0) {
                        results = _.get(xhr.response, dataPath);
                      }
                      else {
                        results = xhr.response;
                      }
                      // 添加点
                      let markerList = results.map(marker => {
                        let lng, lat;
                        if (dataType === 'lnglat') {
                          lng = _.get(marker, self.component['key_lng']);
                          lat = _.get(marker, self.component['key_lat']);
                        }
                        else {
                          let lnglat = _.get(marker, self.component['key_lnglat']);
                          if (lnglat && lnglat.length > 0 && lnglat.split(',').length === 2) {
                            lng = lnglat.split(',')[0];
                            lat = lnglat.split(',')[1];
                          }
                        }
                        return new AMap.Marker({
                          position: new AMap.LngLat(lng, lat), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                          extData: marker,
                          content: `<div>
<img src="https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png" style="width: 25px;height: 34px"/>
<span class="marker" style="position: absolute;
      top: -20px;
      right: -30px;
      color: #fff;
      padding: 4px 10px;
      box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
      white-space: nowrap;
      font-size: 12px;background-color: #25A5F7;
      border-radius: 3px;">${_.get(marker, self.component['key_marker_title'])}</span>
</div>`,
                        });
                      });
                      markerList.forEach(markerItem => {
                        markerItem.on('click', function(e) {
                          if (self.component['operate_process_key'] && self.component['operate_process_key'].length > 0) {
                            let processKey = self.component['operate_process_key'];
                            let label = '';
                            let field = self.component.key;
                            let key = 'modify';
                            let data = [];
                            let columns = [];
                            let lockDrawer = self.component['operate_lock_drawer'];
                            let item = e.target._opts.extData;
                            Object.keys(item).forEach(key => {
                              data.push(item[`${key}`]);
                              columns.push(key);
                            });
                            let action = {
                              field,
                              key,
                              label,
                              processKey,
                              data,
                              columns,
                              lockDrawer
                            };
                            if (self.component['operate_type'] === 'dialog') {
                              window.editDataTableItemByDialog(action);
                            }
                            else {
                              window.editDataTableItemByDrawer(action);
                            }
                          }
                        });
                      });
                      self.map.add(markerList);
                      // 设置地图中心点
                      if (defaultCenter) {
                        AMap.plugin('AMap.Geolocation', function() {
                          var geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                            timeout: 10000, // 设置定位超时时间，默认：无穷大
                            offset: [10, 20],  // 定位按钮的停靠位置的偏移量
                            zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                            position: 'RB' //  定位按钮的排放位置,  RB表示右下
                          });

                          geolocation.getCurrentPosition(function(status, result) {
                            if (status == 'complete') {
                              self.map.setCenter([result.position.lng, result.position.lat]);
                            }
                          });
                        });
                      }
                      else if (self.component["customCenter"]&&self.component["customCenter"].length>0){
                        // 自定义中心点
                        let customCenter=self.parseTpl(self.component["customCenter"],{data:self.rootValue},null);
                        if (customCenter && customCenter.length > 0 && customCenter.split(',').length === 2) {
                          let lng, lat;
                          lng = customCenter.split(',')[0];
                          lat = customCenter.split(',')[1];
                          self.map.setCenter([lng, lat]);
                        }
                      }
                      else {
                        if (results && results.length > 0) {
                          let lng, lat;
                          if (dataType === 'lnglat') {
                            lng = _.get(results[0], self.component['key_lng']);
                            lat = _.get(results[0], self.component['key_lat']);
                          }
                          else {
                            let lnglat = _.get(results[0], self.component['key_lnglat']);
                            if (lnglat && lnglat.length > 0 && lnglat.split(',').length === 2) {
                              lng = lnglat.split(',')[0];
                              lat = lnglat.split(',')[1];
                            }
                          }
                          self.map.setCenter([lng, lat]);
                        }
                      }
                    }
                  }
                };
                if (reqMethod === 'GET') {
                  xhr.send();
                }
                else if (reqMethod === 'POST') {
                  let reqData = JSON.parse(this.parseTpl(JSON.stringify(self.component.request['body']) || '{}', { data: self.rootValue }, null));
                  xhr.send(JSON.stringify(reqData));
                }
              } catch (e) {
                console.log(e);
              }
            }
          }
          if (self.component['dataSource'] === 'value'){
            if (self.component['data-source-value']){
              try {
                // 添加点
                let lng, lat;
                let lnglat = self.parseTpl(self.component["data-source-value"],{data:self.rootValue},null);
                if (lnglat && lnglat.length > 0 && lnglat.split(',').length === 2) {
                  lng = lnglat.split(',')[0];
                  lat = lnglat.split(',')[1];
                }
                let lnglatTitle = self.parseTpl(self.component["data-source-value-title"],{data:self.rootValue},null);
                let markerList=[new AMap.Marker({
                  position: new AMap.LngLat(lng, lat), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                  extData: lnglat,
                  content: `<div>
<img src="https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png" style="width: 25px;height: 34px"/>
<span class="marker" style="position: absolute;
      top: -20px;
      right: -30px;
      color: #fff;
      padding: 4px 10px;
      box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
      white-space: nowrap;
      font-size: 12px;background-color: #25A5F7;
      border-radius: 3px;">${lnglatTitle}</span>
</div>`
                })];
                markerList.forEach(markerItem => {
                  markerItem.on('click', function(e) {
                    if (self.component['operate_process_key'] && self.component['operate_process_key'].length > 0) {
                      let processKey = self.component['operate_process_key'];
                      let label = '';
                      let field = self.component.key;
                      let key = 'modify';
                      let data = [];
                      let columns = [];
                      let lockDrawer = self.component['operate_lock_drawer'];
                      let item = e.target._opts.extData;
                      Object.keys(item).forEach(key => {
                        data.push(item[`${key}`]);
                        columns.push(key);
                      });
                      let action = {
                        field,
                        key,
                        label,
                        processKey,
                        data,
                        columns,
                        lockDrawer
                      };
                      if (self.component['operate_type'] === 'dialog') {
                        window.editDataTableItemByDialog(action);
                      }
                      else {
                        window.editDataTableItemByDrawer(action);
                      }
                    }
                  });
                });
                self.map.add(markerList);
                // 设置地图中心点
                if (defaultCenter) {
                  AMap.plugin('AMap.Geolocation', function() {
                    var geolocation = new AMap.Geolocation({
                      enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                      timeout: 10000, // 设置定位超时时间，默认：无穷大
                      offset: [10, 20],  // 定位按钮的停靠位置的偏移量
                      zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                      position: 'RB' //  定位按钮的排放位置,  RB表示右下
                    });

                    geolocation.getCurrentPosition(function(status, result) {
                      if (status == 'complete') {
                        self.map.setCenter([result.position.lng, result.position.lat]);
                      }
                    });
                  });
                }
                else if (self.component["customCenter"]&&self.component["customCenter"].length>0){
                  // 自定义中心点
                  let customCenter=self.parseTpl(self.component["customCenter"],{data:self.rootValue},null);
                  if (customCenter && customCenter.length > 0 && customCenter.split(',').length === 2) {
                    let lng, lat;
                    lng = customCenter.split(',')[0];
                    lat = customCenter.split(',')[1];
                    self.map.setCenter([lng, lat]);
                  }
                }
                else {
                  self.map.setCenter([lng, lat]);
                }
              } catch (e) {
                console.log(e);
              }
            }
          }
        })
        .catch((e) => {
          console.error(e); //加载错误提示
        });
    }
    return true;
  }
}

Map.editForm = editForm;
