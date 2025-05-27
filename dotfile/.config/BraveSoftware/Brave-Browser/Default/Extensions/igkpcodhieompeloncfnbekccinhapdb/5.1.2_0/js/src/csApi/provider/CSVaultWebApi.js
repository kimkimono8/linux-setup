import { VtApiPortNames } from "../../service/vt/constants/VtApiPortNames.js";
export class CSVaultWebApiClientImpl {
    tryUnlock(tabId) {
        const apiClient = portApi.createApiClient();
        apiClient.init({ name: VtApiPortNames.CS_VAULT_WEB });
        apiClient.callApi({ path: this.tryUnlock.name, connect: { tabId } });
    }
}
