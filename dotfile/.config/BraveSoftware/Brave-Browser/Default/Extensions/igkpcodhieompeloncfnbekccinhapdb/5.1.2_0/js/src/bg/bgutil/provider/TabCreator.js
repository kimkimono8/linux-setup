import { SessionStorageKeys } from "../../../service/storage/constants/SessionStorageKeys.js";
export class Exp_TabCreator {
    static newInstance(params) {
        const tabApi = params.reqNormal ? BrTabCreateApiCreateNormal.instance : BrTabCreateApiCreateTab.instance;
        const storageApi = params.reqPersistent ? BrStorageApiLocal.instance : BrStorageApiSession.instance;
        let tabCreator = new TabCreatorImpl(params.tabName, params.url, tabApi, storageApi);
        return tabCreator;
    }
}
class TabCreatorImpl {
    tabName;
    url;
    tabCreateApi;
    storageApi;
    activeTabSaver = null;
    constructor(tabName, url = "", tabCreateApi, storageApi) {
        this.tabName = tabName;
        this.url = url;
        this.tabCreateApi = tabCreateApi;
        this.storageApi = storageApi;
        this.activeTabSaver = new ActiveTabSaver(this);
    }
    async create(url) {
        try {
            await this.activeTabSaver.saveActiveTabId();
            await this.closeTab();
            const tab = await this.tabCreateApi.createTab(url);
            brApi.windows.update(tab.windowId, { focused: true });
            await this.storageApi.save(this.getStorageKey(), tab.id);
            return fnOut.result(tab);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async createTab() {
        return this.create(this.url);
    }
    async close() {
        try {
            await this.activeTabSaver.restoreLastActiveTab();
            await this.closeTab();
        }
        catch (e) {
            logError(e);
        }
    }
    async getTabId() {
        try {
            return this.storageApi.load(this.getStorageKey(), null);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getTabName() {
        return this.tabName;
    }
    async closeTab() {
        try {
            const existingTabId = await this.getTabId();
            if (existingTabId) {
                await brApi.tab.closeTab(existingTabId);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getStorageKey() {
        return SessionStorageKeys.TAB_CREATOR_PREFIX + this.tabName;
    }
}
class BrTabCreateApiCreateTab {
    static inst = null;
    static get instance() {
        return this.inst || (this.inst = new BrTabCreateApiCreateTab());
    }
    createTab(url) {
        return brApi.tab.create(url);
    }
}
class BrTabCreateApiCreateNormal {
    static inst = null;
    static get instance() {
        return this.inst || (this.inst = new BrTabCreateApiCreateNormal());
    }
    createTab(url) {
        return brApi.tab.createNormalTab(url);
    }
}
class BrStorageApiSession {
    static inst = null;
    static get instance() {
        return this.inst || (this.inst = new BrStorageApiSession());
    }
    save(key, val) {
        return zsessionStorage.save(key, val);
    }
    load(key, defaultVal) {
        return zsessionStorage.load(key, defaultVal);
    }
}
class BrStorageApiLocal {
    static inst = null;
    static get instance() {
        return this.inst || (this.inst = new BrStorageApiLocal());
    }
    save(key, val) {
        return zlocalStorage.save(key, val);
    }
    load(key, defaultVal) {
        return zlocalStorage.load(key, defaultVal);
    }
}
class ActiveTabSaver {
    tabCreator;
    constructor(tabCreator) {
        this.tabCreator = tabCreator;
    }
    async saveActiveTabId() {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab) {
                await zsessionStorage.save(this.getLastActiveStorageKey(), null);
                return;
            }
            const createdTabId = await this.tabCreator.getTabId();
            if (createdTabId == activeTab.id) {
                return;
            }
            await zsessionStorage.save(this.getLastActiveStorageKey(), activeTab.id);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreLastActiveTab() {
        try {
            const storedTabId = await zsessionStorage.load(this.getLastActiveStorageKey(), null);
            if (!storedTabId) {
                return;
            }
            const tab = await brApi.tab.getTab(storedTabId);
            if (tab) {
                await brApi.tab.updateTab(tab.id, { active: true });
            }
            await zsessionStorage.remove(this.getLastActiveStorageKey());
        }
        catch (e) {
            logError(e);
        }
    }
    getLastActiveStorageKey() {
        return SessionStorageKeys.TAB_CREATOR_PREFIX + "LAST_ACTIVE_" + this.tabCreator.getTabName();
    }
}
