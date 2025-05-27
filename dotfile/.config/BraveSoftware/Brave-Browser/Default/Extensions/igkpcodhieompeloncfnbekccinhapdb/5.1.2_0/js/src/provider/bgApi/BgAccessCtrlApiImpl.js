export class BgAccessCtrlApiImpl {
    context;
    prefix = "accessCtrl.";
    constructor(context) {
        this.context = context;
    }
    async update(apiInput) {
        return this.context.apiClient.callApi({ path: this.prefix + this.update.name, args: [apiInput] });
    }
    async getAccessCtrlSettings(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getAccessCtrlSettings.name, args: [secretId] });
    }
    async createRequest(input) {
        return this.context.apiClient.callApi({ path: this.prefix + this.createRequest.name, args: [input] });
    }
    async getAccessPendingUIInfo(accessRequestId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getAccessPendingUIInfo.name, args: [accessRequestId] });
    }
    async cancel(accessRequestId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.cancel.name, args: [accessRequestId] });
    }
    async checkout(accessRequestId, secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkout.name, args: [accessRequestId, secretId] });
    }
    async checkin(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkin.name, args: [secretId] });
    }
    async disable(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.disable.name, args: [secretId] });
    }
    async isHelpdeskEnabled(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.isHelpdeskEnabled.name, args: [secretId] });
    }
}
