import { VtSettings } from "../../../service/vt/constants/VtSettings.js";
export class AdvancedSettingsData {
    disableBadgeCount;
    disableWebsiteVaultIcon;
    disableClickToLogin;
    disableWebsiteKeyboardShortcut;
    disableShadowRoot;
    async init() {
        const existing = await zlocalStorage.loadAll({
            [VtSettings.DISABLE_BADGE_COUNT]: false,
            [VtSettings.DISABLE_CLICK_TO_LOGIN]: false,
            [VtSettings.DISABLE_WEBSITE_VAULT_ICON]: false,
            [VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT]: false,
            [VtSettings.DISABLE_SHADOW_ROOT]: false,
        });
        this.disableBadgeCount = existing[VtSettings.DISABLE_BADGE_COUNT];
        this.disableClickToLogin = existing[VtSettings.DISABLE_CLICK_TO_LOGIN];
        this.disableWebsiteVaultIcon = existing[VtSettings.DISABLE_WEBSITE_VAULT_ICON];
        this.disableWebsiteKeyboardShortcut = existing[VtSettings.DISABLE_WEBSITE_KEYBOARD_SHORTCUT];
        this.disableShadowRoot = existing[VtSettings.DISABLE_SHADOW_ROOT];
    }
}
