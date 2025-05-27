import { VFetchMethod } from "../../../service/vapi/constants.js";
import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
import { VApiNeverSaveApiImpl } from "./VApiNeverSaveApi.js";
export class VApiSettingsApiImpl {
    neverSave = new VApiNeverSaveApiImpl();
    async change(name, value) {
        try {
            return await gg.fetch.fetch(VFetchInput.newBuilder()
                .endpoint("/api/rest/json/v1/settings")
                .method(VFetchMethod.POST)
                .params({ mode: "set", name, value })
                .checkResponse(true)
                .build());
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async changeExtSetting(name, value) {
        try {
            return await gg.fetch.fetch(VFetchInput.newBuilder()
                .endpoint("/api/rest/json/v1/ext/settings")
                .method(VFetchMethod.POST)
                .params({ name, value })
                .checkResponse(true)
                .build());
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async getExperimentalSettings() {
        try {
            const resp = await gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/ext/experimental_settings").build());
            if (!resp.ok) {
                return resp;
            }
            const obj = resp.result.operation.Details;
            return fnOut.result(obj);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async getAll() {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .endpoint("/api/rest/json/v1/ext/settings")
            .build());
    }
}
