import enTranslation from './translations/en';
import zhTranslation from './translations/zh';
import jpTranslation from './translations/jp';
import deTranslation from './translations/de';
import {
  fastCloneDeep
} from './utils/utils';
export default {
  lng: 'en',
  nsSeparator: '::',
  keySeparator: '.|.',
  pluralSeparator: '._.',
  contextSeparator: '._.',
  resources: {
    en: {
      translation: fastCloneDeep(enTranslation)
    },
    zh: {
      translation: fastCloneDeep(zhTranslation)
    },
    de: {
      translation: fastCloneDeep(deTranslation)
    },
    jp: {
      translation: fastCloneDeep(jpTranslation)
    }
  }
};
