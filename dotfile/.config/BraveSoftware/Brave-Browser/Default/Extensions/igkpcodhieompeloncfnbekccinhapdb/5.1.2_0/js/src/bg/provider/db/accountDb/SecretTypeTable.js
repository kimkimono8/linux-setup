import { TableHelper } from "../parts/TableHelper.js";
export class SecretTypeTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async saveAll(secretTypes) {
        return this.table.addAllRows(secretTypes, true);
    }
    async loadAll() {
        return this.table.getAllRows();
    }
    async loadMap() {
        try {
            const map = {};
            const secretTypes = await this.table.getAllRows();
            secretTypes.forEach(x => map[x.id] = x);
            return map;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(typeId) {
        return this.table.getRow(typeId);
    }
}
