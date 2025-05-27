import { TableHelper } from "../parts/TableHelper.js";
export class PolicyTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async saveAll(policies) {
        return this.table.addAllRows(policies, true);
    }
    async loadAll() {
        return this.table.getAllRows();
    }
    async load(policyId) {
        return this.table.getRow(policyId);
    }
}
