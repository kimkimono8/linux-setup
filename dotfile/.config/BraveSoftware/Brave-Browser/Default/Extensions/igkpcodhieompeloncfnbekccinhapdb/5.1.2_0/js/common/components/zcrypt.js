import { setGlobal } from "../global/global.js";
class ZCrypt {
    async encrypt(plaintext, isShared) {
        return bgApi.crypto.encrypt(plaintext, isShared);
    }
    async decrypt(ciphertext, isShared) {
        return bgApi.crypto.decrypt(ciphertext, isShared);
    }
    async fileEncrypt(plaintext, isShared) {
        return bgApi.crypto.file.encrypt(plaintext, isShared);
    }
    async fileDecrypt(ciphertext = "", isShared) {
        return bgApi.crypto.file.decrypt(ciphertext, isShared);
    }
    async extEncrypt(plaintext) {
        return bgApi.crypto.ext.encrypt(plaintext);
    }
    async extDecrypt(ciphertext) {
        return bgApi.crypto.ext.decrypt(ciphertext);
    }
}
export const zcrypt = new ZCrypt();
setGlobal("zcrypt", zcrypt);
