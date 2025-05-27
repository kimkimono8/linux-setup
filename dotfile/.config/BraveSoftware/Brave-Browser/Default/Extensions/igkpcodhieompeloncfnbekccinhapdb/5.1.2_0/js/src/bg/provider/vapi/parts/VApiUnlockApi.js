import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
import { VApiWebauthnUnlockApiImpl } from "./VApiWebauthnUnlockApi.js";
export class VApiUnlockApiImpl {
    webauthn = new VApiWebauthnUnlockApiImpl();
    async getWebUnlockPublicKey() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/ext/web/public_key").build());
    }
}
