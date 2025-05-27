import { TableHelper } from "../parts/TableHelper.js";
export class DictionaryTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async saveAll(words) {
        try {
            const rows = words.map(x => ({ word: x }));
            await this.table.addAllRows(rows, true);
        }
        catch (e) {
            logError(e);
        }
    }
    async isPresent(word) {
        try {
            const row = await this.table.getRow(word.toLowerCase());
            return Boolean(row);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async hasWords() {
        try {
            return await this.table.hasRows();
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
