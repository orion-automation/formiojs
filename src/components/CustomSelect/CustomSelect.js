import _ from 'lodash';
import SelectComponent from '../select/Select';
import { GlobalFormio as Formio } from '../../Formio';

export default class CustomSelect extends SelectComponent {
  constructor(component, options, data) {
    super(component, options, data);
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

  loadItems(url, search, headers, options, method, body) {
    options = options || {};

    // See if we should load items or not.
    if (!this.shouldLoad || (!this.itemsFromUrl && this.options.readOnly)) {
      this.isScrollLoading = false;
      this.loading = false;
      this.itemsLoadedResolve();
      return;
    }

    // See if they have not met the minimum search requirements.
    const minSearch = parseInt(this.component.minSearch, 10);
    if (
      this.component.searchField &&
      (minSearch > 0) &&
      (!search || (search.length < minSearch))
    ) {
      // Set empty items.
      return this.setItems([], null);
    }

    // Ensure we have a method and remove any body if method is get
    method = method || 'GET';
    if (method.toUpperCase() === 'GET') {
      body = null;
    }

    const limit = this.component.limit || 100;
    const skip = this.isScrollLoading ? this.selectOptions.length : 0;
    const query = this.component.disableLimit ? {} : {
      limit,
      skip,
    };

    // Allow for url interpolation.
    url = this.interpolate(url, {
      formioBase: Formio.getBaseUrl(),
      search,
      limit,
      skip,
      page: Math.abs(Math.floor(skip / limit))
    });

    // Add search capability.
    if (this.component.searchField && search) {
      if (Array.isArray(search)) {
        query[`${this.component.searchField}`] = search.join(',');
      }
      else {
        query[`${this.component.searchField}`] = search;
      }
    }

    // If they wish to return only some fields.
    if (this.component.selectFields) {
      // @ts-ignore
      query.select = this.component.selectFields;
    }

    // Add sort capability
    if (this.component.sort) {
      // @ts-ignore
      query.sort = this.component.sort;
    }

    if (!_.isEmpty(query)) {
      // Add the query string.
      url += (!url.includes('?') ? '?' : '&') + Formio.serialize(query, (item) => this.interpolate(item));
    }

    // Add filter capability
    if (this.component.filter) {
      url += (!url.includes('?') ? '?' : '&') + this.interpolate(this.component.filter);
    }

    // Set ignoreCache if it is
    options.ignoreCache = this.component.ignoreCache;

    let parsedOptions = { header: null };
    let parsedBody = {};
    try {
      parsedOptions = JSON.parse(this.parseTpl(JSON.stringify(options), { data: this.rootValue }, null));
      parsedBody = JSON.parse(this.parseTpl(JSON.stringify(body), { data: this.rootValue }, null));
    }
      // eslint-disable-next-line no-empty
    catch (e) {
    }
    // Make the request.
    const self = this;
    headers.forEach(function(value, name) {
      headers.set(name, self.parseTpl(value, { data: self.rootValue }, null));
    });
    parsedOptions.header = headers;
    this.loading = true;
    try {
      url = JSON.parse(this.parseTpl(JSON.stringify({
        url: url
      }), {
        data: this.rootValue
      }, null)).url;
    } catch (e) {

    }
    Formio.makeRequest(this.options.formio, 'select', url, method, parsedBody, parsedOptions)
      .then((response) => {
        this.loading = false;
        this.error = null;
        this.setItems(response, !!search);
      })
      .catch((err) => {
        console.log(err);
        if (this.itemsFromUrl) {
          console.log('err');
          this.setItems([], null);
          this.disableInfiniteScroll();
        }

        this.isScrollLoading = false;
        this.handleLoadingError(err);
      });
  }

  static schema() {
    return SelectComponent.schema({
      label: 'Custom Select',
      'key': 'customSelect',
      'type': 'customSelect',
    });
  }

  normalizeSingleValue(value, retainObject) {
    if (_.isNil(value)) {
      return;
    }
    const valueIsObject = _.isObject(value);
    //check if value equals to default emptyValue
    if (valueIsObject && Object.keys(value).length === 0) {
      return value;
    }
    // Check to see if we need to save off the template data into our metadata.
    if (value && !valueIsObject && (this.templateData && this.templateData[value]) && this.root?.submission) {
      const submission = this.root.submission;
      if (!submission.metadata) {
        submission.metadata = {};
      }
      if (!submission.metadata.selectData) {
        submission.metadata.selectData = {};
      }
      const selectedTemplateData = _.pickBy(this.templateData, (value, key) => {
        const dataValues = _.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
        return _.includes(dataValues, key);
      });
      _.set(submission.metadata.selectData, this.path, _.cloneDeep(selectedTemplateData));
    }

    const displayEntireObject = this.isEntireObjectDisplay();
    const dataType = this.component.dataType || 'auto';
    const normalize = {
      value,

      number() {
        const numberValue = Number(this.value);
        const isEquivalent = value.toString() === numberValue.toString();

        if (!Number.isNaN(numberValue) && Number.isFinite(numberValue) && value !== '' && isEquivalent) {
          this.value = numberValue;
        }

        return this;
      },

      boolean() {
        if (
          _.isString(this.value)
          && (this.value.toLowerCase() === 'true'
            || this.value.toLowerCase() === 'false')
        ) {
          this.value = (this.value.toLowerCase() === 'true');
        }

        return this;
      },

      string() {
        this.value = String(this.value);
        return this;
      },

      stringarray() {
        this.value = String(this.value);
        return this;
      },

      object() {
        if (_.isObject(this.value) && displayEntireObject && !retainObject) {
          this.value = JSON.stringify(this.value);
        }

        return this;
      },

      auto() {
        if (_.isObject(this.value)) {
          this.value = this.object().value;
        }
        else {
          this.value = this.string().number().boolean().value;
        }

        return this;
      }
    };

    try {
      return normalize[dataType]().value;
    } catch (err) {
      console.warn('Failed to normalize value', err);
      return value;
    }
  }

  itemTemplate(data, value) {
    if (!_.isNumber(data) && _.isEmpty(data)) {
      return '';
    }

    // If they wish to show the value in read only mode, then just return the itemValue here.
    if (this.options.readOnly && this.component.readOnlyValue) {
      return this.itemValue(data);
    }
    // Perform a fast interpretation if we should not use the template.
    if (data && !this.component.template) {
      const itemLabel = data.label || data;
      const value = (typeof itemLabel === 'string') ? this.t(itemLabel, { _userInput: true }) : itemLabel;
      return this.sanitize(value, this.shouldSanitizeValue);
    }
    if (this.component.multiple ? Array.isArray(this.dataValue) && this.dataValue.find((val) => value === val) : (this.dataValue === value)) {
      const selectData = this.selectData;
      if (selectData) {
        const templateValue = this.component.reference && value?._id ? value._id.toString() : value;
        if (!this.templateData || !this.templateData[templateValue]) {
          this.getOptionTemplate(data, value);
        }
        if (this.component.multiple) {
          if (selectData[templateValue]) {
            data = selectData[templateValue];
          }
        }
        else {
          data = selectData;
        }
      }
    }

    if (typeof data === 'string' || typeof data === 'number') {
      return this.sanitize(this.t(data, { _userInput: true }), this.shouldSanitizeValue);
    }

    if (data.data) {
      // checking additional fields in the template for the selected Entire Object option
      const hasNestedFields = /item\.data\.\w*/g.test(this.component.template);
      data.data = this.isEntireObjectDisplay() && _.isObject(data.data) && !hasNestedFields
        ? JSON.stringify(data.data)
        : data.data;
    }
    return super.itemTemplate(data, value);
  }

  normalizeValue(value) {
    if (this.component.multiple && Array.isArray(value)) {
      const dataType = this.component.dataType || 'auto';
      if (dataType === 'stringarray') {
        return value.map((singleValue) => this.normalizeSingleValue(singleValue, true)).join(',');
      }
      else {
        return value.map((singleValue) => this.normalizeSingleValue(singleValue, true));
      }
    }

    return super.normalizeValue(this.normalizeSingleValue(value, true));
  }

  getValue() {
    // If the widget isn't active.
    if (
      this.viewOnly || this.loading
      || (!this.component.lazyLoad && !this.selectOptions.length)
      || !this.element
    ) {
      return this.dataValue;
    }

    let value = this.emptyValue;
    if (this.choices) {
      value = this.choices.getValue(true);

      // Make sure we don't get the placeholder
      if (
        !this.component.multiple &&
        this.component.placeholder &&
        (value === this.t(this.component.placeholder, { _userInput: true }))
      ) {
        value = this.emptyValue;
      }
    }
    else if (this.refs.selectContainer) {
      value = this.refs.selectContainer.value;

      if (this.valueProperty === '') {
        if (value === '') {
          return {};
        }

        const option = this.selectOptions[value];
        if (option && _.isObject(option.value)) {
          value = option.value;
        }
      }
    }
    else {
      value = this.dataValue;
    }
    // Choices will return undefined if nothing is selected. We really want '' to be empty.
    if (value === undefined || value === null) {
      value = '';
    }
    return value;
  }

  setValue(value, flags = { fromSubmission: false, noUpdateEvent: false }) {
    const previousValue = this.dataValue;
    if (this.component.widget === 'html5' && (_.isEqual(value, previousValue) || _.isEqual(previousValue, {}) && _.isEqual(flags, {}))) {
      return false;
    }
    const dataType = this.component.dataType || 'auto';
    if (dataType === 'stringarray' && value.length > 0) {
      if (value.includes(',')) {
        value = value.split(',');
      }
      else {
        value = [value];
      }
    }
    const changed = this.updateValue(value, flags);
    value = this.dataValue;
    if (dataType === 'stringarray' && value.length > 0) {
      if (value.includes(',')) {
        value = value.split(',');
      }
      else {
        value = [value];
      }
    }
    const hasPreviousValue = !this.isEmpty(previousValue);
    const hasValue = !this.isEmpty(value);

    // Undo typing when searching to set the value.
    if (this.component.multiple && Array.isArray(value)) {
      value = value.map(value => {
        if (typeof value === 'boolean' || typeof value === 'number') {
          return value.toString();
        }
        return value;
      });
    }
    else {
      if (typeof value === 'boolean' || typeof value === 'number') {
        value = value.toString();
      }
    }

    if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
      this.itemsLoaded.then(() => {
        this.redraw();
      });

      return changed;
    }

    // Do not set the value if we are loading... that will happen after it is done.
    if (this.loading) {
      return changed;
    }

    // Determine if we need to perform an initial lazyLoad api call if searchField is provided.
    if (this.isInitApiCallNeeded(hasValue)) {
      this.loading = true;
      this.lazyLoadInit = true;
      const searchProperty = this.component.searchField || this.component.valueProperty;
      this.triggerUpdate(_.get(value.data || value, searchProperty, value), true);
      return changed;
    }

    // Add the value options.
    this.itemsLoaded.then(() => {
      this.addValueOptions();
      this.setChoicesValue(value, hasPreviousValue, flags);
    });

    return changed;
  }

