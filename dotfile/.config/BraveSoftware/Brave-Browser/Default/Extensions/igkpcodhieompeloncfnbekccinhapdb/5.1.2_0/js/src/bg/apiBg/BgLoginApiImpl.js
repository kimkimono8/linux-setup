import { bg } from "../bg.js";
import { unlock } from "../Context.js";
export class BgLoginApiImpl {
    async isLoggedIn() {
        return oauth.isLoggedIn();
    }
    async isUnlocked() {
        return bg.vault.isUnlocked();
    }
    async generateOauthTokens() {
        oauth.generateTokens();
    }
    async refreshTokenIfExpired() {
        await oauth.getAccessToken();
    }
    async initLogin() {
        return bg.vaultLogin.init();
    }
    async unlock(passphrase) {
        return unlock.passphrase.unlock(passphrase);
    }
    async lock() {
        return bg.vault.lock();
    }
    async signOut() {
        return bg.vault.signOut();
    }
    checkConnectable() {
        throw "";
    }
}
