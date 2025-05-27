import { VFetchMethod } from "../../../service/vapi/constants.js";
import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiLoginApiImpl {
    async getLogin() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/json/login?OPERATION_NAME=GET_LOGIN").build());
    }
    async getLicense() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/license").build());
    }
    async getOrgKey() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/user/orgkey").build());
    }
    async isValidAuthPass(authPass) {
        const resp = await gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/json/login?OPERATION_NAME=IS_VALID_AUTHPASS")
            .params("authPass=" + authPass)
            .build());
        return resp;
    }
}
