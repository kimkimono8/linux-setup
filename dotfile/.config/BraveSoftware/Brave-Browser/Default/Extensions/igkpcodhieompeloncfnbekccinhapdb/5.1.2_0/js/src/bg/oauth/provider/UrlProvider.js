import { pkceChallenge, setupConfig, storage } from "./Context.js";
export class UrlProviderImpl {
    domain = "";
    async init() {
        try {
            this.domain = await storage.loadDomain();
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    setDomain(domain) {
        this.domain = domain;
    }
    getVaultUrl() {
        return `https://${setupConfig.vault}.${this.getDomain()}${setupConfig.port}`;
    }
    getVaultWebUrl() {
        return `${this.getVaultUrl()}/app#/unlock/extension`;
    }
    getAccountsUrl() {
        return `https://accounts.${this.getDomain()}`;
    }
    getContactsUrl() {
        return `https://contacts.${this.getDomain()}`;
    }
    getZMapsUrl() {
        return `https://maps.${this.getDomain()}`;
    }
    getDomain() {
        if (!this.domain) {
            throw "DOMAIN_NOT_INITIALIZED";
        }
        return this.domain;
    }
    getCDNServer() {
        return setupConfig.cdnServer;
    }
    async getOauthUrl() {
        try {
            const domain = await this.getPossibleDomain();
            const authUrl = `https://accounts.${domain}/oauth/v2/auth`;
            const params = new URLSearchParams();
            params.set("scope", setupConfig.scope);
            params.set("client_id", setupConfig.clientId);
            params.set("state", brApi.runtime.getUrl("/html/ZVaultGetPP.html"));
            params.set("redirect_uri", setupConfig.redirectUrl);
            params.set("response_type", "code");
            params.set("prompt", "consent");
            params.set("access_type", "offline");
            await pkceChallenge.setGrantParam(params);
            return authUrl + "?" + params;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async getPossibleDomain() {
        const domains = setupConfig.domains;
        try {
            for (let domain of domains) {
                if (await this.isRequiredDomain(domain)) {
                    return domain;
                }
            }
        }
        catch (e) {
            logError(e);
        }
        return domains[0];
    }
    async isRequiredDomain(domain) {
        try {
            const cookie = await brApi.cookie.getCookie("_z_identity", `https://accounts.${domain}`);
            return Boolean(cookie);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
