import { LocalStorageKeys } from "../../../../service/storage/constants/LocalStorageKeys.js";
export class BasePasswordFilterUIData {
    filterUI;
    isPersonalPlan = false;
    constructor(filterUI) {
        this.filterUI = filterUI;
    }
    async init() {
        try {
            await Promise.all([
                this.filterUI.tagUI.data.init(),
                this.initFromStorage(),
            ]);
        }
        catch (e) {
            logError(e);
        }
    }
    async initFromStorage() {
        try {
            const storageObj = await zlocalStorage.loadAll({
                [LocalStorageKeys.IS_PERSONAL_PLAN]: false
            });
            this.isPersonalPlan = storageObj[LocalStorageKeys.IS_PERSONAL_PLAN];
        }
        catch (e) {
            logError(e);
        }
    }
}
