import { VI18N } from "../../src/service/vt/VI18n.js";
import { setGlobal } from "../global/global.js";
const MAX_URL_LENGTH = 2000;
class RegexUtil {
    vaultRegex = {
        cleartext: /[0-9a-zA-Z_\-.\$@\?,:'\/!\s\P{ASCII}]/u,
        non_cleartext: /[^0-9a-zA-Z_\-.\$@\?,:'\/!\s\P{ASCII}]/u,
        url: /^(http(s?)|((s|t)?)ftp|ssh|file|telnet|nfs|chrome-extension|moz-extension|ms-browser-extension|safari-extension)\:\/\/[-.\w]*(\/?)([a-zA-Z0-9\-.\?,:;'\/\\\+=&%\$#_@*|~!]*)?$/,
        searchString: /[0-9a-zA-Z_*&\-.\$@\?,#:'\/!+\P{ASCII}\s]/u
    };
    getNonClearTextChars(input) {
        return new RegExInValidCharsGetter(this.vaultRegex.cleartext).getUniqueMatchingChars(input);
    }
    isValidVaultUrl(url) {
        try {
            const regexOk = this.vaultRegex.url.test(url);
            if (!regexOk) {
                return false;
            }
            const lengthOk = url.length <= MAX_URL_LENGTH;
            if (!lengthOk) {
                info(RegexUtil.name, "url length exceeded", url);
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkValidVaultUrl(url) {
        try {
            const regexOk = this.vaultRegex.url.test(url);
            if (!regexOk) {
                return fnOut.error(i18n(VI18N.URL_INVALID));
            }
            const lengthOk = url.length <= MAX_URL_LENGTH;
            if (!lengthOk) {
                return fnOut.error(i18n(VI18N.X_MUST_BE_LESS_THAN_Y_CHARS, i18n(VI18N.URL), MAX_URL_LENGTH));
            }
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    replaceNonClearTextChars(s) {
        return new RegExValidCharsGetter(this.vaultRegex.cleartext).getValidString(s);
    }
    getEmailNamePart(email) {
        try {
            const regex = /[^@]*/;
            const result = regex.exec(email);
            if (result) {
                return result[0];
            }
            return "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getApiSearchString(searchString) {
        return new RegExValidCharsGetter(this.vaultRegex.searchString).getValidString(searchString);
    }
}
export const regexUtil = new RegexUtil();
setGlobal("regexUtil", regexUtil);
class BaseRegExCharsGetter {
    regex = null;
    constructor(regex) {
        this.regex = regex;
    }
    getMatchingChars(inputString) {
        try {
            const validChars = [];
            let isValidChar = false;
            for (let ch of inputString) {
                isValidChar = this.isValidChar(ch);
                if (isValidChar) {
                    validChars.push(ch);
                }
            }
            return validChars;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getUniqueMatchingChars(inputString) {
        const invalidChars = this.getMatchingChars(inputString);
        const uniqueInvalidChars = Array.from(new Set(invalidChars));
        return uniqueInvalidChars;
    }
    isValidChar(ch) {
        return this.regex.test(ch);
    }
}
class RegExValidCharsGetter extends BaseRegExCharsGetter {
    getValidString(inputString, joinString = "") {
        return super.getMatchingChars(inputString).join(joinString);
    }
}
class RegExInValidCharsGetter extends BaseRegExCharsGetter {
    getInValidString(inputString, joinString = "") {
        return super.getMatchingChars(inputString).join(joinString);
    }
    isValidChar(ch) {
        return !this.regex.test(ch);
    }
}
