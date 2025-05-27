import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { bg } from "../../bg.js";
import { vapi } from "../../Context.js";
import { CredentialGetter } from "./CredentialGetter.js";
import { WebAuthnStorage } from "./WebauthnStroage.js";
import { WebAuthnUnlocker } from "./WebauthnUnlocker.js";
export class WebauthnUnlockImpl {
    gg;
    storage = new WebAuthnStorage();
    credentialGetter = new CredentialGetter();
    unlocker;
    constructor(gg) {
        this.gg = gg;
        this.unlocker = new WebAuthnUnlocker(this.gg);
    }
    init() {
        this.credentialGetter.init();
    }
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
            const serverPublicKeyData = (await vapi.unlock.webauthn.getPublicKey()).result.operation.Details.key;
            if (!serverPublicKeyData) {
                throw "EMPTY_SERVER_PUBLIC_KEY";
            }
            const serverPublicKey = await js.crypto.rsa.importPublicKey(serverPublicKeyData);
            const serverEncryptedLocalKey = await js.crypto.rsa.encrypt(exportedLocalKey, serverPublicKey);
            const localEncryptedMasterKey = await js.crypto.aes.encrypt(masterKey, localKey);
            await this.storage.save(localEncryptedMasterKey, serverEncryptedLocalKey);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async unlock() {
        return this.unlocker.startUnlock();
    }
    async sync() {
        try {
            const enabled = await zlocalStorage.load(LocalStorageKeys.WEBAUTHN_UNLOCK_ENABLED, false);
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
            if (js.browser.isSafari()) {
                return false;
            }
            const KEYS = LocalStorageKeys;
            const existing = await zlocalStorage.loadAll({
                [KEYS.RESTRICT_WEBAUTHN_UNLOCK]: false,
                [KEYS.WEBAUTHN_UNLOCK_ENABLED]: false,
                [KEYS.WEBAUTHN_UNLOCK]: null,
            });
            return !existing[KEYS.RESTRICT_WEBAUTHN_UNLOCK] && existing[KEYS.WEBAUTHN_UNLOCK_ENABLED] && existing[KEYS.WEBAUTHN_UNLOCK];
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    setCredential(credential) {
        this.unlocker.continueUnlock(credential);
    }
    async getCredentialCount() {
        try {
            const credentials = (await vapi.unlock.webauthn.getCredentials()).result.operation.Details;
            return fnOut.result(credentials.length);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async updateSetting(enable) {
        try {
            const value = enable ? bg.vaultSettings.SERVER_VALUE.ENABLED : bg.vaultSettings.SERVER_VALUE.DISABLED;
            (await bg.vaultSettings.changeSettingInServer(bg.vaultSettings.SERVER_NAME.WEBAUTHN_UNLOCK, value)).result;
            await zlocalStorage.save(LocalStorageKeys.WEBAUTHN_UNLOCK_ENABLED, enable);
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
}
