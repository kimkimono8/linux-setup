import { bg } from "../../src/bg/bg.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
export class BgNeverSaveChecker {
    async checkNoNeedAutoSaveUpdate(tabId, url) {
        return new AutoSaveNeverSaveChecker().checkNeedSaveDisable(tabId, url);
    }
    async checkNoNeedUpdateLoginPasswordChange(tabId) {
        return new LoginUpdateNeverSaveChecker().checkNeedUpdateDisable(tabId);
    }
}
class BaseNeverSaveChecker {
    async checkNeedDisable(url) {
        try {
            const unlocked = await bg.vault.isUnlocked();
            if (!unlocked) {
                return true;
            }
            const autoSave = await zlocalStorage.load(LocalStorageKeys.AUTO_SAVE_UPDATE_PASSWORDS, true);
            if (!autoSave) {
                return true;
            }
            const isNeverSaveUrl = await bg.neverSaveUrls.isNeverSaveUrl(url);
            if (isNeverSaveUrl) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
class AutoSaveNeverSaveChecker extends BaseNeverSaveChecker {
    async checkNeedSaveDisable(tabId, url) {
        try {
            const disableSave = await super.checkNeedDisable(url);
            if (disableSave) {
                return true;
            }
            const isInLogin = await bg.vaultSecrets.secretLogin.recording.isInLogin(tabId);
            if (isInLogin) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
class LoginUpdateNeverSaveChecker extends BaseNeverSaveChecker {
    async checkNeedUpdateDisable(tabId) {
        try {
            const tab = await brApi.tab.getTab(tabId);
            const disableSave = await super.checkNeedDisable(tab.url);
            if (disableSave) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
