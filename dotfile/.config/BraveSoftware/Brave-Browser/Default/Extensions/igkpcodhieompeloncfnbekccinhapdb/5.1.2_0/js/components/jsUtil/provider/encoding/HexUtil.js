export class HexUtil {
    encodeBytesToHexString(bytes) {
        return Array.from(bytes).map(x => this.getHex(x)).join("");
    }
    decodeHexStringToBytes(hexString) {
        try {
            if (hexString.length % 2) {
                hexString = "0" + hexString;
            }
            const array = new Uint8Array(hexString.length / 2);
            let ai = 0;
            for (let i = 0; i < hexString.length; i += 2) {
                array[ai++] = parseInt(hexString[i] + hexString[i + 1], 16);
            }
            return array;
        }
        catch (e) {
            logError(e, hexString);
            throw e;
        }
    }
    getHex(byte) {
        return ("0" + (byte).toString(16)).slice(-2);
    }
}
