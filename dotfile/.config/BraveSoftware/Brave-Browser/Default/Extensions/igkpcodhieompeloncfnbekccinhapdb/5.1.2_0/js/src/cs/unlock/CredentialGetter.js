import { WebAuthnCredentialResponse } from "../../service/bgApi/types.js";
class CredentialGetter {
    async getCredential(challenge, credentialIds) {
        try {
            const getOption = {
                publicKey: {
                    challenge: js.encoding.base64ToBytes(challenge),
                    allowCredentials: credentialIds.map(x => ({
                        id: js.encoding.base64ToBytes(x),
                        type: "public-key"
                    })),
                    rpId: window.location.hostname,
                    timeout: 60000,
                    userVerification: "required",
                }
            };
            const credential = await navigator.credentials.get(getOption);
            const resp = credential.response;
            const reqCredential = WebAuthnCredentialResponse.newInstance({
                credentialId: js.encoding.bytesToBase64(credential.rawId),
                signature: js.encoding.bytesToBase64(resp.signature),
                clientData: js.encoding.bytesToBase64(resp.clientDataJSON),
                authData: js.encoding.bytesToBase64(resp.authenticatorData),
            });
            bgApi.unlock.webauthn.setWebAuthnCredential(fnOut.result(reqCredential));
            this.updateVerifyUI();
            return fnOut.result(reqCredential);
        }
        catch (e) {
            bgApi.unlock.webauthn.setWebAuthnCredential(fnOut.error(e));
            return fnOut.error(e);
        }
    }
    updateVerifyUI() {
        try {
            document.querySelector("#status_elem").textContent = "Unlocking...";
        }
        catch (e) {
            logError(e);
        }
    }
}
export const credentialGetter = new CredentialGetter();
