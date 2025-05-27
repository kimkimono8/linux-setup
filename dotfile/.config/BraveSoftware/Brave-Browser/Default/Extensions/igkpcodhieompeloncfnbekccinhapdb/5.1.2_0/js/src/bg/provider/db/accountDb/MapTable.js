import { TableHelper } from "../parts/TableHelper.js";
export class MapTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async save(key, val) {
        return this.table.addRow({ key, val });
    }
    async load(key, defaultVal = null) {
        try {
            const existing = await this.table.getRow(key);
            return existing !== undefined ? existing.val : defaultVal;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
