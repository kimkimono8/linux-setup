import { TableHelper } from "../../parts/TableHelper.js";
import { BaseUrlPartSecretsTableImpl } from "./BaseUrlPartSecretsTable.js";
export class HostnameSecretsTableImpl extends BaseUrlPartSecretsTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
}
