import { bg } from "../../../src/bg/bg.js";
import { accountDb, bgEventServer, passwordAssessment, vapi } from "../../../src/bg/Context.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { BaseSecretAdd } from "./BaseSecretAdd.js";
export class SecretAdd extends BaseSecretAdd {
    async addSecret(input) {
        try {
            const apiInput = await this.getApiInput(input);
            const resp = (await vapi.secret.add(apiInput)).result;
            if (!vapi.isRespOk(resp)) {
                const errorMsg = resp.operation.result.message || "Error occured!";
                throw errorMsg.replace("secret", "password");
            }
            if (input.newFolderName || input.folderId) {
                await bg.vaultFolders.sync();
            }
            const respSecret = resp.operation.Details;
            const secret = await this.p.addVApiSecretResponse(respSecret);
            bgEventServer.secret.added(secret.id);
            if (input.folderId) {
                await accountDb.folderSecretMapTable.addSecret(input.folderId, secret.id);
            }
            passwordAssessment.assessPassword(secret);
            return secret;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getApiInput(input) {
        try {
            const shared = await bg.zcrypt.getIsShared(input.classification);
            const apiInput = {
                secretname: input.name,
                encsecretname: await bg.zcrypt.encrypt(input.name, shared),
                encdescription: await bg.zcrypt.encrypt(input.description, shared),
                encryptedurls: await Promise.all(input.urls.map(url => bg.zcrypt.encrypt(url, shared))),
                encryptedtags: await bg.zcrypt.encrypt(input.tags.join(","), shared),
                secrettypeid: input.typeId,
                logo: this.getApiInputLogo(input.logo),
                policyid: input.policyId,
                classification: input.classification,
                isshared: shared ? Secret.IS_SHARED.YES : Secret.IS_SHARED.NO,
                secretdata: await bg.zcrypt.encryptObject(input.plainSecretData, shared),
                securenote: await bg.zcrypt.encrypt(input.notes, shared),
                customcolumnnew: await this.getApiInputCustomColumn(input.customColumns, shared),
            };
            if (input.files.length > 0) {
                apiInput.files = input.files;
            }
            this.setFolder(apiInput, input);
            if (input.totpUrl) {
                apiInput.totp = await bg.zcrypt.encrypt(input.totpUrl, shared);
            }
            if (input.oneauth_id) {
                apiInput.oneauth_id = input.oneauth_id;
            }
            return apiInput;
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    setFolder(apiInput, input) {
        try {
            if (input.folderId) {
                apiInput.chamberid = input.folderId;
                return;
            }
            if (input.newFolderName) {
                apiInput.foldername = input.newFolderName;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
