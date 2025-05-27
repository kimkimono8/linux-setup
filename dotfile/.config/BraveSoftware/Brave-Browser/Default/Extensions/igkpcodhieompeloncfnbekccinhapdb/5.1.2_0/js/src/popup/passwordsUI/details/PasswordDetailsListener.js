import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { i18n } from "../../../provider/vt/i18n.js";
import { SecretType } from "../../../service/bgApi/types/SecretType.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { pp } from "../../pp.js";
export class PasswordDetailsListener {
    p = null;
    async clicked_show_hide_custom_field(e) {
        const rowElem = js.selector.closest(e.target, "[data-field_row]");
        const show = rowElem.dataset.type != SecretType.FIELD_TYPE.TEXT;
        if (!show) {
            this.hide_password_field_div(rowElem);
            return;
        }
        this.show_password_field_div(rowElem);
        const column = globalNodeData.getNodeData(rowElem).column;
        const secretId = this.getSecretId();
        bgApi.audit.columnViewed(secretId, column.id);
    }
    async clicked_copy_custom_field(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const column = globalNodeData.getNodeData(fieldElem).column;
        const secretId = this.getSecretId();
        await bgApi.secret.copyCustomColumn(secretId, column.id);
        this.showCopiedMessage(e);
    }
    copiedCustomField(e) {
        UIUtil1.inst.copySelection(e);
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const column = globalNodeData.getNodeData(fieldElem).column;
        const seretId = this.getSecretId();
        bgApi.audit.customColumnCopied(seretId, column.id);
        VUI.tooltip.showElemMsg(e.target, i18n(VI18N.COPIED), 1);
    }
    copiedCustomPasswordField(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const hasValidPassword = Boolean(js.selector.selectFrom(fieldElem, "i.icon-hide"));
        if (hasValidPassword) {
            this.copiedCustomField(e);
        }
    }
    async clicked_copy_value(e, event_data) {
        const { value } = event_data;
        js.dom.copyToClipboard(value);
        this.showCopiedMessage(e);
    }
    async clicked_copy_notes(e, event_data) {
        const { value } = event_data;
        js.dom.copyToClipboard(value);
        bgApi.audit.notesCopied(this.getSecretId());
        this.showCopiedMessage(e);
    }
    async clicked_copy_totp(e) {
        const secretId = this.getSecretId();
        await bgApi.secret.totp.copy(secretId);
        this.showCopiedMessage(e);
    }
    async clicked_download_file(_e, event_data) {
        const { file_id } = event_data;
        const secretId = this.getSecretId();
        pp.mainUI.showDotLoading();
        await pp.passwordsUI.util.downloadFile(secretId, file_id);
        pp.mainUI.hideDotLoading();
    }
    async clicked_reset_password(e) {
        const rowElem = js.selector.closest(e.target, "[data-field_row]");
        const secretId = this.getSecretId();
        const field = globalNodeData.getNodeData(rowElem).field;
        await bgApi.secret.resetPassword(secretId, field.name);
        await js.dom.closeWindow();
    }
    getSecretId() {
        const rowElem = js.selector.select("[data-secret_details][data-secret_id]");
        return rowElem.dataset.secret_id;
    }
    async clicked_show_hide_password_field(e) {
        const rowElem = js.selector.closest(e.target, "[data-field_row]");
        const show = rowElem.dataset.type != SecretType.FIELD_TYPE.TEXT;
        if (!show) {
            this.hide_password_field_div(rowElem);
            return;
        }
        this.show_password_field_div(rowElem);
        const field = globalNodeData.getNodeData(rowElem).field;
        const secretId = this.getSecretId();
        bgApi.audit.fieldViewed(secretId, field.name);
    }
    hide_password_field_div(row_elem) {
        row_elem.dataset.type = SecretType.FIELD_TYPE.PASSWORD;
        js.dom.setChildText(row_elem, "[data-value]", "****************");
        const eyeIconElem = js.selector.selectFrom(row_elem, "[data-view_password] i");
        eyeIconElem.dataset.tooltip_content = "i18n:view";
        eyeIconElem.className = "icon-view";
    }
    show_password_field_div(row_elem) {
        row_elem.dataset.type = SecretType.FIELD_TYPE.TEXT;
        const { value } = globalNodeData.getNodeData(row_elem);
        js.dom.setChildContent(row_elem, "[data-value]", VUI.password.getColoredPassword(value));
        const eyeIconElem = js.selector.selectFrom(row_elem, "[data-view_password] i");
        eyeIconElem.dataset.tooltip_content = "i18n:hide";
        eyeIconElem.className = "icon-hide";
    }
    async clickedCopyField(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const field = globalNodeData.getNodeData(fieldElem).field;
        const secretId = this.getSecretId();
        await bgApi.secret.copyField(secretId, field.name);
        this.showCopiedMessage(e);
    }
    copiedField(e) {
        if (!document.getSelection().toString()) {
            return;
        }
        UIUtil1.inst.copySelection(e);
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const field = globalNodeData.getNodeData(fieldElem).field;
        const secretId = this.getSecretId();
        bgApi.audit.fieldCopied(secretId, field.name);
        VUI.tooltip.showElemMsg(e.target, i18n(VI18N.COPIED), 1);
    }
    copiedPasswordField(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const hasValidPassword = Boolean(js.selector.selectFrom(fieldElem, "i.icon-hide"));
        if (hasValidPassword) {
            this.copiedField(e);
        }
    }
    async clicked_hide_password_details() {
        this.p.elem.remove();
        await zsessionStorage.save(this.p.PPSessionShownSecretIdKey, null);
    }
    clickedEditPassword() {
        const secretId = this.getSecretId();
        bgApi.ztab.editPassword(secretId);
        js.dom.closeWindow();
    }
    copiedNotes(e) {
        try {
            if (!document.getSelection().toString()) {
                return;
            }
            UIUtil1.inst.copySelection(e);
            bgApi.audit.notesCopied(this.getSecretId());
            VUI.tooltip.showElemMsg(e.target, i18n(VI18N.COPIED), 1);
        }
        catch (e) {
            logError(e);
        }
    }
    showCopiedMessage(e) {
        try {
            if (e.clientX) {
                VUI.tooltip.showElemMsg(e.target, i18n(VI18N.COPIED), 1);
                return;
            }
            const fieldElem = js.selector.closest(e.target, ".add-password-one-col");
            VUI.tooltip.showElemMsg(fieldElem, i18n(VI18N.COPIED), 1);
        }
        catch (e) {
            logError(e);
        }
    }
}
