import { bg } from "../../src/bg/bg.js";
import { accountDb, vapi } from "../../src/bg/Context.js";
import { bgStorage } from "../../src/bg/storage/export.js";
import { PasswordResetInfo } from "../../src/service/bgApi/types.js";
import { SessionStorageKeys } from "../../src/service/storage/constants/SessionStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
export class PasswordReset {
    async resetPassword(secretId, fieldName) {
        try {
            const secret = await bg.vaultSecrets.secretGetter.getServerSecret(secretId);
            const url = secret.urls[0];
            const domain = js.url.getParentDomain(url);
            const inProgress = await this.checkInProgress(domain);
            if (inProgress) {
                return;
            }
            await this.addInProgress(domain);
            bg.vaultAudit.auditResetPasswordInitiated(secretId);
            await new PasswordReseter().resetPassword(secret, fieldName);
        }
        catch (e) {
            logError(e);
        }
    }
    async finishReset(tabId, successfull) {
        try {
            const passwordResetInfo = await bgStorage.tab.load(tabId, TabStorageKeys.RESET_DATA, null);
            await bgStorage.tab.remove(tabId, TabStorageKeys.RESET_DATA);
            const secret = await bg.vaultSecrets.secretGetter.getSecret(passwordResetInfo.secretId);
            const domain = js.url.getParentDomain(secret.urls[0]);
            await this.removeInProgress(domain);
            if (!successfull) {
                bg.vaultAudit.auditResetPasswordFailure(secret.id);
                await this.showNotification(secret.name, false);
                return;
            }
            await this.saveChangedPassword(secret, passwordResetInfo);
            await this.showNotification(secret.name, true);
            bg.vaultAudit.auditResetPasswordSuccess(secret.id);
        }
        catch (e) {
            logError(e);
        }
    }
    async saveChangedPassword(secret, passwordResetInfo) {
        try {
            const secretId = secret.id;
            const editUIInput = await bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
            const passwordFieldName = passwordResetInfo.fieldName;
            const plainSecretData = editUIInput.plainSecretData;
            plainSecretData[passwordFieldName] = passwordResetInfo.newPassword;
            const customColumns = editUIInput.customColumns;
            if (customColumns[customColumns.length - 1].colname.startsWith("ChangePassword")) {
                customColumns.pop();
            }
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
        }
        catch (e) {
            logError(e);
        }
    }
    async showNotification(secretName, successfull) {
        try {
            const RESET_NOTIFICATION = "RESET_NOTIFICATION";
            await brApi.notification.create(RESET_NOTIFICATION, {
                type: "basic",
                iconUrl: "/images/logo/vault-128.png",
                title: "Password Change Notification",
                message: `Password change attempt for ${secretName} ${successfull ? "successfull" : "failed"}.`
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async checkInProgress(domain) {
        try {
            const inProgressResets = await this.getInProgressObj();
            return Boolean(inProgressResets[domain]);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async addInProgress(domain) {
        try {
            const inProgressResets = await this.getInProgressObj();
            inProgressResets[domain] = true;
            await zsessionStorage.save(SessionStorageKeys.IN_PROGRESS_RESETS, inProgressResets);
        }
        catch (e) {
            logError(e);
        }
    }
    async removeInProgress(domain) {
        try {
            const inProgressResets = await this.getInProgressObj();
            delete inProgressResets[domain];
            await zsessionStorage.save(SessionStorageKeys.IN_PROGRESS_RESETS, inProgressResets);
        }
        catch (e) {
            logError(e);
        }
    }
    async getInProgressObj() {
        try {
            const inProgressResets = await zsessionStorage.load(SessionStorageKeys.IN_PROGRESS_RESETS, {});
            return inProgressResets;
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
}
class PasswordReseter {
    secret = null;
    secretType = null;
    launchUrl = "";
    async resetPassword(secret, fieldName) {
        try {
            this.secret = secret;
            this.secretType = await accountDb.secretTypeTable.load(secret.type_id);
            const passwordResetInfo = {
                secretId: this.secret.id,
                fieldName,
                userName: await this.getUsername(),
                oldPassword: await this.getOldPassword(fieldName),
                newPassword: await bg.vaultPolicies.generatePassword(this.secret.policy_id),
                steps: await this.getResetSteps(),
                currentStepIndex: 0,
                expiresIn: 0
            };
            await this.addNewPasswordAsCustomColumn(passwordResetInfo.newPassword);
            const tab = await brApi.tab.create(this.launchUrl);
            await brApi.tab.getCompletedTab(tab.id);
            passwordResetInfo.expiresIn = Date.now() + PasswordResetInfo.MAX_WAIT_TIME_MS;
            await bgStorage.tab.save(tab.id, TabStorageKeys.RESET_DATA, passwordResetInfo);
            csApi.other.resetPassword(tab.id);
        }
        catch (e) {
            logError(e);
        }
    }
    async addNewPasswordAsCustomColumn(newPassword) {
        try {
            const secret = this.secret;
            const secretId = secret.id;
            const editUIInput = await bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
            const customColumns = editUIInput.customColumns;
            customColumns.push({
                colname: "ChangePassword-" + new Date(),
                id: "customColDiv_" + customColumns.length,
                type: "password",
                value: newPassword
            });
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
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getResetSteps() {
        const domain = js.url.getParentDomain(this.secret.urls[0]);
        const resp = (await vapi.getPasswordResetSteps(this.secret.id, domain)).result;
        if (!vapi.isRespOk(resp)) {
            throw (resp.operation.result.message);
        }
        const resetData = resp.operation.details.CHANGEPASSWORD[0];
        this.launchUrl = resetData.APPURL;
        return resetData.FIELDDETAILS;
    }
    async getUsername() {
        const usernameField = this.secretType.text_fields[0].name;
        const username = await bg.zcrypt.decrypt(this.secret.encrypted.fields[usernameField], this.secret.shared);
        return username;
    }
    async getOldPassword(fieldName) {
        const oldPassword = await bg.zcrypt.decrypt(this.secret.encrypted.fields[fieldName], this.secret.shared);
        return oldPassword;
    }
}
