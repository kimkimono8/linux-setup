import { ConfigKeys } from "../../conf/service/constants.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { Browser } from "../../service/vt/constants/Browser.js";
export class BgBasicAuthenticationHandler {
    loginData = null;
    providedCredentials = false;
    lastBasicAuthEvent = {
        happenedOn: 0,
        requestId: "",
        tabId: 0,
        url: ""
    };
    init() {
        try {
            const isFirefox = config.get(ConfigKeys.BROWSER) == Browser.FIREFOX;
            if (isFirefox) {
                globalThis.browser.webRequest.onAuthRequired.addListener(this.handleFirefoxAuthRequired.bind(this), { urls: ["http://*/*", "https://*/*"] }, ["blocking"]);
                return;
            }
            if (chrome?.webRequest?.onAuthRequired) {
                chrome.webRequest.onAuthRequired.addListener(this.handleAuthRequired.bind(this), { urls: ["http://*/*", "https://*/*"] }, ["asyncBlocking"]);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async handleBasicAuthenticationLogin(loginData) {
        try {
            await this.repromptIfNeeded();
            this.loginData = loginData;
            this.providedCredentials = false;
        }
        catch (e) {
            logError(e);
        }
    }
    async repromptIfNeeded() {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            const isCompletedActiveTab = activeTab && (activeTab.status == "complete");
            if (!isCompletedActiveTab) {
                return;
            }
            await this.loadLastEventDetail();
            const isHappenedInSameTab = this.lastBasicAuthEvent.tabId == activeTab.id;
            if (!isHappenedInSameTab) {
                return;
            }
            const isWithinAMinute = this.lastBasicAuthEvent.happenedOn > (Date.now() - 60 * 1000);
            if (!isWithinAMinute) {
                return;
            }
            await brApi.tab.updateTab(activeTab.id, { url: activeTab.url });
        }
        catch (e) {
            logError(e);
        }
    }
    finishBasicAuthentication() {
        this.loginData = null;
        const loggedIn = this.providedCredentials;
        this.providedCredentials = false;
        return loggedIn;
    }
    async handleFirefoxAuthRequired(details) {
        return new Promise(res => this.handleAuthRequired(details, res));
    }
    async handleAuthRequired(details, callback) {
        try {
            await this.loadLastEventDetail();
            if (this.lastBasicAuthEvent.requestId == details.requestId) {
                callback(null);
                return null;
            }
            const isTopFrame = details.frameId == 0;
            if (!isTopFrame) {
                callback(null);
                return null;
            }
            await this.saveEventDetail(details);
            if (!this.loginData) {
                callback(null);
                return null;
            }
            const allowedDomain = this.loginData.allowedDomains.includes(js.url.getParentDomainFromHostName(details.challenger.host));
            if (!allowedDomain) {
                callback(null);
                return null;
            }
            const hasValidUsername = this.loginData.texts.length > 0 && (this.loginData.texts[0].length > 0);
            if (!hasValidUsername) {
                callback(null);
                return null;
            }
            const hasValidPassword = this.loginData.passwords.length > 0 && (this.loginData.passwords[0].length > 0);
            if (!hasValidPassword) {
                callback(null);
                return null;
            }
            const username = this.loginData.texts[0];
            const password = this.loginData.passwords[0];
            callback({
                authCredentials: {
                    username: username,
                    password: password
                }
            });
            return null;
        }
        catch (e) {
            logError(e);
            callback(null);
            return null;
        }
    }
    async loadLastEventDetail() {
        this.lastBasicAuthEvent = await zsessionStorage.load(SessionStorageKeys.LAST_BASIC_AUTH_EVENT, this.lastBasicAuthEvent);
    }
    async saveEventDetail(authEvent) {
        this.lastBasicAuthEvent.happenedOn = Date.now();
        this.lastBasicAuthEvent.requestId = authEvent.requestId;
        this.lastBasicAuthEvent.tabId = authEvent.tabId;
        this.lastBasicAuthEvent.url = authEvent.url;
        await zsessionStorage.save(SessionStorageKeys.LAST_BASIC_AUTH_EVENT, this.lastBasicAuthEvent);
    }
}
