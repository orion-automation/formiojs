import componentForm from "../_classes/component/Component.form";
import DataSourceEditData from "./editForm/DataSource.edit.data";
export default function(...extend) {
  return componentForm([
    {
      key: "data",
      components: DataSourceEditData
    }
  ], ...extend);
}
