import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiSharingApiImpl {
    async getUserSharingInfo(secretId) {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/sharing/secret/user" + "/" + secretId).build());
    }
    async getUserGroupSharingInfo(secretId) {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/sharing/secret/usergroup" + "/" + secretId).build());
    }
}
