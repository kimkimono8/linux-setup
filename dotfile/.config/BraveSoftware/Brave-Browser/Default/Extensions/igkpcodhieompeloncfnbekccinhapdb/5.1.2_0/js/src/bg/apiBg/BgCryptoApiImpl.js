import { bg } from "../bg.js";
import { extCrypto } from "../Context.js";
export class BgCryptoApiImpl {
    file = new BgFileCryptoApiImpl();
    ext = new BgExtCryptoApiImpl();
    async encrypt(plaintext, isShared) {
        return bg.zcrypt.encrypt(plaintext, isShared);
    }
    async decrypt(ciphertext, isShared) {
        return bg.zcrypt.decrypt(ciphertext, isShared);
    }
    async getKey(isShared) {
        return bg.zcrypt.getKey(isShared);
    }
    async getIsShared(classification) {
        return bg.zcrypt.getIsShared(classification);
    }
}
class BgFileCryptoApiImpl {
    async encrypt(plaintext, isShared) {
        return bg.zcrypt.fileEncrypt(plaintext, isShared);
    }
    async decrypt(ciphertext, isShared) {
        return bg.zcrypt.fileDecrypt(ciphertext, isShared);
    }
}
class BgExtCryptoApiImpl {
    encrypt(plaintext) {
        return extCrypto.encrypt(plaintext);
    }
    decrypt(ciphertext) {
        return extCrypto.decrypt(ciphertext);
    }
}
