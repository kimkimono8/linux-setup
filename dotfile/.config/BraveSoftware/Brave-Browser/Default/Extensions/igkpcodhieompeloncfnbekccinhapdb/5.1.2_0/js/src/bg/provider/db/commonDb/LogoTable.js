import { TableHelper } from "../parts/TableHelper.js";
const LogoType = {
    EMPTY: "EMPTY",
    APPROX: "APPROX",
    EXACT: "EXACT",
};
class LogoTableRow {
    domain;
    logo;
    type;
    constructor(domain, logo, type) {
        this.domain = domain;
        this.logo = logo;
        this.type = type;
    }
}
class LogoTableRowUtil {
    static updateNeeded(row, hostname) {
        switch (row.type) {
            case LogoType.EXACT: return false;
            case LogoType.EMPTY: return true;
            case LogoType.APPROX: return hostname == row.domain;
            default: throw "UNHANDLED_CASE: logo update needed";
        }
    }
}
export class LogoTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    async save(url, logo) {
        try {
            if (!js.url.isValid(url)) {
                return;
            }
            const hostname = js.url.getHostName(url);
            const row = new LogoTableRow(hostname, logo, LogoType.EXACT);
            await this.table.addRow(row);
            await this.saveParentDomainLogo(hostname, logo);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async isLogoNeeded(hostname) {
        try {
            const rows = await this.table.getRows([hostname, js.url.getParentDomainFromHostName(hostname)]);
            for (let row of rows) {
                if (LogoTableRowUtil.updateNeeded(row, hostname)) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async load(url) {
        try {
            const hostname = js.url.getHostName(url);
            const logo = await this.loadFn(hostname);
            if (logo) {
                return logo;
            }
            await this.addPendingDomains([hostname]);
            const parentDomain = js.url.getParentDomainFromHostName(hostname);
            if (parentDomain != hostname) {
                return await this.loadFn(parentDomain);
            }
            return "";
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async loadMap(urls) {
        try {
            const map = new Map();
            const domains = this.getLoadKeys(urls);
            const pendingDomains = new Set(domains);
            const rows = await this.table.getRows(domains);
            for (let row of rows) {
                pendingDomains.delete(row.domain);
                if (row.logo) {
                    map.set(row.domain, row.logo);
                }
            }
            await this.addPendingDomains(js.array.toArray(pendingDomains.values()));
            return map;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getLoadKeys(urls) {
        const domainSet = new Set();
        let hostname;
        for (let url of urls) {
            if (!js.url.isValid(url)) {
                console.info("invalid url: ", url);
                continue;
            }
            hostname = js.url.getHostName(url);
            domainSet.add(hostname);
            domainSet.add(js.url.getParentDomainFromHostName(hostname));
        }
        return js.array.toArray(domainSet);
    }
    async loadFn(hostname) {
        const row = await this.table.getRow(hostname);
        return (row && row.logo) || "";
    }
    async addPendingDomains(domains) {
        try {
            const rows = domains.map(domain => new LogoTableRow(domain, "", LogoType.EMPTY));
            await this.table.addAllRows(rows);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async saveParentDomainLogo(hostname, logo) {
        try {
            const parentDomain = js.url.getParentDomainFromHostName(hostname);
            if (parentDomain == hostname) {
                return;
            }
            const existingRow = await this.table.getRow(parentDomain);
            if (!existingRow) {
                await this.table.addRow(new LogoTableRow(parentDomain, logo, LogoType.APPROX));
                return;
            }
            if (LogoTableRowUtil.updateNeeded(existingRow, hostname)) {
                await this.table.addRow(new LogoTableRow(parentDomain, logo, LogoType.APPROX));
                return;
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
