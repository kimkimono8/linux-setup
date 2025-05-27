import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { VtLoginState } from "../../service/vt/constants/constants.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
import { badgeMenuHandler } from "../activeTab/export.js";
import { bg } from "../bg.js";
import { bgEventServer, db, inactivityHandler } from "../Context.js";
export class Vault {
    async isUnlocked() {
        try {
            const unlockPromise = bg.vaultLogin.unlockPromise;
            if (unlockPromise) {
                try {
                    await unlockPromise;
                }
                catch (e) { }
            }
            const masterKey = await zsessionStorage.load(SessionStorageKeys.MASTER_KEY, "");
            const unlocked = Boolean(masterKey);
            return unlocked;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async lock() {
        try {
            await bg.ztabHandler.closeZTab();
            await zsessionStorage.clear();
            await bg.zcrypt.clearCachedVariableKeys();
            await bg.clipboard.clear();
            badgeMenuHandler.changeState(VtLoginState.LOCKED);
            bgEventServer.login.locked();
            inactivityHandler.clearAlarms();
        }
        catch (e) {
            logError(e);
        }
    }
    async silentSignOut() {
        try {
            await db.clean();
            const persist_keys = [];
            const persist_input = {};
            persist_keys.forEach(x => persist_input[x] = "");
            const persist_obj = await zlocalStorage.loadAll(persist_input);
            await zlocalStorage.clear();
            await zsessionStorage.clear();
            await zlocalStorage.saveAll(persist_obj);
            await bg.clipboard.clear();
            bgEventServer.login.loggedOut();
            await js.time.delay(0.5);
            await brApi.runtime.reload();
        }
        catch (e) {
            logError(e);
        }
    }
    async signOut() {
        const staySignedIn = await zlocalStorage.load(VtSettings.STAY_SIGNED_IN, false);
        if (staySignedIn) {
            return this.silentSignOut();
        }
        return this.forceSignOut();
    }
    async forceSignOut() {
        const accountsUrl = urlProvider.getAccountsUrl();
        js.time.delay(0.5).then(() => brApi.tab.create(accountsUrl + "/logout?servicename=ZohoVault"));
        return this.silentSignOut();
    }
}
