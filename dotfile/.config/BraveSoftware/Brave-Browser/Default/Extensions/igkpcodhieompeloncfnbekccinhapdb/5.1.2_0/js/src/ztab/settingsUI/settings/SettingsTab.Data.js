import { Theme } from "../../../../common/ui/Theme.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { VtColors } from "../../../service/vt/constants/VtColors.js";
import { VtSettings } from "../../../service/vt/constants/VtSettings.js";
export class SettingsTabData {
    inactivityTimeout;
    inactivityEnforced;
    clearClipboard;
    staySignedIn;
    autoSavePasswords;
    autoSaveCards;
    parentDomainMatching;
    oneauthEnabled;
    webauthnEnabled;
    isPersonalPlan;
    httpFill;
    cardSubdomainFill;
    darkMode;
    theme;
    font;
    lockOnSystemLock;
    supportsLockOnSystemLock;
    oneAuthUnlockRestricted;
    webauthnUnlockRestricted;
    neverSaveDomains;
    authenticatorCount;
    domainMatch;
    async init() {
        const storagePromise = this.initStorageData();
        await Promise.all([
            storagePromise,
            storagePromise.then(() => this.initAuthenticatorCount()),
            this.initNeverSaveDomains(),
            this.initLockOnSystemLock(),
        ]);
    }
    async initNeverSaveDomains() {
        this.neverSaveDomains = await bgApi.settings.neverSave.getAll();
    }
    async initStorageData() {
        const KEYS = LocalStorageKeys;
        const existing = await zlocalStorage.loadAll({
            [KEYS.INACTIVE_TIMEOUT]: "30",
            [KEYS.INACTIVITY_ENFORCED]: false,
            [KEYS.CLEAR_CLIPBOARD]: "30",
            [VtSettings.STAY_SIGNED_IN]: false,
            [KEYS.AUTO_SAVE_UPDATE_PASSWORDS]: true,
            [KEYS.CARD_SAVE_PROMPT]: true,
            [KEYS.ONEAUTH_UNLOCK_ENABLED]: false,
            [KEYS.WEBAUTHN_UNLOCK_ENABLED]: false,
            [KEYS.IS_PERSONAL_PLAN]: false,
            [KEYS.INSECURE_PAGE_PROMPT]: false,
            [KEYS.CARD_AUTOFILL_SUBDOMAIN]: false,
            [VtSettings.DARK_MODE]: false,
            [VtSettings.THEME]: VtColors.BLUE,
            [VtSettings.FONT]: Theme.FONT.ZOHOPUVI,
            [VtSettings.LOCK_ON_SYSTEM_LOCK]: false,
            [KEYS.RESTRICT_ONEAUTH_UNLOCK]: false,
            [KEYS.RESTRICT_WEBAUTHN_UNLOCK]: false,
            [KEYS.DOMAIN_MATCH_MODE]: {},
        });
        this.inactivityTimeout = existing[KEYS.INACTIVE_TIMEOUT];
        this.inactivityEnforced = existing[KEYS.INACTIVITY_ENFORCED];
        this.clearClipboard = existing[KEYS.CLEAR_CLIPBOARD];
        this.staySignedIn = existing[VtSettings.STAY_SIGNED_IN];
        this.autoSavePasswords = existing[KEYS.AUTO_SAVE_UPDATE_PASSWORDS];
        this.autoSaveCards = existing[KEYS.CARD_SAVE_PROMPT];
        this.oneauthEnabled = existing[KEYS.ONEAUTH_UNLOCK_ENABLED];
        this.webauthnEnabled = existing[KEYS.WEBAUTHN_UNLOCK_ENABLED];
        this.isPersonalPlan = existing[KEYS.IS_PERSONAL_PLAN];
        this.httpFill = existing[KEYS.INSECURE_PAGE_PROMPT];
        this.cardSubdomainFill = existing[KEYS.CARD_AUTOFILL_SUBDOMAIN];
        this.darkMode = existing[VtSettings.DARK_MODE];
        this.theme = existing[VtSettings.THEME];
        this.font = existing[VtSettings.FONT];
        this.lockOnSystemLock = existing[VtSettings.LOCK_ON_SYSTEM_LOCK];
        this.oneAuthUnlockRestricted = existing[KEYS.RESTRICT_ONEAUTH_UNLOCK];
        this.webauthnUnlockRestricted = existing[KEYS.RESTRICT_WEBAUTHN_UNLOCK];
        this.domainMatch = existing[KEYS.DOMAIN_MATCH_MODE];
    }
    async initAuthenticatorCount() {
        try {
            if (!this.webauthnEnabled) {
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async initLockOnSystemLock() {
        try {
            this.supportsLockOnSystemLock = await bgApi.settings.isSystemLockSupported();
        }
        catch (e) {
            logError(e);
        }
    }
}
