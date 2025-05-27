import { frameUrls } from "../../../common/enum/frameUrls.js";
import { BrWindowTypes } from "../../../components/brApi/service/enum.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { VI18N } from "../../service/vt/VI18n.js";
import { STRING } from "../../vutil/export.js";
import { bgStorage } from "../storage/export.js";
export class DevToolHandler {
    devToolChecker = new DevToolChecker();
    skipTabCheck = false;
    async init() {
        try {
            js.fn.bindThis(this, [this.onTabCreated]);
            brApi.tab.onTabCreate(this.onTabCreated);
            this.initSkipTabCheck();
        }
        catch (e) {
            logError(e);
        }
    }
    async initSkipTabCheck() {
        try {
            this.skipTabCheck = (await zlocalStorage.load(LocalStorageKeys.SKIP_ONE_CLICK_TAB_CHECK, STRING.FALSE)) == STRING.TRUE;
        }
        catch (e) {
            logError(e);
        }
    }
    async devToolsOpened(tabId) {
        try {
            await bgStorage.tab.save(tabId, TabStorageKeys.OPENED_DEV_TOOLS, true);
        }
        catch (e) {
            logError(e);
        }
    }
    async isValidTab(tabId) {
        try {
            if (this.skipTabCheck) {
                return true;
            }
            const openedDevTools = await bgStorage.tab.load(tabId, TabStorageKeys.OPENED_DEV_TOOLS, null);
            return openedDevTools === false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async isDevToolsOpen(tabId) {
        return this.devToolChecker.isDevToolsOpen(tabId);
    }
    async closeTab(tabId) {
        try {
            await brApi.tab.closeTab(tabId);
            await this.showTabClosedMessage();
        }
        catch (e) {
            logError(e);
        }
    }
    async browserStarted() {
        try {
            const tabs = await brApi.tab.getAllTabs();
            for (let tab of tabs) {
                await this.markValidTab(tab);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async showTabClosedMessage() {
        try {
            const tab = await brApi.tab.create(frameUrls.LOADING_PAGE);
            await brApi.tab.getCompletedTab(tab.id);
            await bgStorage.tab.save(tab.id, TabStorageKeys.ALERT_CONFIG, { message: i18n(VI18N.DEV_TOOLS_TAB_CLOSED) });
            await brApi.tab.updateTab(tab.id, { url: frameUrls.ALERT_FRAME });
        }
        catch (e) {
            logError(e);
        }
    }
    async onTabCreated(tab) {
        this.markValidTab(tab);
    }
    async markValidTab(tab) {
        try {
            await bgStorage.tab.save(tab.id, TabStorageKeys.OPENED_DEV_TOOLS, false);
        }
        catch (e) {
            logError(e);
        }
    }
}
class DevToolChecker {
    async isDevToolsOpen(tabId) {
        try {
            const useOldCheck = (await zlocalStorage.load(LocalStorageKeys.USE_OLD_DEVTOOLS_CHECK, STRING.FALSE)) == STRING.TRUE;
            if (useOldCheck) {
                return this.hasDevPage(tabId);
            }
            const checks = await Promise.all([
                this.hasDevPage(tabId),
                this.hasDevWindow(),
            ]);
            return checks.some(x => x);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async hasDevPage(tabId) {
        try {
            const promise = js.promise.createTimed(0.1);
            brApi.runtime.sendMessage({ fn_name: "is_dev_tools_open", args: [tabId] })
                .then(x => promise.resolve(x), () => promise.resolve(false));
            return await promise;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async hasDevWindow() {
        try {
            const windows = await brApi.windows.query({ windowTypes: [BrWindowTypes.DEV_TOOLS] });
            return windows.length > 0;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
