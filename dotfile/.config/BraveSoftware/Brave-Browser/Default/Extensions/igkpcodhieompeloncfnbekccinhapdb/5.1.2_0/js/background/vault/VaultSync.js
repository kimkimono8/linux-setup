import { zenum } from "../../common/enum/zenum.js";
import { Theme } from "../../common/ui/Theme.js";
import { accountDb, bgEventServer, inactivityHandler, vapi } from "../../src/bg/Context.js";
import { badgeMenuHandler } from "../../src/bg/activeTab/export.js";
import { bg } from "../../src/bg/bg.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VtColors } from "../../src/service/vt/constants/VtColors.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { STRING } from "../../src/vutil/export.js";
import { exp_vaultExpSettings } from "./VaultExpSettings.js";
export class VaultSync {
    syncLicenseComplete = null;
    constructor() {
        this.sync = js.fn.wrapper.createSingleInstance(this.sync, this);
    }
    async sync(fromUser) {
        try {
            await zlocalStorage.saveAll({
                [LocalStorageKeys.SYNCING]: true,
                [LocalStorageKeys.USER_SYNC]: fromUser
            });
            bgEventServer.sync.syncing();
            accountDb.recordingTable.clear();
            accountDb.folderSecretMapTable.clear();
            const configSyncPromise = this.syncConfig();
            await Promise.all([
                configSyncPromise,
                bg.neverSaveUrls.sync(),
                bg.vaultSecrets.sync(),
                bg.vaultFolders.sync(),
                bg.vaultPolicies.sync(),
                bg.vaultSettings.sync(configSyncPromise),
                bg.user.getDpFromServer(),
                bg.vaultLogin.getLogin(),
                exp_vaultExpSettings.sync(),
            ]);
            inactivityHandler.synced();
            badgeMenuHandler.refresh();
            bgEventServer.sync.synced();
        }
        finally {
            await zlocalStorage.saveAll({
                [LocalStorageKeys.SYNCING]: false,
                [LocalStorageKeys.LAST_SYNCED]: Date.now()
            });
        }
        try {
            bg.oneAuthTotp.sync();
        }
        catch (e) {
            logError(e);
        }
    }
    async afterSyncLicenseComplete() {
        if (!this.syncLicenseComplete) {
            this.syncLicenseComplete = js.promise.createNew();
        }
        return this.syncLicenseComplete;
    }
    async syncLicense() {
        try {
            const resp = (await vapi.login.getLicense()).result;
            const respLicense = resp.operation.Details[0];
            const respConfig = respLicense.USERCONFIG;
            const ENABLED = "Enabled";
            const DISABLED = "Disabled";
            await zlocalStorage.saveAll({
                [LocalStorageKeys.PLAN]: respLicense.VAULTPLAN,
                [LocalStorageKeys.IS_PERSONAL_PLAN]: respLicense.VAULTPLAN == zenum.PLAN.PERSONAL,
                [LocalStorageKeys.FEATURES]: respLicense.FEATURES,
                [LocalStorageKeys.PII_ENABLED]: respConfig.PII_FIELD_CONTROL == ENABLED,
                [LocalStorageKeys.ALLOW_ADD_SECRET]: respConfig.DISABLE_ADD_SECRETS != DISABLED,
                [LocalStorageKeys.ALLOW_PERSONAL_SECRET]: respConfig.PERSONAL_SECRETS != DISABLED,
                [LocalStorageKeys.ALLOW_ENTERPRISE_SECRET]: respConfig.ENTERPRISE_SECRETS != DISABLED,
                [LocalStorageKeys.ALLOW_FILE_ATTACHMENT]: respConfig.FILE_ATTACHMENT != DISABLED,
                [LocalStorageKeys.SHOW_ONLY_USER_DEFINED_SEC_TYPES]: respConfig.SHOW_USER_DEFINED_SECRETTYPE == ENABLED,
                [LocalStorageKeys.CLEAR_CLIPBOARD]: parseInt(respConfig.EXT_CLEAR_CLIPBOARD || "30"),
                [LocalStorageKeys.DOMAIN_MATCHING_MODE_OLD]: respConfig.EXT_AUTOFILL_SUBDOMAIN != STRING.FALSE ?
                    zenum.DOMAIN_MATCHING_MODE.PARENT_DOMAIN : zenum.DOMAIN_MATCHING_MODE.HOSTNAME,
                [LocalStorageKeys.INACTIVE_TIMEOUT]: parseInt(respConfig.EXT_TIMEOUT || "30"),
                [LocalStorageKeys.INACTIVITY_ENFORCED]: respConfig.EXT_INACTIVE_TIMEOUT_FOR_ORG == ENABLED,
                [LocalStorageKeys.AUTO_SAVE_UPDATE_PASSWORDS]: respConfig.EXT_SAVE_PROMPT != STRING.FALSE,
                [LocalStorageKeys.INSECURE_PAGE_PROMPT]: respConfig.EXT_INSECURE_PAGE_PROMPT != STRING.FALSE,
                [LocalStorageKeys.DEFAULT_FILTER]: this.convert_old_filter_name(respConfig.EXT_DEFAULT_FILTER || zenum.FILTER.ALL),
                [LocalStorageKeys.ALLOW_SAME_NAME]: respConfig.ALLOW_SAME_NAME == ENABLED,
                [LocalStorageKeys.ALLOW_SHARE_SECRET]: respConfig.DISABLE_SHARING_SECRETS != DISABLED,
                [LocalStorageKeys.CARD_SAVE_PROMPT]: respConfig.EXT_CARD_SAVE_PROMPT != STRING.FALSE,
                [LocalStorageKeys.CARD_AUTOFILL_SUBDOMAIN]: respConfig.EXT_CARD_AUTOFILL_SUBDOMAIN != STRING.FALSE,
                [LocalStorageKeys.ALLOW_THIRD_PARTY_SHARING]: respConfig.SHARING_SECRETS_THIRD_PARTY == ENABLED,
                [LocalStorageKeys.ONEAUTH_UNLOCK_ENABLED]: respConfig.ONEAUTH_UNLOCK == ENABLED,
                [LocalStorageKeys.WEBAUTHN_UNLOCK_ENABLED]: respConfig.WEBAUTHN_UNLOCK == ENABLED,
                [LocalStorageKeys.RESTRICT_ONEAUTH_UNLOCK]: respConfig.RESTRICT_ONEAUTH_UNLOCK == ENABLED,
                [LocalStorageKeys.RESTRICT_WEBAUTHN_UNLOCK]: respConfig.RESTRICT_WEBAUTHN_UNLOCK == ENABLED,
                [LocalStorageKeys.ALLOW_ADD_FOLDER]: respConfig.ADD_FOLDER != DISABLED,
                [VtSettings.DARK_MODE]: respConfig.NIGHT_MODE == ENABLED,
                [VtSettings.THEME]: this.getTheme(respConfig.THEME),
                [VtSettings.FONT]: this.getFont(respConfig.USER_WEB_FONT),
            });
            if (this.syncLicenseComplete) {
                this.syncLicenseComplete.resolve();
            }
            this.syncLicenseComplete = null;
        }
        catch (e) {
            logError(e);
        }
    }
    async syncThemeFromWeb() {
        await this.syncLicense();
        bgEventServer.settings.themeChanged({ from: "web" });
    }
    convert_old_filter_name(name) {
        switch (name) {
            case "favorites": return zenum.FILTER.FAVOURITES;
            case "not_shared": return zenum.FILTER.UNSHARED;
            case "recentlyAdded": return zenum.FILTER.RECENTLY_ADDED;
            case "recentlyUsed": return zenum.FILTER.RECENTLY_USED;
            default:
                return name;
        }
    }
    async syncConfig() {
        await this.syncLicense();
        bgEventServer.settings.themeChanged();
    }
    getTheme(respTheme) {
        try {
            switch (respTheme) {
                case "BLUETHEME": return VtColors.BLUE;
                case "REDTHEME": return VtColors.RED;
                case "GREENTHEME": return VtColors.GREEN;
                case "ORANGETHEME": return VtColors.ORANGE;
                case "PURPLETHEME": return VtColors.PURPLE;
                default: return VtColors.BLUE;
            }
        }
        catch (e) {
            logError(e);
            return VtColors.BLUE;
        }
    }
    getFont(respFont = "") {
        try {
            if (!respFont) {
                return Theme.FONT.ZOHOPUVI;
            }
            const upperCaseFont = respFont.toUpperCase();
            switch (upperCaseFont) {
                case Theme.FONT.OPENSANS:
                case Theme.FONT.ZOHOPUVI:
                    return upperCaseFont;
                default:
                    return Theme.FONT.ZOHOPUVI;
            }
        }
        catch (e) {
            logError(e);
            return Theme.FONT.ZOHOPUVI;
        }
    }
}
