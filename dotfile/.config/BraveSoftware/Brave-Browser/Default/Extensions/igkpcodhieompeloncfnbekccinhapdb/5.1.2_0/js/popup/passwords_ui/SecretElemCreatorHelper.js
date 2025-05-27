import { zcrypt } from "../../common/components/zcrypt.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { pp } from "../../src/popup/pp.js";
import { i18n } from "../../src/provider/vt/i18n.js";
import { Secret, SecretClassification } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { SecretHighlightFields } from "../../src/service/vt/constants/constants.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { TextHighlighter } from "../../src/uiUtil/export.js";
import { CARD_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
export class SecretElemCreatorHelper {
    p;
    pData;
    secret;
    query;
    elem;
    constructor(p, pData) {
        this.p = p;
        this.pData = pData;
    }
    async createSecretElem(param) {
        const elem = this.elem = UIUtil.createElem({ template: this.pData.template });
        const secret = this.secret = param.secret;
        this.query = param.result.query;
        elem.dataset.secret_id = secret.id;
        globalNodeData.setNodeData(elem, secret);
        this.setName();
        await this.setDescription();
        this.p.p.util.updateFavouriteElem(elem, secret.is_favourite);
        this.p.p.util.addLogoElem(elem, secret);
        if (!secret.display_access_control_icon) {
            js.selector.selectFrom(elem, "[data-access_control_icon]").remove();
        }
        await this.addIcons();
        this.addKeyboardListener();
        return elem;
    }
    setName() {
        try {
            const secret = this.secret;
            const query = this.query;
            const secretNameElem = js.selector.selectFrom(this.elem, "[data-secret_name]");
            if (!query || !query.search_string || secret.highlight_field != SecretHighlightFields.NAME) {
                js.dom.setText(secretNameElem, secret.name);
                return;
            }
            js.dom.setContent(secretNameElem, TextHighlighter.highlight(query.search_string, secret.name));
            secretNameElem.dataset.tooltip_content = secret.name;
        }
        catch (e) {
            logError(e);
        }
    }
    async setDescription() {
        try {
            const secret = this.secret;
            const query = this.query;
            const hasAccess = Secret.hasAccess(secret);
            if (!hasAccess) {
                this.removeDescription();
                return;
            }
            if (secret.type_id == this.pData.cardTypeId) {
                const uiText = secret.encrypted != null ? await zcrypt.decrypt(secret.encrypted.fields.card_number, secret.shared) : "";
                this.setDescriptionText(uiText.replace(/\S(?=.{4})/g, "*").replace(/(.{4})/g, '$1 '), CARD_FIELDS.NUMBER);
                return;
            }
            if (!secret.ui_text) {
                this.removeDescription();
                return;
            }
            const userName = await zcrypt.decrypt(secret.ui_text, secret.shared);
            if (userName.trim().length == 0) {
                this.removeDescription();
                return;
            }
            if (!query || !query.search_string || secret.highlight_field != SecretHighlightFields.UI_TEXT) {
                this.setDescriptionText(userName, secret.uiFieldName);
                return;
            }
            js.dom.setChildContent(this.elem, "[data-description]", TextHighlighter.highlight(query.search_string, userName));
        }
        catch (e) {
            logError(e);
        }
    }
    removeDescription() {
        try {
            js.selector.selectFrom(this.elem, "[data-description_container]").remove();
        }
        catch (e) {
            logError(e);
        }
    }
    setDescriptionText(description, fieldName) {
        try {
            js.dom.setChildText(this.elem, "[data-description]", description);
            const secretType = this.pData.secretTypeMap[this.secret.type_id];
            if (!secretType) {
                throw ["SECRET_TYPE_NOT_FOUND", this.secret.type_id];
            }
            const field = secretType.fields.find(x => x.name == fieldName);
            if (!field) {
                throw ["SECRET_TYPE_FIELD_NOT_FOUND", fieldName];
            }
            const copyElem = js.selector.selectFrom(this.elem, "[data-copy_username]");
            const iconElem = js.selector.selectFrom(copyElem, "i");
            iconElem.dataset.tooltip_content = i18n(VI18N.COPY) + " " + field.label;
            globalNodeData.setClickData(copyElem, { fieldName: field.name, fieldLabel: field.label });
        }
        catch (e) {
            logError(e);
        }
    }
    async addIcons() {
        const hasAccess = !this.secret.access_controlled ||
            this.secret.access_request_status == Secret.ACCESS_CTRL_STATUS.CHECK_OUT;
        if (!hasAccess) {
            js.selector.selectFrom(this.elem, "[data-password_actions]").remove();
            return;
        }
        this.addCopyIcon();
        this.addLoginIcon();
        await this.addShareIcon();
        this.addShowMoreActionsIcon();
    }
    addShowMoreActionsIcon() {
        const moreActionsElem = js.selector.selectFrom(this.elem, "[data-show_more_options]");
        const hasViewPermission = Secret.hasViewPermission(this.secret.sharing_level);
        if (hasViewPermission || this.secret.has_totp) {
            return;
        }
        js.selector.selectFrom(moreActionsElem, "i").classList.add("disabled");
        moreActionsElem.dataset.on_click = "";
    }
    async addShareIcon() {
        if (this.pData.isPersonalPlan) {
            js.selector.selectFrom(this.elem, "[data-share]").remove();
            return;
        }
        const sharingRestricted = !(await zlocalStorage.load(LocalStorageKeys.ALLOW_SHARE_SECRET, true));
        if (sharingRestricted) {
            this.disableShareIcon(i18n(VI18N.SHARING_RESTRICTED));
            return;
        }
        const secret = this.secret;
        const isPersonalSecret = secret.classification == SecretClassification.PERSONAL;
        if (isPersonalSecret) {
            this.disableShareIcon(i18n(VI18N.PERSONAL_PASSWORD_CANNOT_BE_SHARED));
            return;
        }
        const hasManagePermission = Secret.hasManagePermission(secret.sharing_level);
        if (!hasManagePermission) {
            this.disableShareIcon(i18n(VI18N.NO_SHARE_PERMISSION));
            return;
        }
    }
    disableShareIcon(tooltipMsg) {
        const shareElem = js.selector.selectFrom(this.elem, "[data-share]");
        const iconElem = js.selector.selectFrom(shareElem, "i");
        iconElem.classList.add("disabled");
        iconElem.dataset.tooltip_content = tooltipMsg;
        shareElem.dataset.on_click = "";
    }
    addLoginIcon() {
        const loginElem = js.selector.selectFrom(this.elem, "[data-login]");
        const privateLoginElem = js.selector.selectFrom(this.elem, "[data-private_login]");
        const secret = this.secret;
        if (!secret.urls.length) {
            loginElem.remove();
            privateLoginElem.remove();
            return;
        }
        if (!this.pData.disableClickToLogin) {
            this.elem.dataset.on_click = "passwords_ui.clicked_login";
            this.elem.dataset.on_enter = "passwords_ui.clicked_login";
            globalNodeData.setClickData(this.elem, { url: secret.urls[0] });
            globalNodeData.setData(this.elem, globalNodeData.dataType.ENTER, { url: secret.urls[0] });
        }
        globalNodeData.setClickData(loginElem, { url: secret.urls[0] });
        globalNodeData.setClickData(privateLoginElem, { url: secret.urls[0], incognito: true });
        if (!this.pData.incognitoAllowed) {
            privateLoginElem.remove();
        }
        if (!secret.auto_submit) {
            js.selector.selectFrom(loginElem, "i").className = "icon-login-disabled";
        }
    }
    addCopyIcon() {
        const secret = this.secret;
        const passwordField = this.pData.secretTypeMap[secret.type_id].password_fields[0];
        const copyElem = js.selector.selectFrom(this.elem, "[data-copy_password]");
        if (!passwordField) {
            copyElem.remove();
            return;
        }
        const iconElem = js.selector.selectFrom(copyElem, "i");
        const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
        if (!hasViewPermission) {
            copyElem.dataset.on_click = "";
            iconElem.classList.add("disabled");
            return;
        }
        iconElem.dataset.tooltip_content = i18n(VI18N.COPY) + " " + passwordField.label;
        globalNodeData.setClickData(copyElem, { fieldName: passwordField.name, fieldLabel: passwordField.label });
    }
    addKeyboardListener() {
        try {
            const elem = this.elem;
            const secret = this.secret;
            const h = this;
            const copyPasswordFn = (e) => {
                e.preventDefault();
                if (!VUI.keyboard.isCtrlPressed(e)) {
                    return;
                }
                const copyElem = js.selector.selectFrom(elem, "[data-copy_password]");
                if (!copyElem) {
                    return;
                }
                copyElem.click();
            };
            const copyTotp = (e) => {
                if (!VUI.keyboard.isCtrlPressed(e)) {
                    return;
                }
                e.preventDefault();
                h.copyTotp(secret);
            };
            VUI.keyboard.onKeyDown(elem, {
                ArrowRight(e) {
                    e.preventDefault();
                    pp.passwordsUI.passwordDetailsUI.showDetails(secret.id);
                },
                c: copyPasswordFn,
                p: copyPasswordFn,
                t: copyTotp,
                o: copyTotp,
                u(e) {
                    if (!VUI.keyboard.isCtrlPressed(e)) {
                        return;
                    }
                    e.preventDefault();
                    h.copyUIText(secret);
                },
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async copyUIText(secret) {
        try {
            if (!secret.ui_text || !secret.uiFieldName) {
                return;
            }
            const uiText = await zcrypt.decrypt(secret.ui_text, secret.shared);
            if (!uiText) {
                return;
            }
            const secretType = await bgApi.secretType.get(secret.type_id);
            const field = secretType.fields.find(x => x.name == secret.uiFieldName);
            if (!field) {
                return;
            }
            pp.mainUI.showDotLoading(0.5);
            await bgApi.secret.copyField(secret.id, field.name);
            this.showCopiedMessage(secret, field.label);
        }
        catch (e) {
            logError(e);
        }
    }
    async copyTotp(secret) {
        try {
            if (!secret.has_totp) {
                return;
            }
            pp.mainUI.showDotLoading(0.5);
            await bgApi.secret.totp.copy(secret.id);
            this.showCopiedMessage(secret, "TOTP");
        }
        catch (e) {
            logError(e);
        }
    }
    showCopiedMessage(secret, prefix) {
        try {
            const message = prefix + " " + i18n(VI18N.COPIED);
            pp.mainUI.hideDotLoading();
            const secretElem = js.selector.select(`[data-secret_id="${secret.id}"]`);
            VUI.tooltip.showElemMsg(secretElem, message, 1);
        }
        catch (e) {
            logError(e);
        }
    }
}
