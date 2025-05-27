import { setGlobal } from "../../../common/global/global.js";
export class VaultCrypto {
    static async pbkdf2(password, salt, iterations) {
        try {
            const saltBuffer = new Uint8Array(salt.split("").map(x => x.charCodeAt(0)));
            const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);
            const derivedBits = await crypto.subtle.deriveBits({
                name: "PBKDF2", salt: saltBuffer, iterations,
                hash: "SHA-256"
            }, keyMaterial, 256);
            return js.encoding.bytesToHex(derivedBits);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    static utf8Encode(s) {
        s = s.replace(/\r\n/g, "\n");
        let code = 0;
        let utf8 = "";
        for (let i = 0; i < s.length; i++) {
            code = s.charCodeAt(i);
            if (code < 0x80) {
                utf8 += String.fromCharCode(code);
            }
            else if (code <= 0x7ff) {
                utf8 += String.fromCharCode(0xc0 | (code >> 6));
                utf8 += String.fromCharCode(0x80 | (code & 0x3f));
            }
            else {
                utf8 += String.fromCharCode(0xe0 | (code >> 12));
                utf8 += String.fromCharCode(0x80 | ((code >> 6) & 0x3f));
                utf8 += String.fromCharCode(0x80 | (code & 0x3f));
            }
        }
        return utf8;
    }
    static utf8Decode(s) {
        let ans = "";
        let code1 = 0;
        let code2 = 0;
        let code3 = 0;
        for (let i = 0; i < s.length;) {
            code1 = s.charCodeAt(i++);
            if (code1 < 0x80) {
                ans += String.fromCharCode(code1);
            }
            else if ((code1 >= 0xc0) && (code1 < 0xe0)) {
                code2 = s.charCodeAt(i++);
                ans += String.fromCharCode(((code1 & 0x1f) << 6) | (code2 & 0x3f));
            }
            else {
                code2 = s.charCodeAt(i++);
                code3 = s.charCodeAt(i++);
                ans += String.fromCharCode(((code1 & 0xf) << 12) | ((code2 & 0x3f) << 6) | (code3 & 0x3f));
            }
        }
        return ans;
    }
    static encodeBase64(s) {
        const utf8String = VaultCrypto.utf8Encode(s);
        return btoa(utf8String);
    }
    static decodeBase64(s) {
        const decoded = atob(s);
        const binaryString = VaultCrypto.utf8Decode(decoded);
        return binaryString;
    }
    static async aesEncrypt(plaintext, key) {
        plaintext = VaultCrypto.utf8Encode(plaintext);
        const cryptoKey = await VaultCrypto.getKey(key);
        const plaintextBuffer = this.binaryToUInt8(plaintext);
        const counter = new Uint8Array(16);
        const nonce = Date.now();
        const nonceMs = nonce % 1000;
        const nonceSeconds = Math.floor(nonce / 1000);
        const nonceRandom = crypto.getRandomValues(new Uint32Array(1))[0];
        counter[0] = nonceMs & 0xFF;
        counter[1] = (nonceMs >>> 8) & 0xFF;
        counter[2] = nonceRandom & 0xFF;
        counter[3] = (nonceRandom >>> 8) & 0xFF;
        for (let i = 0; i < 4; i++) {
            counter[i + 4] = (nonceSeconds >>> i * 8) & 0xFF;
        }
        const encryptedBuffer = await crypto.subtle.encrypt({ name: "AES-CTR", counter, length: 64 }, cryptoKey, plaintextBuffer);
        const finalEncryptedBinary = this.bufferToBinary(counter.slice(0, 8)) + this.bufferToBinary(encryptedBuffer);
        const encodedCiphertext = btoa(finalEncryptedBinary);
        return encodedCiphertext;
    }
    static async aesDecrypt(ciphertext, key) {
        if (!ciphertext) {
            return "";
        }
        const cryptoKey = await VaultCrypto.getKey(key);
        const base64Decoded = atob(ciphertext);
        const ciphertextPart = base64Decoded.slice(8);
        const cipherBuffer = this.binaryToUInt8(ciphertextPart);
        const counter = new Uint8Array(16);
        for (let i = 0; i < 8; i++) {
            counter[i] = base64Decoded[i].charCodeAt(0);
        }
        const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-CTR", counter, length: 64 }, cryptoKey, cipherBuffer);
        const binaryString = this.bufferToBinary(decryptedBuffer);
        return VaultCrypto.utf8Decode(binaryString);
    }
    static async getKey(password) {
        password = VaultCrypto.utf8Encode(password);
        const keyArray = new Uint8Array(32);
        for (let i = 0; i < password.length; i++) {
            keyArray[i] = password[i].charCodeAt(0);
        }
        const initialCryptoKey = await crypto.subtle.importKey("raw", keyArray, "AES-CTR", true, ["encrypt", "decrypt"]);
        const counter = new Uint8Array(16);
        for (let i = 0; i < 16; i++) {
            counter[i] = keyArray[i];
        }
        const keyPartBuffer = await crypto.subtle.encrypt({ name: "AES-CTR", counter, length: 64 }, initialCryptoKey, new Uint8Array(16));
        const keyPart = new Uint8Array(keyPartBuffer);
        const finalKeyBytes = new Uint8Array(32);
        for (let i = 0; i < keyPart.length; i++) {
            finalKeyBytes[i] = keyPart[i];
            finalKeyBytes[16 + i] = keyPart[i];
        }
        const finalKey = await crypto.subtle.importKey("raw", finalKeyBytes, "AES-CTR", true, ["encrypt", "decrypt"]);
        return finalKey;
    }
    static binaryToUInt8(binaryString) {
        return new Uint8Array(Array.from(binaryString).map(x => x.charCodeAt(0)));
    }
    static bufferToBinary(buffer) {
        const array = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
        let binaryString = "";
        for (let byte of array) {
            binaryString += String.fromCharCode(byte);
        }
        return binaryString;
    }
}
setGlobal("VaultCrypto", VaultCrypto);
