import { gg } from "../GG.js";
export class BrOtherApiImpl {
    disablePasswordSaving() {
        try {
            if (chrome.privacy) {
                chrome.privacy.services.passwordSavingEnabled.set({ value: false });
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
export class BrWindowsApiImpl {
    async update(windowId, updateParams) {
        return chrome.windows.update(windowId, updateParams);
    }
    query(query = null) {
        return new Promise((res, rej) => chrome.windows.getAll(query, gg.util.createCallback(res, rej)));
    }
}
export class BrNotificationApiImpl {
    async create(name, createOption) {
        return chrome.notifications.create(name, createOption);
    }
    async clear(name) {
        return chrome.notifications.clear(name);
    }
}
export class BrIdleApiImpl {
    onIdle(listener) {
        if (chrome.idle) {
            chrome.idle.onStateChanged.addListener(listener);
        }
    }
    setDetectionIntervalSeconds(seconds) {
        if (chrome.idle) {
            chrome.idle.setDetectionInterval(seconds);
        }
    }
}
export class BrCookieApiImpl {
    onCookieChange(listener) {
        chrome.cookies.onChanged.addListener(listener);
    }
    getCookie(name, url) {
        return new Promise((res, rej) => chrome.cookies.get({ name, url }, gg.util.createCallback(res, rej)));
    }
    async getCookieStore(storeId) {
        try {
            const stores = await new Promise((res, rej) => chrome.cookies.getAllCookieStores(gg.util.createCallback(res, rej)));
            const reqStore = stores.find(x => x.id == storeId);
            return reqStore;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
export class BrSidePanelApiImpl {
    static getInstance(isV2) {
        return isV2 ? new BrSidePanelApiImplV2() : new BrSidePanelApiImpl();
    }
    open(options) {
        return chrome?.sidePanel?.open?.(options);
    }
    isSupported() {
        return Boolean(chrome.sidePanel);
    }
}
class BrSidePanelApiImplV2 {
    open(_options) { }
    isSupported() {
        return false;
    }
}
export class BrDomApiImpl {
    static getInstance(isV2) {
        return isV2 ? new BrDomApiImplV2() : new BrDomApiImpl();
    }
    getShadowRoot(elem) {
        return chrome.dom.openOrClosedShadowRoot(elem);
    }
}
class BrDomApiImplV2 {
    getShadowRoot(elem) {
        return elem.openOrClosedShadowRoot;
    }
}
