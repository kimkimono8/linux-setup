import { UrlProtocol } from "../service/constants/constants.js";
export class JsUrlImpl {
    secondLD = new Set(["ac", "biz", "co", "com", "edu", "firm", "gov", "info", "int", "ltd", "mil", "net",
        "ngo", "org", "pro", "res", "wiki"]);
    wwwPrefixRegex = /^www\./;
    dotDecimalRegex = /^\d{1,3}(?:\.\d{1,3}){3}$/;
    protocol = new UrlProtocol();
    isValid(url) {
        try {
            if (!url) {
                return false;
            }
            new URL(url).hostname;
            return true;
        }
        catch (e) {
            console.error(e, url);
            return false;
        }
    }
    isAllValid(...urls) {
        try {
            return urls.every(x => this.isValid(x));
        }
        catch (e) {
            console.error(e, urls);
            return false;
        }
    }
    getHostName(url) {
        try {
            return new URL(url).hostname.replace(this.wwwPrefixRegex, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getHost(url) {
        try {
            return new URL(url).host.replace(this.wwwPrefixRegex, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getParentDomain(url) {
        try {
            const hostname = this.getHostName(url);
            if (this.isDotDecimalIP(hostname)) {
                return hostname;
            }
            const parentDomain = this.getParentDomainFromHostName(hostname);
            return parentDomain;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getParentDomainFromHostName(hostname) {
        try {
            const parts = hostname.split(".");
            switch (parts.length) {
                case 1: return parts[0];
                case 2: return parts[0] + "." + parts[1];
            }
            const last1 = parts[parts.length - 1];
            const last2 = parts[parts.length - 2];
            if (last1.length == 2 && this.secondLD.has(last2)) {
                return parts[parts.length - 3] + "." + last2 + "." + last1;
            }
            return last2 + "." + last1;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getProtocol(url) {
        try {
            return new URL(url).protocol;
        }
        catch (e) {
            console.error(e);
            return "";
        }
    }
    isDotDecimalIP(input) {
        try {
            return this.dotDecimalRegex.test(input);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
