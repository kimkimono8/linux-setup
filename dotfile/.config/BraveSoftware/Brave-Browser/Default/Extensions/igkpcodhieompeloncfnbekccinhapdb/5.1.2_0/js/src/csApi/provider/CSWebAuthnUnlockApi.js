import { VtApiPortNames } from "../../service/vt/constants/VtApiPortNames.js";
export class CSWebAuthnUnlockApiImpl {
    async getCredential(challenge, credentialIds, tabId) {
        const apiClient = portApi.createApiClient();
        await apiClient.init({ name: VtApiPortNames.CS_WEBAUTHN_UNLOCK, checkConnectionBeforeApiCall: true });
        return fnOut.parse(await apiClient.callApi({ path: this.getCredential.name, args: [challenge, credentialIds], connect: { tabId } }));
    }
}
