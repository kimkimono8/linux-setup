import { VtApiPortNames } from "../../service/vt/constants/VtApiPortNames.js";
import { credentialGetter } from "./CredentialGetter.js";
class WebAuthnUnlockApiServer {
    init() {
        const apiServer = portApi.createApiServer();
        apiServer.init({ name: VtApiPortNames.CS_WEBAUTHN_UNLOCK, fnObj: this });
    }
    async getCredential(challenge, credentialIds) {
        return credentialGetter.getCredential(challenge, credentialIds);
    }
}
export const webauthnUnlockApiServer = new WebAuthnUnlockApiServer();
