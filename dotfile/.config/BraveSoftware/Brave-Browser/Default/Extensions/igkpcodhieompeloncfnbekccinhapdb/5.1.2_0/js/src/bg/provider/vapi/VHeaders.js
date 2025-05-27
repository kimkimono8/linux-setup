import { VFetchServer } from "../../service/vapi/constants.js";
import { gg } from "./GG.js";
export class VHeaders {
    ADDON_VERSION = "";
    uiLang = chrome.i18n.getUILanguage();
    init() {
        try {
            this.ADDON_VERSION = gg.util.getBrowserName() + "/" + chrome.runtime.getManifest().version;
        }
        catch (e) {
            logError(e);
        }
    }
    async getHeaders(contentType) {
        return {
            "Content-Type": contentType,
            authorization: "Zoho-oauthtoken " + await oauth.getAccessToken(),
            addonversion: this.ADDON_VERSION,
            language: this.uiLang,
        };
    }
    async getHeadersFn(input) {
        const headers = {
            ...await this.getHeaders(input.contentType),
            ...(input.headers || {})
        };
        if (input.server != VFetchServer.VAULT) {
            return headers;
        }
        const vaultHeaders = await gg.ext.getApiPassphraseHeaders();
        if (!vaultHeaders) {
            return headers;
        }
        if (vaultHeaders.CREATION_TIME) {
            headers["PassphraseCreated"] = vaultHeaders.CREATION_TIME;
        }
        if (vaultHeaders.MODIFIED_TIME) {
            headers["LastPassphraseChange"] = vaultHeaders.MODIFIED_TIME;
        }
        return headers;
    }
}
