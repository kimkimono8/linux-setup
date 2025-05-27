import { zt } from "../../../../ztab/zt.js";
import { AlertUI } from "../../../common/common.js";
import { VaultCSS } from "../../../service/VUi/VaultCSS.js";
import { ONEAUTH_STATUS } from "../../../service/bgApi/constants.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { VtSettings } from "../../../service/vt/constants/VtSettings.js";
import { context, settingsUI } from "../Context.js";
import { SettingsUIDropdown } from "../SettingsUIDropDown.js";
import { DomainContainer } from "./DomainContainer.js";
import { SettingsTabData } from "./SettingsTab.Data.js";
import { SettingsTabElem } from "./SettingsTab.Elem.js";
export class SettingsTabUI {
    elem = new SettingsTabElem();
    data = new SettingsTabData();
    dropdowns = new SettingsUIDropdown();
    domainContainer = new DomainContainer();
    THEME_SELECTED = "theme-color-selected";
    init() {
        try {
            this.init = js.fn.emptyFn;
            this.refreshUI = js.fn.wrapper.createSingleInstance(this.refreshUI, this);
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI() {
        this.init();
        this.elem.init();
        await this.data.init();
        await this.initUIFn();
        js.dom.setContent(settingsUI.elem.tabContent, this.elem.container);
        UIUtil.addSlimScroll(this.elem.container, { clientWidthHeight: true });
    }
    async refreshUI() {
        const scrollTop = this.elem?.container?.scrollTop || 0;
        await this.showUI();
        window.requestAnimationFrame(() => $(this.elem.container).slimScroll({ scrollTo: scrollTop + "" }));
    }
    async initUIFn() {
        this.dropdowns.init();
        this.initCheckboxes();
        this.domainContainer.init();
        context.neverSaveElem.initList();
        this.addListeners();
        this.initUnlock();
        this.initLockOnSystemLock();
    }
    initCheckboxes() {
        this.elem.autoSaveCheckbox.checked = this.data.autoSavePasswords;
        this.elem.cardAutoSaveCheckbox.checked = this.data.autoSaveCards;
        this.elem.staySignedInCheckbox.checked = this.data.staySignedIn;
        this.elem.oneauthCheckbox.checked = this.data.oneauthEnabled;
        this.elem.webauthnCheckbox.checked = this.data.webauthnEnabled;
        if (this.data.webauthnEnabled) {
            this.elem.authenticatorOptions.classList.remove(VaultCSS.DIS_HIDE);
        }
        this.elem.httpFillCheckbox.checked = this.data.httpFill;
        this.elem.cardSubdomainCheckbox.checked = this.data.cardSubdomainFill;
        this.elem.darkModeCheckbox.checked = this.data.darkMode;
        this.elem.getThemeElem(this.data.theme).className = this.THEME_SELECTED;
        this.elem.lockOnSystemLockCheckbox.checked = this.data.lockOnSystemLock;
    }
    addListeners() {
        const KEYS = LocalStorageKeys;
        this.elem.oneauthCheckbox.addEventListener("input", () => this.changeOneAuthUnlock());
        this.elem.webauthnCheckbox.addEventListener("input", () => this.changeWebauthnUnlock());
        this.elem.addAuthenticator.addEventListener("click", () => bgApi.vault.openWebUI({ route: "/main/settings/unlock/authenticator/add" }));
        this.elem.manageAuthenticator.addEventListener("click", () => bgApi.vault.openWebUI({ route: "/main/settings/unlock/authenticator/manage" }));
        this.elem.autoSaveCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.autoSaveCheckbox, KEYS.AUTO_SAVE_UPDATE_PASSWORDS));
        this.elem.cardAutoSaveCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.cardAutoSaveCheckbox, KEYS.CARD_SAVE_PROMPT));
        this.elem.staySignedInCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.staySignedInCheckbox, VtSettings.STAY_SIGNED_IN));
        this.elem.httpFillCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.httpFillCheckbox, KEYS.INSECURE_PAGE_PROMPT));
        this.elem.cardSubdomainCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.cardSubdomainCheckbox, KEYS.CARD_AUTOFILL_SUBDOMAIN));
        this.elem.darkModeCheckbox.addEventListener("input", () => zt.theme.setDarkMode(this.elem.darkModeCheckbox.checked));
        this.elem.lockOnSystemLockCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.lockOnSystemLockCheckbox, VtSettings.LOCK_ON_SYSTEM_LOCK));
        this.elem.themeContainer.addEventListener("click", e => this.changeTheme(e));
        this.addDomainListeners();
    }
    async changeSetting(name, value) {
        try {
            zt.mainUI.showDotLoading();
            await bgApi.settings.change(name, value);
            VUI.notification.showSuccess(i18n(VI18N.CHANGES_UPDATED));
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    addDomainListeners() {
        const elem = this.domainContainer;
        elem.schemeElem.addEventListener("click", () => this.changeDomainMode(elem.schemeElem, "scheme"));
        elem.subdomainElem.addEventListener("click", () => this.changeDomainMode(elem.subdomainElem, "subDomain"));
        elem.portElem.addEventListener("click", () => this.changeDomainMode(elem.portElem, "port"));
        elem.pathElem.addEventListener("click", () => this.changeDomainMode(elem.pathElem, "path"));
    }
    async changeCheckboxSetting(input, name, trueValue = true, falseValue = false) {
        try {
            await this.changeSetting(name, input.checked ? trueValue : falseValue);
        }
        catch (e) {
            input.checked = !input.checked;
            throw e;
        }
    }
    async changeOneAuthUnlock() {
        try {
            zt.mainUI.showDotLoading();
            const input = this.elem.oneauthCheckbox;
            const enable = input.checked;
            const result = await bgApi.unlock.oneauth.enable(enable);
            zt.mainUI.hideDotLoading();
            if (result.ok) {
                VUI.notification.showSuccess(i18n(VI18N.CHANGES_UPDATED));
                return;
            }
            const errorCode = result.error;
            input.checked = !input.checked;
            switch (errorCode) {
                case ONEAUTH_STATUS.NO_DEVICE_FOUND:
                case ONEAUTH_STATUS.UPGRADE_APP:
                    break;
                default:
                    throw errorCode;
            }
            const action = errorCode == ONEAUTH_STATUS.UPGRADE_APP ? i18n(VI18N.UPDATE) : i18n(VI18N.DOWNLOAD);
            this.elem.createOneauthInstallPrompt();
            this.elem.closeOneauthInstallElem.addEventListener("click", () => this.elem.oneauthInstallElem.remove());
            this.elem.cancelOneauthInstallElem.addEventListener("click", () => this.elem.oneauthInstallElem.remove());
            js.dom.setText(this.elem.oneauthInstallHeading, action);
            document.body.append(this.elem.oneauthInstallElem);
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    async changeWebauthnUnlock() {
        try {
            zt.mainUI.showDotLoading();
            const input = this.elem.webauthnCheckbox;
            const enable = input.checked;
            if (!enable) {
                (await bgApi.unlock.webauthn.enable(false)).result;
                this.elem.authenticatorOptions.classList.add(VaultCSS.DIS_HIDE);
                VUI.notification.showSuccess(i18n(VI18N.CHANGES_UPDATED));
                return;
            }
            const countRespPromise = bgApi.unlock.webauthn.getCredentialCount();
            (await bgApi.unlock.webauthn.enable(true)).result;
            VUI.notification.showSuccess(i18n(VI18N.CHANGES_UPDATED));
            const authenticatorCount = (await countRespPromise).result;
            if (authenticatorCount == 0) {
                this.confirmWebauthnAddAuthenticator();
            }
            this.elem.authenticatorOptions.classList.remove(VaultCSS.DIS_HIDE);
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    async confirmWebauthnAddAuthenticator() {
        try {
            const confirmed = await AlertUI.inst.createAlert()
                .title("Add Authenticator?")
                .text("You can choose the authenticator based on your operating system and browser.")
                .addButton("confirm", AlertUI.inst.createButton().text("Add Authenticator").value(true).build())
                .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                .show();
            if (!confirmed) {
                return;
            }
            await bgApi.vault.openWebUI({ route: "/main/settings/unlock/authenticator/add" });
        }
        catch (e) {
            logError(e);
        }
    }
    async changeTheme(e) {
        try {
            const themeElem = js.selector.closest(e.target, "[data-theme]");
            if (!themeElem) {
                return;
            }
            js.selector.select("." + this.THEME_SELECTED).classList.remove(this.THEME_SELECTED);
            themeElem.classList.add(this.THEME_SELECTED);
            const themeColor = themeElem.dataset.theme;
            zt.theme.setColor(themeColor);
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
    }
    initLockOnSystemLock() {
        try {
            if (this.data.supportsLockOnSystemLock) {
                return;
            }
            this.elem.lockOnSystemLockContainer.classList.add(VaultCSS.DIS_HIDE);
        }
        catch (e) {
            logError(e);
        }
    }
    initUnlock() {
        if (this.data.oneAuthUnlockRestricted) {
            this.elem.oneauthUnlockContainer.classList.add(VaultCSS.DIS_HIDE);
        }
        if (this.data.webauthnUnlockRestricted) {
            this.elem.webauthnUnlockContainer.classList.add(VaultCSS.DIS_HIDE);
        }
        if (this.data.oneAuthUnlockRestricted && this.data.webauthnUnlockRestricted) {
            this.elem.unlockContainer.classList.add(VaultCSS.DIS_HIDE);
        }
    }
    async changeDomainMode(elem, key) {
        try {
            this.toggleDomainMatch(elem, key);
            await this.changeSetting(LocalStorageKeys.DOMAIN_MATCH_MODE, this.data.domainMatch);
        }
        catch (e) {
            logError(e);
            this.toggleDomainMatch(elem, key);
        }
    }
    toggleDomainMatch(elem, key) {
        try {
            this.data.domainMatch[key] = !this.data.domainMatch[key];
            this.domainContainer.highlight(elem, this.data.domainMatch[key]);
        }
        catch (e) {
            logError(e);
        }
    }
}
