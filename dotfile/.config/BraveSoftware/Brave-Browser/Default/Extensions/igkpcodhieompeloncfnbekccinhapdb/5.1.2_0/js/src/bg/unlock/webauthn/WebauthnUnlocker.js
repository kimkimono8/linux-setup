import { UnlockMethod } from "../../../service/bgApi/types.js";
import { bg } from "../../bg.js";
import { vapi } from "../../Context.js";
export class WebAuthnUnlocker {
    gg;
    CHALLENGE_KEY = "WEBAUTHN_CHALLENGE";
    constructor(gg) {
        this.gg = gg;
    }
    async startUnlock() {
        try {
            const challengeResp = (await vapi.unlock.webauthn.getChallenge()).result;
            const challenge = challengeResp.operation.Details.CHALLENGE;
            const credentialIds = challengeResp.operation.Details.CREDENTIAL_IDS;
            await zsessionStorage.save(this.CHALLENGE_KEY, {
                challengeId: challengeResp.operation.Details.CHALLENGE_ID
            });
            this.gg.unlock.webauthn.credentialGetter.getCredential(challenge, credentialIds);
        }
        catch (e) {
            logError(e);
        }
    }
    async continueUnlock(credentialResp) {
        try {
            if (!credentialResp.ok) {
                this.webauthnUnlockComplete(credentialResp);
                return;
            }
            const credential = credentialResp.result;
            const { challengeId } = await zsessionStorage.load(this.CHALLENGE_KEY, {});
            if (!challengeId) {
                throw "INVALID_CHALLENGE_ID";
            }
            const savedData = await this.gg.unlock.webauthn.storage.load();
            if (!savedData || !savedData.localEncMasterKey || !savedData.serverEncLocalKey) {
                this.gg.unlock.webauthn.storage.clear();
                throw "INVALID_EXISTING_DATA";
            }
            const { localEncMasterKey, serverEncLocalKey } = savedData;
            const { publicKey, privateKey } = (await js.crypto.rsa.generateKey()).result;
            const exportedPublicKey = await js.crypto.rsa.exportPublicKey(publicKey);
            const apiInput = {
                ciphertext: serverEncLocalKey,
                publicKey: exportedPublicKey,
                challengeId: challengeId,
                credentialId: credential.credentialId,
                signature: credential.signature,
                clientData: credential.clientData,
                authData: credential.authData
            };
            const resp = (await vapi.unlock.webauthn.decrypt(apiInput)).result;
            if (resp.operation.result.status != "success") {
                throw resp.operation.result.message || "webauthn decrypt api response failed";
            }
            const localKeyRsaEncrypted = await resp.operation.Details.key;
            if (!localKeyRsaEncrypted) {
                throw "INVALID_RESPONSE";
            }
            const localKeyBase64 = await js.crypto.rsa.decrypt(localKeyRsaEncrypted, privateKey);
            if (!localKeyBase64) {
                throw "EMPTY_DECRYPTED_LOCAL_KEY";
            }
            const localKey = (await js.crypto.aes.importKey(localKeyBase64)).result;
            const key = await js.crypto.aes.decrypt(localEncMasterKey, localKey);
            bg.vaultLogin.unlockVault(key);
            vapi.auditUserAction("UnlockedUsingWebAuthn");
            this.gg.unlock.setLastUnlockMethod(UnlockMethod.WEBAUTHN);
            this.webauthnUnlockComplete(fnOut.OK);
        }
        catch (e) {
            logError(e);
            this.webauthnUnlockComplete(fnOut.error(e));
        }
    }
    async webauthnUnlockComplete(resp) {
        try {
            this.notifyPopup(resp);
            this.gg.unlock.webauthn.credentialGetter.closeTab();
        }
        catch (e) {
            logError(e);
        }
    }
    async notifyPopup(resp) {
        try {
            const hasPopup = await bg.popupClient.checkConnectable();
            if (hasPopup) {
                bg.popupClient.oneWebauthnComplete(resp);
                return;
            }
            if (!resp.error) {
                return;
            }
            this.gg.util.setUnlockError(UnlockMethod.WEBAUTHN, resp);
        }
        catch (e) {
            logError(e);
        }
    }
}
