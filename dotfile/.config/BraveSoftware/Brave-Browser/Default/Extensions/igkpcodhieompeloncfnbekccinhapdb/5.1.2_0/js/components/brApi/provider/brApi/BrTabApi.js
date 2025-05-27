import { gg } from "../GG.js";
const MAXIMIZED = "maximized";
export class BrTabApiImpl {
    async createTab(params) {
        if (params.incognito) {
            return this.createIncognitoTabFn(params);
        }
        return this.createTabFn(params);
    }
    async createIncognitoTab(url) {
        return this.createIncognitoTabFn({ url });
    }
    async createNormalTab(url) {
        const activeTab = await this.getActiveTab();
        if (!activeTab || !activeTab.incognito) {
            return this.create(url);
        }
        const normalWindow = await this.createWindow(url);
        return normalWindow.tabs[0];
    }
    onTabUpdate(listener) {
        chrome.tabs.onUpdated.addListener(listener);
    }
    removeTabUpdateListener(listener) {
        chrome.tabs.onUpdated.removeListener(listener);
    }
    onTabActivate(listener) {
        chrome.tabs.onActivated.addListener(listener);
    }
    onWindowFocus(listener) {
        chrome.windows.onFocusChanged.addListener(function (id) {
            if (id != chrome.windows.WINDOW_ID_NONE) {
                listener(id);
            }
        });
    }
    onTabCreate(listener) {
        chrome.tabs.onCreated.addListener(listener);
    }
    onTabRemove(listener) {
        chrome.tabs.onRemoved.addListener(listener);
    }
    getAllTabs() {
        return this.queryTabs({});
    }
    async isIncognitoAllowed() {
        return new Promise((res, rej) => chrome.extension.isAllowedIncognitoAccess(gg.util.createCallback(res, rej)));
    }
    async create(url) {
        return new Promise((res, rej) => chrome.tabs.create({ url }, gg.util.createCallback(res, rej)));
    }
    getCalledContextTab() {
        return new Promise((res, rej) => chrome.tabs.getCurrent(gg.util.createCallback(res, rej)));
    }
    async getTab(tabId) {
        try {
            const tab = await new Promise((res, rej) => chrome.tabs.get(tabId, gg.util.createCallback(res, rej)));
            return tab;
        }
        catch (e) {
            return null;
        }
    }
    async getActiveTab() {
        const [tab] = await new Promise((res, rej) => chrome.tabs.query({ active: true, lastFocusedWindow: true }, gg.util.createCallback(res, rej)));
        return tab;
    }
    async closeTab(tabId) {
        try {
            await new Promise((res, rej) => chrome.tabs.remove(tabId, gg.util.createCallback(res, rej)));
        }
        catch (e) { }
    }
    async getFrames(tabId) {
        try {
            return await new Promise((res, rej) => chrome.webNavigation.getAllFrames({ tabId }, gg.util.createCallback(res, rej)));
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async createWindow(url, { incognito = false } = {}) {
        return new Promise((res, rej) => chrome.windows.create({
            url,
            incognito,
            state: MAXIMIZED,
        }, gg.util.createCallback(res, rej)));
    }
    async updateTab(tabId, updateParams) {
        return new Promise((res, rej) => chrome.tabs.update(tabId, updateParams, gg.util.createCallback(res, rej)));
    }
    queryTabs(query) {
        return new Promise((res, rej) => chrome.tabs.query(query, gg.util.createCallback(res, rej)));
    }
    async getCompletedTab(tabId) {
        return new CompletedTabGetter(tabId, this).getTab();
    }
    async createIncognitoTabFn(input) {
        try {
            if (!await this.isIncognitoAllowed()) {
                return this.createTabFn(input);
            }
            const activeTab = await this.getActiveTab();
            if (activeTab && activeTab.incognito) {
                return this.createTabFn(input);
            }
            const incognitoWindow = await this.createWindow(input.url, { incognito: true });
            if (incognitoWindow?.tabs) {
                return incognitoWindow.tabs[0];
            }
            const tabs = await this.queryTabs({ windowId: incognitoWindow.id });
            return tabs[0];
        }
        catch (e) {
            logError(e);
            return this.createTabFn(input);
        }
    }
    async createTabFn(input) {
        return this.createFn({
            url: input.url,
            active: !input.background,
        });
    }
    async createFn(input) {
        return new Promise((res, rej) => chrome.tabs.create(input, gg.util.createCallback(res, rej)));
    }
}
class CompletedTabGetter {
    tabId;
    tabApi;
    promise;
    constructor(tabId, tabApi) {
        this.tabId = tabId;
        this.tabApi = tabApi;
        this.promise = js.promise.createNew();
    }
    async getTab() {
        try {
            this.handleTabUpdate = this.handleTabUpdate.bind(this);
            this.tabApi.onTabUpdate(this.handleTabUpdate);
            let tab = await this.tabApi.getTab(this.tabId);
            if (tab.status == "complete") {
                this.promise.resolve(tab);
            }
            try {
                tab = await this.promise;
            }
            catch (e) {
                logError(e);
            }
            this.tabApi.removeTabUpdateListener(this.handleTabUpdate);
            return tab;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    handleTabUpdate(tabId, changeInfo, tab) {
        const completed = (tabId == this.tabId) && changeInfo &&
            (changeInfo.status == "complete");
        if (completed) {
            this.promise.resolve(tab);
        }
    }
}
