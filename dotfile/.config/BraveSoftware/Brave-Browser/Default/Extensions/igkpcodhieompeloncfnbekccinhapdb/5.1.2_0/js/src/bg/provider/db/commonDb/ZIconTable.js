import { TableHelper } from "../parts/TableHelper.js";
class ZIconTableRow {
    hostName;
    selectors;
    constructor(hostName, selectors) {
        this.hostName = hostName;
        this.selectors = selectors;
    }
}
const MAX_SELECTORS_COUNT = 100;
export class ZIconTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async save(url, selector) {
        try {
            const { hostName, row } = await this.loadRow(url);
            const selectors = (row && row.selectors) || [];
            js.array.addHistory(selectors, selector, MAX_SELECTORS_COUNT);
            await this.table.addRow(new ZIconTableRow(hostName, selectors));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(url) {
        try {
            const { row } = await this.loadRow(url);
            if (!row?.selectors?.length) {
                return [];
            }
            if (typeof row.selectors[0] == "string") {
                this.table.clear();
                return [];
            }
            return row.selectors;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async loadRow(url) {
        const hostName = js.url.getHostName(url);
        const row = await this.table.getRow(hostName);
        return { hostName, row };
    }
}
