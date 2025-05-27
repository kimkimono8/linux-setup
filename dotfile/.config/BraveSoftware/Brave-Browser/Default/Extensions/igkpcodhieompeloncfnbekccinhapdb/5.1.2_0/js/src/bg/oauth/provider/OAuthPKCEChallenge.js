import { SessionStorageKeys } from "../../../service/storage/constants/SessionStorageKeys.js";
export class OAuthPKCEChallenge {
    async setGrantParam(params) {
        try {
            const challengeBuffer = js.crypto.getSalt(64);
            const challenge = js.encoding.bytesToBase64Url(challengeBuffer);
            const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(challenge));
            const hash = js.encoding.bytesToBase64Url(hashBuffer);
            await zsessionStorage.save(SessionStorageKeys.OAUTH_CHALLENGE, challenge);
            params.set("code_challenge_method", "S256");
            params.set("code_challenge", hash);
        }
        catch (e) {
            logError(e);
        }
    }
    async setGenerateParam(parmas) {
        try {
            const challenge = await zsessionStorage.load(SessionStorageKeys.OAUTH_CHALLENGE, "");
            if (!challenge) {
                throw "EMPTY_CHALLENGE";
            }
            parmas.set("code_verifier", challenge);
        }
        catch (e) {
            logError(e);
        }
    }
}
