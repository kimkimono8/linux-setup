import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
export class MainUIData {
    isPersonalPlan;
    async init() {
        try {
            const stored = await zlocalStorage.loadAll({
                [LocalStorageKeys.IS_PERSONAL_PLAN]: false
            });
            this.isPersonalPlan = stored[LocalStorageKeys.IS_PERSONAL_PLAN];
        }
        catch (e) {
            logError(e);
        }
    }
}
