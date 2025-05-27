import { bg } from "../bg.js";
import { vapi } from "../Context.js";
export class WebUnlock {
    WEB_UNLOCK_INFO_KEY = "WEB_UNLOCK_INFO_KEY";
    MAX_ALLOWED_PLUS_TIME = 2 * 60 * 1000;
    unlockInfo = null;
    async getUnlockKey(tabId) {
        try {
            const isAllowedTab = await this.checkIsAllowedTab(tabId);
            if (!isAllowedTab) {
                return "";
            }
            const unlocked = await bg.vault.isUnlocked();
            if (!unlocked) {
                return "";
            }
            const secretKey = await bg.zcrypt.getMasterKey();
            const respJson = (await vapi.unlock.getWebUnlockPublicKey()).result;
            const publicKeyHex = respJson.operation.Details.public_key;
            const publicKey = await js.crypto.rsa.importPublicKeyHex(publicKeyHex);
            const encryptedSecretKeyHex = await js.crypto.rsa.encryptHex(secretKey, publicKey);
            this.setAllowedTabId(Number.NEGATIVE_INFINITY);
            return encryptedSecretKeyHex;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async checkIsAllowedTab(tabId) {
        try {
            if (!this.unlockInfo) {
                this.unlockInfo = await zsessionStorage.load(this.WEB_UNLOCK_INFO_KEY, null);
            }
            const isAllowed = this.unlockInfo &&
                (tabId == this.unlockInfo.allowedTabId) && (Date.now() < this.unlockInfo.allowedUpto);
            return isAllowed;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    setAllowedTabId(tabId) {
        this.unlockInfo = {
            allowedTabId: tabId,
            allowedUpto: Date.now() + this.MAX_ALLOWED_PLUS_TIME
        };
        zsessionStorage.save(this.WEB_UNLOCK_INFO_KEY, this.unlockInfo);
    }
}
