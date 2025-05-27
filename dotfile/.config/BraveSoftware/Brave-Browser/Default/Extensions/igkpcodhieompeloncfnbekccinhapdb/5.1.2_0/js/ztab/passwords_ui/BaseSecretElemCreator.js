import { zcrypt } from "../../common/components/zcrypt.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { cardFillingUtil } from "../../common/util/cardFillingUtil.js";
import { Secret } from "../../src/service/bgApi/types/Secret.js";
import { SecretHighlightFields } from "../../src/service/vt/constants/constants.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { TextHighlighter } from "../../src/uiUtil/export.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { CARD_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
import { zt } from "../zt.js";
export class BaseSecretElemCreator extends UIParent {
    p = null;
    secretTypeMap = {};
    template = null;
    templateSelector = "#secret_list_item_template";
    curSecret = null;
    cardFieldId = "";
    query = null;
    async init() {
        this.template = js.selector.select(this.templateSelector);
        this.secretTypeMap = await bgApi.secretType.getMap();
        this.cardFieldId = await cardFillingUtil.getPaymentCardCategoryId();
    }
    async getList(secrets, query) {
        this.query = query;
        const fragment = document.createDocumentFragment();
        for (let secret of secrets) {
            fragment.append(await this.createSecretElemInternal(secret));
        }
        return fragment;
    }
    async createSecretElem(secret, query) {
        this.query = query;
        return this.createSecretElemInternal(secret);
    }
    async createSecretElemInternal(secret) {
        const elem = this.elem = UIUtil.createElem({ template: this.template });
        this.curSecret = secret;
        elem.dataset.secret_id = secret.id;
        globalNodeData.setNodeData(elem, secret);
        this.setName();
        await this.setDescription();
        this.p.util.addLogoElem(elem, secret);
        await this.createSecretElemFn();
        this.addKeyboardListener();
        return elem;
    }
    setName() {
        const name = this.curSecret.name;
        const secretNameElem = this.select("[data-name]");
        if (!this.query || !this.query.search_string || this.curSecret.highlight_field != SecretHighlightFields.NAME) {
            js.dom.setText(secretNameElem, name);
            return;
        }
        js.dom.setContent(secretNameElem, TextHighlighter.highlight(this.query.search_string, name));
        secretNameElem.dataset.tooltip_content = name;
    }
    async setDescription() {
        try {
            const hasAccess = Secret.hasAccess(this.curSecret);
            if (!hasAccess) {
                this.removeDescription();
                return;
            }
            if (this.curSecret.type_id == this.cardFieldId) {
                const uiText = this.curSecret.encrypted != null ? await zcrypt.decrypt(this.curSecret.encrypted.fields.card_number, this.curSecret.shared) : "";
                this.setDescriptionText(uiText.replace(/\S(?=.{4})/g, "*").replace(/(.{4})/g, '$1 '), CARD_FIELDS.NUMBER);
                return;
            }
            if (!this.curSecret.ui_text) {
                this.removeDescription();
                return;
            }
            const userName = await zcrypt.decrypt(this.curSecret.ui_text, this.curSecret.shared);
            if (!userName.trim()) {
                this.removeDescription();
                return;
            }
            if (!this.query || !this.query.search_string || this.curSecret.highlight_field != SecretHighlightFields.UI_TEXT) {
                this.setDescriptionText(userName, this.curSecret.uiFieldName);
                return;
            }
            this.setContent("[data-description]", TextHighlighter.highlight(this.query.search_string, userName));
        }
        catch (e) {
            logError(e);
        }
    }
    setDescriptionText(description, fieldName) {
        try {
            js.dom.setChildText(this.elem, "[data-description]", description);
            const copyElem = js.selector.selectFrom(this.elem, "[data-copy_username]");
            if (!copyElem) {
                return;
            }
            const secretType = this.secretTypeMap[this.curSecret.type_id];
            if (!secretType) {
                throw ["SECRET_TYPE_NOT_FOUND", this.curSecret.type_id];
            }
            const field = secretType.fields.find(x => x.name == fieldName);
            if (!field) {
                throw ["SECRET_TYPE_FIELD_NOT_FOUND", fieldName];
            }
            const iconElem = js.selector.selectFrom(copyElem, "i");
            iconElem.dataset.tooltip_content = i18n(VI18N.COPY) + " " + field.label;
            globalNodeData.setClickData(copyElem, { fieldName: field.name, fieldLabel: field.label });
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
    async createSecretElemFn() {
    }
    addKeyboardListener() {
        try {
            const elem = this.elem;
            const secret = this.curSecret;
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
            VUI.keyboard.onKeyDown(this.elem, {
                Enter() {
                    elem.click();
                },
                ArrowRight() {
                    if (h.p.isCardView) {
                        return;
                    }
                    elem.click();
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
            zt.mainUI.showDotLoading(0.5);
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
            zt.mainUI.showDotLoading(0.5);
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
            zt.mainUI.hideDotLoading();
            const secretElem = js.selector.select(`[data-secret_id="${secret.id}"]`);
            VUI.tooltip.showElemMsg(secretElem, message, 1);
        }
        catch (e) {
            logError(e);
        }
    }
}