  // eslint-disable-next-line max-statements
  setItems(items, fromSearch) {
    // If the items is a string, then parse as JSON.
    if (typeof items == 'string') {
      try {
        items = JSON.parse(items);
      } catch (err) {
        console.warn(err.message);
        items = [];
      }
    }

    // Allow js processing (needed for form builder)
    if (this.component.onSetItems && typeof this.component.onSetItems === 'function') {
      const newItems = this.component.onSetItems(this, items);
      if (newItems) {
        items = newItems;
      }
    }

    if (!this.choices && this.refs.selectContainer) {
      this.empty(this.refs.selectContainer);
    }

    // If they provided select values, then we need to get them instead.
    if (this.component.selectValues) {
      items = _.get(items, this.component.selectValues, items) || [];
    }

    let areItemsEqual;

    if (this.itemsFromUrl) {
      areItemsEqual = this.isSelectURL ? _.isEqual(items, this.downloadedResources) : false;

      const areItemsEnded = this.component.limit > items.length;
      const areItemsDownloaded = areItemsEqual
        && this.downloadedResources
        && this.downloadedResources.length === items.length;

      if (areItemsEnded) {
        this.disableInfiniteScroll();
      }
      else if (areItemsDownloaded) {
        this.selectOptions = [];
      }
      else {
        this.serverCount = items.serverCount;
      }
    }

    if (this.isScrollLoading && items) {
      if (!areItemsEqual) {
        this.downloadedResources = this.downloadedResources
          ? this.downloadedResources.concat(items)
          : items;
      }

      this.downloadedResources.serverCount = items.serverCount || this.downloadedResources.serverCount;
    }
    else {
      this.downloadedResources = items || [];
      this.selectOptions = [];
      // If there is new select option with same id as already selected, set the new one
      if (!_.isEmpty(this.dataValue) && this.component.idPath) {
        const selectedOptionId = _.get(this.dataValue, this.component.idPath, null);
        const newOptionWithSameId = !_.isNil(selectedOptionId) && items.find(item => {
          const itemId = _.get(item, this.component.idPath);

          return itemId === selectedOptionId;
        });

        if (newOptionWithSameId) {
          this.setValue(newOptionWithSameId);
        }
      }
    }

    // Add the value options.
    if (!fromSearch) {
      this.addValueOptions(items);
    }

    if (this.component.widget === 'html5' && !this.component.placeholder) {
      this.addOption(null, '');
    }

    // Iterate through each of the items.
    _.each(items, (item, index) => {
      // preventing references of the components inside the form to the parent form when building forms
      if (this.root && this.root.options.editForm && this.root.options.editForm._id && this.root.options.editForm._id === item._id) return;
      const itemValueAndLabel = this.selectValueAndLabel(item);
      this.addOption(itemValueAndLabel.value, itemValueAndLabel.label, {}, _.get(item, this.component.idPath, String(index)));
    });

    if (this.choices) {
      this.choices.setChoices(this.selectOptions.filter(option => {
        if (_.isObject(option)) {
          return true;
        } else {
          try {
            return !option.value.includes(',');
          } catch (e) {
            return true;
          }
        }
      }), 'value', 'label', true);
    }
    else if (this.loading) {
      // Re-attach select input.
      // this.appendTo(this.refs.input[0], this.selectContainer);
    }

    // We are no longer loading.
    this.isScrollLoading = false;
    this.loading = false;

    const searching = fromSearch && this.choices?.input?.isFocussed;

    if (!searching) {
      // If a value is provided, then select it.
      if (!this.isEmpty()) {
        this.setValue(this.dataValue, {
          fromSubmission: false,
          noUpdateEvent: true
        });
      }
      else if (this.shouldAddDefaultValue && !this.options.readOnly) {
        // If a default value is provided then select it.
        const defaultValue = this.defaultValue;
        if (!this.isEmpty(defaultValue)) {
          this.setValue(defaultValue);
        }
      }
    }

    // Say we are done loading the items.
    this.itemsLoadedResolve();
  }

  static get builderInfo() {
    return {
      title: 'Custom Select',
      icon: 'th-list',
      weight: 70,
      group: 'basic',
      schema: CustomSelect.schema()
    };
  }
}

