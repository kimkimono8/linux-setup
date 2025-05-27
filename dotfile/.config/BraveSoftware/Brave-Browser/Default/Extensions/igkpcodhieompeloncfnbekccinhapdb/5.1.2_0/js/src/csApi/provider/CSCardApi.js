export class CSCardApiImpl {
    context;
    prefix = "card.";
    constructor(context) {
        this.context = context;
    }
    async fillCardIframe(data, tabFrameIdparams) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillCardIframe.name, args: [data], connect: tabFrameIdparams });
    }
    async fillVaultIconCCIframe(fields, tabFrameIdparams) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fillVaultIconCCIframe.name, args: [fields], connect: tabFrameIdparams });
    }
    async showFormFrame(tabId, frameUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showFormFrame.name, args: [frameUrl], connect: { tabId, frameId: 0 } });
    }
    async checkIframeFields(tabId, data) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkIframeFields.name, args: [data], connect: { tabId, frameId: 0 } });
    }
}
