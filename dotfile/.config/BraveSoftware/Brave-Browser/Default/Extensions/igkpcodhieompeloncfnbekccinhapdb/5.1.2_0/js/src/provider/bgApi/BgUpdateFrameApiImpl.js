export class BgUpdateFrameApiImpl {
    context;
    prefix = "updateFrame.";
    constructor(context) {
        this.context = context;
    }
    async showUpdateFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateFrame.name });
    }
    async saveChangedCredential(changedCredential) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveChangedCredential.name, args: [changedCredential] });
    }
    async updateChangedLoginPassword(changedLoginPassword) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateChangedLoginPassword.name, args: [changedLoginPassword] });
    }
    async getData() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getData.name });
    }
    async updateSecret() {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateSecret.name });
    }
    async editSecret() {
        return this.context.apiClient.callApi({ path: this.prefix + this.editSecret.name });
    }
    async saveAsNew() {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveAsNew.name });
    }
    async closeUpdateFrame(params) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeUpdateFrame.name, args: [params] });
    }
}
