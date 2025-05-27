import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
class OAuthTokenError {
    EMPTY = "EMPTY";
    EXPIRED = "EXPIRED";
}
export class OAuthStorage {
    ERROR = new OAuthTokenError();
    saveDomain(domain) {
        return this.save(LocalStorageKeys.DOMAIN, domain);
    }
    loadDomain() {
        return this.load(LocalStorageKeys.DOMAIN, "");
    }
    async saveAccessToken(accessToken) {
        const MINUTES_55_MS = 55 * 60 * 1000;
        await this.save(LocalStorageKeys.ACCESS_TOKEN, accessToken);
        await this.save(LocalStorageKeys.TOKEN_VALID_UPTO, Date.now() + MINUTES_55_MS);
    }
    async saveRefreshToken(refreshToken) {
        return this.save(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
    }
    async loadRefreshToken() {
        return this.load(LocalStorageKeys.REFRESH_TOKEN, "");
    }
    async getTokenValidForMinutes() {
        const validUptoMs = await this.load(LocalStorageKeys.TOKEN_VALID_UPTO, 0);
        if (validUptoMs < Date.now()) {
            return 0;
        }
        return (validUptoMs - Date.now()) / 1000 / 60;
    }
    async clear() {
        const KEY = LocalStorageKeys;
        return zlocalStorage.remove([
            KEY.ACCESS_TOKEN,
            KEY.REFRESH_TOKEN,
            KEY.DOMAIN
        ]);
    }
    async save(key, val) {
        return zlocalStorage.save(key, val);
    }
    async load(key, defaultVal = null) {
        return zlocalStorage.load(key, defaultVal);
    }
}
