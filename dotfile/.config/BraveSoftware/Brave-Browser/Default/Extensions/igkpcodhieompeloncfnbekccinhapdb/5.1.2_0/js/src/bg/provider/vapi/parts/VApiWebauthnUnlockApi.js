import { VFetchContentType, VFetchMethod } from "../../../service/vapi/constants.js";
import { VFetchInput } from "../../../service/vapi/types/VFetchInput.js";
import { gg } from "../GG.js";
export class VApiWebauthnUnlockApiImpl {
    async getChallenge() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/webauthn/challenge").build());
    }
    async getCredentials() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/webauthn/credentials").build());
    }
    async getPublicKey() {
        return gg.fetch.fetch(VFetchInput.newBuilder().endpoint("/api/rest/json/v1/webauthn/public_key").build());
    }
    async decrypt(input) {
        return gg.fetch.fetch(VFetchInput.newBuilder()
            .method(VFetchMethod.POST)
            .endpoint("/api/rest/json/v1/webauthn/decrypt")
            .params(input)
            .contentType(VFetchContentType.JSON)
            .build());
    }
}
