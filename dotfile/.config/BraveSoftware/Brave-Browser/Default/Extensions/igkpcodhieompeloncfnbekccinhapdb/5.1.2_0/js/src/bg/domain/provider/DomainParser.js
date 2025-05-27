import { domainHandler } from "./Context.js";
export class DomainParser {
    getMapping(url) {
        try {
            if (!js.url.isValid(url)) {
                return null;
            }
            const result = {
                domain: "",
                parentDomain: "",
                hostname: ""
            };
            const urlObj = new URL(url);
            result.hostname = urlObj.hostname;
            result.parentDomain = js.url.getParentDomainFromHostName(urlObj.hostname);
            result.domain = this.getDomain(urlObj, result);
            return result;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    mapUrl(url) {
        try {
            const mapping = this.getMapping(url);
            return mapping?.domain || "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getDomain(urlObj, result) {
        try {
            const parts = [];
            const mode = domainHandler.mode;
            if (mode.scheme) {
                parts.push(urlObj.protocol);
            }
            parts.push(mode.subDomain ? urlObj.hostname : result.parentDomain);
            if (mode.port) {
                parts.push(urlObj.port);
            }
            if (mode.path) {
                parts.push(urlObj.pathname);
            }
            return parts.join("@@");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
