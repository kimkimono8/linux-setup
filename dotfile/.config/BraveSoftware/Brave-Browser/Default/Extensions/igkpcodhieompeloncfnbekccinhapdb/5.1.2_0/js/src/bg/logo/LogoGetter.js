import { bg } from "../bg.js";
import { commonDb } from "../Context.js";
export class LogoGetter {
    async getLogo(url) {
        try {
            if (!js.url.isValid(url)) {
                return "";
            }
            const openedTabLogo = await this.getLogoFromOpenedTabs(url);
            if (openedTabLogo) {
                await commonDb.logoTable.save(url, openedTabLogo);
                return openedTabLogo;
            }
            const storedLogo = await commonDb.logoTable.load(url);
            return storedLogo || "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getLogoFromOpenedTabs(url) {
        try {
            const logoTabResult = await this.getLogoTab(url);
            if (!logoTabResult.ok) {
                return "";
            }
            const logoTab = logoTabResult.result;
            const logo = await bg.offscreenApi.getLogo(logoTab.favIconUrl);
            return logo || "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getLogoTab(url) {
        try {
            const tabs = await brApi.tab.getAllTabs();
            const validTabs = tabs.filter(x => js.url.isValid(x.url) && x.favIconUrl);
            const hostTab = this.getHostMatchingTab(validTabs, url);
            if (hostTab) {
                return fnOut.result(hostTab);
            }
            const domainTab = this.getDomainMatchingTab(validTabs, url);
            if (domainTab) {
                return fnOut.result(domainTab);
            }
            return fnOut.NONE;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    getHostMatchingTab(tabList, url) {
        try {
            const hostname = js.url.getHostName(url);
            for (let tab of tabList) {
                if (js.url.getHostName(tab.url) == hostname) {
                    return tab;
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getDomainMatchingTab(tabList, url) {
        try {
            const domain = js.url.getParentDomain(url);
            for (let tab of tabList) {
                if (js.url.getParentDomain(tab.url) == domain) {
                    return tab;
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
