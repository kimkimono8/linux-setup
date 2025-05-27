import { domainHandler } from "./Context.js";
export class DomainRowMapper {
    domainIdsMap = js.map.createNew({ defaultProvider: () => new Set() });
    parentDomainIdsMap = js.map.createNew({ defaultProvider: () => new Set() });
    hostnameIdsMap = js.map.createNew({ defaultProvider: () => new Set() });
    parse(secrets) {
        try {
            for (let secret of secrets) {
                this.parseSecret(secret);
            }
            const result = {
                domainRows: this.getDomainSecretTableRows(this.domainIdsMap),
                parentDomainRows: this.getDomainSecretTableRows(this.parentDomainIdsMap),
                hostnameRows: this.getHostnameTableRows(this.hostnameIdsMap),
            };
            return result;
        }
        catch (e) {
            logError(e);
            return {
                domainRows: [],
                parentDomainRows: [],
                hostnameRows: []
            };
        }
    }
    getDomainSecretTableRows(mapObj) {
        try {
            const rows = [];
            for (let [domain, secretIdSet] of mapObj.map.entries()) {
                rows.push({ domain, ids: js.array.toArray(secretIdSet) });
            }
            return rows;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getHostnameTableRows(mapObj) {
        try {
            const rows = [];
            for (let [hostname, secretIdSet] of mapObj.map.entries()) {
                rows.push({ hostname, ids: js.array.toArray(secretIdSet) });
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
                this.parseSecretUrl(secret, url);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    parseSecretUrl(secret, url) {
        try {
            const mappingObj = domainHandler.parser.getMapping(url);
            if (!mappingObj?.domain) {
                return;
            }
            this.domainIdsMap.getOrDefaultAdded(mappingObj.domain).add(secret.id);
            this.parentDomainIdsMap.getOrDefaultAdded(mappingObj.parentDomain).add(secret.id);
            this.hostnameIdsMap.getOrDefaultAdded(mappingObj.hostname).add(secret.id);
        }
        catch (e) {
            logError(e);
        }
    }
}
