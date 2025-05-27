export class BgCardFrameApiImpl {
    context;
    prefix = "cardFrame.";
    constructor(context) {
        this.context = context;
    }
    async getTabUrl() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTabUrl.name });
    }
    async showFormFrame(frameUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl] });
    }
    async closeCardFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeCardFrame.name });
    }
    async showSaveCardFrame(cardObj) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSaveCardFrame.name, args: [cardObj] });
    }
    async showUpdateCardFrame(cardObj) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateCardFrame.name, args: [cardObj] });
    }
    async closeSaveCardFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveCardFrame.name });
    }
    async getSecrets(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getSecrets.name, args: [query] });
    }
    async fillCard(secret, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillCard.name, args: [secret, frameId] });
    }
    async getCardCategory() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getCardCategory.name });
    }
    async fillCardIframe(data, secretId, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillCardIframe.name, args: [data, secretId, frameId] });
    }
    async fillForm(secret, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillForm.name, args: [secret, frameId] });
    }
    async fillFormField(data, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillFormField.name, args: [data, frameId] });
    }
    async checkIframeFields(data) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkIframeFields.name, args: [data] });
    }
    async fillVaultIconCCIframe(fields, frameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillVaultIconCCIframe.name, args: [fields, frameId] });
    }
}
