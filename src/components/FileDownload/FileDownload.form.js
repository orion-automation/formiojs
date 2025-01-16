import Components from '../Components';
import FileDownloadEditDisplay from './editForm/FileDownload.edit.display';

export default function (...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: FileDownloadEditDisplay
    },
    {
      key: 'data',
      ignore: true,
    },
    {
      key: 'validation',
      ignore: true,
    },
    {
      key: 'addons',
      ignore: true
    },
  ], ...extend);
}
