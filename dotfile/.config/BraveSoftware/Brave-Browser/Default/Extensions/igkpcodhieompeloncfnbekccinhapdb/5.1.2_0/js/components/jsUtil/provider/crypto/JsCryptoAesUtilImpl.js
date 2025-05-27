import { gg } from "../GG.js";
const AES_GCM = "AES-GCM";
const AES_ALGORITHM = {
    name: AES_GCM,
    length: 256
};
const KEY_USAGES = ["encrypt", "decrypt"];
export class JsCryptoAesUtilImpl {
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
    constructor() { }
    async generateKey() {
        try {
            const key = await crypto.subtle.generateKey(AES_ALGORITHM, true, KEY_USAGES);
            return gg.js.fnOut.result(key);
        }
        catch (e) {
            console.error(e);
            return gg.js.fnOut.error(e);
        }
    }
    async exportKey(key) {
        try {
            if (!key) {
                throw "EMPTY_KEY";
            }
            const keyBuffer = await crypto.subtle.exportKey("raw", key);
            const base64Key = gg.js.encoding.bytesToBase64(keyBuffer);
            return gg.js.fnOut.result(base64Key);
        }
        catch (e) {
            console.error(e);
            return gg.js.fnOut.error(e);
        }
    }
    async importKey(keyString) {
        try {
            if (!keyString) {
                throw "EMPTY_KEY_STRING";
            }
            const keyBuffer = gg.js.encoding.base64ToBytes(keyString);
            const key = await crypto.subtle.importKey("raw", keyBuffer, AES_GCM, true, KEY_USAGES);
            return gg.js.fnOut.result(key);
        }
        catch (e) {
            console.error(e);
            return gg.js.fnOut.error(e);
        }
    }
    async encrypt(plaintext, key) {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encryptedBuffer = await crypto.subtle.encrypt({ name: AES_GCM, iv }, key, this.textEncoder.encode(plaintext));
        const ivBase64 = gg.js.encoding.bytesToBase64(iv);
        const encryptedBase64 = gg.js.encoding.bytesToBase64(encryptedBuffer);
        const ciphertext = `${ivBase64},${encryptedBase64}`;
        return ciphertext;
    }
    async decrypt(ciphertext, key) {
        const [ivBase64, encryptedBase64] = ciphertext.split(",", 2);
        const ivBuffer = gg.js.encoding.base64ToBytes(ivBase64);
        const encryptedBuffer = gg.js.encoding.base64ToBytes(encryptedBase64);
        const decryptedBuffer = await crypto.subtle.decrypt({ name: AES_GCM, iv: ivBuffer }, key, encryptedBuffer);
        const plaintext = this.textDecoder.decode(decryptedBuffer);
        return plaintext;
    }
}
