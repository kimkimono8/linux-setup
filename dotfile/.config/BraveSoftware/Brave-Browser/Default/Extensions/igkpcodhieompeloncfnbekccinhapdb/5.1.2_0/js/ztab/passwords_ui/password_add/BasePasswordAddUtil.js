import { UIUtil1 } from "../../../common/ui/ui_util.js";
import { SecretType } from "../../../src/service/bgApi/types/SecretType.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
export class BasePasswordAddUtil {
    p = null;
    getMustNotContain(field_key, invalidChars) {
        return i18n(field_key) + " " + i18n(VI18N.MUST_NOT_CONTAIN) + " " + invalidChars.join(", ");
    }
    setInputError(input, errorMsg) {
        try {
            const fieldRowElem = js.selector.closest(input, "[data-field_row]");
            js.dom.setChildText(fieldRowElem, "[data-error]", errorMsg);
        }
        catch (e) {
            logError(e);
        }
    }
    focusInput(input) {
        try {
            const TYPE = SecretType.FIELD_TYPE;
            switch (input.type) {
                case TYPE.TEXT:
                case TYPE.PASSWORD:
                case TYPE.TEXTAREA:
                    input.focus();
                    break;
                case TYPE.FILE:
                    this.p.fileComponent.focusFileInput(input);
                    break;
            }
            UIUtil1.inst.scrollIntoView(input);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
