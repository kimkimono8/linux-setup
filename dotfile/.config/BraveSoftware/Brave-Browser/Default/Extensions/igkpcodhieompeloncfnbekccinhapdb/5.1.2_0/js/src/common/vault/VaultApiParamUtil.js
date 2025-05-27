export var VaultApiParamRegex;
(function (VaultApiParamRegex) {
    VaultApiParamRegex["CLEAR_TEXT"] = "CLEAR_TEXT";
    VaultApiParamRegex["EMAIL"] = "EMAIL";
})(VaultApiParamRegex || (VaultApiParamRegex = {}));
export class VaultApiParamUtil {
    static regex = {
        CLEAR_TEXT: /^[0-9a-zA-Z_\-.\$@\?,:'\/!\s\P{ASCII}]+$/u,
        EMAIL: /^[\p{L}\p{N}_\p{M}]([\p{L}\p{M}\p{N}_\+\-\.'\*&!]*)@(?=.{4,256}$)(([\p{L}\p{N}\p{M}]+)(([\-_]*[\p{L}\p{N}\p{M}])*)[\.])+[\p{L}\p{M}]{2,22}$/u
    };
    static checkParam(regexName, param) {
        try {
            const regex = this.getRegex(regexName);
            return regex.test(param);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    static getInvalidChars(regexName, param) {
        try {
            const regex = this.getRegex(regexName);
            const invalidChars = new Set();
            for (let ch of param) {
                if (!regex.test(ch)) {
                    invalidChars.add(ch);
                }
            }
            return Array.from(invalidChars);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    static getRegex(regexName) {
        switch (regexName) {
            case VaultApiParamRegex.CLEAR_TEXT: return this.regex.CLEAR_TEXT;
            case VaultApiParamRegex.EMAIL: return this.regex.EMAIL;
            default:
                throw "regex not found";
        }
    }
}
