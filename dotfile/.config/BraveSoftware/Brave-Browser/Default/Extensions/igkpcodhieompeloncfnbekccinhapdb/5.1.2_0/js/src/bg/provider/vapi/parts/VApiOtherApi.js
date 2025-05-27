import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiOtherApiImpl {
    async getNewUserInfo() {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .endpoint("/api/rest/json/v1/ext/new-user")
            .checkResponse(true)
            .build());
    }
}
