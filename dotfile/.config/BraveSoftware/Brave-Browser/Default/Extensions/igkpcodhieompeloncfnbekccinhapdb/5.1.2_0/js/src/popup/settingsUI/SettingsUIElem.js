import { UIElemContainer } from "../../uiUtil/export.js";
export class SettingsUIElem extends UIElemContainer {
    inactivitySelect;
    clearClipboardSelect;
    filterSelect;
    syncIcon;
    autoSaveCheckbox;
    staySignedInCheckbox;
    oneauthCheckbox;
    webauthnCheckbox;
    viewAllButton;
    oneauthUnlockContainer;
    webauthnUnlockContainer;
    oneauthInstallElem;
    closeOneauthInstallElem;
    oneauthInstallHeading;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#page_settings" });
        this.inactivitySelect = this.select("#inactivity_select");
        this.clearClipboardSelect = this.select("#select_clear_clipboard");
        this.filterSelect = this.select("#select_filter");
        this.syncIcon = this.select("#sync_icon");
        this.autoSaveCheckbox = this.select("#prompt_save");
        this.staySignedInCheckbox = this.select("#stay_signed_in");
        this.oneauthCheckbox = this.select("#oneauth_unlock");
        this.webauthnCheckbox = this.select("#webauthn_unlock");
        this.viewAllButton = this.select("#view_all_settings");
        this.oneauthUnlockContainer = this.select("#oneauth_unlock_container");
        this.webauthnUnlockContainer = this.select("#webauthn_unlock_container");
    }
    createOneauthInstallPrompt() {
        this.oneauthInstallElem = UIUtil.createElem({ preRender: true, template: "#oneauth_install_template" });
        this.closeOneauthInstallElem = js.selector.select("#oneAuthInstallClose");
        this.oneauthInstallHeading = js.selector.select("#oneauthInstallHeading");
    }
}
