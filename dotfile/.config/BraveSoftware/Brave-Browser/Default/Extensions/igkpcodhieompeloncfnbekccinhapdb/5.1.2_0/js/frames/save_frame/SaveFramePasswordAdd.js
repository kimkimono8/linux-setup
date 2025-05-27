import { regexUtil } from "../../common/util/regexUtil.js";
import { SaveFrameUserInput, SecretClassification } from "../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
export class SaveFramePasswordAdd {
    p = null;
    async addPassword() {
        try {
            const nameInput = js.selector.select("#name");
            const name = nameInput.value;
            if (!name) {
                VUI.notification.showError("Name " + i18n(VI18N.MUST_NOT_BE_EMPTY), 3);
                nameInput.focus();
                return;
            }
            const nonClearTextChars = regexUtil.getNonClearTextChars(name);
            if (nonClearTextChars.length) {
                VUI.notification.showError("Name " + i18n(VI18N.MUST_NOT_CONTAIN) + nonClearTextChars.join(", "), 3);
                nameInput.focus();
                return;
            }
            const hasExistingName = await bgApi.secret.checkExistingPasswordName(name);
            if (hasExistingName) {
                VUI.notification.showError(i18n(VI18N.SAME_NAME_PASSWORD_EXISTS), 3);
                nameInput.focus();
                return;
            }
            await this.checkPassword();
        }
        catch (e) {
            logError(e);
            js.dom.hideOld("#loading");
            js.selector.select("#name").focus();
            VUI.notification.showError(e + "");
        }
    }
    getUserInput() {
        try {
            const input = new SaveFrameUserInput();
            input.name = js.selector.select("#name").value;
            const enterprise = js.selector.select(`input[name="classification"]`).checked;
            input.classification = enterprise ? SecretClassification.ENTERPRISE : SecretClassification.PERSONAL;
            input.folderId = this.p.folderComponent.getFolderId();
            input.newFolderName = this.p.folderComponent.getNewFolderName();
            return input;
        }
        catch (e) {
            logError(e);
            return new SaveFrameUserInput();
        }
    }
    async checkPassword() {
        try {
            const password = this.p.saveFrameData.password;
            const errorMsg = await bgApi.policy.check(password);
            if (errorMsg) {
                VUI.notification.showError(errorMsg);
                return;
            }
            await this.savePasswordBg();
        }
        catch (e) {
            logError(e);
        }
    }
    async savePasswordBg() {
        try {
            js.dom.showOld("#loading");
            await bgApi.saveFrame.saveSecret(this.getUserInput());
        }
        catch (e) {
            VUI.notification.showError(e + "");
            await js.time.delay(0.2);
            js.dom.hideOld("#loading");
        }
    }
}
