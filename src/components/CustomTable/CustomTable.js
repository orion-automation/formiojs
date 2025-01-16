import editForm from './CustomTable.form';
import FieldComponent from '../_classes/component/Component';
import _ from 'lodash';

export default class CustomTableComponent extends FieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.data = {};
  }

  static schema(...extend) {
    return FieldComponent.schema({
      label: 'CustomTable',
      key: 'customTable',
      type: 'customTable',
      clearOnHide: false,
      input: false,
      data: {
        url: '',
        headers: '{}',
      },
      persistent: false,
      autoAdjust: false
    }, ...extend);
  }

  static builderInfo = {
    title: 'CustomTable',
    icon: 'table',
    group: 'basic',
    documentation: '/userguide/forms/layout-components#columns',
    weight: 11,
    schema: CustomTableComponent.schema()
  };

  render() {
    return super.render(this.renderTemplate('emptyTable'));
  }

  get(path, obj, fb = `$\{${path}}`) {
    return path.split('.').reduce((res, key) => {
      return res[key] || fb;
    }, obj);
  }

  parseTpl(template, map, fallback) {
    if (template && template.length > 0) {
      try {
        return template.replace(/\$\{.+?}/g, (match) => {
          const path = match.substr(2, match.length - 3).trim();
          return this.get(path, map, fallback);
        });
      } catch (e) {
        console.log(e);
      }
    }
    return '{}';
  }

  attach(element) {
    const refs = {
      placeTable: 'single',
      tableEmpty: 'single',
      tableTitle: 'single',
      tableDesc1: 'single',
      tableDesc2: 'single'
    };
    this.loadRefs(element, refs);
    setTimeout(() => {
      this.setValue('');
    }, 100);
    return super.attach(element);
  }

  getField = function(url, callback, headers) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[`${key}`]);
      });
    }
    xhr.onload = function() {
      const status = xhr.status;
      let result = xhr.response;
      if (status === 200) {
        callback(result);
      }
      else {
        callback({}, status);
      }
    };
    xhr.send();
  };

  setTableByData = function(data) {
    let table = this.refs.tableEmpty;
    if (!data || !data.submitId || !table) {
      return;
    }
    this.refs.placeTable.style.display="none";
    if (data.tableTitle) {
      this.refs.tableTitle.innerText = data.tableTitle;
    }
    if (data.tableSubTitle) {
      this.refs.tableDesc1.innerText = data.tableSubTitle;
    }
    if (data.tableSubTitleTranslate) {
      this.refs.tableDesc2.innerText = data.tableSubTitleTranslate;
    }
    let maxTermRateLength = 0;
    let minShowLines = 4;
    if (data.curveList) {
      data.curveList.forEach(curve => {
        if (curve.termRate.length > maxTermRateLength) {
          maxTermRateLength = curve.termRate.length;
        }
        if (curve.termRate.length > minShowLines) {
          curve.showLines = curve.termRate.length;
          if (curve.showLines % 2 != 0) {
            curve.showLines = curve.showLines + 1;
          }
        }
        else {
          curve.showLines = minShowLines;
        }
      });
    }
    data.maxTermRateLength = maxTermRateLength;
    // 渲染表格
    // 移除所有子元素
    while (table.childNodes.length !== 0) {
      try {
        table.removeChild(table.childNodes[0]);
      } catch (e) {
      }
    }
    // pc/mobile
    if (window.innerWidth > 500) {
      // 编号
      let row1 = document.createElement('tr');
      let row1Content = document.createElement('td');
      row1Content.innerHTML = `编号:${data.submitId}`;
      row1Content.style.textAlign = 'end';
      row1Content.colSpan = `${data.maxTermRateLength + 9}`;
      row1.appendChild(row1Content);
      table.appendChild(row1);
      // 基础信息
      let row2 = document.createElement('tr');
      let row2Content = document.createElement('th');
      row2Content.innerHTML = `基础信息`;
      row2Content.colSpan = `${data.maxTermRateLength + 9}`;
      row2.appendChild(row2Content);
      table.appendChild(row2);
      // 3行
      let row3 = document.createElement('tr');
      // 申请人
      let titleSubmitUser = document.createElement('th');
      titleSubmitUser.innerHTML = `申请人`;
      titleSubmitUser.colSpan = '3';
      row3.appendChild(titleSubmitUser);
      let contentSubmitUser = document.createElement('td');
      contentSubmitUser.innerHTML = `${data.submitUser}`;
      contentSubmitUser.style.textAlign = 'start';
      contentSubmitUser.colSpan = `${(data.maxTermRateLength + 9 - 6) % 2 == 0 ? (data.maxTermRateLength + 9 - 6) / 2 : (data.maxTermRateLength + 9 - 6) / 2 + 1}`;
      row3.appendChild(contentSubmitUser);
      // 申请团队
      let titleSubmitUserTeam = document.createElement('th');
      titleSubmitUserTeam.innerHTML = `申请所属团队`;
      titleSubmitUserTeam.colSpan = '3';
      row3.appendChild(titleSubmitUserTeam);
      let contentSubmitUserTeam = document.createElement('td');
      contentSubmitUserTeam.innerHTML = `${data.submitUserTeam}`;
      contentSubmitUserTeam.style.textAlign = 'start';
      contentSubmitUserTeam.colSpan = `${(data.maxTermRateLength + 9 - 6) % 2 == 0 ? (data.maxTermRateLength + 9 - 6) / 2 : (data.maxTermRateLength + 9 - 6) / 2 + 1}`;
      row3.appendChild(contentSubmitUserTeam);
      table.appendChild(row3);
      // row4
      let row4 = document.createElement('tr');
      // 电话
      let titlePhoneNumber = document.createElement('th');
      titlePhoneNumber.innerHTML = `电话`;
      titlePhoneNumber.colSpan = '3';
      row4.appendChild(titlePhoneNumber);
      let contentPhoneNumber = document.createElement('td');
      contentPhoneNumber.innerHTML = `${data.phoneNumber}`;
      contentPhoneNumber.style.textAlign = 'start';
      contentPhoneNumber.colSpan = `${(data.maxTermRateLength + 9 - 6) % 2 == 0 ? (data.maxTermRateLength + 9 - 6) / 2 : (data.maxTermRateLength + 9 - 6) / 2 + 1}`;
      row4.appendChild(contentPhoneNumber);
      // 邮件
      let titleEmailAddress = document.createElement('th');
      titleEmailAddress.innerHTML = `邮件`;
      titleEmailAddress.colSpan = '3';
      row4.appendChild(titleEmailAddress);
      let contentEmailAddress = document.createElement('td');
      contentEmailAddress.innerHTML = `${data.emailAddress}`;
      contentEmailAddress.style.textAlign = 'start';
      contentEmailAddress.colSpan = `${(data.maxTermRateLength + 9 - 6) % 2 == 0 ? (data.maxTermRateLength + 9 - 6) / 2 : (data.maxTermRateLength + 9 - 6) / 2 + 1}`;
      row4.appendChild(contentEmailAddress);
      table.appendChild(row4);
      // row5
      // 曲线所属实体
      let row5 = document.createElement('tr');
      let titleCurveSource = document.createElement('th');
      titleCurveSource.innerHTML = `曲线所属实体`;
      titleCurveSource.colSpan = '3';
      row5.appendChild(titleCurveSource);
      let contentCurveSource = document.createElement('td');
      contentCurveSource.innerHTML = `${data.curveSource}`;
      contentCurveSource.style.textAlign = 'start';
      contentCurveSource.colSpan = `${data.maxTermRateLength + 9 - 3}`;
      row5.appendChild(contentCurveSource);
      table.appendChild(row5);
      // row6
      let row6 = document.createElement('tr');
      let titleRow6 = document.createElement('th');
      titleRow6.innerHTML = `待发布曲线信息`;
      titleRow6.colSpan = `${data.maxTermRateLength + 9}`;
      row6.appendChild(titleRow6);
      table.appendChild(row6);
      // row7
      let row7 = document.createElement('tr');
      // 序号
      let titleItemId = document.createElement('th');
      titleItemId.innerHTML = `序号`;
      titleItemId.colSpan = '1';
      row7.appendChild(titleItemId);
      // 曲线名称
      let titleItemName = document.createElement('th');
      titleItemName.innerHTML = `曲线名称`;
      titleItemName.colSpan = '2';
      row7.appendChild(titleItemName);
      // 曲线类型
      let titleItemType = document.createElement('th');
      titleItemType.innerHTML = `曲线类型`;
      titleItemType.colSpan = '2';
      row7.appendChild(titleItemType);
      // 币种
      let titleItemCurrency = document.createElement('th');
      titleItemCurrency.innerHTML = `币种`;
      titleItemCurrency.colSpan = '1';
      row7.appendChild(titleItemCurrency);
      // 期限价格
      let titleItemRange = document.createElement('th');
      titleItemRange.innerHTML = `期限价格`;
      titleItemRange.colSpan = `${data.maxTermRateLength}`;
      row7.appendChild(titleItemRange);
      // 生效起始日
      let titleItemStart = document.createElement('th');
      titleItemStart.innerHTML = `生效起始日`;
      titleItemStart.colSpan = '2';
      row7.appendChild(titleItemStart);
      // 生效终止日
      let titleItemEnd = document.createElement('th');
      titleItemEnd.innerHTML = `生效终止日`;
      titleItemEnd.colSpan = '2';
      row7.appendChild(titleItemEnd);
      table.appendChild(row7);
      // 曲线列表
      data.curveList.forEach((curve, index) => {
        let rowItem = document.createElement('tr');
        let tdId = document.createElement('td');
        tdId.rowSpan = 2;
        tdId.colSpan = 1;
        tdId.innerHTML = `${curve.id}`;
        rowItem.appendChild(tdId);
        let tdName = document.createElement('td');
        tdName.rowSpan = 2;
        tdName.colSpan = 2;
        tdName.innerHTML = `${curve.cvName}`;
        rowItem.appendChild(tdName);
        let tdType = document.createElement('td');
        tdType.rowSpan = 2;
        tdType.colSpan = 2;
        tdType.innerHTML = `${curve.cvType}`;
        rowItem.appendChild(tdType);
        let tdCurrency = document.createElement('td');
        tdCurrency.rowSpan = 2;
        tdCurrency.colSpan = 1;
        tdCurrency.innerHTML = `${curve.currency}`;
        rowItem.appendChild(tdCurrency);
        // 期限价格
        for (var i = 0; i < data.maxTermRateLength; i++) {
          let tdRangeItem = document.createElement('td');
          tdRangeItem.colSpan = 1;
          tdRangeItem.innerHTML = `${curve.termRate[i] ? curve.termRate[i].term : ''}`;
          rowItem.appendChild(tdRangeItem);
        }
        let tdsDate = document.createElement('td');
        tdsDate.rowSpan = 2;
        tdsDate.colSpan = 2;
        tdsDate.innerHTML = `${curve.sDate}`;
        rowItem.appendChild(tdsDate);
        let tdeDate = document.createElement('td');
        tdeDate.rowSpan = 2;
        tdeDate.colSpan = 2;
        tdeDate.innerHTML = `${curve.eDate}`;
        rowItem.appendChild(tdeDate);
        table.appendChild(rowItem);
        let rowItemValue = document.createElement('tr');
        for (var i = 0; i < data.maxTermRateLength; i++) {
          let tdRangeItem = document.createElement('td');
          tdRangeItem.colSpan = 1;
          tdRangeItem.innerHTML = `${curve.termRate[i] ? curve.termRate[i].rate : ''}`;
          rowItemValue.appendChild(tdRangeItem);
        }
        table.appendChild(rowItemValue);
      });
      // 备注
      let rowRemark = document.createElement('tr');
      let titleRemark = document.createElement('th');
      titleRemark.innerHTML = `备注`;
      titleRemark.colSpan = 3;
      rowRemark.appendChild(titleRemark);
      let contentRemark = document.createElement('td');
      contentRemark.innerHTML = `${data.remark}`;
      contentRemark.colSpan = `${data.maxTermRateLength + 9 - 3}`;
      contentRemark.style.padding = '40px 20px';
      contentRemark.style.textAlign = 'start';
      rowRemark.appendChild(contentRemark);
      table.appendChild(rowRemark);
    }
    else {
      // 编号
      let row1 = document.createElement('tr');
      let row1Content = document.createElement('td');
      row1Content.innerHTML = `编号:${data.submitId}`;
      row1Content.style.textAlign = 'end';
      row1Content.colSpan = 12;
      row1.appendChild(row1Content);
      table.appendChild(row1);
      // 基础信息
      let row2 = document.createElement('tr');
      let row2Content = document.createElement('th');
      row2Content.innerHTML = `基础信息`;
      row2Content.colSpan = 12;
      row2.appendChild(row2Content);
      table.appendChild(row2);
      // 3行
      let row3 = document.createElement('tr');
      // 申请人
      let titleSubmitUser = document.createElement('th');
      titleSubmitUser.innerHTML = `申请人`;
      titleSubmitUser.colSpan = 3;
      row3.appendChild(titleSubmitUser);
      let contentSubmitUser = document.createElement('td');
      contentSubmitUser.innerHTML = `${data.submitUser}`;
      contentSubmitUser.colSpan = 3;
      row3.appendChild(contentSubmitUser);
      // 申请团队
      let titleSubmitUserTeam = document.createElement('th');
      titleSubmitUserTeam.innerHTML = `所属团队`;
      titleSubmitUserTeam.colSpan = 3;
      row3.appendChild(titleSubmitUserTeam);
      let contentSubmitUserTeam = document.createElement('td');
      contentSubmitUserTeam.innerHTML = `${data.submitUserTeam}`;
      contentSubmitUserTeam.colSpan = 3;
      row3.appendChild(contentSubmitUserTeam);
      table.appendChild(row3);
      // row4
      let row4 = document.createElement('tr');
      // 电话
      let titlePhoneNumber = document.createElement('th');
      titlePhoneNumber.innerHTML = `电话`;
      titlePhoneNumber.colSpan = 3;
      row4.appendChild(titlePhoneNumber);
      let contentPhoneNumber = document.createElement('td');
      contentPhoneNumber.innerHTML = `${data.phoneNumber}`;
      contentPhoneNumber.colSpan = 3;
      row4.appendChild(contentPhoneNumber);
      // 所属系统
      let titleEmailAddress = document.createElement('th');
      titleEmailAddress.innerHTML = `所属系统`;
      titleEmailAddress.colSpan = 3;
      row4.appendChild(titleEmailAddress);
      let contentEmailAddress = document.createElement('td');
      contentEmailAddress.innerHTML = `${data.emailAddress}`;
      contentEmailAddress.colSpan = 3;
      row4.appendChild(contentEmailAddress);
      table.appendChild(row4);
      // 邮件
      let rowEmail = document.createElement('tr');
      let titleEmail = document.createElement('th');
      titleEmail.innerHTML = `邮件`;
      titleEmail.colSpan = 3;
      rowEmail.appendChild(titleEmail);
      let contentEmail = document.createElement('td');
      contentEmail.innerHTML = `${data.emailAddress}`;
      contentEmail.colSpan = 9;
      rowEmail.appendChild(contentEmail);
      table.appendChild(rowEmail);
      // row5
      // 曲线所属实体
      let row5 = document.createElement('tr');
      let titleCurveSource = document.createElement('th');
      titleCurveSource.innerHTML = `曲线所属实体`;
      titleCurveSource.colSpan = 3;
      row5.appendChild(titleCurveSource);
      let contentCurveSource = document.createElement('td');
      contentCurveSource.innerHTML = `${data.curveSource}`;
      contentCurveSource.colSpan = 9;
      row5.appendChild(contentCurveSource);
      table.appendChild(row5);
      // row6
      let row6 = document.createElement('tr');
      let titleRow6 = document.createElement('th');
      titleRow6.innerHTML = `待发布曲线信息`;
      titleRow6.colSpan = 12;
      row6.appendChild(titleRow6);
      table.appendChild(row6);
      // 待发布曲线信息
      let rowListTitle = document.createElement('tr');
      let thListTitleName = document.createElement('th');
      thListTitleName.colSpan = 4;
      thListTitleName.innerHTML = '曲线名称';
      rowListTitle.appendChild(thListTitleName);
      let thListTitleType = document.createElement('th');
      thListTitleType.colSpan = 2;
      thListTitleType.innerHTML = '曲线类型';
      rowListTitle.appendChild(thListTitleType);
      let thListTitleDate = document.createElement('th');
      thListTitleDate.colSpan = 3;
      thListTitleDate.innerHTML = '起止日期';
      rowListTitle.appendChild(thListTitleDate);
      let thListTitleRange = document.createElement('th');
      thListTitleRange.colSpan = 3;
      thListTitleRange.innerHTML = '期限价格';
      rowListTitle.appendChild(thListTitleRange);
      table.appendChild(rowListTitle);
      data.curveList.forEach((curve, index) => {
        let trItemLine = document.createElement('tr');
        let tdItemName = document.createElement('td');
        tdItemName.rowSpan = curve.showLines;
        tdItemName.colSpan = 4;
        tdItemName.innerHTML = `${curve.cvName}`;
        trItemLine.appendChild(tdItemName);
        let tdItemType = document.createElement('td');
        tdItemType.rowSpan = curve.showLines;
        tdItemType.colSpan = 2;
        tdItemType.innerHTML = `${curve.cvType}`;
        trItemLine.appendChild(tdItemType);
        let tdItemsDateTitle = document.createElement('td');
        tdItemsDateTitle.rowSpan = curve.showLines / 2;
        tdItemsDateTitle.colSpan = 1;
        tdItemsDateTitle.innerHTML = `<p style="width: 20px;margin: 0;
  display: inline-block;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;">起始日</p>`;
        trItemLine.appendChild(tdItemsDateTitle);
        let tdItemsDateValue = document.createElement('td');
        tdItemsDateValue.rowSpan = curve.showLines / 2;
        tdItemsDateValue.colSpan = 2;
        tdItemsDateValue.innerHTML = `${curve.sDate}`;
        trItemLine.appendChild(tdItemsDateValue);
        let tdItemTerm = document.createElement('td');
        tdItemTerm.rowSpan = 1;
        tdItemTerm.colSpan = 1;
        tdItemTerm.innerHTML = `${curve.termRate.length > 0 ? curve.termRate[0].term : 'NA'}`;
        if (curve.termRate.length === 0) {
          tdItemTerm.classList.add('td-empty');
        }
        trItemLine.appendChild(tdItemTerm);
        let tdItemRate = document.createElement('td');
        tdItemRate.rowSpan = 1;
        tdItemRate.colSpan = 1;
        tdItemRate.innerHTML = `${curve.termRate.length > 0 ? curve.termRate[0].rate : 'NA'}`;
        if (curve.termRate.length === 0) {
          tdItemRate.classList.add('td-empty');
        }
        trItemLine.appendChild(tdItemRate);
        table.appendChild(trItemLine);
        for (var i = 1; i < curve.showLines; i++) {
          let trItemValue = document.createElement('tr');
          if (i == curve.showLines / 2) {
            let tdItemeDateTitle = document.createElement('td');
            tdItemeDateTitle.rowSpan = curve.showLines / 2;
            tdItemeDateTitle.colSpan = 1;
            tdItemeDateTitle.innerHTML = `<p style="width: 20px;margin: 0;
  display: inline-block;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;">终止日</p>`;
            trItemValue.appendChild(tdItemeDateTitle);
            let tdItemeDateValue = document.createElement('td');
            tdItemeDateValue.rowSpan = curve.showLines / 2;
            tdItemeDateValue.colSpan = 2;
            tdItemeDateValue.innerHTML = `${curve.eDate}`;
            trItemValue.appendChild(tdItemeDateValue);
          }
          let tdItemTerm = document.createElement('td');
          tdItemTerm.rowSpan = 1;
          tdItemTerm.colSpan = 1;
          tdItemTerm.innerHTML = `${curve.termRate[i] ? curve.termRate[i].term : 'NA'}`;
          if (!curve.termRate[i]) {
            tdItemTerm.classList.add('td-empty');
          }
          trItemValue.appendChild(tdItemTerm);
          let tdItemRate = document.createElement('td');
          tdItemRate.rowSpan = 1;
          tdItemRate.colSpan = 2;
          tdItemRate.innerHTML = `${curve.termRate[i] ? curve.termRate[i].rate : 'NA'}`;
          if (!curve.termRate[i]) {
            tdItemRate.classList.add('td-empty');
          }
          trItemValue.appendChild(tdItemRate);
          table.appendChild(trItemValue);
        }
      });
      // 备注
      let rowRemark = document.createElement('tr');
      let titleRemark = document.createElement('th');
      titleRemark.innerHTML = `备注`;
      titleRemark.colSpan = 3;
      rowRemark.appendChild(titleRemark);
      let contentRemark = document.createElement('td');
      contentRemark.innerHTML = `${data.remark}`;
      contentRemark.colSpan = 9;
      contentRemark.style.padding = '40px 20px';
      contentRemark.style.textAlign = 'start';
      rowRemark.appendChild(contentRemark);
      table.appendChild(rowRemark);
    }
  };

  setValue() {
    let self = this;
    self.refs.placeTable.style.display="flex";
    if (this.component.dataSrc === 'value') {
      if (this.component.data.value) {
        try {
          // json
          self.setTableByData(JSON.parse(self.component.data.value));
        } catch (e) {
          try {
            let valKey = /\$\{(.+?)}/g.exec(self.component.data.value)[1];
            self.setTableByData(_.get({ data: self.rootValue }, valKey));
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
    else if (this.component.dataSrc === 'field') {
      this.setTableByData(_.get(this.rootValue, this.component.data.field));
    }
    else if (this.component.dataSrc === 'url') {
      let headers = {};
      try {
        headers = this.parseTpl(this.component.data.headers, { data: this.rootValue }, null);
        if (typeof headers === 'string') {
          headers = JSON.parse(headers);
        }
      } catch (e) {
        headers = {};
        console.log(e);
      }
      if (!this.component.data.url) {
        return true;
      }
      let url=JSON.parse(this.parseTpl(JSON.stringify({url:this.component.data.url}), {data: self.rootValue}, null)).url;
      this.getField(url, function(data) {
        self.setTableByData(data);
      }, headers);
    }
    return true;
  }
}

CustomTableComponent.editForm = editForm;
