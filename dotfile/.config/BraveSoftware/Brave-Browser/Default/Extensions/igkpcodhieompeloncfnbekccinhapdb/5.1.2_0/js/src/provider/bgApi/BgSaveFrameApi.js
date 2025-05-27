export class BgSaveFrameApiImpl {
    context;
    prefix = "saveFrame.";
    constructor(context) {
        this.context = context;
    }
    async showSaveFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSaveFrame.name });
    }
    async saveCredential(saveCredential) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveCredential.name, args: [saveCredential] });
    }
    async disableSavePassword() {
        return this.context.apiClient.callApi({ path: this.prefix + this.disableSavePassword.name });
    }
    async getData() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getData.name });
    }
    async saveSecret(saveFrameUserInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveSecret.name, args: [saveFrameUserInput] });
    }
    async editSecret(saveFrameUserInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.editSecret.name, args: [saveFrameUserInput] });
    }
    async closeSaveFrame(params) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveFrame.name, args: [params] });
    }
}
