import { VFetchContentType, VFetchMethod } from "../../service/vapi/constants.js";
import { VFetchInput } from "../../service/vapi/types/VFetchInput.js";
import { ContactsApiImpl } from "./ContactsApi.js";
import { gg } from "./GG.js";
import { VApiLoginApiImpl } from "./parts/VApiLoginApi.js";
import { VApiOneauthApiImpl } from "./parts/VApiOneauthApi.js";
import { VApiOtherApiImpl } from "./parts/VApiOtherApi.js";
import { VApiSecretApiImpl } from "./parts/VApiSecretApi.js";
import { VApiSettingsApiImpl } from "./parts/VApiSettingsApi.js";
import { VApiSharingApiImpl } from "./parts/VApiSharingApi.js";
import { VApiUnlockApiImpl } from "./parts/VApiUnlockApi.js";
import { Util } from "./Util.js";
import { VApiExternal } from "./VApiExternal.js";
import { VFetchImpl } from "./VFetch.js";
export class VApiImpl {
    fetch = new VFetchImpl();
    contacts = new ContactsApiImpl();
    login = new VApiLoginApiImpl();
    oneauth = new VApiOneauthApiImpl();
    unlock = new VApiUnlockApiImpl();
    settings = new VApiSettingsApiImpl();
    sharing = new VApiSharingApiImpl();
    secret = new VApiSecretApiImpl();
    other = new VApiOtherApiImpl();
    init() {
        try {
            gg.vapi = this;
            gg.util = new Util();
            gg.ext = new VApiExternal();
            gg.fetch = this.fetch;
            this.fetch.init();
        }
        catch (e) {
            logError(e);
        }
    }
    isRespOk(resp) {
        return resp?.operation?.result?.status?.toLowerCase?.() == "success";
    }
    async getRecordingOld(domain) {
        return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/json/quickadd")
            .params({ OPERATION_NAME: "GET_RECORDING", url: domain }).build());
    }
    async getRecording(domain) {
        try {
            const resp = await this.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/ext/recording")
                .params({ domain })
                .build());
            if (!resp.ok) {
                throw "API_NEEDS_TO_GO_LIVE";
            }
            return resp;
        }
        catch (e) {
            console.info("ok: api needs to go live ", e);
            return this.getRecordingOld(domain);
        }
    }
    async getAllSecretTypes() {
        return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/secrettypes?allTypes=true").build());
    }
    async getAllFolders() {
        return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/chambers").params({ pageNum: 0, rowPerPage: -1 }).build());
    }
    async getPasswordResetSteps(secretId, domain) {
        return this.fetch.fetch(VFetchInput.newBuilder()
            .endpoint("/api/json/secrets")
            .params({ OPERATION_NAME: "GET_CHANGE_PASSWORD_DETAILS", SECRET_AUTO_ID: secretId, DOMAIN: domain })
            .build());
    }
    async getExistingSecretNames(name) {
        return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/secrets/existing_names").params({ name }).build());
    }
    async getAllFiles(secretId) {
        return this.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/secrets/downloadfile").params({ secretId }).build());
    }
    async auditUserAction(opType) {
        return this.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/audit/action")
            .params({ action: "userAudit", opType })
            .build());
    }
    async auditMasterPassword(valid) {
        return this.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/user/login")
            .params({ status: valid + "" })
            .build());
    }
    async emptyTrash() {
        return this.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.DELETE)
            .endpoint("/api/rest/json/v1/secrets/emptytrash")
            .checkResponse(true)
            .build());
    }
    async getCDNUrls(paths) {
        try {
            const resp = await this.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/cdn/path")
                .contentType(VFetchContentType.JSON)
                .params({ path: paths })
                .checkResponse(true)
                .build());
            if (!resp.ok) {
                return resp;
            }
            const pathObj = resp.result.operation.Details.path;
            return fnOut.result(pathObj);
        }
        catch (e) {
            throw e;
        }
    }
}
