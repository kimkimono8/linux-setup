import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { DomMsgServer } from "./DomMsgServer.js";
const web_nfs = {
    GET_LOGGED_IN_DC: "web.get_dc",
    CHECK_UNLOCKED_WITH: "check_unlocked_with",
    IS_LOGGED_IN: "isLoggedIn",
    IS_UNLOCKED: "isUnlocked",
    LOGIN: "login",
    SYNC_SECRET: "sync.secret",
    DELETE_STORED_SECRETS: "delete_stored_secrets",
    GET_SECRET_KEY: "web.get_secret_key",
    SYNC_THEME: "sync.theme",
    CLEAR_CLIPBOARD: "CLEAR_CLIPBOARD",
};
export class VaultDomMsgServer extends DomMsgServer {
    name = "vault_ext";
    async [web_nfs.CHECK_UNLOCKED_WITH](userId) {
        return this.isLoggedIn(userId);
    }
    async isLoggedIn(userId) {
        try {
            const curUserId = await zlocalStorage.load(LocalStorageKeys.USER_ID, "");
            return userId == curUserId;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async isUnlocked(userId) {
        try {
            return (await this.isLoggedIn(userId)) && (await bgApi.login.isUnlocked());
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    [web_nfs.LOGIN](secretId, url) {
        bgApi.secret.loginFromWeb(secretId, url);
    }
    [web_nfs.SYNC_SECRET](secretId) {
        bgApi.vaultWeb.syncSecret(secretId);
    }
    [web_nfs.DELETE_STORED_SECRETS](secretIds) {
        bgApi.vaultWeb.deleteLocalSecrets(secretIds);
    }
    [web_nfs.GET_SECRET_KEY]() {
        return bgApi.vaultWeb.getWebUnlockKey();
    }
    [web_nfs.GET_LOGGED_IN_DC]() {
        return bgApi.vault.getDomain();
    }
    [web_nfs.SYNC_THEME]() {
        bgApi.vault.syncThemeFromWeb();
    }
    [web_nfs.CLEAR_CLIPBOARD]() {
        return bgApi.other.clearClipboard();
    }
}
