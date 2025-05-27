import { PasswordComplexity } from "./PasswordComplexity.js";
export class PasswordGeneratorImpl {
    complexity = new PasswordComplexity();
    defaultCharset = {
        letter_lower: "abcdefghijklmnopqrstuvwxyz",
        letter_upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        number: "0123456789",
        char_special: "~!@#$%^&*()-_+=|\\{}[];:'\",.<>/?"
    };
    generate(input) {
        try {
            const password = new Array(input.length);
            const correctedCharset = {
                lowerCharset: js.string.removeChars(this.defaultCharset.letter_lower, input.excludeChars),
                upperCharset: js.string.removeChars(this.defaultCharset.letter_upper, input.excludeChars),
                numberCharset: js.string.removeChars(this.defaultCharset.number, input.excludeChars),
                specialCharset: js.string.removeChars(this.defaultCharset.char_special, input.excludeChars)
            };
            input.reqNumber = input.reqNumber && (correctedCharset.numberCharset.length > 0);
            input.reqSplChar = input.reqSplChar && (correctedCharset.specialCharset.length > 0);
            input.reqUppercase = input.reqUppercase && (correctedCharset.upperCharset.length > 0);
            input.reqLowercase = input.reqLowercase && (correctedCharset.lowerCharset.length > 0);
            let remainingLength = input.length;
            let count;
            let i = 0;
            if (input.reqSplChar && input.noOfSplChar) {
                count = input.noOfSplChar;
                remainingLength -= count;
                i = this.fillCharSetChar(password, i, count, correctedCharset.specialCharset);
            }
            if (input.reqNumber) {
                count = Math.min(Math.ceil(0.25 * input.length), remainingLength);
                remainingLength -= count;
                i = this.fillCharSetChar(password, i, count, correctedCharset.numberCharset);
            }
            if (input.reqSplChar && !input.noOfSplChar) {
                count = Math.ceil(0.15 * input.length);
                remainingLength -= count;
                i = this.fillCharSetChar(password, i, count, correctedCharset.specialCharset);
            }
            const letterStart = i;
            if (input.reqUppercase) {
                count = Math.floor(0.50 * remainingLength);
                remainingLength -= count;
                i = this.fillCharSetChar(password, i, count, correctedCharset.upperCharset);
            }
            if (input.reqLowercase) {
                count = remainingLength;
                remainingLength = 0;
                i = this.fillCharSetChar(password, i, count, correctedCharset.lowerCharset);
            }
            if (remainingLength) {
                if (input.reqUppercase) {
                    i = this.fillCharSetChar(password, i, remainingLength, correctedCharset.upperCharset);
                }
                else if (input.reqSplChar && (input.noOfSplChar == 0)) {
                    i = this.fillCharSetChar(password, i, remainingLength, correctedCharset.specialCharset);
                }
                else if (input.reqNumber) {
                    i = this.fillCharSetChar(password, i, remainingLength, correctedCharset.numberCharset);
                }
            }
            const startWithLetter = input.startWithLetter && (input.reqUppercase || input.reqLowercase);
            if (startWithLetter && letterStart < password.length) {
                this.swap(password, password.length - 1, js.crypto.generateRandomRange(letterStart, password.length));
            }
            let end = i;
            this.shuffle(password, startWithLetter ? end - 1 : end);
            if (startWithLetter) {
                let index_end = end - 1;
                let temp = password[0];
                password[0] = password[index_end];
                password[index_end] = temp;
            }
            this.correctPassword(password, end, correctedCharset);
            return password.join("");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getComplexity(password) {
        return this.complexity.getComplexity(password);
    }
    fillCharSetChar(password, i, count, charset) {
        while (count-- > 0) {
            password[i++] = charset[js.crypto.generateRandom(charset.length)];
        }
        return i;
    }
    shuffle(a, end) {
        let pos_rand;
        for (let i = end - 1; i > 0; i--) {
            pos_rand = js.crypto.generateRandom(i + 1);
            this.swap(a, i, pos_rand);
        }
    }
    swap(a, i, j) {
        const temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    correctPassword(password, length, charset_all) {
        let charset_req = "";
        for (let i = 1; i < length; i++) {
            if (Math.abs(password[i].charCodeAt(0) - password[i - 1].charCodeAt(0)) > 1) {
                continue;
            }
            for (let key in charset_all) {
                if (charset_all[key].includes(password[i])) {
                    charset_req = charset_all[key];
                    break;
                }
            }
            charset_req = js.string.removeChars(charset_req, this.getAdjacentChar(password[i]));
            if (charset_req.length) {
                password[i] = charset_req[js.crypto.generateRandom(charset_req.length)];
            }
        }
    }
    getAdjacentChar(ch) {
        const code = ch.charCodeAt(0);
        return String.fromCharCode(code - 1) + ch + String.fromCharCode(code + 1);
    }
}
