import { JsCryptoAesUtilImpl } from "./JsCryptoAesUtilImpl.js";
import { JsCryptoRsaUtilImpl } from "./JsCryptoRsaUtilImpl.js";
export class JsCryptoImpl {
    aes;
    rsa;
    constructor() {
        this.aes = new JsCryptoAesUtilImpl();
        this.rsa = new JsCryptoRsaUtilImpl();
    }
    generateRandom(range) {
        if (range <= 0) {
            throw "INVALID_RANDOM_RANGE";
        }
        const bitMask = this.getBitMask(range);
        let randomNumber = 0;
        while (true) {
            randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
            randomNumber &= bitMask;
            if (randomNumber < range) {
                return randomNumber;
            }
        }
    }
    generateRandomRange(start, exclusiveEnd) {
        const range = Math.abs(exclusiveEnd - start);
        return this.generateRandom(range) + start;
    }
    getBitMask(n) {
        let mask = 1;
        while (mask < n) {
            mask = (mask << 1) | 1;
        }
        return mask;
    }
    getSalt(noOfBytes) {
        const bytes = new Uint8Array(noOfBytes);
        crypto.getRandomValues(bytes);
        return bytes;
    }
}
