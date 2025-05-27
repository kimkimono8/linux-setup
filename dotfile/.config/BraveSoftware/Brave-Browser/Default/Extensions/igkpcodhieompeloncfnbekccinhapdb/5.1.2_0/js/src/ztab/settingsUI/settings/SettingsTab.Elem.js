import { UIElemContainer } from "../../../uiUtil/export.js";
export class SettingsTabElem extends UIElemContainer {
    inactivitySelect;
    clearClipboardSelect;
    fontSelect;
    autoSaveCheckbox;
    cardAutoSaveCheckbox;
    cardSubdomainCheckbox;
    staySignedInCheckbox;
    oneauthCheckbox;
    webauthnCheckbox;
    httpFillCheckbox;
    darkModeCheckbox;
    lockOnSystemLockCheckbox;
    themeContainer;
    lockOnSystemLockContainer;
    authenticatorOptions;
    addAuthenticator;
    manageAuthenticator;
    unlockContainer;
    oneauthUnlockContainer;
    webauthnUnlockContainer;
    neverSaveContainer;
    neverSaveList;
    oneauthInstallElem;
    closeOneauthInstallElem;
    cancelOneauthInstallElem;
    oneauthInstallHeading;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#settings_sub_tab_template" });
        this.inactivitySelect = this.select("#inactivity_select");
        this.clearClipboardSelect = this.select("#select_clear_clipboard");
        this.fontSelect = this.select("#fontSelect");
        this.autoSaveCheckbox = this.select("#prompt_save");
        this.staySignedInCheckbox = this.select("#stay_signed_in");
        this.oneauthCheckbox = this.select("#oneauth_unlock");
        this.webauthnCheckbox = this.select("#webauthn_unlock");
        this.cardAutoSaveCheckbox = this.select("#prompt_card_save");
        this.cardSubdomainCheckbox = this.select("#autofill_card_sub_domains");
        this.httpFillCheckbox = this.select("#prompt_insecure_fill");
        this.darkModeCheckbox = this.select("#toggle_dark_mode");
        this.lockOnSystemLockCheckbox = this.select("#lock_on_system_lock");
        this.authenticatorOptions = this.select("#authenticator_options");
        this.addAuthenticator = this.select("#addAuthenticator");
        this.manageAuthenticator = this.select("#manageAuthenticator");
        this.unlockContainer = this.select("#unlock_container");
        this.oneauthUnlockContainer = this.select("#oneauth_unlock_container");
        this.webauthnUnlockContainer = this.select("#webauthn_unlock_container");
        this.lockOnSystemLockContainer = this.select("#lock_on_system_lock_container");
        this.themeContainer = this.select("#select_theme");
        this.neverSaveContainer = this.select("#neverSaveContainer");
        this.neverSaveList = this.select("#neverSaveList");
    }
    createOneauthInstallPrompt() {
        this.oneauthInstallElem = UIUtil.createElem({ preRender: true, template: "#oneauth_install_template" });
        this.closeOneauthInstallElem = js.selector.select("#oneAuthInstallClose");
        this.cancelOneauthInstallElem = js.selector.select("#oneauthInstallCancel");
        this.oneauthInstallHeading = js.selector.select("#oneauthInstallHeading");
    }
    getThemeElem(color) {
        return this.select(`[data-theme="${color}"]`);
    }
    get manageAuthenticatorSeparation() {
        return this.select("#manageAuthenticatorSeparation");
    }
    get authenticatorCountText() {
        return this.select("#authenticatorCountText");
    }
    get authenticatorCount() {
        return this.select("#authenticatorCount");
    }
}
