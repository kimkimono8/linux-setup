export class BgSecretApiImpl {
    context;
    prefix = "secret.";
    edit;
    share;
    totp;
    file;
    history;
    constructor(context) {
        this.context = context;
        this.edit = new BgSecretEditApiImpl(context);
        this.share = new BgSecretShareApiImpl(context);
        this.totp = new BgSecretTotpApiImpl(context);
        this.file = new BgSecretFileApiImpl(context);
        this.history = new BgSecretHistoryApiImpl(context);
    }
    query(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.query.name, args: [query] });
    }
    add(secretAddInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [secretAddInput] });
    }
    delete(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.delete.name, args: [secretId] });
    }
    async querySecrets(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.querySecrets.name, args: [query] });
    }
    async getSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getSecret.name, args: [secretId] });
    }
    async getDbSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getDbSecret.name, args: [secretId] });
    }
    async getServerSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getServerSecret.name, args: [secretId] });
    }
    async getTrashedSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTrashedSecret.name, args: [secretId] });
    }
    async changeFavourite(secretId, favourite) {
        return this.context.apiClient.callApi({ path: this.prefix + this.changeFavourite.name, args: [secretId, favourite] });
    }
    async copyField(secretId, fieldName) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copyField.name, args: [secretId, fieldName] });
    }
    async copyTotp(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copyTotp.name, args: [secretId] });
    }
    async copyOneAuthTotp(secretId, totp) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copyOneAuthTotp.name, args: [secretId, totp] });
    }
    async copyCustomColumn(secretId, columnId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copyCustomColumn.name, args: [secretId, columnId] });
    }
    async login(secretId, url, incognito) {
        return this.context.apiClient.callApi({ path: this.prefix + this.login.name, args: [secretId, url, incognito] });
    }
    async loginFromWeb(secretId, url) {
        return this.context.apiClient.callApi({ path: this.prefix + this.loginFromWeb.name, args: [secretId, url] });
    }
    async deleteSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.deleteSecret.name, args: [secretId] });
    }
    async downloadFile(secretId, fileId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.downloadFile.name, args: [secretId, fileId] });
    }
    async downloadAllFiles(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.downloadAllFiles.name, args: [secretId] });
    }
    async updateFiles(secretId, files) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateFiles.name, args: [secretId, files] });
    }
    async resetPassword(secretId, fieldName) {
        return this.context.apiClient.callApi({ path: this.prefix + this.resetPassword.name, args: [secretId, fieldName] });
    }
    async generateTotp(totpUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.generateTotp.name, args: [totpUrl] });
    }
    async getTotpParams(totpUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTotpParams.name, args: [totpUrl] });
    }
    async getDomainMatchingCount() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getDomainMatchingCount.name });
    }
    async getTotpOf(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTotpOf.name, args: [secretId] });
    }
    async checkExistingPasswordName(name) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkExistingPasswordName.name, args: [name] });
    }
    async checkPolicyFor(password) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkPolicyFor.name, args: [password] });
    }
    async checkPasswordPolicy(password, policyId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkPasswordPolicy.name, args: [password, policyId] });
    }
    async queryTags(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.queryTags.name, args: [query] });
    }
    async getEditUIInput(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getEditUIInput.name, args: [secretId] });
    }
    async updateSecret(secretEditInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateSecret.name, args: [secretEditInput] });
    }
    async getUserUIInput(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getUserUIInput.name, args: [secretId] });
    }
    async updateUserSharing(sharingInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateUserSharing.name, args: [sharingInput] });
    }
    async reEncryptSecretForSharing(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
    }
    async getUserGroupUIInput(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getUserGroupUIInput.name, args: [secretId] });
    }
    async updateUserGroupSharing(sharingInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateUserGroupSharing.name, args: [sharingInput] });
    }
    async updateSecretInServer(input) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateSecretInServer.name, args: [input] });
    }
    async getPasswordHistory(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getPasswordHistory.name, args: [secretId] });
    }
    async getColumnHistory(secretId, columnName) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getColumnHistory.name, args: [secretId, columnName] });
    }
    async getOneAuthTotp(oneauthId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getOneAuthTotp.name, args: [oneauthId] });
    }
    async getSearchHighlightField(secret, searchString) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getSearchHighlightField.name, args: [secret, searchString] });
    }
    async shareToThirdParty(thirdPartyShareInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] });
    }
    async updateAutoLogin(secretId, enable) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateAutoLogin.name, args: [secretId, enable] });
    }
    async suggestNewName(params) {
        return this.context.apiClient.callApi({ path: this.prefix + this.suggestNewName.name, args: [params] });
    }
    async getAddPasswordClassifications() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getAddPasswordClassifications.name });
    }
}
class BgSecretEditApiImpl {
    context;
    prefix = "secret.edit.";
    constructor(context) {
        this.context = context;
    }
    update(secretEditInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [secretEditInput] });
    }
    getUIInput(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
    }
    setAutoLogin(secretId, enable) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setAutoLogin.name, args: [secretId, enable] });
    }
    setFavourite(secretId, favourite) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setFavourite.name, args: [secretId, favourite] });
    }
}
class BgSecretShareApiImpl {
    context;
    prefix = "secret.share.";
    user;
    userGroup;
    constructor(context) {
        this.context = context;
        this.user = new BgSecretShareUserApiImpl(context);
        this.userGroup = new BgSecretShareUserGroupApiImpl(context);
    }
    reEncryptSecretForSharing(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.reEncryptSecretForSharing.name, args: [secretId] });
    }
    async shareToThirdParty(thirdPartyShareInput) {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.shareToThirdParty.name, args: [thirdPartyShareInput] }));
    }
}
class BgSecretShareUserApiImpl {
    context;
    prefix = "secret.share.user.";
    constructor(context) {
        this.context = context;
    }
    getUIInput(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
    }
    update(sharingInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [sharingInput] });
    }
}
class BgSecretShareUserGroupApiImpl {
    context;
    prefix = "secret.share.userGroup.";
    constructor(context) {
        this.context = context;
    }
    getUIInput(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getUIInput.name, args: [secretId] });
    }
    update(sharingInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [sharingInput] });
    }
}
class BgSecretTotpApiImpl {
    context;
    prefix = "secret.totp.";
    constructor(context) {
        this.context = context;
    }
    copy(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copy.name, args: [secretId] });
    }
    copyOneAuthTotp(secretId, totp) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copyOneAuthTotp.name, args: [secretId, totp] });
    }
    generate(totpUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.generate.name, args: [totpUrl] });
    }
    getParams(totpUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getParams.name, args: [totpUrl] });
    }
    getTotp(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTotp.name, args: [secretId] });
    }
    getOneAuthTotp(oneauthId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getOneAuthTotp.name, args: [oneauthId] });
    }
}
class BgSecretFileApiImpl {
    context;
    prefix = "secret.file.";
    constructor(context) {
        this.context = context;
    }
    download(secretId, fileId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.download.name, args: [secretId, fileId] });
    }
    downloadAll(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.downloadAll.name, args: [secretId] });
    }
    update(secretId, files) {
        return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [secretId, files] });
    }
}
class BgSecretHistoryApiImpl {
    context;
    prefix = "secret.history.";
    constructor(context) {
        this.context = context;
    }
    getPasswordHistory(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getPasswordHistory.name, args: [secretId] });
    }
    getColumnHistory(secretId, columnName) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getColumnHistory.name, args: [secretId, columnName] });
    }
}
