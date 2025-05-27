import { devToolsHandler } from "../../../../src/bg/Context.js";
import { Secret } from "../../../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class LoginTabGetter {
    p;
    constructor(p) {
        this.p = p;
    }
    async getLoginTab(input, loginData) {
        try {
            const loginTab = await this.getLoginTabFn(input, loginData);
            if (!loginTab) {
                return null;
            }
            const completedTab = await brApi.tab.getCompletedTab(loginTab.id);
            return completedTab;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async getLoginTabFn(input, loginData) {
        try {
            const inputTab = input.tabId ? await brApi.tab.getTab(input.tabId) : null;
            const { url, incognito } = input;
            const curTab = (inputTab || await brApi.tab.getActiveTab());
            if (!curTab) {
                return brApi.tab.createTab({ url, incognito });
            }
            if (incognito && curTab.incognito == false) {
                return brApi.tab.createTab({ url, incognito });
            }
            if (this.isNewTab(curTab)) {
                const updatedTab = await brApi.tab.updateTab(curTab.id, { url });
                return updatedTab;
            }
            const domainMatchingTab = js.url.getParentDomain(curTab.url) == js.url.getParentDomain(url);
            const useCurrentTab = domainMatchingTab && await this.hasValidLoginField(curTab, loginData);
            const useNewTab = !useCurrentTab;
            if (useNewTab) {
                return brApi.tab.createTab({ url, incognito });
            }
            const oneClickLoginOk = await this.isOneClickLoginCheckOk(curTab, loginData);
            if (!oneClickLoginOk) {
                bg.csUtil.showAlert(curTab.id, { message: i18n(VI18N.DEV_TOOLS_NEWTAB_LOGIN) });
                return null;
            }
            return curTab;
        }
        catch (e) {
            logError(e);
            return brApi.tab.create(input.url);
        }
    }
    async isOneClickLoginCheckOk(curTab, loginData) {
        try {
            if (Secret.hasViewPermission(loginData.shareLevel)) {
                return true;
            }
            return await devToolsHandler.isValidTab(curTab.id);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isNewTab(tab) {
        try {
            const url = tab.url;
            if (!url) {
                return true;
            }
            if (url.startsWith("http")) {
                return false;
            }
            if (url.includes("newtab")) {
                return true;
            }
            if (url == this.p.loadingTabUrl) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async hasValidLoginField(inputTab, loginData) {
        try {
            const tabResult = await this.getConnectableTab(inputTab);
            if (!tabResult.ok) {
                return false;
            }
            const tab = tabResult.result;
            const frames = await this.getValidLoginFrames(tab.id, loginData);
            const respPromiseList = frames.map(x => csApi.login.hasValidLoginField({ tabId: tab.id, frameId: x.frameId }));
            for (let resp of respPromiseList) {
                if (await resp) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getValidLoginFrames(tabId, loginData) {
        try {
            const frames = await brApi.tab.getFrames(tabId);
            const validFrames = frames.filter(x => this.isValidFrame(x, loginData));
            return validFrames;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    isValidFrame(frame, loginData) {
        try {
            if (!frame.url) {
                return false;
            }
            const parentDomain = js.url.getParentDomain(frame.url);
            return loginData.allowedDomains.includes(parentDomain);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getConnectableTab(tab) {
        try {
            const isConnectable = await csApi.isConnectable({ tabId: tab.id });
            if (isConnectable) {
                return fnOut.result(tab);
            }
            const completedTab = await brApi.tab.getCompletedTab(tab.id);
            const isConnectableNow = await csApi.isConnectable({ tabId: tab.id });
            if (isConnectableNow) {
                return fnOut.result(completedTab);
            }
            return fnOut.NONE;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
}
