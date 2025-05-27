import { UnlockMethod } from "../../../service/bgApi/types.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { SessionStorageKeys } from "../../../service/storage/constants/SessionStorageKeys.js";
import { bg } from "../../bg.js";
import { vapi } from "../../Context.js";
import { DeviceProvider } from "./DeviceProvider.js";
import { OneauthStroage } from "./OneauthStorage.js";
import { PushUnlock } from "./PushUnlock.js";
export class OneauthUnlockImpl {
    gg;
    storage = new OneauthStroage();
    deviceProvider = new DeviceProvider();
    pushUnlock;
    constructor(gg) {
        this.gg = gg;
        this.pushUnlock = new PushUnlock(gg);
    }
    init() { }
    async enable(enable) {
        try {
            if (!enable) {
                await this.storage.clear();
                (await this.updateSetting(false)).result;
                return fnOut.OK;
            }
            (await this.setup()).result;
            (await this.updateSetting(true)).result;
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async setup() {
        try {
            const masterKey = await bg.zcrypt.getMasterKey();
            if (!masterKey) {
                throw "EMPTY_MASTER_KEY";
            }
            const localKey = (await js.crypto.aes.generateKey()).result;
            const exportedLocalKey = (await js.crypto.aes.exportKey(localKey)).result;
            const deviceResult = await this.deviceProvider.getDevice();
            if (!deviceResult.ok) {
                return deviceResult;
            }
            const device = deviceResult.result;
            const oneAuthPublicKey = await js.crypto.rsa.importPublicKey(device.publicKey);
            const oneAuthEncryptedLocalKey = await js.crypto.rsa.encrypt(exportedLocalKey, oneAuthPublicKey);
            const localEncryptedMasterKey = await js.crypto.aes.encrypt(masterKey, localKey);
            await this.storage.save(device, localEncryptedMasterKey, oneAuthEncryptedLocalKey);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async unlock() {
        try {
            await zsessionStorage.save(SessionStorageKeys.ONEAUTH_UNLOCK_STARTED, Date.now());
            const keyResp = await this.pushUnlock.unlock();
            if (!keyResp.ok) {
                this.oneAuthUnlockComplete(keyResp);
                return keyResp;
            }
            const key = keyResp.result;
            await bg.vaultLogin.unlockVault(key);
            vapi.auditUserAction("UnlockedUsingOneAuth");
            this.gg.unlock.setLastUnlockMethod(UnlockMethod.ONEAUTH);
            this.oneAuthUnlockComplete(fnOut.OK);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            this.oneAuthUnlockComplete(fnOut.error(e));
            return fnOut.error(e);
        }
        finally {
            await zsessionStorage.remove(SessionStorageKeys.ONEAUTH_UNLOCK_STARTED);
        }
    }
    async resendPush() {
        this.pushUnlock.resendPush();
    }
    async sync() {
        try {
            const enabled = await zlocalStorage.load(LocalStorageKeys.ONEAUTH_UNLOCK_ENABLED, false);
            if (!enabled) {
                return;
            }
            await this.setup();
        }
        catch (e) {
            logError(e);
        }
    }
    async isUnlockable() {
        try {
            const KEYS = LocalStorageKeys;
            const existing = await zlocalStorage.loadAll({
                [KEYS.RESTRICT_ONEAUTH_UNLOCK]: false,
                [KEYS.ONEAUTH_UNLOCK_ENABLED]: false,
                [KEYS.ONEAUTH_UNLOCK]: null,
            });
            return !existing[KEYS.RESTRICT_ONEAUTH_UNLOCK] && existing[KEYS.ONEAUTH_UNLOCK_ENABLED] && existing[KEYS.ONEAUTH_UNLOCK];
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async oneAuthUnlockComplete(resp) {
        try {
            const hasPopup = await bg.popupClient.checkConnectable();
            if (hasPopup) {
                bg.popupClient.oneAuthUnlockComplete(resp);
                return;
            }
            if (!resp.error) {
                return;
            }
            this.gg.util.setUnlockError(UnlockMethod.ONEAUTH, resp);
        }
        catch (e) {
            logError(e);
        }
    }
    async updateSetting(enable) {
        try {
            const value = enable ? bg.vaultSettings.SERVER_VALUE.ENABLED : bg.vaultSettings.SERVER_VALUE.DISABLED;
            (await bg.vaultSettings.changeSettingInServer(bg.vaultSettings.SERVER_NAME.ONEAUTH_UNLOCK, value)).result;
            await zlocalStorage.save(LocalStorageKeys.ONEAUTH_UNLOCK_ENABLED, enable);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
}
