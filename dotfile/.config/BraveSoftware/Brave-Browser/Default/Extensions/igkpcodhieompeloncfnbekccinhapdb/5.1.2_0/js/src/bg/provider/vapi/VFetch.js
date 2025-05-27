import { VFetchContentType, VFetchMethod } from "../../service/vapi/constants.js";
import { gg } from "./GG.js";
import { VHeaders } from "./VHeaders.js";
import { VResponseGetter } from "./VResponseGetter.js";
import { VUrl } from "./VUrl.js";
export class VFetchImpl {
    headers = new VHeaders();
    url = new VUrl();
    response = new VResponseGetter();
    init() {
        try {
            this.headers.init();
        }
        catch (e) {
            logError(e);
        }
    }
    async fetch(input) {
        try {
            const url = await this.url.get(input);
            const headerResp = await fetch(url, {
                method: input.method,
                headers: await this.headers.getHeadersFn(input),
                body: this.getBody(input),
                ...(input.initParams || {}),
            });
            if (!headerResp.ok) {
                throw "RESPONSE_NOT_OK";
            }
            const resp = await this.response.get(input, headerResp);
            return fnOut.result(resp);
        }
        catch (e) {
            logError(e);
            const errorMsg = e + "";
            return fnOut.error(errorMsg == "TypeError: Failed to fetch" ? "offline or blocked" : errorMsg);
        }
    }
    async getHeaders(contentType = VFetchContentType.URL_ENCODED) {
        return this.headers.getHeaders(contentType);
    }
    getBody(input) {
        try {
            if (!input.params || input.method == VFetchMethod.GET) {
                return undefined;
            }
            if (typeof input.params == "string") {
                return input.params;
            }
            if (input.params instanceof URLSearchParams) {
                return input.params.toString();
            }
            if (input.contentType == VFetchContentType.JSON) {
                return JSON.stringify(input.params);
            }
            return gg.util.getStringParams(input);
        }
        catch (e) {
            logError(e);
            return undefined;
        }
    }
}
