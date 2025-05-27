import { bg } from "../../src/bg/bg.js";
import { accountDb } from "../../src/bg/Context.js";
import { bgStorage } from "../../src/bg/storage/export.js";
import { FillField, SaveCredential } from "../../src/service/bgApi/types.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
export class BgUpdateFrame {
    async show(saveCredential, secret, tabId) {
        try {
            const updateFrameData = {
                secretId: secret.id,
                name: secret.name,
                username: saveCredential.username,
                password: saveCredential.password,
                urls: saveCredential.urls,
                usernameField: new FillField(),
                passwordField: new FillField()
            };
            await this.fillUpdateUsernamePasswordFillField(updateFrameData, secret);
            await this.showUpdateFrame(updateFrameData, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async updateChangedLoginPassword(changedLoginPassword, tabId) {
        try {
            const noUpdate = await bg.neverSaveChecker.checkNoNeedUpdateLoginPasswordChange(tabId);
            if (noUpdate) {
                return;
            }
            const secret = await accountDb.secretTable.get(changedLoginPassword.secretId);
            const secretType = await accountDb.secretTypeTable.load(secret.type_id);
            const passwordField = secretType.password_fields
                .find(x => x.name == changedLoginPassword.passwordFieldName);
            const usernameField = secretType.text_fields
                .find(x => secret.encrypted.fields[x.name]);
            const username = await bg.zcrypt.decrypt(secret.encrypted.fields[usernameField.name], secret.shared);
            const updateFrameData = {
                secretId: changedLoginPassword.secretId,
                name: secret.name,
                urls: secret.urls,
                username,
                password: changedLoginPassword.newPassword,
                usernameField: {
                    label: usernameField.label,
                    name: usernameField.name
                },
                passwordField: {
                    label: passwordField.label,
                    name: passwordField.name
                }
            };
            await this.showUpdateFrame(updateFrameData, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async getData(tabId) {
        try {
            const updateFrameData = await bgStorage.tab.load(tabId, TabStorageKeys.UPDATE_FRAME_DATA);
            return updateFrameData;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async editPassword(tabId) {
        try {
            const updateFrameData = await this.getData(tabId);
            const secretId = updateFrameData.secretId;
            const editUIInput = await bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
            const passwordFieldName = updateFrameData.passwordField.name;
            const plainSecretData = editUIInput.plainSecretData;
            plainSecretData[passwordFieldName] = updateFrameData.password;
            await bg.ztabHandler.editInput(editUIInput);
            this.close({ restoreFoucs: true }, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async saveAsNew(tabId) {
        try {
            const updateFrameData = await this.getData(tabId);
            const saveCredential = new SaveCredential();
            saveCredential.username = updateFrameData.username;
            saveCredential.password = updateFrameData.password;
            saveCredential.urls = updateFrameData.urls;
            this.close({}, tabId);
            bg.saveFrame.show(saveCredential, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async updatePassword(tabId) {
        try {
            const updateFrameData = await this.getData(tabId);
            const secretId = updateFrameData.secretId;
            const editUIInput = await bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
            const passwordFieldName = updateFrameData.passwordField.name;
            const plainSecretData = editUIInput.plainSecretData;
            plainSecretData[passwordFieldName] = updateFrameData.password;
            const input = {
                secretId,
                name: editUIInput.name,
                logo: editUIInput.logo,
                policyId: editUIInput.policyId,
                classification: editUIInput.classification,
                plainSecretData: editUIInput.plainSecretData,
                totpUrl: editUIInput.totpUrl,
                notes: editUIInput.notes,
                urls: editUIInput.urls,
                tags: editUIInput.tags,
                files: [],
                deletedFiles: [],
                description: editUIInput.description,
                customColumns: editUIInput.customColumns,
                oneauth_id: editUIInput.oneauthId
            };
            await bg.vaultSecrets.secretEdit.updatePassword(input);
            this.close({ restoreFoucs: true }, tabId);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async close(params, tabId) {
        try {
            await bgStorage.tab.save(tabId, TabStorageKeys.UPDATE_FRAME_DATA, null);
            await bgStorage.tab.save(tabId, TabStorageKeys.SHOWN_UPDATE_FRAME, false);
            csApi.frame.closeFrame(params, tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async showUpdateFrame(updateFrameData, tabId) {
        try {
            await bgStorage.tab.save(tabId, TabStorageKeys.UPDATE_FRAME_DATA, updateFrameData);
            await bgStorage.tab.save(tabId, TabStorageKeys.SHOWN_UPDATE_FRAME, true);
            csApi.frame.showUpdateFrame(tabId);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillUpdateUsernamePasswordFillField(updateFrameData, secret) {
        try {
            const secretDataFields = secret.encrypted.fields;
            const secretType = await accountDb.secretTypeTable.load(secret.type_id);
            let isReqUsernameField = false;
            for (let field of secretType.text_fields) {
                isReqUsernameField = secretDataFields[field.name] &&
                    ((await bg.zcrypt.decrypt(secretDataFields[field.name], secret.shared)) == updateFrameData.username);
                if (isReqUsernameField) {
                    updateFrameData.usernameField.name = field.name;
                    updateFrameData.usernameField.label = field.label;
                    break;
                }
            }
            const passwordField = secretType.password_fields[0];
            updateFrameData.passwordField.name = passwordField.name;
            updateFrameData.passwordField.label = passwordField.label;
        }
        catch (e) {
            logError(e);
        }
    }
}
