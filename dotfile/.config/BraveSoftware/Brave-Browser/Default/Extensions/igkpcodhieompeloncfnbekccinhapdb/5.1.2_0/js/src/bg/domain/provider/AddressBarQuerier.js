import { URL_Part } from "../../../service/vt/constants/constants.js";
import { accountDb } from "../../Context.js";
export class AddressBarQuerierImpl {
    getMatchingIdsHostnameFnProvider = new GetMatchingIdsHostnameFnProvider();
    getMatchingIdsParentDomainFnProvider = new GetMatchingIdsParentDomainFnProvider();
    recentMap = new Map();
    isUnlocked = false;
    init() {
        js.fn.bindThis(this, [this.sortByRecentUse]);
    }
    async query(query) {
        try {
            const result = {
                secrets: [],
                idDomainMap: new Map(),
            };
            this.isUnlocked = await bg.vault.isUnlocked();
            const secrets = await this.getMatchingSecrets(query, result);
            if (secrets.length == 0) {
                return result;
            }
            await this.orderByRecent(secrets);
            result.secrets = secrets.slice(0, query.limit);
            return result;
        }
        catch (e) {
            logError(e);
            return {
                secrets: [],
                idDomainMap: new Map(),
            };
        }
    }
    clearCache() {
        try {
            this.recentMap.clear();
        }
        catch (e) {
            logError(e);
        }
    }
    async getMatchingSecrets(query, result) {
        try {
            const secrets = await this.getMatchingSecretsFn(query, result, this.getMatchingIdsHostnameFnProvider);
            if (secrets.length >= query.limit) {
                return secrets;
            }
            const domainSecrets = await this.getMatchingSecretsFn(query, result, this.getMatchingIdsParentDomainFnProvider);
            return js.array.getUniqueObjList(secrets.concat(domainSecrets), x => x.id);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getMatchingSecretsFn(query, result, fnProvider) {
        try {
            const ids = await this.getMatchingIdsFromDb(query, result, fnProvider);
            const secrets = await accountDb.secretTable.getList(ids);
            if (!this.isUnlocked || !query.usernamePrefix) {
                return secrets;
            }
            return await this.getFilteredSecrets(secrets, query);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getFilteredSecrets(secrets, query) {
        try {
            const a = [];
            for (let secret of secrets) {
                if (!(await this.isUsernameMatching(secret, query.usernamePrefix))) {
                    continue;
                }
                a.push(secret);
            }
            return a;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async isUsernameMatching(secret, prefix) {
        try {
            if (!secret.ui_text) {
                return false;
            }
            const uiText = await bg.zcrypt.decrypt(secret.ui_text, secret.shared);
            return uiText.startsWith(prefix);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async orderByRecent(secretList) {
        try {
            if (this.recentMap.size == 0) {
                this.recentMap = await accountDb.recentSecretTable.getMap();
            }
            secretList.sort(this.sortByRecentUse);
        }
        catch (e) {
            logError(e);
        }
    }
    sortByRecentUse(x, y) {
        const xIndex = this.recentMap.has(x.id) ? this.recentMap.get(x.id) : -1;
        const yIndex = this.recentMap.has(y.id) ? this.recentMap.get(y.id) : -1;
        return (yIndex - xIndex);
    }
    async getMatchingIdsFromDb(query, result, fnProvider) {
        try {
            const rowList = await fnProvider.loadAllRows();
            const reqIds = [];
            let domain = "";
            for (let row of rowList) {
                domain = fnProvider.getDomain(row);
                if (!domain.startsWith(query.urlPrefix)) {
                    continue;
                }
                reqIds.push(...row.ids);
                fnProvider.setMatchType(reqIds, domain, result);
            }
            return reqIds;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
class GetMatchingIdsFnProvider {
}
class GetMatchingIdsHostnameFnProvider extends GetMatchingIdsFnProvider {
    loadAllRows() {
        return accountDb.hostnameSecretsTable.loadAll();
    }
    getDomain(row) {
        return row.hostname;
    }
    setMatchType(idList, domain, result) {
        for (let id of idList) {
            result.idDomainMap.set(id, { domain, type: URL_Part.HOSTNAME });
        }
    }
}
class GetMatchingIdsParentDomainFnProvider extends GetMatchingIdsFnProvider {
    loadAllRows() {
        return accountDb.parentDomainSecretsTable.loadAll();
    }
    getDomain(row) {
        return row.domain;
    }
    setMatchType(idList, domain, result) {
        for (let id of idList) {
            if (result.idDomainMap.has(id)) {
                continue;
            }
            result.idDomainMap.set(id, { domain, type: URL_Part.DOMAIN });
        }
    }
}
