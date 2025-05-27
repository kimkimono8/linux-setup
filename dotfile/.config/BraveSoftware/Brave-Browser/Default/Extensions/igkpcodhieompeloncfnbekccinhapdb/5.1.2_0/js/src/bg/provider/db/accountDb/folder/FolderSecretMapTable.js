import { TableHelper } from "../../parts/TableHelper.js";
const MAX_VALID_UPTO = 1 * 60 * 1000;
export class FolderSecretMapTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async save(folderId, secretIds) {
        try {
            const validUpto = Date.now() + MAX_VALID_UPTO;
            const row = { folderId, secretIds, validUpto };
            return this.table.addRow(row);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async addSecret(folderId, secretId) {
        try {
            const existing = await this.loadSecretIds(folderId);
            js.array.addUnique(existing, secretId);
            await this.save(folderId, existing);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(folderId) {
        const row = await this.table.getRow(folderId);
        if (!row) {
            return null;
        }
        return row;
    }
    async loadSecretIds(folder_id) {
        const row = await this.load(folder_id);
        return row ? row.secretIds : [];
    }
    clear() {
        return this.table.clear();
    }
}
