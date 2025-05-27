import { UIUtil1 } from "../../../common/ui/ui_util.js";
import { AlertUI } from "../../common/common.js";
import { i18n } from "../../provider/vt/i18n.js";
import { VaultCSS } from "../../service/VUi/VaultCSS.js";
import { ONEAUTH_STATUS } from "../../service/bgApi/constants.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../service/vt/VI18n.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
import { pp } from "../pp.js";
import { SettingsUIData } from "./SettingsUIData.js";
import { SettingsUIDropdown } from "./SettingsUIDropdown.js";
import { SettingsUIElem } from "./SettingsUIElem.js";
export class SettingsUI {
    elem;
    data;
    dropdowns;
    init() {
        this.elem = new SettingsUIElem();
        this.data = new SettingsUIData();
        this.dropdowns = new SettingsUIDropdown();
        this.init = js.fn.emptyFn;
    }
    async showUI() {
        this.init();
        await this.data.init();
        this.elem.init();
        pp.mainUI.initSearch();
        this.dropdowns.init();
        this.initCheckboxes();
        this.addListeners();
        this.initUnlock();
        UIUtil1.inst.slimScroll(js.selector.selectFrom(this.elem.container, ".page-container"), "450px");
        js.dom.setContent("#content_tab", this.elem.container);
    }
    syncing() {
        const isUIShown = this.elem?.container?.parentElement;
        if (!isUIShown) {
            return;
        }
        this.setSyncingIcon(true);
    }
    synced() {
        const isUIShown = this.elem?.container?.parentElement;
        if (!isUIShown) {
            return;
        }
        this.showUI();
        this.setSyncingIcon(false);
    }
    addListeners() {
        const KEYS = LocalStorageKeys;
        this.elem.autoSaveCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.autoSaveCheckbox, KEYS.AUTO_SAVE_UPDATE_PASSWORDS));
        this.elem.staySignedInCheckbox.addEventListener("input", () => this.changeCheckboxSetting(this.elem.staySignedInCheckbox, VtSettings.STAY_SIGNED_IN));
        this.elem.oneauthCheckbox.addEventListener("input", () => this.changeOneAuthUnlock());
        this.elem.webauthnCheckbox.addEventListener("input", () => this.changeWebauthnUnlock());
        this.elem.syncIcon.addEventListener("click", () => this.sync());
        this.elem.viewAllButton.addEventListener("click", () => this.viewAllSettings());
        this.elem.container.addEventListener("click", e => this.handleCheckboxLabelClick(e));
    }
    sync() {
        const syncing = this.elem.syncIcon.classList.contains(VaultCSS.SYNCING_ANIMATION);
        if (syncing) {
            return;
        }
        bgApi.vault.sync();
        VUI.notification.showSuccess(i18n(VI18N.SYNC_STARTED), 1);
    }
    async viewAllSettings() {
        await bgApi.ztab.openSettings();
        await js.dom.closeWindow();
    }
    initCheckboxes() {
        this.elem.autoSaveCheckbox.checked = this.data.autoSavePasswords;
        this.elem.staySignedInCheckbox.checked = this.data.staySignedIn;
        this.elem.oneauthCheckbox.checked = this.data.oneauthEnabled;
        this.elem.webauthnCheckbox.checked = this.data.webauthnEnabled;
    }
    async changeSetting(name, value) {
        try {
            pp.mainUI.showDotLoading();
            await bgApi.settings.change(name, value);
            VUI.notification.showSuccess(i18n(VI18N.CHANGES_UPDATED));
        }
        finally {
            pp.mainUI.hideDotLoading();
        }
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
            pp.mainUI.showDotLoading();
            const input = this.elem.oneauthCheckbox;
            const enable = input.checked;
            const result = await bgApi.unlock.oneauth.enable(enable);
            pp.mainUI.hideDotLoading();
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
            js.dom.setText(this.elem.oneauthInstallHeading, action);
            document.body.append(this.elem.oneauthInstallElem);
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
        finally {
            pp.mainUI.hideDotLoading();
        }
    }
    async changeWebauthnUnlock() {
        try {
            pp.mainUI.showDotLoading();
            const input = this.elem.webauthnCheckbox;
            const enable = input.checked;
            if (!enable) {
                (await bgApi.unlock.webauthn.enable(false)).result;
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
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
        finally {
            pp.mainUI.hideDotLoading();
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
    initUnlock() {
        if (this.data.oneAuthUnlockRestricted) {
            this.elem.oneauthUnlockContainer.classList.add(VaultCSS.DIS_HIDE);
        }
        if (this.data.webauthnUnlockRestricted) {
            this.elem.webauthnUnlockContainer.classList.add(VaultCSS.DIS_HIDE);
        }
    }
    setSyncingIcon(syncing) {
        const syncIcon = this.elem.syncIcon;
        if (syncing) {
            syncIcon.dataset.tooltip_content = i18n(VI18N.SYNCING);
            syncIcon.classList.add(VaultCSS.SYNCING_ANIMATION);
            return;
        }
        syncIcon.classList.remove(VaultCSS.SYNCING_ANIMATION);
        syncIcon.dataset.tooltip_content = i18n(VI18N.SYNC);
    }
    handleCheckboxLabelClick(e) {
        const target = e.target;
        if (!target.matches("[data-checkbox_label]")) {
            return;
        }
        const checkboxSelector = `input[type="checkbox"]`;
        const parent = js.dom.findParent({ selector: target, criteria: x => Boolean(x.querySelector(checkboxSelector)) });
        const checkboxInput = js.selector.selectFrom(parent, checkboxSelector);
        checkboxInput.click();
    }
}
