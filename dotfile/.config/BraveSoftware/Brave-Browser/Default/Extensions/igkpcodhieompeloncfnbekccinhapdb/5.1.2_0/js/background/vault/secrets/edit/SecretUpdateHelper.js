import { bg } from "../../../../src/bg/bg.js";
import { accountDb, bgEventServer, passwordAssessment, vapi } from "../../../../src/bg/Context.js";
import { Secret } from "../../../../src/service/bgApi/types/Secret.js";
import { SecretEditUIInputGetter } from "./SecretEditUIInputGetter.js";
export class SecretUpdateHelper {
    p = null;
    constructor(p) {
        this.p = p;
    }
    async update(input) {
        try {
            const secret = await this.p.p.secretGetter.getSecret(input.secretId);
            const shared = input.reEncrypt ? true : secret.shared;
            const apiInput = await this.getApiInput(input, secret, shared);
            const resp = (await vapi.secret.update(apiInput)).result;
            if (resp.operation.result.status != "Success") {
                const errorMsg = resp.operation.result.message || "Error occured!";
                throw errorMsg.replace("secret", "password");
            }
            const respSecret = resp.operation.Details;
            const editedSecret = await this.p.p.addVApiSecretResponse(respSecret);
            passwordAssessment.assessPassword(editedSecret);
            bgEventServer.secret.changed(secret.id);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getApiInput(input, secret, shared) {
        try {
            const initialInput = await new SecretEditUIInputGetter().getInput(secret);
            const oldValues = input.reEncrypt ? null : await this.getOldValues(initialInput, input);
            const includeTotp = (initialInput.totpUrl != input.totpUrl) || input.reEncrypt;
            const apiInput = {
                secretname: input.name,
                encsecretname: await bg.zcrypt.encrypt(input.name, shared),
                encdescription: await bg.zcrypt.encrypt(input.description, shared),
                encryptedurls: await Promise.all(input.urls.map(url => bg.zcrypt.encrypt(url, shared))),
                encryptedtags: await bg.zcrypt.encrypt(input.tags.join(","), shared),
                secret_auto_id: input.secretId,
                logo: this.p.getApiInputLogo(input.logo),
                secrettypeid: secret.type_id,
                policyid: input.policyId,
                classification: input.classification,
                isshared: shared ? Secret.IS_SHARED.YES : Secret.IS_SHARED.NO,
                passwordmodified: Boolean(oldValues),
                secretdata: await bg.zcrypt.encryptObject(input.plainSecretData, shared),
                securenote: await bg.zcrypt.encrypt(input.notes, shared),
                customcolumnnew: await this.p.getApiInputCustomColumn(input.customColumns, shared),
                oneauth_id: input.oneauth_id
            };
            if (input?.files?.length) {
                apiInput.files = input.files;
            }
            if (input?.deletedFiles?.length) {
                apiInput.deletedFiles = input.deletedFiles;
            }
            if (oldValues) {
                apiInput.oldvalues = await bg.zcrypt.encryptObject(oldValues, shared);
            }
            if (input.reEncrypt && secret.oldValues && js.obj.isNonEmpty(secret.oldValues)) {
                apiInput.old_values = await this.p.reEncryptApiHelper.getReEncryptedApiOldValues(secret);
            }
            if (includeTotp) {
                apiInput.totp = await bg.zcrypt.encrypt(input.totpUrl, shared);
            }
            return apiInput;
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
    async getOldValues(existingInput, editedInput) {
        try {
            const typeId = existingInput.typeId;
            const secretType = await accountDb.secretTypeTable.load(typeId);
            const reqFieldNames = js.array.concat(secretType.text_fields.map(x => x.name), secretType.password_fields.map(x => x.name));
            const oldValues = {};
            const initialPlainSecretData = existingInput.plainSecretData;
            const finalPlainSecretData = editedInput.plainSecretData;
            let isModified = false;
            for (let fieldName of reqFieldNames) {
                isModified = initialPlainSecretData[fieldName] != finalPlainSecretData[fieldName];
                if (isModified && initialPlainSecretData[fieldName]) {
                    oldValues[fieldName] = initialPlainSecretData[fieldName] || "";
                }
            }
            if (js.obj.isEmpty(oldValues)) {
                return null;
            }
            return oldValues;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
