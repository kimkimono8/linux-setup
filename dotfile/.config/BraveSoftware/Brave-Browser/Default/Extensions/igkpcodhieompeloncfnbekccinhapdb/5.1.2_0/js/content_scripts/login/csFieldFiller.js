import { userAction } from "../../src/cs/csfill/export.js";
import { CSFillValue } from "../../src/service/bgApi/types/Secret.js";
import { contextChecker } from "../components/contextChecker.js";
import { cs } from "../cs.js";
import { CSFillInputImpl } from "./CSFillInput.js";
export class CSFieldFiller {
    async fillValue(fillValue) {
        try {
            const isValidDomain = await contextChecker.isValidFillContext(fillValue);
            if (!isValidDomain) {
                return;
            }
            const fillInput = BaseFillInputGetter.getInstance(fillValue.type).getFillInput();
            if (!fillInput) {
                return;
            }
            await fillInput.fillValue(fillValue.value);
            const inputForZIconAddition = fillInput.getInputForZIconAddition();
            if (inputForZIconAddition) {
                zicon.addForContextMenuUsedInput(inputForZIconAddition);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async fillActiveInput(value) {
        const input = csutil.input.getActiveInput();
        if (!input) {
            return false;
        }
        await userAction.userFill(input, value);
        return true;
    }
}
class BaseFillInputGetter {
    getFillInput() {
        const input = csutil.input.getActiveInput() || this.getPossibleNonActiveInput();
        if (input) {
            return new CSFillInputImpl(input);
        }
        return null;
    }
    static getInstance(type) {
        switch (type) {
            case CSFillValue.FIELD_TYPE.TEXT:
                return new TextFillInputGetter();
            case CSFillValue.FIELD_TYPE.PASSWORD:
                return new PasswordFillInputGetter();
            case CSFillValue.FIELD_TYPE.TOTP:
                return new TotpFillInputGetter();
            default:
                throw "INVALID_STATE";
        }
    }
}
class TextFillInputGetter extends BaseFillInputGetter {
    getPossibleNonActiveInput() {
        return csutil.input.getUsername({ visible: true, container: document.body, shadowRoot: false });
    }
}
class PasswordFillInputGetter extends BaseFillInputGetter {
    getPossibleNonActiveInput() {
        return csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false });
    }
}
class TotpFillInputGetter extends BaseFillInputGetter {
    getFillInput() {
        const totpFillInput = cs.totpLogin.getTotpCSFillInput();
        if (totpFillInput) {
            return totpFillInput;
        }
        return super.getFillInput();
    }
    getPossibleNonActiveInput() {
        return csutil.input.getUsername({ visible: true, container: document.body, shadowRoot: false }) ||
            csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false });
    }
}
