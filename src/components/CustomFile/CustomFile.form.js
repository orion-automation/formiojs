import fileEditForm from '../file/File.form';
import CustomFileEditFile from './editForm/CustomFile.edit.file';
import _ from 'lodash';
import { GlobalFormio as Formio } from '../../Formio';

export default function(...extend) {
  const customFileEditForm = fileEditForm(...extend, [
    {
      key: 'file',
      components: CustomFileEditFile,
    }
  ]);
  const tabIndex = customFileEditForm.components.findIndex(component => component.key === 'tabs');
  const fileIndex = customFileEditForm.components[tabIndex].components.findIndex(component => component.key === 'file');
  const storageIndex = customFileEditForm.components[tabIndex].components[fileIndex].components.findIndex(component => component.key === 'storage');
  const optionsIndex = customFileEditForm.components[tabIndex].components[fileIndex].components.findIndex(component => component.key === 'options');
  customFileEditForm.components[tabIndex].components[fileIndex].components[optionsIndex].placeholder = `{
  "withCredentials": true,
  "headers":{
    "jwt-token":"\${data.token}"
  }
}`;
  customFileEditForm.components[tabIndex].components[fileIndex].components[storageIndex].data = {
    custom() {
      return _.map(Formio.Providers.getProviders('storage'), (storage, key) => (
        {
          label: storage.title,
          value: key
        })).filter(item => ['url', 'base64'].includes(item.value));
    }
  };
  return customFileEditForm;
}
