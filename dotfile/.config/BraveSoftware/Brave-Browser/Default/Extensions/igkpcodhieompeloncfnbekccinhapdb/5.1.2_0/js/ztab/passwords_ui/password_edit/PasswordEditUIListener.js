import { SecretType } from "../../../src/service/bgApi/types/SecretType.js";
import { BasePasswordAddUIListener } from "../password_add/BasePasswordAddUIListener.js";
export class PasswordEditUIListener extends BasePasswordAddUIListener {
    p = null;
    clickedRemoveFile(e) {
        try {
            const input = js.selector.selectFrom(js.selector.closest(e.target, "[data-field_row]"), "input");
            const fileSource = this.p.fileComponent.getFileSource(input);
            fileSource.removeFile();
            super.clickedRemoveFile(e);
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
    }
    clickedRemoveCustomFieldRow(e) {
        try {
            const curRow = js.selector.closest(e.target, "[data-custom_col_row]");
            const valueInput = js.selector.selectFrom(curRow, "input[name='column_value']");
            const isFileInput = valueInput.type == SecretType.FIELD_TYPE.FILE;
            if (isFileInput) {
                const fileSource = this.p.fileComponent.getFileSource(valueInput);
                fileSource.removeFile();
            }
            super.clickedRemoveCustomFieldRow(e);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    clickedShowHideTotpKey(e) {
        try {
            if (!this.p.auditedTotpKeyShown) {
                this.p.auditedTotpKeyShown = true;
                bgApi.audit.totpKeyViewed(this.p.secretEditUIInput.secretId);
            }
            super.clickedShowHideTotpKey(e);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
