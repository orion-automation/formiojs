// import ButtonForm from '../button/Button.form';

// export default function (...extend) {
//   return ButtonForm([
//     {
//       key: 'display',
//       components: [
//         {
//           type: 'textfield',
//           label: 'test',
//           key: 'test',
//           input: true,
//           tooltip: '',
//           weight: 1,
//         },
//         {
//           type: 'select',
//           key: 'action',
//           label: 'Action',
//           input: true,
//           dataSrc: 'values',
//           weight: 110,
//           tooltip: 'This is the action to be performed by this button.',
//           data: {
//             values: [
//               { label: 'a', value: 'b' }
//             ],
//           },
//         },
//       ]
//     }

//   ], ...extend);
// }

import Components from '../Components';
import ActionButtonEditDisplay from './editForm/ActionButton.edit.display';

export default function (...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: ActionButtonEditDisplay
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
