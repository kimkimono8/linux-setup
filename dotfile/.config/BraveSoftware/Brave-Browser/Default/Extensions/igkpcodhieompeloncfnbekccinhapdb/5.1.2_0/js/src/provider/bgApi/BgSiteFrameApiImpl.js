export class BgSiteFrameApiImpl {
    context;
    prefix = "siteFrame.";
    constructor(context) {
        this.context = context;
    }
    async showSiteFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name });
    }
    async closeSiteFrame(params = {}) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeSiteFrame.name, args: [params] });
    }
    async getSecrets(siteFrameSecretQuery) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getSecrets.name, args: [siteFrameSecretQuery] });
    }
    async frameLogin(secretId, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.frameLogin.name, args: [secretId, frameId] });
    }
    async fillSecret(secretId, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillSecret.name, args: [secretId, frameId] });
    }
    async fillTotp(secretId, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillTotp.name, args: [secretId, frameId] });
    }
    async fillOneAuthTotp(secretId, oneauthId, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillOneAuthTotp.name, args: [secretId, oneauthId, frameId] });
    }
    async fillField(secretId, fieldName, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillField.name, args: [secretId, fieldName, frameId] });
    }
    async fillCustomCol(secretId, fieldName, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillCustomCol.name, args: [secretId, fieldName, frameId] });
    }
    async fillGeneratedPassword(value, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillGeneratedPassword.name, args: [value, frameId] });
    }
    async saveGeneratedPassword(password, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveGeneratedPassword.name, args: [password, frameId] });
    }
    async openUnlockVaultPage() {
        return this.context.apiClient.callApi({ path: this.prefix + this.openUnlockVaultPage.name });
    }
    async addPassword(frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.addPassword.name, args: [frameId] });
    }
    async isDomainMatchingId(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.isDomainMatchingId.name, args: [secretId] });
    }
}
