import { zenum } from "../../common/enum/zenum.js";
import { bgEventServer, inactivityHandler, vapi } from "../../src/bg/Context.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { STRING } from "../../src/vutil/export.js";
export class VaultSettings {
    parser = new ServerSettingParser();
    SERVER_VALUE = {
        ENABLED: "Enabled",
        DISABLED: "Disabled",
    };
    SERVER_NAME = {
        ONEAUTH_UNLOCK: "ONEAUTH_UNLOCK",
        WEBAUTHN_UNLOCK: "WEBAUTHN_UNLOCK",
        DARK_MODE: "nightMode",
        THEME: "theme",
        FONT: "webfont",
    };
    async changeSettingFromUI(name, value) {
        const reqServerValue = this.getServerSettingValue(name, value);
        const reqServerName = this.getServerSettingName(name);
        await this.changeSettingInServer(reqServerName, reqServerValue);
        await zlocalStorage.save(name, value);
        bgEventServer.settings.settingChanged(name, value);
        switch (name) {
            case LocalStorageKeys.DOMAIN_MATCH_MODE:
                domainHandler.modeChanged();
                break;
            case LocalStorageKeys.INACTIVE_TIMEOUT:
                inactivityHandler.synced();
                break;
        }
    }
    async changeSettingInServer(serverName, serverValue) {
        try {
            switch (serverName) {
                case VtSettings.LOCK_ON_SYSTEM_LOCK:
                case VtSettings.STAY_SIGNED_IN:
                case VtSettings.DISABLE_BADGE_COUNT:
                case VtSettings.DISABLE_WEBSITE_VAULT_ICON:
                case VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT:
                case LocalStorageKeys.DOMAIN_MATCH_MODE:
                case VtSettings.DISABLE_SHADOW_ROOT:
                    (await vapi.settings.changeExtSetting(serverName, serverValue)).result;
                    break;
                default:
                    (await vapi.settings.change(serverName, serverValue)).result;
                    break;
            }
            return fnOut.OK;
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
    getServerSettingName(name) {
        const X = LocalStorageKeys;
        switch (name) {
            case X.CLEAR_CLIPBOARD: return "EXT_CLEAR_CLIPBOARD";
            case X.INACTIVE_TIMEOUT: return "EXT_TIMEOUT";
            case X.AUTO_SAVE_UPDATE_PASSWORDS: return "EXT_SAVE_PROMPT";
            case X.INSECURE_PAGE_PROMPT: return "EXT_INSECURE_PAGE_PROMPT";
            case X.DEFAULT_FILTER: return "EXT_DEFAULT_FILTER";
            case X.CARD_AUTOFILL_SUBDOMAIN: return "EXT_CARD_AUTOFILL_SUBDOMAIN";
            case X.CARD_SAVE_PROMPT: return "EXT_CARD_SAVE_PROMPT";
            case VtSettings.DARK_MODE: return "nightMode";
            case VtSettings.THEME: return "theme";
            case VtSettings.FONT: return "webfont";
            default: return name;
        }
    }
    getServerSettingValue(name, value) {
        const X = LocalStorageKeys;
        switch (name) {
            case X.DOMAIN_MATCH_MODE:
                return JSON.stringify(value);
            case X.ONEAUTH_UNLOCK_ENABLED:
                return value ? this.SERVER_VALUE.ENABLED : this.SERVER_VALUE.DISABLED;
            default:
                return value;
        }
    }
    async sync(configSyncPromise) {
        try {
            const resp = await vapi.settings.getAll();
            const settings = resp.result.operation.Details;
            const saveSetting = {};
            for (let key in settings) {
                this.setSetting(key, settings[key], saveSetting);
            }
            await configSyncPromise;
            const parsedSettings = await this.parser.parse(saveSetting);
            await zlocalStorage.saveAll(parsedSettings);
        }
        catch (e) {
            logError(e);
        }
    }
    setSetting(name, value, settingObj) {
        try {
            switch (name) {
                case VtSettings.STAY_SIGNED_IN:
                case VtSettings.LOCK_ON_SYSTEM_LOCK:
                case VtSettings.DISABLE_BADGE_COUNT:
                case VtSettings.DISABLE_WEBSITE_VAULT_ICON:
                case VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT:
                case VtSettings.DISABLE_CLICK_TO_LOGIN:
                case VtSettings.DISABLE_SHADOW_ROOT:
                    settingObj[name] = (value == STRING.TRUE);
                    return;
                case LocalStorageKeys.DOMAIN_MATCH_MODE:
                    settingObj[name] = value;
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    supportsSystemLock() {
        try {
            return Boolean(chrome?.idle?.IdleState?.LOCKED);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
class ServerSettingParser {
    settingObj;
    async parse(settingObj) {
        try {
            this.settingObj = settingObj;
            await Promise.all([
                this.setDomainMatch()
            ]);
        }
        catch (e) {
            logError(e);
        }
        return settingObj;
    }
    async setDomainMatch() {
        try {
            this.settingObj[LocalStorageKeys.DOMAIN_MATCH_MODE] = await this.getServerDomainMatch();
        }
        catch (e) {
            logError(e);
        }
    }
    async getServerDomainMatch() {
        const defaultModeObj = {
            scheme: false,
            subDomain: false,
            port: false,
            path: false,
        };
        try {
            const serverString = this.settingObj[LocalStorageKeys.DOMAIN_MATCH_MODE];
            if (!serverString) {
                const domainMatchingMode = await zlocalStorage.load(LocalStorageKeys.DOMAIN_MATCHING_MODE_OLD, zenum.DOMAIN_MATCHING_MODE.PARENT_DOMAIN);
                return {
                    subDomain: domainMatchingMode == zenum.DOMAIN_MATCHING_MODE.HOSTNAME
                };
            }
            const serverObj = JSON.parse(serverString);
            return Object.assign(defaultModeObj, serverObj);
        }
        catch (e) {
            logError(e);
            return defaultModeObj;
        }
    }
}
