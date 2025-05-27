import { symbols } from "./loginutil-symbol.js";
class TotpUtil {
    isTotpInput(input) {
        try {
            if (!input) {
                return false;
            }
            const isVisible = csutil.isVisible(input);
            if (!isVisible) {
                return false;
            }
            const isValidType = csutil.input.isValidTextPasswordNumber(input);
            if (!isValidType) {
                return false;
            }
            const invalidCodeRegex = /(?:zip.*code)|(?:country.*code)/i;
            if (csutil.dom.hasAttribute({ elem: input, key: invalidCodeRegex })) {
                return false;
            }
            const totpRegex = /(?:t?otp)|(?:(?:c|k)ode)|(?:mfa)|(?:token)|(?:verification)|(?:digit)|(?:2fact)|(?:one-time-code)/i;
            const invalidTotpRegex = /(?:keyCode)/i;
            const ignoreAttribute = ["style"];
            const hasTotpRegex = csutil.dom.hasAttribute({
                elem: input, key: totpRegex, invalidKey: invalidTotpRegex, ignoreAttribute
            });
            if (!hasTotpRegex) {
                return false;
            }
            if (input[symbols.filledTextSymbol] || input[symbols.filledPasswordSymbol]) {
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
export const totpUtil = new TotpUtil();
