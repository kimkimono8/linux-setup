import { TableHelper } from "../../parts/TableHelper.js";
export class UrlDomainPathTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async saveAll(secrets, clean) {
        try {
            const rows = new RowParser().parse(secrets);
            await this.table.addAllRows(rows, clean);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(domain) {
        try {
            const row = await this.table.getRow(domain);
            return (row && row.paths) || [];
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
class RowParser {
    static parse(secrets) {
        return new RowParser().parse(secrets);
    }
    domainPaths = js.map.createNew({ defaultProvider: () => new Set() });
    parse(secrets) {
        const rows = [];
        try {
            for (let secret of secrets) {
                try {
                    this.parseSecret(secret);
                }
                catch (e) {
                    logError(e);
                }
            }
            for (let [domain, secretIdSet] of this.domainPaths.map.entries()) {
                rows.push({ domain, paths: js.array.toArray(secretIdSet) });
            }
            return rows;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    parseSecret(secret) {
        try {
            for (let url of secret.valid_urls) {
                this.parseUrl(url);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    parseUrl(url) {
        try {
            const urlObj = new URL(url);
            this.domainPaths.getOrDefaultAdded(urlObj.hostname).add(urlObj.pathname);
        }
        catch (e) {
            logError(e);
        }
    }
}
