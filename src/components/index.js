import AddressComponent from './address/Address';
import ButtonComponent from './button/Button';
import CheckBoxComponent from './checkbox/Checkbox';
import ColumnsComponent from './columns/Columns';
import Component from './_classes/component/Component';
import ComponentModal from './_classes/componentModal/ComponentModal';
import ContainerComponent from './container/Container';
import ContentComponent from './content/Content';
import CurrencyComponent from './currency/Currency';
import DataGridComponent from './datagrid/DataGrid';
import DataMapComponent from './datamap/DataMap';
import DateTimeComponent from './datetime/DateTime';
import DayComponent from './day/Day';
import EditGridComponent from './editgrid/EditGrid';
import EmailComponent from './email/Email';
import FieldsetComponent from './fieldset/Fieldset';
import FileComponent from './file/File';
import FormComponent from './form/Form';
import HiddenComponent from './hidden/Hidden';
import Input from './_classes/input/Input';
import Multivalue from './_classes/multivalue/Multivalue';
import Field from './_classes/field/Field';
import ListComponent from './_classes/list/ListComponent';
import HTMLComponent from './html/HTML';
import NestedComponent from './_classes/nested/NestedComponent';
import NestedDataComponent from './_classes/nesteddata/NestedDataComponent';
import NestedArrayComponent from './_classes/nestedarray/NestedArrayComponent';
import NumberComponent from './number/Number';
import PanelComponent from './panel/Panel';
import PasswordComponent from './password/Password';
import PhoneNumberComponent from './phonenumber/PhoneNumber';
import RadioComponent from './radio/Radio';
import ReCaptchaComponent from './recaptcha/ReCaptcha';
import ResourceComponent from './resource/Resource';
import SelectBoxesComponent from './selectboxes/SelectBoxes';
import SelectComponent from './select/Select';
import SignatureComponent from './signature/Signature';
import SurveyComponent from './survey/Survey';
import TableComponent from './table/Table';
import TabsComponent from './tabs/Tabs';
import TagsComponent from './tags/Tags';
import TextAreaComponent from './textarea/TextArea';
import TextFieldComponent from './textfield/TextField';
import TimeComponent from './time/Time';
import TreeComponent from './tree/Tree';
import UnknownComponent from './unknown/Unknown';
import UrlComponent from './url/Url';
import WellComponent from './well/Well';
import DataComponent from './Data/Data';
import ChartComponent from './Chart/Chart';
import EditTableComponent from './EditTable/EditTable';
import CustomCheckBoxComponent from './CustomCheckBox/CustomCheckBox';
import CustomDateTimeComponent from './CustomDateTime/CustomDateTime';
import CustomFileComponent from './CustomFile/CustomFile';
import CustomUrlComponent from './CustomUrl/CustomUrl';
import CustomRadioComponent from './CustomRadio/CustomRadio';
import CustomSelectComponent from './CustomSelect/CustomSelect';
import CustomTextAreaComponent from './CustomTextArea/CustomTextArea';
import CustomTextFieldComponent from './CustomTextField/CustomTextField';
import ProcessTableComponent from './ProcessTable/ProcessTable';
import DepartmentComponent from './Department/Department';
import FlexComponent from './Flex/Flex';
import NewsDataComponent from './NewsData/NewsData';
import QrCodeComponent from './QrCode/QrCode';
import ScanInputTextFieldComponent from './ScanInputTextField/ScanInputTextField';
import ActionButtonComponent from './ActionButton/ActionButton';
import HtmlEditorComponent from './wysiwyg/HtmlEditor';
import FileDownloadComponent from './FileDownload/FileDownload';
import TaskCalendarComponent from './TaskCalendar/TaskCalendar';
import DataSourceComponent from './DataSource/DataSource';
import LocationInputTextFieldComponent from './LocationInputTextField/LocationInputTextField';
import MapComponent from './map/Map';
import NocodbFileComponent from './NocodbFile/NocodbFile';

export default {
  map: MapComponent,
  locationInputTextField: LocationInputTextFieldComponent,
  taskCalendar:TaskCalendarComponent,
  fileDownload:FileDownloadComponent,
  htmlEditor: HtmlEditorComponent,
  scanInputTextField: ScanInputTextFieldComponent,
  qrCode: QrCodeComponent,
  newsData: NewsDataComponent,
  flex: FlexComponent,
  data: DataComponent,
  chart: ChartComponent,
  edittable: EditTableComponent,
  customCheckBox: CustomCheckBoxComponent,
  customDateTime: CustomDateTimeComponent,
  customFile: CustomFileComponent,
  customUrl: CustomUrlComponent,
  customRadio: CustomRadioComponent,
  customSelect: CustomSelectComponent,
  customTextArea: CustomTextAreaComponent,
  customTextField: CustomTextFieldComponent,
  processTable: ProcessTableComponent,
  department: DepartmentComponent,
  address: AddressComponent,
  base: Component,
  component: Component,
  componentmodal: ComponentModal,
  button: ButtonComponent,
  checkbox: CheckBoxComponent,
  columns: ColumnsComponent,
  container: ContainerComponent,
  content: ContentComponent,
  currency: CurrencyComponent,
  datagrid: DataGridComponent,
  datamap: DataMapComponent,
  datetime: DateTimeComponent,
  day: DayComponent,
  editgrid: EditGridComponent,
  email: EmailComponent,
  input: Input,
  field: Field,
  multivalue: Multivalue,
  list: ListComponent,
  fieldset: FieldsetComponent,
  file: FileComponent,
  form: FormComponent,
  hidden: HiddenComponent,
  htmlelement: HTMLComponent,
  nested: NestedComponent,
  nesteddata: NestedDataComponent,
  nestedarray: NestedArrayComponent,
  number: NumberComponent,
  panel: PanelComponent,
  password: PasswordComponent,
  phoneNumber: PhoneNumberComponent,
  radio: RadioComponent,
  recaptcha: ReCaptchaComponent,
  resource: ResourceComponent,
  select: SelectComponent,
  selectboxes: SelectBoxesComponent,
  signature: SignatureComponent,
  survey: SurveyComponent,
  table: TableComponent,
  tabs: TabsComponent,
  tags: TagsComponent,
  textarea: TextAreaComponent,
  textfield: TextFieldComponent,
  time: TimeComponent,
  tree: TreeComponent,
  unknown: UnknownComponent,
  url: UrlComponent,
  well: WellComponent,
  actionButton: ActionButtonComponent,
  dataSource: DataSourceComponent,
  nocodbFile: NocodbFileComponent
};
