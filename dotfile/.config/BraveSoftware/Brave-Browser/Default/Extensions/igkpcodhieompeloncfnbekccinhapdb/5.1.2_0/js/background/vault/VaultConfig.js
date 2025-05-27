import { SecretClassification } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
export class VaultConfig {
    async isAddPasswordDisabled() {
        try {
            const addEnabled = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
            return !addEnabled;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getAddPasswordClassifications() {
        try {
            const existing = await zlocalStorage.loadAll({
                [LocalStorageKeys.IS_PERSONAL_PLAN]: false,
                [LocalStorageKeys.ALLOW_PERSONAL_SECRET]: true,
                [LocalStorageKeys.ALLOW_ENTERPRISE_SECRET]: true,
                [LocalStorageKeys.ALLOW_ADD_SECRET]: true,
            });
            if (existing[LocalStorageKeys.IS_PERSONAL_PLAN]) {
                return [SecretClassification.PERSONAL];
            }
            if (!existing[LocalStorageKeys.ALLOW_ADD_SECRET]) {
                return [];
            }
            const allowedClassification = [];
            if (existing[LocalStorageKeys.ALLOW_PERSONAL_SECRET]) {
                allowedClassification.push(SecretClassification.PERSONAL);
            }
            if (existing[LocalStorageKeys.ALLOW_ENTERPRISE_SECRET]) {
                allowedClassification.push(SecretClassification.ENTERPRISE);
            }
            return allowedClassification;
        }
        catch (e) {
            logError(e);
            return [SecretClassification.PERSONAL];
        }
    }
}
