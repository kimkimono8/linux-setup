export class TabStorage {
    prefix;
    constructor(prefix) {
        this.prefix = prefix;
    }
    init() {
        try {
            js.fn.bindThis(this, [this.tabRemoved]);
            brApi.tab.onTabRemove(this.tabRemoved);
        }
        catch (e) {
            logError(e);
        }
    }
    async save(tabId, key, val) {
        try {
            await zsessionStorage.save(this.toStorageKey(tabId, key), val);
        }
        catch (e) {
            logError(e);
        }
    }
    async load(tabId, key, defaultVal = null) {
        try {
            return await zsessionStorage.load(this.toStorageKey(tabId, key), defaultVal);
        }
        catch (e) {
            logError(e);
            return defaultVal;
        }
    }
    async remove(tabId, key) {
        try {
            return await zsessionStorage.remove(this.toStorageKey(tabId, key));
        }
        catch (e) {
            logError(e);
        }
    }
    async saveDomain(tabId, key, val, allowedDomains) {
        try {
            const saveObj = {
                domains: allowedDomains,
                val
            };
            await this.save(tabId, key, saveObj);
        }
        catch (e) {
            logError(e);
        }
    }
    async loadDomain(tab, key, defaultVal = null) {
        try {
            if (!tab) {
                return defaultVal;
            }
            const savedObj = await this.load(tab.id, key);
            if (!savedObj) {
                return defaultVal;
            }
            const tabDomain = js.url.getParentDomain(tab.url);
            if (!savedObj.domains.includes(tabDomain)) {
                return defaultVal;
            }
            return savedObj.val;
        }
        catch (e) {
            logError(e);
            return defaultVal;
        }
    }
    async loadDomainV1(tabId, key, defaultVal = null) {
        try {
            const tab = await brApi.tab.getTab(tabId);
            return this.loadDomain(tab, key, defaultVal);
        }
        catch (e) {
            logError(e);
            return defaultVal;
        }
    }
    async clear(tabId) {
        const existing = await zsessionStorage.loadAll(null) || {};
        const tabPrefix = this.getTabPrefix(tabId);
        const tabKeys = Object.keys(existing).filter(x => x.startsWith(tabPrefix));
        await zsessionStorage.remove(tabKeys);
    }
    toStorageKey(tabId, key) {
        return `${this.getTabPrefix(tabId)}_${key}`;
    }
    getTabPrefix(tabId) {
        return `${this.prefix}_${tabId}`;
    }
    async tabRemoved(tabId) {
        await this.clear(tabId);
    }
}
