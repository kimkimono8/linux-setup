export class LoginUtilImpl {
    isLoginUrl(url) {
        try {
            const urlObj = new URL(url);
            const hyphenRegex = /(-|_)/g;
            const hostName = urlObj.hostname.toLowerCase().replace(hyphenRegex, "");
            const hostNameRegex = /\b(accounts?|auth|login|signin|logon)\b/;
            if (hostNameRegex.test(hostName)) {
                return true;
            }
            const path = urlObj.pathname.toLowerCase().replace(hyphenRegex, "");
            const pathRegex = /\b(login|signin|auth|logon)\b/;
            if (pathRegex.test(path)) {
                return true;
            }
            const hash = urlObj.hash.toLowerCase().replace(hyphenRegex, "");
            if (pathRegex.test(hash)) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
