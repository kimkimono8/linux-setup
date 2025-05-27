import { VFetchMethod, VFetchServer } from "../../service/vapi/constants.js";
import { gg } from "./GG.js";
export class VUrl {
    async get(input) {
        try {
            return `${this.getHost(input)}${input.endpoint}${this.getQueryParams(input)}`;
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    getHost(input) {
        try {
            switch (input.server) {
                case VFetchServer.VAULT:
                    return urlProvider.getVaultUrl();
                case VFetchServer.ACCOUNTS:
                    return urlProvider.getAccountsUrl();
                case VFetchServer.CONTACT:
                    return urlProvider.getContactsUrl();
                case VFetchServer.CUSTOM:
                    return "";
                default:
                    throw "INVALID_SERVER: " + input.server;
            }
        }
        catch (e) {
            logError(e);
            return urlProvider.getVaultUrl();
        }
    }
    getQueryParams(input) {
        try {
            if (input.method != VFetchMethod.GET || !input.params) {
                return "";
            }
            return "?" + gg.util.getStringParams(input);
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
