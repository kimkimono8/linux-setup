import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
class ResetUIApi {
    apiClient;
    init() {
        this.apiClient = portApi.createApiClient();
        this.apiClient.init({ name: VtApiPortNames.RESET });
    }
    async updateProgress(progress) {
        try {
            await ztabStorage.save(TabStorageKeys.RESET_PROGRESS, progress);
            this.apiClient.callApi({ path: this.updateProgress.name });
        }
        catch (e) {
            logError(e);
        }
    }
}
export const resetUIApi = new ResetUIApi();
