import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { accountDb } from "../Context.js";
import { MapTableKey } from "../service/db/enum/MapTableKey.js";
export class ExtCryptoImpl {
    aesKey = null;
    async init() {
        try {
            await this.restoreKey();
        }
        catch (e) {
            logError(e);
        }
    }
    async initPostUnlock() {
        try {
            const masterKey = await bg.zcrypt.getMasterKey();
            if (!masterKey) {
                throw "EMPTY_MASTER_KEY";
            }
            await this.initKey();
        }
        catch (e) {
            logError(e);
        }
    }
    async encrypt(plaintext) {
        try {
            if (!this.aesKey) {
                throw "NO_AES_KEY";
            }
            return await js.crypto.aes.encrypt(plaintext, this.aesKey);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async decrypt(ciphertext) {
        try {
            if (!this.aesKey) {
                throw "NO_AES_KEY";
            }
            return await js.crypto.aes.decrypt(ciphertext, this.aesKey);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async initKey() {
        try {
            await this.loadKeyFromDb();
            if (this.aesKey) {
                return;
            }
            this.aesKey = (await js.crypto.aes.generateKey()).result;
            const exportedKey = (await js.crypto.aes.exportKey(this.aesKey)).result;
            const encryptedExportedKey = await bg.zcrypt.encrypt(exportedKey, false);
            await accountDb.mapTable.save(MapTableKey.EXT_LOCAL_DATA_KEY, encryptedExportedKey);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreKey() {
        try {
            const exportedKey = await zsessionStorage.load(SessionStorageKeys.EXT_CRYPTO_AES_KEY, "");
            if (!exportedKey) {
                return;
            }
            this.aesKey = (await js.crypto.aes.importKey(exportedKey)).result;
        }
        catch (e) {
            logError(e);
        }
    }
    async loadKeyFromDb() {
        try {
            if (this.aesKey) {
                return;
            }
            const encryptedExportedKey = await accountDb.mapTable.load(MapTableKey.EXT_LOCAL_DATA_KEY);
            if (!encryptedExportedKey) {
                return;
            }
            try {
                const exportedKey = await bg.zcrypt.decrypt(encryptedExportedKey, false);
                this.aesKey = (await js.crypto.aes.importKey(exportedKey)).result;
                await zsessionStorage.save(SessionStorageKeys.EXT_CRYPTO_AES_KEY, exportedKey);
            }
            catch (e) {
                console.info(e);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
