import { PasswordHistory } from "../../../background/vault/secrets/PasswordHistory.js";
import { ThirdPartyShareBg } from "../../../background/vault/secrets/ThirdPartyShareBg.js";
import { accountDb } from "../Context.js";
import { totpGenerator } from "../generator/export.js";
export class BgSecretApiImpl {
    share = new BgSecretShareApiImpl();
    totp = new BgSecretTotpApiImpl();
    file = new BgSecretFileApiImpl();
    edit = new BgSecretEditApiImpl();
    history = new BgSecretHistoryApiImpl();
    query(query) {
        return bg.vaultSecrets.secretQuerier.query(query);
    }
    add(secretAddInput) {
        return bg.vaultSecrets.secretAdd.addSecret(secretAddInput);
    }
    delete(secretId) {
        return bg.vaultSecrets.deleteSecret(secretId);
    }
    async getSecret(secretId) {
        return bg.vaultSecrets.secretGetter.getSecret(secretId);
    }
    async getDbSecret(secretId) {
        return bg.vaultSecrets.secretGetter.getDbSecret(secretId);
    }
    async getServerSecret(secretId) {
        return bg.vaultSecrets.secretGetter.getServerSecret(secretId);
    }
    async getTrashedSecret(secretId) {
        return bg.vaultSecrets.secretGetter.getTrashedSecret(secretId);
    }
    async copyField(secretId, field_name) {
        return bg.vaultSecrets.secretCopier.copyField(secretId, field_name);
    }
    async copyCustomColumn(secretId, column_id) {
        return bg.vaultSecrets.secretCopier.copyCustomField(secretId, column_id);
    }
    async login(secretId, url, incognito) {
        return bg.vaultSecrets.secretLogin.login({ secretId, url, incognito });
    }
    async loginFromWeb(secretId, url) {
        return bg.vaultSecrets.secretLogin.loginFromWeb(secretId, url);
    }
    async resetPassword(secretId, fieldName) {
        return bg.passwordReset.resetPassword(secretId, fieldName);
    }
    async getDomainMatchingCount() {
        return domainHandler.getDomainMatchingCount();
    }
    async checkExistingPasswordName(name) {
        return bg.vaultSecrets.secretUtil.checkExistingPasswordName(name);
    }
    async checkPolicyFor(password) {
        return bg.vaultPolicies.checkPolicyFor(password);
    }
    async checkPasswordPolicy(password, policyId) {
        return bg.vaultPolicies.checkPasswordPolicy(password, policyId);
    }
    async queryTags(query) {
        return accountDb.tagTable.query(query);
    }
    async getSearchHighlightField(secret, searchString) {
        return bg.vaultSecrets.secretQuerier.getHighlightField(secret, searchString);
    }
    async suggestNewName(params) {
        return bg.vaultSecrets.secretUtil.suggestNewName(params);
    }
    async getAddPasswordClassifications() {
        return bg.vaultConfig.getAddPasswordClassifications();
    }
}
class BgSecretShareApiImpl {
    user = new BgSecretShareUserApiImpl();
    userGroup = new BgSecretShareUserGroupApiImpl();
    reEncryptSecretForSharing(secretId) {
        return bg.vaultSecrets.secretEdit.reEncryptSecretForSharing(secretId);
    }
    shareToThirdParty(thirdPartyShareInput) {
        return ThirdPartyShareBg.sharePassword(thirdPartyShareInput);
    }
}
class BgSecretShareUserApiImpl {
    getUIInput(secretId) {
        return bg.vaultSecrets.secretShare.getSecretShareUserUIInput(secretId);
    }
    update(sharingInput) {
        return bg.vaultSecrets.secretShare.updateUserSharing(sharingInput);
    }
}
class BgSecretShareUserGroupApiImpl {
    getUIInput(secretId) {
        return bg.vaultSecrets.secretShare.getSecretShareUserGroupUIInput(secretId);
    }
    update(sharingInput) {
        return bg.vaultSecrets.secretShare.updateUserGroupSharing(sharingInput);
    }
}
class BgSecretTotpApiImpl {
    copy(secretId) {
        return bg.vaultSecrets.secretCopier.copyTotp(secretId);
    }
    copyOneAuthTotp(secretId, totp) {
        return bg.vaultSecrets.secretCopier.copyOneauthTotp(secretId, totp);
    }
    generate(totpUrl) {
        return totpGenerator.generate(totpUrl);
    }
    async getParams(totpUrl) {
        return totpGenerator.parseUrl(totpUrl);
    }
    getTotp(secretId) {
        return bg.vaultSecrets.getTotp(secretId);
    }
    getOneAuthTotp(oneauthId) {
        return bg.oneAuthTotp.getTotp(oneauthId);
    }
}
class BgSecretFileApiImpl {
    async download(secretId, file_id) {
        return bg.vaultSecrets.secretFiles.downloadFile(secretId, file_id);
    }
    async downloadAll(secretId) {
        return bg.vaultSecrets.secretFiles.downloadAllFiles(secretId);
    }
    update(secretId, files) {
        return bg.vaultSecrets.secretFiles.updateFiles(secretId, files);
    }
}
class BgSecretEditApiImpl {
    setFavourite(secretId, favourite) {
        return bg.vaultSecrets.changeFavourite(secretId, favourite);
    }
    setAutoLogin(secretId, enable) {
        return bg.vaultSecrets.updateAutoLogin(secretId, enable);
    }
    getUIInput(secretId) {
        return bg.vaultSecrets.secretEdit.getEditUIInput(secretId);
    }
    update(secretEditInput) {
        return bg.vaultSecrets.secretEdit.updatePassword(secretEditInput);
    }
}
class BgSecretHistoryApiImpl {
    getPasswordHistory(secretId) {
        return PasswordHistory.inst().getPasswordHistory(secretId);
    }
    getColumnHistory(secretId, columnName) {
        return PasswordHistory.inst().getColumnHistory(secretId, columnName);
    }
}
