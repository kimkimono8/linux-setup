import { UIUtil1 } from "../../common/ui/ui_util.js";
import { AlertUI } from "../../src/common/common.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { BasePasswordsUIListener } from "../passwords_ui/BasePasswordsUIListener.js";
import { zt } from "../zt.js";
export class TrashUIListener extends BasePasswordsUIListener {
    p = null;
    clickedEmptyTrash(e) {
        new EmptyTrashOperation(this.p).execute(e);
    }
    async keyed_search_string(e) {
        if (VUI.keyboard.isControlKey(e.key)) {
            return;
        }
        const input = e.target;
        UIUtil1.inst.showSearchClear(input);
        const isCleared = input.value.length == 0;
        if (isCleared) {
            await super.keyed_search_string(e);
        }
    }
    searchTrash(e) {
        super.keyed_search_string(e);
    }
    async clickedRestorePassword(e) {
        new TrashRestoreOperation(this.p).execute(e);
    }
    async clickedDeletePassword(e) {
        new TrashDeleteOperation(this.p).execute(e);
    }
}
class TrashModifyOperation {
    p = null;
    titleI18nKey = "";
    confirmMessageI18nKey = "";
    actionI18nKey = "";
    successI18nKey = "";
    constructor(p) {
        this.p = p;
    }
    async execute(e) {
        try {
            const confirmed = await AlertUI.inst.createAlert()
                .title(i18n(this.titleI18nKey))
                .text(i18n(this.confirmMessageI18nKey))
                .addButton("confirm", AlertUI.inst.createButton().text(i18n(this.actionI18nKey)).value(true).build())
                .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
                .dangerMode(true)
                .show();
            if (!confirmed) {
                return;
            }
            await this.performOperation(e);
            this.p.detailsUI.hideDetails();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async performOperation(e) {
        e;
    }
}
class EmptyTrashOperation extends TrashModifyOperation {
    titleI18nKey = VI18N.EMPTY_TRASH_CONFIRM_TITLE;
    confirmMessageI18nKey = VI18N.EMPTY_TRASH_CONFIRM_MESSAGE;
    actionI18nKey = VI18N.EMPTY_TRASH;
    successI18nKey = VI18N.EMPTY_TRASH_SUCCESS_MESSAGE;
    async performOperation(_e) {
        await bgApi.trash.emptyTrash();
        VUI.notification.showSuccess(i18n(this.successI18nKey));
        this.p.refreshList();
    }
}
class TrashSecretModifyOperation extends TrashModifyOperation {
    async performOperation(e) {
        const secret = this.p.listener.getSecret(e);
        await this.performSecretOperation(secret.id);
        zt.passwordsUI.sidebar.refreshUI();
        VUI.notification.showSuccess(i18n(this.successI18nKey, secret.name));
        const secretElem = this.p.select(`[data-list] [data-secret_id='${secret.id}']`);
        secretElem.remove();
        this.p.refreshList();
    }
    async performSecretOperation(secretId) {
        secretId;
    }
}
class TrashDeleteOperation extends TrashSecretModifyOperation {
    titleI18nKey = VI18N.DELETE_PASSWORD_CONFIRM_TITLE;
    confirmMessageI18nKey = VI18N.DELETE_PASSWORD_CONFIRM_MESSAGE;
    actionI18nKey = VI18N.DELETE;
    successI18nKey = VI18N.DELETE_PASSWORD_SUCCESS_MESSAGE;
    async performSecretOperation(secretId) {
        return bgApi.trash.deletePermanent(secretId);
    }
}
class TrashRestoreOperation extends TrashSecretModifyOperation {
    titleI18nKey = VI18N.RESTORE_PASSWORD_CONFIRM_TITLE;
    confirmMessageI18nKey = VI18N.RESTORE_PASSWORD_CONFIRM_MESSAGE;
    actionI18nKey = VI18N.RESTORE_PASSWORD;
    successI18nKey = VI18N.RESTORE_PASSWORD_SUCCESS_MESSAGE;
    async performSecretOperation(secretId) {
        return bgApi.trash.restoreSecret(secretId);
    }
}
