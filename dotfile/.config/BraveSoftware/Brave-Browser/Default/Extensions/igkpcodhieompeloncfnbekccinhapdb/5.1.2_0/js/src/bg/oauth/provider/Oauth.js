import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { oauthExternal, setupConfig, storage, tokenGenerator, urlProviderImpl } from "./Context.js";
import { OAuthFetch } from "./OAuthFetch.js";
export class OauthImpl {
    loggedIn = false;
    fetch = new OAuthFetch();
    async init() {
        try {
            this.refreshToken = js.fn.wrapper.createSingleInstance(this.refreshToken, this);
            this.getAccessToken = js.fn.wrapper.createSingleInstance(this.getAccessToken, this);
            setupConfig.init();
            await urlProviderImpl.init();
            await this.initDev();
            (await tokenGenerator.init()).result;
            await this.initLoggedIn();
            if (!this.loggedIn) {
                return;
            }
            await this.refreshIfExpired();
            this.setupTokenAutoRefresh();
        }
        catch (e) {
            logError(e);
        }
    }
    async initDev() {
        try {
            if (!isDevMode) {
                return;
            }
            const domains = setupConfig.domains;
            const domain = await storage.loadDomain();
            if (!domain) {
                return;
            }
            if (domains.includes(domain)) {
                return;
            }
            await storage.clear();
            await oauthExternal.silentSignOut();
        }
        catch (e) {
            logError(e);
        }
    }
    async generateTokens() {
        oauthExternal.closePopup();
        return tokenGenerator.generateTokens();
    }
    async initLoggedIn() {
        try {
            const refreshToken = await storage.loadRefreshToken();
            this.loggedIn = Boolean(refreshToken);
        }
        catch (e) {
            logError(e);
        }
    }
    isLoggedIn() {
        return this.loggedIn;
    }
    async autoRefreshToken() {
        const refreshToken = await storage.loadRefreshToken();
        if (!refreshToken) {
            return;
        }
        if (!(await this.isUserActive())) {
            return;
        }
        const MIN_VALID_MINUTES = 50;
        const validForMinutes = await storage.getTokenValidForMinutes();
        if (validForMinutes > MIN_VALID_MINUTES) {
            this.setupTokenAutoRefresh(validForMinutes - 5);
            return;
        }
        const resp = await this.fetch.fetchAccessToken(refreshToken);
        if (!resp.access_token) {
            return;
        }
        await storage.saveAccessToken(resp.access_token);
        this.setupTokenAutoRefresh();
    }
    setupTokenAutoRefresh(refreshInMinutes = 0) {
        try {
            const REFRESH_IN_MINUTES = 55;
            const refreshMin = refreshInMinutes || REFRESH_IN_MINUTES;
            const refreshSeconds = refreshMin * 60;
            brApi.alarm.createAlarm(oauthExternal.getOauthAlarmName(), refreshSeconds);
        }
        catch (e) {
            logError(e);
        }
    }
    async getAccessToken() {
        try {
            await this.refreshIfExpired();
            const accessToken = await zlocalStorage.load(LocalStorageKeys.ACCESS_TOKEN, "");
            if (!accessToken) {
                throw "NO_ACCESS_TOKEN";
            }
            return accessToken;
        }
        catch (e) {
            await oauthExternal.silentSignOut();
            logError(e);
            return "";
        }
    }
    async isUserActive() {
        try {
            const lastActive = await zlocalStorage.load(LocalStorageKeys.LAST_ACTIVE, 0);
            const secondsPassed = js.time.getSecondsPassed(lastActive);
            return secondsPassed < (30 * 60);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async refreshIfExpired() {
        try {
            const validUpto = await zlocalStorage.load(LocalStorageKeys.TOKEN_VALID_UPTO, 0);
            if (validUpto > Date.now()) {
                return;
            }
            await this.refreshToken();
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    async refreshToken() {
        try {
            const refreshToken = await storage.loadRefreshToken();
            if (!refreshToken) {
                await oauthExternal.silentSignOut();
                return;
            }
            const resp = await this.fetch.fetchAccessToken(refreshToken);
            if (!resp.access_token) {
                await oauthExternal.silentSignOut();
                return;
            }
            await storage.saveAccessToken(resp.access_token);
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
}
