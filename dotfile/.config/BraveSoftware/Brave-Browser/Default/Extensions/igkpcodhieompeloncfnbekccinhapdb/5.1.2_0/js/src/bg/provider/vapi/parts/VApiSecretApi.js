import { VFetchMethod } from "../../../service/vapi/constants.js";
import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiSecretApiImpl {
    V1_ENDPOINT = "/api/rest/json/v1/secrets";
    V2_ENDPOINT = "/api/rest/json/v2/secrets";
    accessControl = new VApiSecretAccessControlApiImpl();
    async get(secretId) {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint(this.V1_ENDPOINT + "/" + secretId).build());
    }
    async getAll(params) {
        try {
            const input = { pageNum: params.pageNo, isAsc: true, rowPerPage: params.rowsPerPage };
            if (params.chamberId) {
                input.chamberId = params.chamberId;
            }
            return gg.fetch.fetch(VFetchInput.newBuilder()
                .endpoint(this.V1_ENDPOINT)
                .params(input)
                .build());
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    async delete(secretId) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.DELETE)
            .endpoint(`${this.V1_ENDPOINT}/${secretId}`)
            .checkResponse(true)
            .build());
    }
    setProperty(secretId, params) {
        const passwordObj = Object.assign({ secretid: secretId }, params);
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.PUT)
            .endpoint(this.V1_ENDPOINT)
            .params(JSON.stringify({ passwords: [passwordObj] }))
            .checkResponse(true)
            .build());
    }
    async add(input) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint(this.V2_ENDPOINT)
            .params("INPUT_DATA=" + encodeURIComponent(JSON.stringify(input)))
            .build());
    }
    async update(input) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.PUT)
            .endpoint(`${this.V2_ENDPOINT}/${input.secret_auto_id}`)
            .params("INPUT_DATA=" + encodeURIComponent(JSON.stringify(input)))
            .build());
    }
    async saveAssessment(input) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/passwordReport/secret/" + input.secretid)
            .params({ weakDetails: JSON.stringify([input]) })
            .build());
    }
}
class VApiSecretAccessControlApiImpl {
    async isHelpdeskEnabled(secretId) {
        try {
            const resp = await gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.GET)
                .endpoint(`/api/rest/json/v1/accesscontrol/helpdesk/${secretId}`)
                .build());
            const details = resp.result.operation.Details;
            return details.hdEnabled;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
