import { TabStorageKeys } from "../../service/storage/constants/TabStorageKeys.js";
import { bgStorage } from "../storage/export.js";
export class BgCSUtil {
    async showAlert(tabId, config) {
        try {
            await bgStorage.tab.save(tabId, TabStorageKeys.ALERT_CONFIG, config);
            return csApi.frame.showAlertFrame(tabId);
        }
        catch (e) {
            logError(e);
        }
    }
}
