import { AlertUI } from "../../../src/common/common.js";
import { Secret } from "../../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { BasePasswordMoreActionsCli } from "./BasePasswordMoreActionsCli.js";
import { BasePasswordMoreActionsUI } from "./BasePasswordMoreActionsUI.js";
export class BasePasswordMoreActionsController {
    static instance = null;
    constructor() { }
    static get inst() {
        return this.instance || (this.instance = new BasePasswordMoreActionsController());
    }
    ui = null;
    cli = null;
    isShown = false;
    async showUI(secretId, e) {
        this.ui = this.getUIInstance();
        this.ui.init();
        this.cli = this.getCliInstance();
        await this.cli.init(secretId);
        await this.addRows();
        this.ui.showAt(e);
        this.isShown = true;
    }
    getCliInstance() {
        return BasePasswordMoreActionsCli.inst;
    }
    getUIInstance() {
        return new BasePasswordMoreActionsUI();
    }
    async addRows() {
        const secret = this.cli.getSecret();
        const hasEditPermission = Secret.hasEditPermission(secret.sharing_level);
        const hasManagePermission = Secret.hasManagePermission(secret.sharing_level);
        const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
        if (hasEditPermission) {
            this.ui.addRow(i18n(VI18N.EDIT), this.onEditInput.bind(this));
        }
        await this.addCopyFieldRows(hasViewPermission);
        this.addTotpRow(secret);
        this.addCopyCustomColRows(hasViewPermission);
        await this.addAccessControlRows(hasManagePermission);
        this.addManageAutoLoginRow(hasEditPermission);
        if (hasManagePermission) {
            this.ui.addDeleteRow(i18n(VI18N.MOVE_TO_TRASH), this.onTrashInput.bind(this));
        }
    }
    addTotpRow(secret) {
        try {
            if (secret.has_totp) {
                this.ui.addRow(i18n(VI18N.COPY) + " TOTP", this.onCopyTotpInput.bind(this));
            }
            if (secret.oneauth_id) {
                this.ui.addRow(i18n(VI18N.GET_ONEAUTH_TOTP), this.onGetOneAuthTotpInput.bind(this));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addCopyFieldRows(hasViewPermission) {
        try {
            if (!hasViewPermission) {
                return;
            }
            const copyFieldRows = await this.cli.getCopyFieldTypes();
            for (let field of copyFieldRows) {
                this.ui.addRow(i18n(VI18N.COPY) + " " + field.label, () => this.onCopyFieldInput(field));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addCopyCustomColRows(hasViewPermission) {
        try {
            if (!hasViewPermission) {
                return;
            }
            const columnInfos = this.cli.getCopyCustomCols();
            for (let info of columnInfos) {
                this.ui.addRow(i18n(VI18N.COPY) + " " + info.label, () => this.onCopyCustomColInput(info));
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async addAccessControlRows(hasManagePermission) {
        try {
            if (!hasManagePermission) {
                return;
            }
            const hasRows = await this.cli.checkNeedAccessControlRows();
            if (!hasRows) {
                return;
            }
            if (!this.cli.getSecret().display_access_control_icon) {
                this.ui.addRow(i18n(VI18N.ENABLE_ACCESS_CONTROL), this.onEnableAccessControlInput.bind(this));
                return;
            }
            this.ui.addRow(i18n(VI18N.MANAGE_ACCESS_CONTROL), this.onManageAccessControlInput.bind(this));
            this.ui.addRow(i18n(VI18N.DISABLE_ACCESS_CONTROL), this.onDisableAccessControlInput.bind(this));
        }
        catch (e) {
            logError(e);
        }
    }
    addManageAutoLoginRow(hasEditPermission) {
        try {
            if (!hasEditPermission) {
                return;
            }
            const secret = this.cli.getSecret();
            const hasValidUrl = secret.valid_urls.length > 0;
            if (!hasValidUrl) {
                return;
            }
            const autoLoginEnabled = secret.auto_submit;
            if (!autoLoginEnabled) {
                this.ui.addRow(i18n(VI18N.ENABLE_AUTO_LOGIN), () => this.onChangeAutoLoginInput(true));
                return;
            }
            this.ui.addRow(i18n(VI18N.DISABLE_AUTO_LOGIN), () => this.onChangeAutoLoginInput(false));
        }
        catch (e) {
            logError(e);
        }
    }
    async hideUI() {
        if (!this.ui) {
            return;
        }
        this.ui.hideUI();
        this.isShown = false;
    }
    async hideIfSelected(secretIds) {
        try {
            if (!this.cli) {
                return;
            }
            const secret = this.cli.getSecret();
            const hideSelection = this.isShown && secret && secretIds.includes(secret.id);
            if (hideSelection) {
                this.hideUI();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    onEditInput() {
        bgApi.ztab.editPassword(this.cli.getSecret().id);
        this.ui.hideUI();
        js.dom.closeWindow();
    }
    async onCopyFieldInput(field) {
        this.hideUI();
        await this.cli.copyField(field.name);
        VUI.notification.showSuccess(field.label + " " + i18n(VI18N.COPIED));
    }
    async onCopyTotpInput() {
        this.ui.hideUI();
        await this.cli.copyTotp();
        VUI.notification.showSuccess("TOTP " + i18n(VI18N.COPIED));
    }
    async onGetOneAuthTotpInput() {
        this.ui.hideUI();
        const copied = await this.cli.copyOneAuthTotp();
        if (!copied) {
            VUI.notification.showError(i18n(VI18N.ERROR_GETTING_ONEAUTH_TOTP));
            return;
        }
        VUI.notification.showSuccess("TOTP " + i18n(VI18N.COPIED));
    }
    async onCopyCustomColInput(columnInfo) {
        this.ui.hideUI();
        await this.cli.copyCustomColumn(columnInfo.id);
        VUI.notification.showSuccess(columnInfo.label + " " + i18n(VI18N.COPIED));
    }
    async onEnableAccessControlInput() {
        return this.onAccessControlInput(() => this.cli.enableAccessControl());
    }
    async onManageAccessControlInput() {
        return this.onAccessControlInput(() => this.cli.enableAccessControl());
    }
    async onDisableAccessControlInput() {
        this.ui.hideUI();
        const confirmed = await AlertUI.inst.confirmDelete(i18n(VI18N.CONFIRM_ACCESS_CONTROL_DISABLE), i18n(VI18N.DISABLE));
        if (!confirmed) {
            return;
        }
        await this.cli.disableAccessControl();
        VUI.notification.showSuccess(i18n(VI18N.ACCESS_CONTROL_DISABLED_SUCCESS));
    }
    async onAccessControlInput(fn) {
        this.ui.hideUI();
        await fn();
        await js.dom.closeWindow();
    }
    async onChangeAutoLoginInput(enable) {
        this.ui.hideUI();
        await this.cli.changeAutoLogin(enable);
        const msgKey = enable ? VI18N.AUTOLOGIN_ENABLE_SUCCESS : VI18N.AUTOLOGIN_DISABLE_SUCCESS;
        VUI.notification.showSuccess(i18n(msgKey));
    }
    async onTrashInput() {
        this.ui.hideUI();
        const confirmed = await AlertUI.inst.confirmDelete(i18n(VI18N.MOVE_PASSWORD_NAME_TO_TRASH, this.cli.getSecret().name), i18n(VI18N.MOVE_TO_TRASH));
        if (!confirmed) {
            return;
        }
        await this.cli.moveToTrash();
        const successMsgKey = await this.cli.isCardType() ? VI18N.CARD_MOVE_TO_TRASH_SUCCESS : VI18N.MOVE_TO_TRASH_SUCCESS;
        VUI.notification.showSuccess(i18n(successMsgKey));
    }
}
