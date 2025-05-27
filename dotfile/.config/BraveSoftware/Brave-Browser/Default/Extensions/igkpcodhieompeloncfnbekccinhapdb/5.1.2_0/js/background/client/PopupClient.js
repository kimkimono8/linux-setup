import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
export class PopupClient {
    apiClient;
    init() {
        this.apiClient = portApi.createApiClient();
        this.apiClient.init({ name: VtApiPortNames.POPUP });
    }
    async checkConnectable() {
        return this.apiClient.isConnectable();
    }
    async copyToClipboard(text) {
        this.apiClient.callApi({ path: this.copyToClipboard.name, args: [text] });
    }
    async oneAuthUnlockComplete(resp) {
        this.apiClient.callApi({ path: this.oneAuthUnlockComplete.name, args: [resp] });
    }
    async oneWebauthnComplete(resp) {
        this.apiClient.callApi({ path: this.oneWebauthnComplete.name, args: [resp] });
    }
    async oneAuthPushSent() {
        this.apiClient.callApi({ path: this.oneAuthPushSent.name });
    }
    async close() {
        try {
            await this.apiClient.callApi({ path: this.close.name });
        }
        catch (e) { }
    }
}
