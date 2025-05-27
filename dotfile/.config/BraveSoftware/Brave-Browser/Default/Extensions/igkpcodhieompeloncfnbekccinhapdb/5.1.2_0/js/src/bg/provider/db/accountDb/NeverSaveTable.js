import { TableHelper } from "../parts/TableHelper.js";
export class NeverSaveTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async saveAll(neverSaveDomains) {
        const neverSaveDomainObjs = neverSaveDomains.map(this.mapNeverSaveRow);
        return this.table.addAllRows(neverSaveDomainObjs, true);
    }
    async loadAll() {
        try {
            const rows = await this.table.getAllRows();
            const domains = rows.map(x => x.domain);
            return domains;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async add(domain) {
        try {
            await this.table.addRow(this.mapNeverSaveRow(domain));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async remove(domain) {
        try {
            await this.table.deleteRow(domain);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async has(domain) {
        try {
            const row = await this.table.getRow(domain);
            return Boolean(row);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    mapNeverSaveRow(domain) {
        return { domain };
    }
}
