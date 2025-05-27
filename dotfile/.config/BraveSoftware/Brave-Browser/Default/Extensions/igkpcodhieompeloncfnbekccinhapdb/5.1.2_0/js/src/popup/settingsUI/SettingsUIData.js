import { zenum } from "../../../common/enum/zenum.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
export class SettingsUIData {
    inactivityTimeout;
    inactivityEnforced;
    clearClipboard;
    filter;
    staySignedIn;
    autoSavePasswords;
    oneauthEnabled;
    webauthnEnabled;
    isPersonalPlan;
    oneAuthUnlockRestricted;
    webauthnUnlockRestricted;
    async init() {
        const KEYS = LocalStorageKeys;
        const existing = await zlocalStorage.loadAll({
            [KEYS.INACTIVE_TIMEOUT]: "30",
            [KEYS.INACTIVITY_ENFORCED]: false,
            [KEYS.CLEAR_CLIPBOARD]: "30",
            [KEYS.DEFAULT_FILTER]: zenum.FILTER.ALL,
            [VtSettings.STAY_SIGNED_IN]: false,
            [KEYS.AUTO_SAVE_UPDATE_PASSWORDS]: true,
            [KEYS.ONEAUTH_UNLOCK_ENABLED]: false,
            [KEYS.WEBAUTHN_UNLOCK_ENABLED]: false,
            [KEYS.IS_PERSONAL_PLAN]: false,
            [KEYS.RESTRICT_ONEAUTH_UNLOCK]: false,
            [KEYS.RESTRICT_WEBAUTHN_UNLOCK]: false,
        });
        this.inactivityTimeout = existing[KEYS.INACTIVE_TIMEOUT];
        this.inactivityEnforced = existing[KEYS.INACTIVITY_ENFORCED];
        this.clearClipboard = existing[KEYS.CLEAR_CLIPBOARD];
        this.filter = existing[KEYS.DEFAULT_FILTER];
        this.staySignedIn = existing[VtSettings.STAY_SIGNED_IN];
        this.autoSavePasswords = existing[KEYS.AUTO_SAVE_UPDATE_PASSWORDS];
        this.oneauthEnabled = existing[KEYS.ONEAUTH_UNLOCK_ENABLED];
        this.webauthnEnabled = existing[KEYS.WEBAUTHN_UNLOCK_ENABLED];
        this.isPersonalPlan = existing[KEYS.IS_PERSONAL_PLAN];
        this.oneAuthUnlockRestricted = existing[KEYS.RESTRICT_ONEAUTH_UNLOCK];
        this.webauthnUnlockRestricted = existing[KEYS.RESTRICT_WEBAUTHN_UNLOCK];
    }
}
