import { bg } from "../../bg.js";
import { vapi } from "../../Context.js";
const OneAuthPushRespStatus = {
    INITIAL: "INITIAL",
    DECRYPTION_PENDING: "DECRYPTION_PENDING",
    DECRYPTION_COMPLETED: "DECRYPTION_COMPLETED"
};
export class PushUnlock {
    gg;
    device = null;
    pushResponsePromise = null;
    pushToken = "";
    currentPushStatus = null;
    pollCallId = 0;
    lastPushArgs = null;
    pushRespData = "";
    constructor(gg) {
        this.gg = gg;
    }
    async unlock() {
        try {
            const existingData = await this.gg.unlock.oneauth.storage.load();
            if (!existingData) {
                throw "NO_EXISTING_DATA";
            }
            this.device = existingData.device;
            const localEncMasterKey = existingData.localEncMasterKey;
            const oneAuthEncLocalKey = existingData.oneAuthEncLocalKey;
            if (!localEncMasterKey || !oneAuthEncLocalKey || !this.device || !this.device.publicKey || !this.device.token) {
                this.gg.unlock.oneauth.storage.clear();
                throw "INVALID_EXISTING_DATA";
            }
            const { publicKey, privateKey } = (await js.crypto.rsa.generateKey()).result;
            const exportedPublicKey = await js.crypto.rsa.exportPublicKey(publicKey);
            const decryptResult = await this.oneAuthDecrypt(oneAuthEncLocalKey, exportedPublicKey);
            if (!decryptResult.ok) {
                return decryptResult;
            }
            const localKeyRsaEncrypted = decryptResult.result;
            if (!localKeyRsaEncrypted) {
                throw "CANNOT_OBTAIN_LOCAL_KEY";
            }
            const localKeyBase64 = await js.crypto.rsa.decrypt(localKeyRsaEncrypted, privateKey);
            const localKey = (await js.crypto.aes.importKey(localKeyBase64)).result;
            const key = await js.crypto.aes.decrypt(localEncMasterKey, localKey);
            return fnOut.result(key);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async resendPush() {
        const pushResp = (await this.sendPush.apply(this, this.lastPushArgs)).result;
        this.pushToken = pushResp.token;
        this.pollResponse();
    }
    async oneAuthDecrypt(ciphertext, reqPublicKey) {
        const pushResp = (await this.sendPush(ciphertext, reqPublicKey)).result;
        this.pushResponsePromise = js.promise.createNew();
        this.pushToken = pushResp.token;
        this.pollResponse();
        const resp = await this.pushResponsePromise;
        if (!resp) {
            return fnOut.error("DENIED");
        }
        return fnOut.result(resp);
    }
    async sendPush(oneauthEncryptedLocalKey, publicKey) {
        try {
            this.lastPushArgs = Array.from(arguments);
            const reqBody = {
                deviceToken: this.device.token,
                pushData: {
                    title: "Unlock Zoho Vault",
                    message: "",
                    notifyurl: "https://vault.zoho.com",
                    custom: {
                        val: oneauthEncryptedLocalKey,
                        data: publicKey
                    }
                }
            };
            const resp = (await vapi.oneauth.sendPush(reqBody)).result;
            if (!resp.operation || !resp.operation.result) {
                throw new Error("INVALID_RESPONSE");
            }
            if (!vapi.isRespOk(resp)) {
                throw resp.operation.result.message;
            }
            const iamResp = resp.operation.Details;
            const SUCCESS_CODE = "PN200";
            if (iamResp.code != SUCCESS_CODE) {
                throw iamResp.message;
            }
            try {
                this.oneAuthPushSent();
            }
            catch (e) {
                logError(e);
            }
            return fnOut.result(iamResp);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    async checkStatus() {
        this.currentPushStatus = await this.getPushDecryptStatus(this.pushToken);
        if (this.currentPushStatus == OneAuthPushRespStatus.DECRYPTION_COMPLETED) {
            this.pushResponsePromise.resolve(this.pushRespData);
        }
    }
    async getPushDecryptStatus(tokenId) {
        const resp = (await vapi.oneauth.getPushStatus(tokenId)).result;
        if (!resp.operation || !resp.operation.result) {
            throw new Error("INVALID_RESPONSE");
        }
        if (!vapi.isRespOk(resp)) {
            throw resp.operation.result.message;
        }
        const statusResp = resp.operation.Details;
        switch (statusResp.code) {
            case "D102": return OneAuthPushRespStatus.DECRYPTION_PENDING;
            case "D101":
                this.pushRespData = statusResp.data;
                return OneAuthPushRespStatus.DECRYPTION_COMPLETED;
            case "D103":
                this.pushRespData = "";
                return OneAuthPushRespStatus.DECRYPTION_COMPLETED;
            default:
                throw new Error("INVALID_STATE_" + statusResp.code + ": " + statusResp.message);
        }
    }
    async pollResponse() {
        const pollCallId = ++this.pollCallId;
        const timeDelay = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5];
        for (let delay of timeDelay) {
            await this.checkStatus();
            await js.time.delay(delay);
            if (!this.pushResponsePromise.isPending() || pollCallId != this.pollCallId) {
                return;
            }
        }
        this.pushResponsePromise.reject("TIME_OUT");
    }
    async oneAuthPushSent() {
        try {
            const hasPopup = await bg.popupClient.checkConnectable();
            if (hasPopup) {
                bg.popupClient.oneAuthPushSent();
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
