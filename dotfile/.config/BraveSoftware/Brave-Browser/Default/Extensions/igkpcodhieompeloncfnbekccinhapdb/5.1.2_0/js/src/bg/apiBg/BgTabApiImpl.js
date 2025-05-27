import { bg } from "../bg.js";
import { commonDb, devToolsHandler } from "../Context.js";
import { bgStorage } from "../storage/export.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgTabApiImpl {
    async loadFromMemory(key, defaultVal, port) {
        return bgStorage.tab.load(ApiServerUtil.getTabId(port), key, defaultVal);
    }
    async loadFromDomainMemory(key, defaultVal, port) {
        return bgStorage.tab.loadDomain(ApiServerUtil.getTab(port), key, defaultVal);
    }
    async saveToMemory(key, val, port) {
        return bgStorage.tab.save(ApiServerUtil.getTabId(port), key, val);
    }
    async saveToDomainMemory(key, val, allowedDomains, port) {
        return bgStorage.tab.saveDomain(ApiServerUtil.getTabId(port), key, val, allowedDomains);
    }
    async removeFromMemory(key, port) {
        return bgStorage.tab.remove(ApiServerUtil.getTabId(port), key);
    }
    async clearMemory(port) {
        return bgStorage.tab.clear(ApiServerUtil.getTabId(port));
    }
    async showConfirmFrame(port) {
        return csApi.frame.showConfirmFrame(ApiServerUtil.getTabId(port));
    }
    async closeFrame(port) {
        return csApi.frame.closeFrame({}, ApiServerUtil.getTabId(port));
    }
    async getFrameId(port) {
        return ApiServerUtil.getFrameId(port);
    }
    async getTabDomain(port) {
        return js.url.getParentDomain(ApiServerUtil.getTabUrl(port));
    }
    async getTabUrl(port) {
        return ApiServerUtil.getTabUrl(port);
    }
    async saveZIconSelector(selector, port) {
        return commonDb.ziconTable.save(ApiServerUtil.getTabUrl(port), selector);
    }
    async loadZIconSelectors(port) {
        return commonDb.ziconTable.load(ApiServerUtil.getTabUrl(port));
    }
    async isNeverSaveUrl(port) {
        return bg.neverSaveUrls.isNeverSaveUrl(ApiServerUtil.getTabUrl(port));
    }
    async allowPermanentUse(secretId, allowedUrl) {
        return bg.confirmFrame.allowPermanent(secretId, allowedUrl);
    }
    async finishReset(successfull, port) {
        return bg.passwordReset.finishReset(ApiServerUtil.getTabId(port), successfull);
    }
    setConfirmUse(frameId, allow, port) {
        return csApi.other.setConfirmResponse(allow, { tabId: ApiServerUtil.getTabId(port), frameId });
    }
    async closeTab(port) {
        const tabId = ApiServerUtil.getTabId(port);
        if (!tabId) {
            logError("cannot close tab", port);
            return;
        }
        return brApi.tab.closeTab(tabId);
    }
    async closeTabWithId(tabId) {
        return brApi.tab.closeTab(tabId);
    }
    async checkDevToolsOpen(port) {
        return devToolsHandler.isDevToolsOpen(ApiServerUtil.getTabId(port));
    }
    async showAlert(config, port) {
        const tabId = ApiServerUtil.getTabId(port);
        return bg.csUtil.showAlert(tabId, config);
    }
    async downloadFileInCS(param, _port) {
        try {
            const url = await urlProvider.getVaultUrl() + "/addonRedirect.do";
            const tab = await brApi.tab.createTab({ background: true, url });
            await brApi.tab.getCompletedTab(tab.id);
            for (let i = 0; i < 10; i++) {
                if (await csApi.isConnectable({ tabId: tab.id })) {
                    break;
                }
                await js.time.delay(0.3);
            }
            await csApi.frame.downloadFile(param, tab.id);
        }
        catch (e) {
            logError(e);
        }
    }
    async isLoginDomainPath(port) {
        return domainHandler.isLoginDomainPath(ApiServerUtil.getTabUrl(port));
    }
    async loadZMapsCountries() {
        try {
            const countryData = await commonDb.zmapsCountryTable.loadAll();
            return countryData.map(data => data.country);
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    async loadZMapsStates(country) {
        return bg.zmaps.getStates(country);
    }
    async loadZMapsDistricts(country, state) {
        return bg.zmaps.getDistricts(country, state);
    }
    async saveNewCountry(country) {
        return bg.zmaps.saveCountryToDB(country);
    }
    async saveNewState(country, state) {
        return bg.zmaps.saveStateToDB(country, state);
    }
    async saveNewCity(country, state, city) {
        return bg.zmaps.saveCityToDB(country, state, city);
    }
    checkConnectable() { throw "NOT_NEEDED"; }
    hasDevToolsOpened(port) {
        return devToolsHandler.isValidTab(ApiServerUtil.getTabId(port));
    }
}
