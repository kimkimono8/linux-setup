import { zenum } from "../../common/enum/zenum.js";
import { FilledFormData } from "../../src/csApi/service/types.js";
import { csLoginContainer } from "../login/CSLoginContainer.js";
import { CSLoginFieldIterator } from "../login/csLoginFieldIterator.js";
export class CSOther {
    getGeneratorSaveUsername() {
        try {
            const usernameInput = this.getGeneratorUsenameInput();
            return (usernameInput && usernameInput.value) || "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getGeneratorUsenameInput() {
        try {
            const activeInput = csutil.input.getActiveInput();
            if (!activeInput) {
                return null;
            }
            const isPassword = csutil.input.typeOf(activeInput) == zenum.FIELD_TYPE.PASSWORD;
            if (!isPassword) {
                return activeInput;
            }
            const loginContainer = csLoginContainer.getInputLoginContainer(activeInput);
            if (!loginContainer) {
                return null;
            }
            let usernameInput = null;
            for (let input of CSLoginFieldIterator.iterate(loginContainer)) {
                switch (csutil.input.typeOf(input)) {
                    case "text":
                    case "email":
                        usernameInput = input;
                        break;
                    case "password":
                        if (input == activeInput) {
                            return usernameInput;
                        }
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async getFilledFormData() {
        const filledFormData = new FilledFormData();
        try {
            const activeInput = csutil.input.getActiveInput();
            if (!activeInput) {
                return filledFormData;
            }
            const loginContainer = csLoginContainer.getInputLoginContainer(activeInput);
            if (!loginContainer) {
                return filledFormData;
            }
            for (let input of CSLoginFieldIterator.iterate(loginContainer)) {
                switch (csutil.input.typeOf(input)) {
                    case "text":
                    case "email":
                        filledFormData.texts.push(input.value);
                        break;
                    case "password":
                        filledFormData.passwords.push(input.value);
                        break;
                }
            }
            return filledFormData;
        }
        catch (e) {
            logError(e);
        }
        return filledFormData;
    }
}
