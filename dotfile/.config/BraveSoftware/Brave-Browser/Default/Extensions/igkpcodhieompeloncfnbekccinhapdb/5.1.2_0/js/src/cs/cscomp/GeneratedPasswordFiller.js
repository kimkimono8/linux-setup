import { userAction } from "../csfill/context.js";
import { InputType } from "../../service/vt/constants/InputType.js";
export class GeneratedPasswordFiller {
    async fill(value) {
        try {
            const inputs = await this.getFillInputs();
            await Promise.all(inputs.map(x => userAction.fill(x, value)));
            inputs[0].focus();
            return inputs.length > 0;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getFillInputs() {
        try {
            const input = csutil.input.getActiveInput();
            if (!input) {
                return [];
            }
            const otherInput = await this.getConfirmPasswordField(input);
            if (!otherInput) {
                return [input];
            }
            return [input, otherInput];
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getConfirmPasswordField(passwordInput) {
        try {
            const container = await this.getConfirmPasswordContainer(passwordInput);
            if (!container) {
                return null;
            }
            const passwordList = csutil.input.getPasswords({ container, visible: true, shadowRoot: false });
            switch (passwordList.length) {
                case 2:
                case 3:
                    break;
                default:
                    return null;
            }
            const index = passwordList.indexOf(passwordInput);
            const nextIndex = index + 1;
            const hasManyAfter = (nextIndex + 1) < passwordList.length;
            if (hasManyAfter) {
                return null;
            }
            const confirmPassword = passwordList[nextIndex];
            if (!this.isSimilarDimension(confirmPassword, passwordInput) ||
                !this.checkIsNextField(container, passwordInput, confirmPassword)) {
                return null;
            }
            return confirmPassword;
        }
        catch (e) {
            logError(e);
        }
        return null;
    }
    checkIsNextField(container, passwordInput, confirmPassword) {
        try {
            const inputs = csutil.input.selectAll({ container, types: [InputType.TEXT, InputType.EMAIL, InputType.TEL, InputType.NUMBER, InputType.PASSWORD], shadowRoot: false });
            const index = inputs.indexOf(passwordInput);
            if (index >= inputs.length || inputs[index + 1] != confirmPassword) {
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getConfirmPasswordContainer(passwordInput) {
        try {
            const passwordList = await csutil.input.getPasswords({ visible: true, shadowRoot: false });
            const index = passwordList.indexOf(passwordInput);
            if (index == -1 || index == (passwordList.length - 1)) {
                return null;
            }
            switch (passwordList.length) {
                case 1: return null;
                case 2: return csutil.dom.getAncestor(passwordList[0], passwordList[1]);
            }
            switch (index) {
                case 0: return csutil.dom.getAncestor(passwordList[0], passwordList[1]);
                case passwordList.length - 1: return csutil.dom.getAncestor(passwordList[passwordList.length - 2], passwordList[passwordList.length - 1]);
            }
            const prevAncestor = csutil.dom.getAncestor(passwordInput, passwordList[index - 1]);
            const nextAncestor = csutil.dom.getAncestor(passwordInput, passwordList[index + 1]);
            if (prevAncestor.contains(nextAncestor)) {
                return prevAncestor;
            }
            return nextAncestor;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    isSimilarDimension(input, otherInput) {
        const OK_DIFF = 20;
        return (Math.abs(input.offsetWidth - otherInput.offsetWidth) < OK_DIFF) &&
            (Math.abs(input.offsetHeight - otherInput.offsetHeight) < OK_DIFF);
    }
}
