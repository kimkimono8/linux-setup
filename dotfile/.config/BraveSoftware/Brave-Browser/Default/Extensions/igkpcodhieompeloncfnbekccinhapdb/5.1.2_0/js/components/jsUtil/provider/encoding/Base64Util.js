export class Base64Util {
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    base64AlphaValueMap = null;
    encodeBytesToString(bytes) {
        let i = 0;
        let ans = "";
        for (; i + 2 < bytes.length; i += 3) {
            ans += this.mapBase64C1(bytes[i]);
            ans += this.mapBase64C2(bytes[i], bytes[i + 1]);
            ans += this.mapBase64C3(bytes[i + 1], bytes[i + 2]);
            ans += this.mapBase64C4(bytes[i + 2]);
        }
        switch (bytes.length - i) {
            case 2:
                ans += this.mapBase64C1(bytes[i]);
                ans += this.mapBase64C2(bytes[i], bytes[i + 1]);
                ans += this.mapBase64C3(bytes[i + 1], 0);
                ans += "=";
                break;
            case 1:
                ans += this.mapBase64C1(bytes[i]);
                ans += this.mapBase64C2(bytes[i], 0);
                ans += "==";
                break;
        }
        return ans;
    }
    decodeStringToBytes(input) {
        const alphaValue = this.getBase64AlphaValueMap();
        const bytes = [];
        while (input.length % 4 != 0) {
            input += "=";
        }
        let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
        for (let i = 0; i < input.length; i += 4) {
            c1 = alphaValue.get(input[i]);
            c2 = alphaValue.get(input[i + 1]);
            c3 = alphaValue.get(input[i + 2]);
            c4 = alphaValue.get(input[i + 3]);
            bytes.push((c1 << 2) | ((c2 & 48) >> 4));
            bytes.push(((c2 & 15) << 4) | ((c3 & 60) >> 2));
            bytes.push(((c3 & 3) << 6) | c4);
        }
        for (let i = input.length - 1; i >= 0 && input[i] == "="; i--) {
            bytes.pop();
        }
        return new Uint8Array(bytes);
    }
    mapBase64C1(byte) {
        return this.alphabet[(byte & 252) >> 2];
    }
    mapBase64C2(b1, b2) {
        return this.alphabet[((b1 & 3) << 4) | ((b2 & 240) >> 4)];
    }
    mapBase64C3(b1, b2) {
        return this.alphabet[((b1 & 15) << 2) | ((b2 & 192) >> 6)];
    }
    mapBase64C4(byte) {
        return this.alphabet[byte & 63];
    }
    getBase64AlphaValueMap() {
        if (this.base64AlphaValueMap == null) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            const map = new Map(Array.from(alphabet, (x, index) => [x, index]));
            map.set("=", 0);
            this.base64AlphaValueMap = map;
        }
        return this.base64AlphaValueMap;
    }
}
