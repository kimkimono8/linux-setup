import { bg } from "../bg.js";
import { commonDb } from "../Context.js";
class TabInfo {
    url;
    favIconUrl;
}
export class LogoUpdater {
    async update(force) {
        try {
            const tabInfoResult = await this.getActiveTabInfo();
            if (!tabInfoResult.ok) {
                return;
            }
            const tabInfo = tabInfoResult.result;
            const hostname = js.url.getHostName(tabInfo.url);
            const needUpdate = force || await commonDb.logoTable.isLogoNeeded(hostname);
            if (!needUpdate) {
                return;
            }
            const logo = await bg.offscreenApi.getLogo(tabInfo.favIconUrl);
            if (!logo) {
                return;
            }
            await commonDb.logoTable.save(tabInfo.url, logo);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getActiveTabInfo() {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            if (!activeTab || !activeTab.favIconUrl) {
                return fnOut.NONE;
            }
            const url = activeTab.url;
            const isValidHttpUrl = js.url.isValid(url) && url.startsWith("http");
            if (!isValidHttpUrl) {
                return fnOut.NONE;
            }
            const tabInfo = new TabInfo();
            tabInfo.favIconUrl = activeTab.favIconUrl;
            tabInfo.url = url;
            return fnOut.result(tabInfo);
        }
        catch (e) {
            return fnOut.error(e);
        }
    }
}
