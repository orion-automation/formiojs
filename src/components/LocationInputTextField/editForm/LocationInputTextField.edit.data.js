export default [{
  type: 'panel', title: '高德地图JS API', weight: 0, collapsible: true, collapsed: false, components: [{
    type: 'input', label: 'key', key: 'amap-key', input: true, validate: {
      required: true
    }
  }, {
    type: 'input', label: 'securityJsCode', key: 'amap-code', input: true, validate: {
      required: true
    }
  },]
}, {
  type: 'input', label: '数据源', weight: 0, key: 'source-form', tooltip: '${data.*}', validate: {
    required: true
  }
}];
