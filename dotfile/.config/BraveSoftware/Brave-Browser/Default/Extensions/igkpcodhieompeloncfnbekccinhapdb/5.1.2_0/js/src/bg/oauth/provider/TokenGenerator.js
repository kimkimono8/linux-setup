import { SessionStorageKeys } from "../../../service/storage/constants/SessionStorageKeys.js";
import { codeApi, oauthExternal, oauthImpl, setupConfig, storage, urlProviderImpl } from "./Context.js";
export class TokenGenerator {
    tabCreator = null;
    async init() {
        try {
            this.tabCreator = bgUtil.newTabCreator({ tabName: "OAUTH_TAB", reqNormal: true });
            const inProgress = await zsessionStorage.load(SessionStorageKeys.OAUTH_IN_PROGRESS, false);
            if (inProgress) {
                codeApi.init();
            }
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async generateTokens() {
        try {
            zsessionStorage.save(SessionStorageKeys.OAUTH_IN_PROGRESS, true);
            codeApi.init();
            const oauthUrl = await urlProviderImpl.getOauthUrl();
            this.tabCreator.create(oauthUrl);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async continueTokenGeneration(codeObj) {
        try {
            if (codeObj.error) {
                throw codeObj.error;
            }
            const domain = this.getDomainFromAccountsUrl(codeObj["accounts-server"]);
            await storage.saveDomain(domain);
            await urlProviderImpl.setDomain(domain);
            const grantCode = codeObj.code;
            const tokenObj = await oauthImpl.fetch.fetchRefreshToken(grantCode);
            if (tokenObj.error) {
                throw tokenObj.error;
            }
            await storage.saveAccessToken(tokenObj.access_token);
            await storage.saveRefreshToken(tokenObj.refresh_token);
            oauthImpl.setupTokenAutoRefresh();
            await oauthImpl.initLoggedIn();
            oauthExternal.loggedIn();
        }
        catch (e) {
            logError(e);
        }
        codeApi.disconnect();
        this.tabCreator.close();
        this.closeTabSafari();
        zsessionStorage.remove(SessionStorageKeys.OAUTH_IN_PROGRESS);
    }
    getDomainFromAccountsUrl(url) {
        for (let domain of setupConfig.domains) {
            if (url.endsWith(domain)) {
                return domain;
            }
        }
        throw new Error("Invalid dc");
    }
    async closeTabSafari() {
        try {
            if (!bgUtil.isSafari()) {
                return;
            }
            const url = brApi.runtime.getUrl("/html/ZVaultGetPP.html");
            const tabs = await brApi.tab.queryTabs({ url });
            tabs.forEach(x => brApi.tab.closeTab(x.id));
        }
        catch (e) {
            logError(e);
        }
    }
}
