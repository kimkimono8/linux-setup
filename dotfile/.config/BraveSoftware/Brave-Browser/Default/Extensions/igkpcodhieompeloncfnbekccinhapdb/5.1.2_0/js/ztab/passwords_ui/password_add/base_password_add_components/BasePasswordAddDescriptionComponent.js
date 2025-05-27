import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { InvalidCharConsumer } from "../../../../common/ui/util/InvalidCharConsumer.js";
import { regexUtil } from "../../../../common/util/regexUtil.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class BasePasswordAddDescriptionComponent {
    p = null;
    containerSelector = "[data-description_container]";
    createUI() {
        try {
            this.addInvalidCharListener();
        }
        catch (e) {
            logError(e);
        }
    }
    addInvalidCharListener() {
        try {
            const descriptionElem = this.getDescriptionElem();
            new InvalidCharConsumer().consumeInvalidChars(descriptionElem, regexUtil.vaultRegex.cleartext);
        }
        catch (e) {
            logError(e);
        }
    }
    checkDescription() {
        try {
            const description = this.getDescription();
            this.p.text("[data-field_row='description'] [data-error]", "");
            const invalidChars = regexUtil.getNonClearTextChars(description);
            if (invalidChars.length == 0) {
                return true;
            }
            const errorMsg = this.p.util.getMustNotContain(VI18N.DESCRIPTION, invalidChars);
            this.p.text("[data-field_row='description'] [data-error]", errorMsg);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkFinalDescription() {
        try {
            const valid = this.checkDescription();
            if (valid) {
                return true;
            }
            const descriptionElem = this.getDescriptionElem();
            descriptionElem.focus();
            UIUtil1.inst.scrollIntoView(descriptionElem);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getDescription() {
        try {
            const descriptionElem = this.getDescriptionElem();
            const description = descriptionElem.value;
            return description;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getDescriptionElem() {
        try {
            const descriptionElem = this.p.select("[data-description]");
            if (!descriptionElem) {
                throw "INVALID_STATE";
            }
            return descriptionElem;
        }
        finally {
        }
    }
    setDescription(description) {
        try {
            const validDescription = regexUtil.replaceNonClearTextChars(description);
            const descriptionElem = this.getDescriptionElem();
            descriptionElem.value = validDescription;
        }
        catch (e) {
            logError(e);
        }
    }
}
