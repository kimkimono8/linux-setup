import { TableHelper } from "../../parts/TableHelper.js";
class HostRecentSecretTableRow {
    host = "";
    ids = [];
}
export class HostRecentSecretTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async add(url, secretId) {
        try {
            if (!js.url.isValid(url)) {
                console.info("invalid url: ", url, secretId);
                return;
            }
            const host = js.url.getHost(url);
            const existing = await this.loadExisting(host);
            js.array.removeElem(existing, secretId);
            existing.push(secretId);
            await this.table.addRow({ host, ids: existing });
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(url) {
        try {
            if (!js.url.isValid(url)) {
                return [];
            }
            const host = js.url.getHost(url);
            return this.loadExisting(host);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async loadExisting(key) {
        const existing = await this.table.getRow(key);
        return (existing && existing.ids) || [];
    }
}
