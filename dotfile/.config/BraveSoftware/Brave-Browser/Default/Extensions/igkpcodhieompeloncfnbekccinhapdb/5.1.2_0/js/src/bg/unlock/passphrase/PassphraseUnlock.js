import { ConfigKeys } from "../../../conf/service/constants.js";
import { UnlockMethod } from "../../../service/bgApi/types.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { vapi } from "../../Context.js";
import { bg } from "../../bg.js";
import { PBKDF2Algorithm } from "./PBKDF2Algorithm.js";
import { PassphraseUnlockData } from "./PassphraseUnlockData.js";
import { SHAAlgorithm } from "./SHAAlgorithm.js";
export class PassphraseUnlockImpl {
    gg;
    MAX_INVALID_ATTEMPTS = 5;
    data = new PassphraseUnlockData();
    pbkdf2Algorithm;
    shaAlgorithm;
    constructor(gg) {
        this.gg = gg;
        this.pbkdf2Algorithm = new PBKDF2Algorithm(gg);
        this.shaAlgorithm = new SHAAlgorithm(gg);
    }
    init() { }
    async unlock(passphrase) {
        try {
            await this.data.init();
            const unlocker = this.getUnlockAlgorithm(this.data.loginType);
            const unlockResult = await unlocker.unlock(passphrase);
            if (!unlockResult.ok) {
                const respResult = { unlocked: false };
                await this.handleInvalidMasterPassword(respResult);
                return respResult;
            }
            try {
                bg.vaultSync.afterSyncLicenseComplete().then(() => {
                    this.gg.unlock.oneauth.sync();
                    this.gg.unlock.webauthn.sync();
                });
            }
            catch (e) {
                logError(e);
            }
            const key = unlockResult.result;
            await bg.vaultLogin.unlockVault(key);
            this.gg.unlock.setLastUnlockMethod(UnlockMethod.MASTER);
            vapi.auditMasterPassword(true);
            if (isDevMode && config.get(ConfigKeys.CACHE_DEV_MASTER_PASSWORD)) {
                zlocalStorage.save(LocalStorageKeys.DEV_MASTER_PASSWORD, passphrase);
            }
            return { unlocked: true };
        }
        catch (e) {
            logError(e);
            return { unlocked: false };
        }
    }
    async handleInvalidMasterPassword(unlockResult) {
        try {
            vapi.auditMasterPassword(false);
            const invalidCount = await zlocalStorage.load(LocalStorageKeys.PASSPHRASE_INVALID_COUNT, 0) + 1;
            const remainingAttempts = this.MAX_INVALID_ATTEMPTS - invalidCount;
            unlockResult.attemptsRemaining = remainingAttempts;
            if (remainingAttempts > 0) {
                await zlocalStorage.save(LocalStorageKeys.PASSPHRASE_INVALID_COUNT, invalidCount);
                return;
            }
            await bg.vault.forceSignOut();
        }
        catch (e) {
            logError(e);
        }
    }
    getUnlockAlgorithm(loginType) {
        try {
            const PBKDF2_AES = "PBKDF2_AES";
            const SHA256 = "SHA256";
            switch (loginType) {
                case PBKDF2_AES: return this.pbkdf2Algorithm;
                case SHA256: return this.shaAlgorithm;
                default: throw "INVALID_ALGORITH: " + loginType;
            }
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
}
