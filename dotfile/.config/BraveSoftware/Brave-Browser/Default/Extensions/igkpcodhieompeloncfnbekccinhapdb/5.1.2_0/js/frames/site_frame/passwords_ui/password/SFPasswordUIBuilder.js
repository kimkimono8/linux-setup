import { Secret } from "../../../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { SFPasswordsUIController } from "../SFPasswordsUIController.js";
import { SFPasswordCli } from "./SFPasswordCli.js";
import { SFPasswordUI } from "./SFPasswordUI.js";
export class SFPasswordUIBuilder {
    static async buildUI(secret, query) {
        return new SFPasswordUIBuilder().build(secret, query);
    }
    constructor() { }
    ui = null;
    get cli() {
        return SFPasswordCli.inst;
    }
    secret = null;
    loginFn = js.fn.emptyFn;
    addLogo() {
        if (this.secret.logo) {
            this.ui.setLogo(this.secret.logo);
            return;
        }
        this.ui.setLogoName(this.secret.name, this.secret.createdOn);
    }
    addIcons() {
        try {
            if (!this.secret.hasAccess) {
                this.ui.removeIconList();
                return;
            }
            const hasViewPermission = Secret.hasViewPermission(this.secret.sharingLevel);
            this.ui.disableFillIf(!hasViewPermission);
            this.ui.disableAutoSubmitIf(!this.secret.autoSubmit);
            this.ui.disableMoreActionsIf(!hasViewPermission && !this.secret.hasTotp);
        }
        catch (e) {
            logError(e);
        }
    }
    addFillFieldRows() {
        try {
            for (let field of this.secret.fillFields) {
                this.ui.addMoreActionsRow(i18n(VI18N.FILL) + " " + field.label, () => this.cli.fillField(this.secret.id, field.name));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addFillCustomColRows() {
        try {
            for (let field of this.secret.customColFillFields) {
                this.ui.addMoreActionsRow(i18n(VI18N.FILL) + " " + field.label, () => this.cli.fillCustomField(this.secret.id, field.name));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async onChangeAutoLoginInput(enable) {
        try {
            SFPasswordsUIController.inst.hideMoreActions();
            await this.cli.changeAutologin(this.secret.id, enable);
            const msgKey = enable ? VI18N.AUTOLOGIN_ENABLE_SUCCESS : VI18N.AUTOLOGIN_DISABLE_SUCCESS;
            VUI.notification.showSuccess(i18n(msgKey));
        }
        catch (e) {
            logError(e);
        }
    }
    addManageAutologinRow() {
        try {
            if (!Secret.hasEditPermission(this.secret.sharingLevel)) {
                return;
            }
            if (!this.secret.autoSubmit) {
                this.ui.addMoreActionsRow(i18n(VI18N.ENABLE_AUTO_LOGIN), () => this.onChangeAutoLoginInput(true));
                return;
            }
            this.ui.addMoreActionsRow(i18n(VI18N.DISABLE_AUTO_LOGIN), () => this.onChangeAutoLoginInput(false));
        }
        catch (e) {
            logError(e);
        }
    }
    onShowMoreActionsInput(e) {
        try {
            this.ui.createMoreActions();
            this.addFillFieldRows();
            if (this.secret.hasTotp) {
                this.ui.addMoreActionsRow(i18n(VI18N.FILL) + " TOTP", () => this.cli.fillTotp(this.secret.id));
            }
            if (this.secret.oneauthId != "") {
                this.ui.addMoreActionsRow(i18n(VI18N.FILL) + " OneAuth TOTP", () => this.cli.fillOneAuthTotp(this.secret.id, this.secret.oneauthId));
            }
            this.addFillCustomColRows();
            this.addManageAutologinRow();
            SFPasswordsUIController.inst.showMoreActions(this.ui.getMoreActions(), e);
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        this.loginFn = () => this.cli.login(this.secret.id);
        this.ui.onPasswordClickInput(this.loginFn);
        if (!this.secret.hasAccess) {
            return;
        }
        const hasViewPermission = Secret.hasViewPermission(this.secret.sharingLevel);
        this.ui.onFillIconClickInput(hasViewPermission, () => this.cli.fill(this.secret.id));
        this.ui.onLoginIconClickInput(this.loginFn);
        this.ui.onMoreActionsClickInput(hasViewPermission || this.secret.hasTotp, this.onShowMoreActionsInput.bind(this));
        this.addKeyboardListener();
    }
    async build(secret, query) {
        try {
            this.secret = secret;
            this.ui = new SFPasswordUI();
            this.ui.init();
            this.ui.elem.dataset.secret_id = secret.id;
            this.addLogo();
            this.ui.setName(secret.name);
            this.ui.setDescription(secret.username);
            this.ui.highlightSearch(secret.highlight_field, query.search_string);
            this.ui.setAccessControlIcon(secret.accessControlConfigured);
            this.addIcons();
            this.addListeners();
            return this.ui.elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    addKeyboardListener() {
        try {
            const elem = this.ui.elem;
            const h = this;
            VUI.keyboard.onKeyDown(elem, {
                Enter: h.loginFn,
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
