import { loginFieldIterator } from "./loginutil-FieldIterator.js";
import { inputLoginContainer } from "./loginutil-InputLoginContainer.js";
import { totpUtil } from "./loginutil-Totp.js";
import { util } from "./loginutil-Util.js";
import { symbols } from "./loginutil-symbol.js";
class LoginUtil {
    getInputLoginContainer(input) {
        return inputLoginContainer.getContainer(input);
    }
    setFilledText(input) {
        input[symbols.filledTextSymbol] = true;
    }
    setFilledPassword(input) {
        input[symbols.filledPasswordSymbol] = true;
    }
    checkPreFilled(input) {
        return input[symbols.filledTextSymbol] || input[symbols.filledPasswordSymbol] || false;
    }
    isNumberLoginAllowed(container) {
        return util.isNumberLoginAllowed(container);
    }
    iterateLoginFields(container) {
        return loginFieldIterator.iterate(container);
    }
    isTotpInput(input) {
        return totpUtil.isTotpInput(input);
    }
    findFieldsBefore(input) {
        try {
            const container = this.getInputLoginContainer(input);
            if (!container) {
                return [];
            }
            const inputs = [];
            for (let curInput of this.iterateLoginFields(container)) {
                if (curInput == input) {
                    return inputs;
                }
                inputs.push(curInput);
            }
            return inputs;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
export const exp_loginUtil = new LoginUtil();
globalThis["loginUtil"] = exp_loginUtil;
