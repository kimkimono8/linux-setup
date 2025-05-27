import { zerror } from "../../../common/enum/zerror.js";
import { SecretClassification } from "../../service/bgApi/types/Secret.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { VaultCrypto } from "./VaultCrypto.js";
import "../../../lib/file_aes.js";
import "../../../lib/rsa.js";
import "../../../lib/zohovault.js";
export class BgZCrypt {
    orgKey = "";
    masterkey = "";
    async encrypt(plaintext, isShared) {
        try {
            const key = await this.getKey(isShared);
            return Zohovault.AES.encrypt(plaintext, key, 256);
        }
        catch (e) {
            throw jserror(e + "");
        }
    }
    async encryptObject(plainObj, isShared) {
        try {
            const encryptedObj = {};
            const encryptionKey = await this.getKey(isShared);
            for (let key in plainObj) {
                encryptedObj[key] = Zohovault.AES.encrypt(plainObj[key], encryptionKey, 256);
            }
            return encryptedObj;
        }
        catch (e) {
            throw jserror(e + "");
        }
    }
    async decrypt(ciphertext, isShared) {
        try {
            const key = await this.getKey(isShared);
            const decrypted = await VaultCrypto.aesDecrypt(ciphertext, key);
            return decrypted;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async decryptObject(cipherObj, isShared) {
        try {
            const encryptionKey = await this.getKey(isShared);
            const decryptedObj = {};
            for (let key in cipherObj) {
                decryptedObj[key] = await VaultCrypto.aesDecrypt(cipherObj[key], encryptionKey);
            }
            return decryptedObj;
        }
        catch (e) {
            throw jserror(e + "");
        }
    }
    async getIsShared(classification) {
        try {
            const useOrgKey = classification == SecretClassification.ENTERPRISE && (await this.checkHasOrgKey());
            return useOrgKey;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getKey(isShared) {
        const key = isShared ? (await this.getOrgKey()) : (await this.getMasterKey());
        return key;
    }
    async clearCachedVariableKeys() {
        this.masterkey = this.orgKey = "";
    }
    async getMasterKey() {
        if (!this.masterkey) {
            this.masterkey = await zsessionStorage.load(SessionStorageKeys.MASTER_KEY, null);
        }
        if (!this.masterkey) {
            throw jserror("MASTER_KEY " + zerror.NOT_FOUND);
        }
        return this.masterkey;
    }
    async getOrgKey() {
        if (!this.orgKey) {
            this.orgKey = await zsessionStorage.load(SessionStorageKeys.ORG_KEY, null);
        }
        if (!this.orgKey) {
            throw jserror("ORG_KEY " + zerror.NOT_FOUND);
        }
        return this.orgKey;
    }
    async checkHasOrgKey() {
        try {
            const key = await zsessionStorage.load(SessionStorageKeys.ORG_KEY, null);
            const validKey = Boolean(key);
            return validKey;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    encodeBase64(text) {
        try {
            return VaultCrypto.encodeBase64(text || "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    decodeBase64(encodedText) {
        try {
            return VaultCrypto.decodeBase64(encodedText || "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    hash(text) {
        try {
            return Zohovault.hash(text);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    encryptRsa(plainText, publicKey) {
        try {
            const rsa = new RSAKey();
            rsa.setPublic(publicKey, '10001');
            return rsa.encrypt(plainText);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    decryptRsa(cipherText, privateKeyParts) {
        try {
            const privateKey = privateKeyParts.split(',');
            let rsa = new RSAKey();
            rsa.setPrivateEx(privateKey[0], privateKey[1], privateKey[2], privateKey[3], privateKey[4], privateKey[5], privateKey[6], privateKey[7]);
            return rsa.decrypt(cipherText);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async fileEncrypt(fileContent, isShared) {
        try {
            const key = await this.getKey(isShared);
            return this.fileEncryptV1(fileContent, key);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async fileDecrypt(encryptedFileContent = "", isShared) {
        try {
            const key = await this.getKey(isShared);
            return this.fileDecryptV1(encryptedFileContent, key);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    fileEncryptV1(fileContent, key) {
        try {
            return CryptoJS.AES.encrypt(fileContent, key).toString();
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    fileDecryptV1(encryptedFileContent = "", key) {
        try {
            return CryptoJS.AES.decrypt(encryptedFileContent, key).toString(CryptoJS.enc.Latin1);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
