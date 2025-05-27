import { vutil } from "../../../vutil/export.js";
export class PasswordComplexity {
    getComplexity(password) {
        try {
            password = this.removeContinousRepeatedPrefix(password);
            password = this.mergeRepeatedPrefix(password);
            const count_char = new Set(password).size;
            let strength = 1;
            if (count_char <= 4) {
                strength = Math.pow(count_char, password.length);
            }
            else {
                const charsetCount = this.getCharSetCount(password);
                let charsetStrength = {
                    lowercase: 20,
                    uppercase: 20,
                    splChar: 15,
                    number: 10
                };
                if (charsetCount.number > 0) {
                    charsetStrength.lowercase += 10;
                    charsetStrength.uppercase += 10;
                    charsetStrength.splChar += 10;
                }
                if (charsetCount.lowercase > 0) {
                    charsetStrength.uppercase += 20;
                    charsetStrength.splChar += 20;
                }
                if (charsetCount.uppercase > 0) {
                    charsetStrength.lowercase += 20;
                    charsetStrength.splChar += 20;
                }
                for (let key in charsetCount) {
                    strength *= Math.pow(charsetStrength[key], charsetCount[key]);
                }
            }
            return Math.max(Math.min(100, this.getPercentRange(Math.log10(strength), 3, 21)), 0) >> 0;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    mergeRepeatedPrefix(s) {
        let ans = s;
        let prefix = "";
        let len_end = s.length / 2;
        let possible_ans = "";
        for (let len = len_end; len > 1; len--) {
            prefix = s.slice(0, len);
            if (!s.startsWith(prefix + prefix)) {
                continue;
            }
            possible_ans = prefix + s.replace(new RegExp("^(?:" + vutil.search.escapeRegex(prefix) + ")+"), "");
            if (possible_ans.length < ans.length) {
                ans = possible_ans;
            }
        }
        return ans;
    }
    getCharSetCount(password) {
        const count = {
            lowercase: 0,
            uppercase: 0,
            splChar: 0,
            number: 0
        };
        let ch;
        for (let i = 0; i < password.length; i++) {
            ch = password[i];
            if (ch >= 'a' && ch <= 'z') {
                count.lowercase++;
            }
            else if (ch >= 'A' && ch <= 'Z') {
                count.uppercase++;
            }
            else if (ch >= '0' && ch <= '9') {
                count.number++;
            }
            else {
                count.splChar++;
            }
        }
        return count;
    }
    getPercentRange(val, low, high) {
        return (val - low) / (high - low) * 100;
    }
    removeContinousRepeatedPrefix(s) {
        let seqEnd = this.getConsecutiveCharsLength(s);
        const prefix = s.slice(0, seqEnd);
        const regex = new RegExp("^(?:" + vutil.search.escapeRegex(prefix) + ")+");
        return s.replace(regex, "");
    }
    getConsecutiveCharsLength(s) {
        if (!s[1] || !this.isAdjacentChar(s[0], s[1])) {
            return 0;
        }
        for (let i = 1; i < s.length; i++) {
            if (!this.isAdjacentChar(s[i - 1], s[i])) {
                return i;
            }
        }
        return 0;
    }
    isAdjacentChar(a, b) {
        const codeA = a.charCodeAt(0);
        const codeB = b.charCodeAt(0);
        if (Math.abs(codeA - codeB) <= 1) {
            return true;
        }
        if ("qwertyuiopasdfghjklzxcvbnm".includes(a + b)) {
            return true;
        }
        if ("QWERTYUIOPASDFGHJKLZXCVBNM".includes(a + b)) {
            return true;
        }
        return false;
    }
}
