export class CSOtherApiImpl {
    context;
    prefix = "other.";
    constructor(context) {
        this.context = context;
    }
    async setConfirmResponse(allow, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setConfirmResponse.name, connect: tabFrameId, args: [allow] });
    }
    async resetPassword(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.resetPassword.name, connect: { tabId, frameId: 0 } });
    }
    async getFrameUrl(tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getFrameUrl.name, connect: tabFrameId });
    }
    async showSiteFrame(params, tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showSiteFrame.name, connect: tabFrameId, args: [params] });
    }
    async showCardFrame(tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showCardFrame.name, connect: tabFrameId });
    }
    async getGeneratorSaveUsername(tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getGeneratorSaveUsername.name, connect: tabFrameId });
    }
    async getFilledFormData(tabFrameId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getFilledFormData.name, connect: tabFrameId });
    }
}
