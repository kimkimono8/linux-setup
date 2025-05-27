import { VFetchMethod } from "../../../service/vapi/constants.js";
import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiNeverSaveApiImpl {
    async getAll() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/ext/never_saves").build());
    }
    async add(domain) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/ext/never_save")
            .params({ domain })
            .build());
    }
    async remove(domain) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.DELETE)
            .endpoint("/api/rest/json/v1/ext/never_save")
            .params({ domain })
            .build());
    }
}
