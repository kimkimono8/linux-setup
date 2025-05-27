import { LocalStorageKeys } from "../../../../service/storage/constants/LocalStorageKeys.js";
import { STRING } from "../../../../vutil/export.js";
import { InputType } from "../../../../service/vt/constants/InputType.js";
import { csutil } from "../Context.js";
export class InputTypeProvider {
    typeSymbol = Symbol();
    async init() {
        try {
            js.fn.bindThis(this, [this.check, this.passwordToTextListener]);
            document.addEventListener("click", this.check, true);
            document.addEventListener("focusin", this.check, true);
            csutil.input.listenPasswordToText(this.passwordToTextListener);
            const skipDiscPasswordCheck = (await zlocalStorage.load(LocalStorageKeys.SKIP_DISC_PASSWORD_CHECK, STRING.FALSE)) == STRING.TRUE;
            if (skipDiscPasswordCheck) {
                this.isDiscPassword = () => false;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    typeOf(input) {
        try {
            if (input[this.typeSymbol] == InputType.PASSWORD || this.isDiscPassword(input)) {
                return InputType.PASSWORD;
            }
            return input[this.typeSymbol] || input.type;
        }
        catch (e) {
            logError(e);
            return input.type;
        }
    }
    check(e) {
        try {
            if (!e.isTrusted) {
                return;
            }
            const input = csutil.dom.getEventTargetInput(e);
            if (!input) {
                return;
            }
            if (input.type != InputType.PASSWORD) {
                return;
            }
            input[this.typeSymbol] = InputType.PASSWORD;
        }
        catch (e) {
            logError(e);
        }
    }
    passwordToTextListener(input) {
        input[this.typeSymbol] = InputType.PASSWORD;
    }
    isDiscPassword(input) {
        try {
            const textSecurity = window.getComputedStyle(input)["webkitTextSecurity"];
            return textSecurity && textSecurity != "none";
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
