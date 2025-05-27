import { globalNodeData } from "../../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../../common/ui/ui_util.js";
import { SecretType } from "../../../src/service/bgApi/types/SecretType.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { PasswordShareController } from "../../../src/ztab/passwords_ui/share/PasswordShareController.js";
import { zt } from "../../zt.js";
import { PasswordHistoryController } from "../password_history/PasswordHistoryController.js";
export class PasswordDetailsUIListener {
    p = null;
    async clickedEditPassword() {
        const secretId = this.getSecretId();
        zt.passwordsOldUI.passwordEditUI.edit(secretId);
    }
    async clickedSharePassword() {
        const secretId = this.getSecretId();
        PasswordShareController.showUI(secretId);
    }
    async clickedShowHistory(e) {
        const secretId = this.getSecretId();
        PasswordHistoryController.inst().showPasswordHistory(secretId, e);
    }
    async clicked_show_hide_custom_field(e) {
        const row_elem = js.selector.closest(e.target, "[data-field_row]");
        const show = row_elem.dataset.type != SecretType.FIELD_TYPE.TEXT;
        if (!show) {
            this.hide_password_field_div(row_elem);
            return;
        }
        this.show_password_field_div(row_elem);
        const column = globalNodeData.getNodeData(row_elem).column;
        const secret_id = this.getSecretId();
        bgApi.audit.columnViewed(secret_id, column.id);
    }
    async clicked_copy_custom_field(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const column = globalNodeData.getNodeData(fieldElem).column;
        const secret_id = this.getSecretId();
        await bgApi.secret.copyCustomColumn(secret_id, column.id);
        this.showCopiedMessage(e);
    }
    copiedCustomField(e) {
        try {
            if (!document.getSelection().toString()) {
                return;
            }
            UIUtil1.inst.copySelection(e);
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const column = globalNodeData.getNodeData(fieldElem).column;
            const seretId = this.getSecretId();
            bgApi.audit.customColumnCopied(seretId, column.id);
            this.showCopiedMessage(e);
        }
        catch (e) {
            logError(e);
        }
    }
    copiedCustomPasswordField(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const hasValidPassword = js.selector.selectFrom(fieldElem, "i.icon-hide");
        if (hasValidPassword) {
            this.copiedCustomField(e);
        }
    }
    async clicked_copy_value(e, event_data) {
        const { value } = event_data;
        js.dom.copyToClipboard(value);
        this.showCopiedMessage(e);
    }
    async clicked_copy_totp(e) {
        const secret_id = this.getSecretId();
        await bgApi.secret.totp.copy(secret_id);
        this.showCopiedMessage(e);
    }
    async clicked_copy_notes(e, eventData) {
        const { notes } = eventData;
        js.dom.copyToClipboard(notes);
        bgApi.audit.notesCopied(this.getSecretId());
        this.showCopiedMessage(e);
    }
    copiedNotes(e) {
        try {
            if (!document.getSelection().toString()) {
                return;
            }
            UIUtil1.inst.copySelection(e);
            bgApi.audit.notesCopied(this.getSecretId());
            this.showCopiedMessage(e);
        }
        catch (e) {
            logError(e);
        }
    }
    async clicked_download_file(_e, event_data) {
        const { file_id } = event_data;
        const secret_id = this.getSecretId();
        zt.mainUI.showDotLoading();
        await this.p.p.util.downloadFile(secret_id, file_id);
        zt.mainUI.hideDotLoading();
    }
    async clicked_reset_password(e) {
        const row_elem = js.selector.closest(e.target, "[data-field_row]");
        const secret_id = this.getSecretId();
        const field = globalNodeData.getNodeData(row_elem).field;
        await bgApi.secret.resetPassword(secret_id, field.name);
        await js.dom.closeWindow();
    }
    getSecretId() {
        const row_elem = js.selector.select("[data-secret_details][data-secret_id]");
        return row_elem.dataset.secret_id;
    }
    async clicked_show_hide_password_field(e) {
        const row_elem = js.selector.closest(e.target, "[data-field_row]");
        const show = row_elem.dataset.type != SecretType.FIELD_TYPE.TEXT;
        if (!show) {
            this.hide_password_field_div(row_elem);
            return;
        }
        this.show_password_field_div(row_elem);
        const field = globalNodeData.getNodeData(row_elem).field;
        const secret_id = this.getSecretId();
        bgApi.audit.fieldViewed(secret_id, field.name);
    }
    async clicked_show_hide_notes_field(e) {
        const row_elem = js.selector.closest(e.target, "[data-field_row]");
        const show = row_elem.dataset.type != SecretType.FIELD_TYPE.TEXT;
        if (!show) {
            this.hide_password_field_div(row_elem);
            return;
        }
        this.show_password_field_div(row_elem);
    }
    hide_password_field_div(row_elem) {
        row_elem.dataset.type = SecretType.FIELD_TYPE.PASSWORD;
        js.dom.setChildText(row_elem, "[data-value]", "****************");
        const eye_icon = js.selector.selectFrom(row_elem, "[data-view_password] i");
        eye_icon.dataset.tooltip_content = "i18n:view";
        eye_icon.className = "icon-view";
    }
    show_password_field_div(row_elem) {
        row_elem.dataset.type = SecretType.FIELD_TYPE.TEXT;
        const { value } = globalNodeData.getNodeData(row_elem);
        js.dom.setChildContent(row_elem, "[data-value]", VUI.password.getColoredPassword(value));
        const eye_icon = js.selector.selectFrom(row_elem, "[data-view_password] i");
        eye_icon.dataset.tooltip_content = "i18n:hide";
        eye_icon.className = "icon-hide";
    }
    async clickedCopyField(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const field = globalNodeData.getNodeData(fieldElem).field;
        const secret_id = this.p.p.util.getSecretId(e);
        await bgApi.secret.copyField(secret_id, field.name);
        this.showCopiedMessage(e);
    }
    copiedField(e) {
        try {
            if (!document.getSelection().toString()) {
                return;
            }
            UIUtil1.inst.copySelection(e);
            const fieldElem = js.selector.closest(e.target, "[data-field_row]");
            const field = globalNodeData.getNodeData(fieldElem).field;
            const secret_id = this.p.p.util.getSecretId(e);
            bgApi.audit.fieldCopied(secret_id, field.name);
            this.showCopiedMessage(e);
        }
        catch (e) {
            logError(e);
        }
    }
    copiedPasswordField(e) {
        const fieldElem = js.selector.closest(e.target, "[data-field_row]");
        const hasValidPassword = js.selector.selectFrom(fieldElem, "i.icon-hide");
        if (hasValidPassword) {
            this.copiedField(e);
        }
    }
    async clicked_hide_password_details() {
        this.p.hideDetails();
    }
    clickedCheckIn() {
        this.p.checkInSecret();
    }
    showCopiedMessage(e) {
        try {
            if (e.clientX) {
                VUI.tooltip.showElemMsg(e.target, i18n(VI18N.COPIED), 1);
                return;
            }
            const fieldRow = e.target.closest("[data-field_row]");
            const fieldElem = js.selector.selectFrom(fieldRow, "[tabindex='0']");
            VUI.tooltip.showElemMsg(fieldElem, i18n(VI18N.COPIED), 1);
        }
        catch (e) {
            logError(e);
        }
    }
}
