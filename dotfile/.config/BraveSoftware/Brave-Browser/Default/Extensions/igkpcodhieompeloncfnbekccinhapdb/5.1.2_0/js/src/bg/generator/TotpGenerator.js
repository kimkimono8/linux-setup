export class TotpGenerator {
    charsetMap = {
        "2": "11010", "3": "11011", "4": "11100", "5": "11101", "6": "11110", "7": "11111", "A": "00000", "B": "00001", "C": "00010", "D": "00011", "E": "00100", "F": "00101", "G": "00110", "H": "00111", "I": "01000", "J": "01001", "K": "01010", "L": "01011", "M": "01100", "N": "01101", "O": "01110", "P": "01111", "Q": "10000", "R": "10001", "S": "10010", "T": "10011", "U": "10100", "V": "10101", "W": "10110", "X": "10111", "Y": "11000", "Z": "11001"
    };
    async generate(totpUrl) {
        return this.generateFn(totpUrl, Date.now());
    }
    async generateFn(totpUrl, timeMs) {
        const params = this.parseUrl(totpUrl);
        const keyBuffer = this.convertBase32ToBuffer(params.secret);
        const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: params.algorithm }, true, ["sign"]);
        const timeInput = this.getTimeBuffer(params.period, timeMs);
        const hash = await crypto.subtle.sign("HMAC", key, timeInput);
        return await this.getOtp(hash, params.digits);
    }
    getOtp(hash_buffer, no_of_digits) {
        const hash = new Uint8Array(hash_buffer);
        const offset = hash[hash.length - 1] & 0xf;
        const n = ((hash[offset] & 0x7f) << 24) |
            ((hash[offset + 1] & 0xff) << 16) |
            ((hash[offset + 2] & 0xff) << 8) |
            (hash[offset + 3] & 0xff);
        const otp = n % Math.pow(10, no_of_digits);
        return ("" + otp).padStart(no_of_digits, "0");
    }
    getTimeBuffer(secondsInterval, timeMs) {
        const reqTime = (timeMs / 1000 / secondsInterval) >> 0;
        const timeBuffer = new ArrayBuffer(8);
        new DataView(timeBuffer).setUint32(4, reqTime, false);
        return timeBuffer;
    }
    parseUrl(totpUrl) {
        const parameters = totpUrl.slice(totpUrl.indexOf("?") + 1).split("&");
        const entries = parameters.map(parameter => parameter.split("="));
        const parameter_obj = Object.fromEntries(entries);
        const reqParams = {
            secret: parameter_obj.secret || "",
            algorithm: parameter_obj.algorithm ? "SHA-" + parameter_obj.algorithm.slice(3) : "SHA1",
            digits: +parameter_obj.digits || 6,
            period: +parameter_obj.period || 30,
        };
        return reqParams;
    }
    convertBase32ToBuffer(base32String) {
        const binaryString = base32String.split("").map(x => this.charsetMap[x]).join("");
        let array_buffer_length = (binaryString.length / 8) >> 0;
        const array_buffer = new Uint8Array(array_buffer_length);
        let ai = 0;
        for (let i = 0; i + 8 <= binaryString.length; i += 8) {
            const cur_part = binaryString.slice(i, i + 8);
            const val = parseInt(cur_part, 2);
            array_buffer[ai++] = val;
        }
        return array_buffer;
    }
    async testTotp() {
        try {
            const allTestCases = [
                ["otpauth://totp?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&algorithm=SHA1&period=30&digits=8", 59, "94287082"],
                ["otpauth://totp?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&algorithm=SHA1&period=30&digits=8", 1111111109, "07081804"],
                ["otpauth://totp?secret=G4ADEABRAA3AAOIAIYAEKACEAAWQAMIAGYADCACBAAWQANAAIQAEIABZAAWQAQIAIIADGABVAAWQAMYAGQAECACDAA2QANAAIEADCACBABCQAMIAIUAA&algorithm=SHA1&period=30&digits=8", 1, "44301220"],
            ];
            for (let testCase of allTestCases) {
                if (!(await this.generateFn(testCase[0], testCase[1] * 1000) == testCase[2])) {
                    throw new Error("failed");
                }
            }
        }
        catch (e) {
            throw e;
        }
    }
}
