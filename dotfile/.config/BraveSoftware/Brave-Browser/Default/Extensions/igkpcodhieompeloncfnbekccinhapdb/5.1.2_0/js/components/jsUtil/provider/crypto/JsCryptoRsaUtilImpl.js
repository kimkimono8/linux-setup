import { gg } from "../GG.js";
const RSA_OAEP = "RSA-OAEP";
const RSA_ALGORITHM = {
    name: RSA_OAEP,
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
};
const KEY_USAGES = ["encrypt", "decrypt"];
export class JsCryptoRsaUtilImpl {
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
    constructor() { }
    async generateKey() {
        try {
            const rsaKeyPair = (await crypto.subtle.generateKey(RSA_ALGORITHM, true, KEY_USAGES));
            return gg.js.fnOut.result({
                publicKey: rsaKeyPair.publicKey,
                privateKey: rsaKeyPair.privateKey
            });
        }
        catch (e) {
            console.error(e);
            return gg.js.fnOut.error(e);
        }
    }
    async getBase64PublicKey(key) {
        const exportedBuffer = await window.crypto.subtle.exportKey("spki", key);
        const base64Key = gg.js.encoding.bytesToBase64(exportedBuffer);
        return base64Key;
    }
    async getBase64PrivateKey(key) {
        const exportedBuffer = await window.crypto.subtle.exportKey("pkcs8", key);
        const base64Key = gg.js.encoding.bytesToBase64(exportedBuffer);
        return base64Key;
    }
    async encrypt(plaintext, key) {
        const encodedPlainText = this.textEncoder.encode(plaintext);
        const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
        return gg.js.encoding.bytesToBase64(new Uint8Array(arrayBuffer));
    }
    async encryptHex(plaintext, key) {
        const encodedPlainText = this.textEncoder.encode(plaintext);
        const arrayBuffer = await crypto.subtle.encrypt({ name: RSA_OAEP }, key, encodedPlainText);
        return gg.js.encoding.bytesToHex(new Uint8Array(arrayBuffer));
    }
    async decrypt(cipherText, key) {
        const cipherBuffer = gg.js.encoding.base64ToBytes(cipherText);
        const decryptedBuffer = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, cipherBuffer);
        return this.textDecoder.decode(decryptedBuffer);
    }
    async importPublicKey(key) {
        const keyBuffer = gg.js.encoding.base64ToBytes(key);
        const RSA_PARAMS = {
            name: RSA_OAEP,
            hash: "SHA-256"
        };
        const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
        return publicKey;
    }
    async importPublicKeyHex(key) {
        const keyBuffer = gg.js.encoding.hexToBytes(key);
        const RSA_PARAMS = {
            name: RSA_OAEP,
            hash: "SHA-256"
        };
        const publicKey = await crypto.subtle.importKey("spki", keyBuffer, RSA_PARAMS, true, ["encrypt"]);
        return publicKey;
    }
    async importPrivateKey(key) {
        const keyBuffer = gg.js.encoding.base64ToBytes(key);
        const RSA_PARAMS = {
            name: RSA_OAEP,
            hash: "SHA-256"
        };
        const publicKey = await crypto.subtle.importKey("pkcs8", keyBuffer, RSA_PARAMS, true, ["decrypt"]);
        return publicKey;
    }
    async exportPublicKey(key) {
        const exportedBuffer = await crypto.subtle.exportKey("spki", key);
        const base64Key = gg.js.encoding.bytesToBase64(exportedBuffer);
        return base64Key;
    }
    async exportPrivateKey(key) {
        const exportedBuffer = await crypto.subtle.exportKey("pkcs8", key);
        const base64Key = gg.js.encoding.bytesToBase64(exportedBuffer);
        return base64Key;
    }
}
