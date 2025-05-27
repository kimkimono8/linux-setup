import { TableHelper } from "../../parts/TableHelper.js";
import { BaseUrlPartSecretsTableImpl } from "./BaseUrlPartSecretsTable.js";
export class ParentDomainSecretsTableImpl extends BaseUrlPartSecretsTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
}
