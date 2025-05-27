import { bg } from "../../../../src/bg/bg.js";
import { Secret } from "../../../../src/service/bgApi/types/Secret.js";
import { BaseSecretAdd } from "../BaseSecretAdd.js";
import { SecretEditReEncryptApiInputGetter } from "./SecretEditReEncryptApiInputGetter.js";
import { SecretEditUIInputGetter } from "./SecretEditUIInputGetter.js";
import { SecretUpdateHelper } from "./SecretUpdateHelper.js";
export class SecretEdit extends BaseSecretAdd {
    reEncryptApiHelper = new SecretEditReEncryptApiInputGetter(this);
    updateHelper = new SecretUpdateHelper(this);
    async getEditUIInput(secretId) {
        try {
            const secret = await this.p.secretGetter.getServerSecret(secretId);
            const hasNoEditPermission = !Secret.hasEditPermission(secret.sharing_level);
            if (hasNoEditPermission) {
                throw "No edit permission";
            }
            const editUIInput = await new SecretEditUIInputGetter().getInput(secret);
            return editUIInput;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async updatePassword(input) {
        try {
            await this.updateHelper.update(input);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async reEncryptSecretForSharing(secretId) {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getSecret(secretId);
            const noReEncryption = secret.shared;
            if (noReEncryption) {
                return;
            }
            const reEncryptFiles = secret.encrypted.files.length > 0;
            if (reEncryptFiles) {
                await this.reEncryptFiles(secretId);
            }
            const editInput = await this.reEncryptApiHelper.getEditInput(secretId);
            await this.updatePassword(editInput);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async reEncryptFiles(secretId) {
        try {
            const files = await bg.vaultSecrets.secretFiles.downloadAllFiles(secretId);
            const reqFiles = [];
            let fileData = "";
            let encryptedFileData = "";
            for (let curFile of files) {
                fileData = await bg.zcrypt.fileDecrypt(curFile.data, false);
                encryptedFileData = await bg.zcrypt.fileEncrypt(fileData, true);
                reqFiles.push({
                    name: curFile.name,
                    column: curFile.column,
                    data: encryptedFileData,
                    fileId: curFile.fileId,
                    size: curFile.size
                });
            }
            await bg.vaultSecrets.secretFiles.updateFiles(secretId, reqFiles);
        }
        catch (e) {
            throw "cannot reencrypt files";
        }
    }
}
