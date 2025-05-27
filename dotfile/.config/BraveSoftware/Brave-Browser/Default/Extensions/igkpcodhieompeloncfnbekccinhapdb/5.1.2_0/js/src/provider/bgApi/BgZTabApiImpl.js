export class BgZTabApiImpl {
    context;
    prefix = "ztab.";
    constructor(context) {
        this.context = context;
    }
    async openZTab() {
        this.context.apiClient.callApi({ path: this.prefix + this.openZTab.name });
    }
    async closeZTab() {
        this.context.apiClient.callApi({ path: this.prefix + this.closeZTab.name });
    }
    async addPassword(prefillInput) {
        this.context.apiClient.callApi({ path: this.prefix + this.addPassword.name, args: [prefillInput] });
    }
    async addPaymentCard(prefillInput) {
        this.context.apiClient.callApi({ path: this.prefix + this.addPaymentCard.name, args: [prefillInput] });
    }
    async editPaymentCard(prefillInput, secretId) {
        this.context.apiClient.callApi({ path: this.prefix + this.editPaymentCard.name, args: [prefillInput, secretId] });
    }
    async sharePassword(secretId) {
        this.context.apiClient.callApi({ path: this.prefix + this.sharePassword.name, args: [secretId] });
    }
    async editPassword(secretId) {
        this.context.apiClient.callApi({ path: this.prefix + this.editPassword.name, args: [secretId] });
    }
    async enableAccessControl(secretId) {
        this.context.apiClient.callApi({ path: this.prefix + this.enableAccessControl.name, args: [secretId] });
    }
    async manageAccessControl(secretId) {
        this.context.apiClient.callApi({ path: this.prefix + this.manageAccessControl.name, args: [secretId] });
    }
    async saveGeneratedPassword(password) {
        this.context.apiClient.callApi({ path: this.prefix + this.saveGeneratedPassword.name, args: [password] });
    }
    async getZTabTask() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getZTabTask.name });
    }
    async getSecretAccess(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getSecretAccess.name, args: [secretId] });
    }
    async openSettings() {
        return this.context.apiClient.callApi({ path: this.prefix + this.openSettings.name });
    }
    async addAddress() {
        return this.context.apiClient.callApi({ path: this.prefix + this.addAddress.name });
    }
}
