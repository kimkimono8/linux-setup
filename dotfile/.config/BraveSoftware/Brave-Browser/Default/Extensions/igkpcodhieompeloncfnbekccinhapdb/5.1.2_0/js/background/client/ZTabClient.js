import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
export class ZTabClient {
    apiClient;
    init() {
        this.apiClient = portApi.createApiClient();
        this.apiClient.init({ name: VtApiPortNames.ZTAB });
    }
    async checkConnectable() {
        return this.apiClient.isConnectable();
    }
    async copyToClipboard(text) {
        this.apiClient.callApi({ path: this.copyToClipboard.name, args: [text] });
    }
    async close() {
        try {
            await this.apiClient.callApi({ path: this.close.name });
        }
        catch (e) { }
    }
}
