export class BaseUrlPartSecretsTableImpl {
    async saveAll(rows, clean) {
        try {
            await this.table.addAllRows(rows, clean);
        }
        catch (e) {
            logError(e);
        }
    }
    async remove(secretId) {
        try {
            const updatedRows = [];
            for (let row of await this.table.getAllRows()) {
                if (!row.ids.includes(secretId)) {
                    continue;
                }
                js.array.removeElem(row.ids, secretId);
                updatedRows.push(row);
            }
            await this.table.addAllRows(updatedRows);
        }
        catch (e) {
            logError(e);
        }
    }
    async removeAll(secretIds) {
        try {
            const updatedRows = [];
            const secretIdSet = new Set(secretIds);
            let newIds = [];
            for (let row of await this.table.getAllRows()) {
                newIds = row.ids.filter(x => !secretIdSet.has(x));
                if (newIds.length == row.ids.length) {
                    continue;
                }
                row.ids = newIds;
                updatedRows.push(row);
            }
            await this.table.addAllRows(updatedRows);
        }
        catch (e) {
            logError(e);
        }
    }
    async load(domain) {
        try {
            const row = await this.table.getRow(domain);
            return (row && row.ids) || [];
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async loadAll() {
        try {
            return this.table.getAllRows();
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
