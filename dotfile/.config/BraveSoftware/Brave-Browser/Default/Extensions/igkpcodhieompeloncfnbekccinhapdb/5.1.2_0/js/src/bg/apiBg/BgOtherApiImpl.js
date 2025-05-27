import { bg } from "../bg.js";
import { devToolsHandler, inactivityHandler, sidePanelHandler } from "../Context.js";
import { logoGetter, logoUpdater } from "../logo/export.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgOtherApiImpl {
    async updateLastActive() {
        inactivityHandler.updateLastActive();
    }
    async copyToClipboard(text, options) {
        return bg.clipboard.copy(text, options);
    }
    async getLogo(url) {
        return logoGetter.getLogo(url);
    }
    async closeUnlockTab() {
        return bg.unlockTabHandler.close();
    }
    async sendRuntimeMessage(msg) {
        return new Promise(res => chrome.runtime.sendMessage(msg, function (result) {
            if (chrome.runtime.lastError) {
                res(chrome.runtime.lastError.message);
                return;
            }
            res(result);
        }));
    }
    async clearClipboard() {
        return bg.clipboard.clear();
    }
    async updateLogo(force) {
        await logoUpdater.update(force);
    }
    async echo(x) {
        return x;
    }
    sidePanelClosed() {
        sidePanelHandler.closed();
    }
    async devToolsOpened(tabId) {
        devToolsHandler.devToolsOpened(tabId);
    }
    async devToolsCloseTab(port) {
        return devToolsHandler.closeTab(ApiServerUtil.getTabId(port));
    }
}
