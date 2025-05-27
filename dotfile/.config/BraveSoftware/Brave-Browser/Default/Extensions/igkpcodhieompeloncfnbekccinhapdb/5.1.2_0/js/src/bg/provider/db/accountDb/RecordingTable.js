import { TableHelper } from "../parts/TableHelper.js";
class LoginRecordingTableRow {
    domain = "";
    steps = "";
}
export class RecordingTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async save(domain, steps) {
        try {
            const row = {
                domain,
                steps
            };
            return this.table.addRow(row);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(domain) {
        try {
            const row = await this.table.getRow(domain);
            return row && row.steps;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    clear() {
        return this.table.clear();
    }
}
