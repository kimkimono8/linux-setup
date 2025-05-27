export class CSFrameApiImpl {
    context;
    prefix = "frame.";
    constructor(context) {
        this.context = context;
    }
    async showConfirmFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showConfirmFrame.name, connect: { tabId } });
    }
    async showSaveFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSaveFrame.name, connect: { tabId } });
    }
    async showFormFrame(tabId, frameUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl], connect: { tabId } });
    }
    async showSaveCardFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSaveCardFrame.name, connect: { tabId } });
    }
    async showUpdateCardFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateCardFrame.name, connect: { tabId } });
    }
    async showCardFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showCardFrame.name, connect: { tabId } });
    }
    async closeCardFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeCardFrame.name, connect: { tabId } });
    }
    async closeSaveCardFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeSaveCardFrame.name, connect: { tabId } });
    }
    async showUpdateFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showUpdateFrame.name, connect: { tabId } });
    }
    async showSiteFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name, connect: { tabId } });
    }
    async closeFrame(params, tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeFrame.name, args: [params], connect: { tabId } });
    }
    async closeSiteFrame(params, tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeSiteFrame.name, args: [params], connect: { tabId } });
    }
    async showAlertFrame(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showAlertFrame.name, connect: { tabId } });
    }
    async downloadFile(param, tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.downloadFile.name, args: [param], connect: { tabId } });
    }
}
