import { ConfigKeys } from "../../conf/service/constants.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { Browser } from "../../service/vt/constants/Browser.js";
import { bg } from "../bg.js";
export class SidePanelHandlerImpl {
    init() {
    }
    open(windowId, opener = null) {
        try {
            brApi.sidePanel.open({ windowId });
            zsessionStorage.save(SessionStorageKeys.SIDE_PANEL_OPENED_FROM, opener);
            this.openFn();
        }
        catch (e) {
            logError(e);
        }
    }
    async closed() {
        try {
            if (!(await bg.vault.isUnlocked())) {
                return;
            }
            const opener = await zsessionStorage.load(SessionStorageKeys.SIDE_PANEL_OPENED_FROM, null);
            if (!opener) {
                return;
            }
            await js.time.delay(0.1);
            await csApi.other.showSiteFrame({}, opener);
        }
        catch (e) {
            logError(e);
        }
    }
    async openFn() {
        try {
            const supported = await this.isSupported();
            if (!supported) {
                bg.unlockTabHandler.create();
                return;
            }
            await js.time.delay(1);
            const opened = (await bgUtil.getClients()).some(x => x.url.includes("sidePanel.html"));
            if (opened) {
                return;
            }
            bg.unlockTabHandler.create();
            zlocalStorage.save(LocalStorageKeys.SIDE_PANEL_SUPPORTED, false);
        }
        catch (e) {
            logError(e);
        }
    }
    async isSupported() {
        try {
            const browser = config.get(ConfigKeys.BROWSER);
            switch (browser) {
                case Browser.FIREFOX:
                case Browser.SAFARI:
                case Browser.OPERA:
                    return false;
            }
            const isSupported = await zlocalStorage.load(LocalStorageKeys.SIDE_PANEL_SUPPORTED, true);
            if (!isSupported) {
                return false;
            }
            return brApi.sidePanel.isSupported();
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
