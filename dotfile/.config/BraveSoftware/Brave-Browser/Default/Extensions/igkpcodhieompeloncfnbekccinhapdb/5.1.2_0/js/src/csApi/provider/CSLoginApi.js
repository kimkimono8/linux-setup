export class CSLoginApiImpl {
    context;
    prefix = "login.";
    constructor(context) {
        this.context = context;
    }
    async fillActiveInput(value, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillActiveInput.name, args: [value], connect: tabFrameId });
    }
    async fillValue(fillValue, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillValue.name, args: [fillValue], connect: tabFrameId });
    }
    async login(loginData, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.login.name, args: [loginData], connect: tabFrameId });
    }
    async frameLogin(loginData, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.frameLogin.name, args: [loginData], connect: tabFrameId });
    }
    async fillCard(secret, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillCard.name, args: [secret], connect: tabFrameId });
    }
    async fillForm(secret, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillForm.name, args: [secret], connect: tabFrameId });
    }
    async fillFormField(data, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillFormField.name, args: [data], connect: tabFrameId });
    }
    async getActiveInputLoginType(tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getActiveInputLoginType.name, connect: tabFrameId });
    }
    async fillGeneratedPassword(value, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillGeneratedPassword.name, args: [value], connect: tabFrameId });
    }
    async hasValidLoginField(tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.hasValidLoginField.name, connect: tabFrameId });
    }
}
