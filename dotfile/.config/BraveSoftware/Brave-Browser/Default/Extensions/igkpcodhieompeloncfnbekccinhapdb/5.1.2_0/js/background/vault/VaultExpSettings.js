import { devToolsHandler, vapi } from "../../src/bg/Context.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { STRING } from "../../src/vutil/export.js";
class VaultExpSettings {
    async sync() {
        try {
            const initSettings = this.getDefaultExpSettings();
            await zlocalStorage.saveAll(initSettings);
            const serverSettings = (await vapi.settings.getExperimentalSettings()).result;
            for (let key in initSettings) {
                if (serverSettings[key]) {
                    initSettings[key] = serverSettings[key];
                }
            }
            await zlocalStorage.saveAll(initSettings);
            devToolsHandler.initSkipTabCheck();
        }
        catch (e) {
            logError(e);
        }
    }
    getDefaultExpSettings() {
        return {
            [LocalStorageKeys.ONE_CLICK_PASS_CHANGE_CHECK]: STRING.TRUE,
            [LocalStorageKeys.NEW_PLAIN_PASS_CHECK]: STRING.TRUE,
            [LocalStorageKeys.USE_OLD_FILL]: STRING.FALSE,
            [LocalStorageKeys.USE_OLD_DEVTOOLS_CHECK]: STRING.FALSE,
            [LocalStorageKeys.SKIP_ONE_CLICK_BG_CONNECT_CHECK]: STRING.FALSE,
            [LocalStorageKeys.SKIP_ONE_CLICK_TAB_CHECK]: STRING.FALSE,
            [LocalStorageKeys.SKIP_DISC_PASSWORD_CHECK]: STRING.FALSE,
            [LocalStorageKeys.SKIP_PASSWORD_ASSESSMENT]: STRING.FALSE,
            [LocalStorageKeys.USE_OLD_SUBMIT_REGEX]: STRING.FALSE,
        };
    }
}
export const exp_vaultExpSettings = new VaultExpSettings();
