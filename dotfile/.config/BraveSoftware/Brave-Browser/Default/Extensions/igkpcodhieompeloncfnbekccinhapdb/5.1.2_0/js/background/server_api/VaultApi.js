import { setGlobal } from "../../common/global/global.js";
import { vapi } from "../../src/bg/Context.js";
import { VFetchContentType, VFetchMethod } from "../../src/bg/service/vapi/constants.js";
import { VFetchInput } from "../../src/bg/service/vapi/types/VFetchInput.js";
export class VaultApi {
    static SUCCESS = "success";
    static async getChecked(endpoint, queryParams = null) {
        return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).params(queryParams).checkResponse(true).build())).result;
    }
    static async post(endpoint, body = "", contentType = VFetchContentType.URL_ENCODED) {
        return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.POST).params(body).contentType(contentType).build())).result;
    }
    static async postChecked(endpoint, body = "", contentType = VFetchContentType.URL_ENCODED) {
        return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.POST).params(body).contentType(contentType).checkResponse(true).build())).result;
    }
    static async put(endpoint, body, contentType = VFetchContentType.URL_ENCODED) {
        return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.PUT).params(body).contentType(contentType).build())).result;
    }
    static async putChecked(endpoint, body, contentType = VFetchContentType.URL_ENCODED) {
        return (await vapi.fetch.fetch(VFetchInput.newBuilder().endpoint(endpoint).method(VFetchMethod.PUT).params(body).contentType(contentType).checkResponse(true).build())).result;
    }
}
setGlobal("VaultApi", VaultApi);
