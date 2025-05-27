import { UIElemContainer } from "../../../uiUtil/export.js";
export class AdvancedSettingsElem extends UIElemContainer {
    disableBadgeCountCheckbox;
    disableWebsiteVaultIconCheckbox;
    disableClickToLoginCheckbox;
    disableWebsiteKeyboardShortcutCheckbox;
    disableShadowRootCheckbox;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#advanced_settings_tab_template" });
        this.disableBadgeCountCheckbox = this.select("#disable_badge_count");
        this.disableWebsiteVaultIconCheckbox = this.select("#disable_website_vault_icon");
        this.disableWebsiteKeyboardShortcutCheckbox = this.select("#disable_website_keyboard_shortcut");
        this.disableClickToLoginCheckbox = this.select("#disableClickToLogin");
        this.disableShadowRootCheckbox = this.select("#disableShadowRoot");
    }
}
