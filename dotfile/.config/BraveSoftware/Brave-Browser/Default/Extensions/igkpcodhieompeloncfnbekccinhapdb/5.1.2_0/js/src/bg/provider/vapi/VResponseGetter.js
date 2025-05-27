import { VFetchResponseType } from "../../service/vapi/constants.js";
import { gg } from "./GG.js";
export class VResponseGetter {
    async get(input, response) {
        switch (input.responseType) {
            case VFetchResponseType.JSON: {
                const resp = await this.getJsonResponse(response);
                await this.checkJsonResponse(input, resp);
                return resp;
            }
            case VFetchResponseType.TEXT:
                return response.text();
            case VFetchResponseType.RAW:
                return response;
            case VFetchResponseType.BLOB:
                return response.blob();
            default:
                throw "INVALID_RESPONSE_TYPE";
        }
    }
    async checkJsonResponse(input, resp) {
        await this.checkInvalidOauthTokens(resp);
        await this.checkVaultResponse(resp, input);
    }
    async getJsonResponse(resp) {
        const respText = await resp.text();
        try {
            return JSON.parse(respText);
        }
        catch (e) {
        }
        const errorObj = {
            operation: {
                result: {
                    status: "failed",
                    message: "JSON_PARSE_ERROR: " + respText
                }
            }
        };
        if (respText.includes("<html")) {
            try {
                errorObj.operation.result.message = (await gg.ext.parseDOMContents(respText, "*"))[0];
            }
            catch (e) {
                logError(e);
            }
        }
        return errorObj;
    }
    async checkInvalidOauthTokens(resp) {
        try {
            if (resp?.operation?.result?.error_code == "INVALID_OAUTHTOKEN") {
                await gg.ext.silentSignout();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async checkVaultResponse(resp, input) {
        await this.checkPassphraseChangedError(resp);
        if (!input.checkResponse || resp?.operation?.result?.status?.toLowerCase?.() == "success") {
            return;
        }
        throw this.getApiFailedErrorMsg(resp);
    }
    getApiFailedErrorMsg(resp) {
        if (resp?.operation?.result?.message) {
            return resp?.operation?.result?.message;
        }
        return `API_REQUEST ${resp?.operation?.name || ""} failed`;
    }
    async checkPassphraseChangedError(response) {
        try {
            const errorCode = response?.operation?.result?.error_code;
            if (errorCode == "INVALID_PASSPHRASE_SYNC") {
                await gg.ext.passphraseChanged();
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
