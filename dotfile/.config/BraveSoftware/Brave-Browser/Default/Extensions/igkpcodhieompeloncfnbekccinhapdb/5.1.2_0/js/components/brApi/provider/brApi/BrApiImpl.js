import { gg } from "../GG.js";
import { PortApiImpl } from "../portApi/PortApiImpl.js";
import { BrActionApiImpl } from "./BrActionApiImpl.js";
import { BrAlarmApiImpl } from "./BrAlarmApi.js";
import { BrContextMenuApiImpl } from "./BrContextMenuApi.js";
import { BrI18nApiImpl } from "./BrI18nApiImpl.js";
import { BrOmniboxApiImpl } from "./BrOmniboxApi.js";
import { BrCookieApiImpl, BrDomApiImpl, BrIdleApiImpl, BrNotificationApiImpl, BrOtherApiImpl, BrSidePanelApiImpl, BrWindowsApiImpl } from "./BrOtherApiImpl.js";
import { BrRuntimeApiImpl } from "./BrRuntimeApiImpl.js";
import { BrLocalStorage, BrSessionStorage } from "./BrStorageAreaApi.js";
import { BrTabApiImpl } from "./BrTabApi.js";
import { BrPortApiImpl } from "./port/BrPortApi.js";
export class BrApiImpl {
    static getInstance() {
        try {
            if (gg.brApi) {
                return gg.brApi;
            }
            return gg.brApi = new BrApiImpl();
        }
        catch (e) {
            throw e;
        }
    }
    constructor() { }
    alarm;
    i18n = new BrI18nApiImpl();
    menu;
    omnibox = new BrOmniboxApiImpl();
    port;
    runtime;
    storage = {
        local: null,
        session: null,
    };
    tab;
    idle = new BrIdleApiImpl();
    notification = new BrNotificationApiImpl();
    other = new BrOtherApiImpl();
    sidePanel;
    windows;
    action;
    cookie;
    dom;
    portApi;
    init() {
        try {
            this.init = js.fn.emptyFn;
            globalThis.brApi = this;
            globalThis.portApi = this.portApi = new PortApiImpl();
            this.port = new BrPortApiImpl();
            this.cookie = new BrCookieApiImpl();
            this.windows = new BrWindowsApiImpl();
            this.menu = new BrContextMenuApiImpl();
            this.runtime = new BrRuntimeApiImpl();
            this.tab = new BrTabApiImpl();
            this.storage.local = new BrLocalStorage();
            this.storage.session = new BrSessionStorage();
            const isV2 = this.isV2();
            this.action = BrActionApiImpl.getInstance(isV2);
            this.alarm = BrAlarmApiImpl.getInstance(isV2);
            this.sidePanel = BrSidePanelApiImpl.getInstance(isV2);
            this.dom = BrDomApiImpl.getInstance(isV2);
            globalThis.isDevMode = this.runtime.getManifest()?.name?.includes?.("Dev");
        }
        catch (e) {
            logError(e);
        }
    }
    isV2() {
        return gg.util.checkManifestV2();
    }
}
