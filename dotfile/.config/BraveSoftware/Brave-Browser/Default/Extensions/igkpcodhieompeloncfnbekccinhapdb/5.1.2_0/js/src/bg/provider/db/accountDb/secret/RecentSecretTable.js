import { TableHelper } from "../../parts/TableHelper.js";
export class RecentSecretTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async update(secretId) {
        const row = { id: secretId, usedOn: Date.now() };
        return this.table.addRow(row);
    }
    async getMap() {
        const rows = await this.table.getAllRows();
        const map = new Map();
        rows.forEach(x => map.set(x.id, x.usedOn || x["userOn"]));
        return map;
    }
}
