import { VFetchContentType, VFetchMethod } from "../../../service/vapi/constants.js";
import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiOneauthApiImpl {
    async getDevices() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/oneauth/devices").build());
    }
    async getDevicePublicKey(deviceToken) {
        try {
            const resp = (await gg.fetch.fetch(VFetchInput.newBuilder()
                .method(VFetchMethod.POST)
                .endpoint("/api/rest/json/v1/oneauth/device/public_key")
                .params({ deviceToken })
                .checkResponse(true)
                .build())).result;
            return fnOut.result(resp.operation.Details.publicKey);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async sendPush(reqBody) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/oneauth/push/send")
            .params(reqBody)
            .contentType(VFetchContentType.JSON)
            .build());
    }
    async getPushStatus(tokenId) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/oneauth/push/status")
            .params({ tokenId })
            .build());
    }
}
