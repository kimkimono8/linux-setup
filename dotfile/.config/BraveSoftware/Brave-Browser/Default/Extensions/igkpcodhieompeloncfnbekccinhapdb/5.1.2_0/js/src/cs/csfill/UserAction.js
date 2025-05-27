import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { STRING } from "../../vutil/export.js";
import { highlighter } from "./context.js";
export class UserAction {
    useOldFill = false;
    async init() {
        try {
            this.useOldFill = (await zlocalStorage.load(LocalStorageKeys.USE_OLD_FILL, STRING.FALSE)) == STRING.TRUE;
            await highlighter.init();
            info(UserAction.name, "user action - use old fill?", this.useOldFill);
        }
        catch (e) {
            logError(e);
        }
    }
    async userFill(input, value) {
        try {
            info(UserAction.name, "filling by user fill");
            highlighter.highlight(input);
            await js.time.delay(0.3);
            await this.fill(input, value);
            highlighter.removeHighLight(input);
        }
        catch (e) {
            logError(e);
        }
    }
    async fill(input, value) {
        info(UserAction.name, "filling input: ", input, "value: ", js.log.mask(value));
        const defaultInitObj = {
            bubbles: true,
            cancelable: true,
            view: window
        };
        input.dispatchEvent(new MouseEvent("mousedown", defaultInitObj));
        input.focus();
        input.dispatchEvent(new MouseEvent("mouseup", defaultInitObj));
        input.dispatchEvent(new MouseEvent("click", defaultInitObj));
        input.dispatchEvent(new KeyboardEvent("keydown", defaultInitObj));
        input.dispatchEvent(new KeyboardEvent("keypress", defaultInitObj));
        input.dispatchEvent(new KeyboardEvent("keyup", defaultInitObj));
        input.value = value;
        if (this.useOldFill) {
            input.dispatchEvent(new KeyboardEvent("keydown", defaultInitObj));
            input.dispatchEvent(new KeyboardEvent("keypress", defaultInitObj));
            input.dispatchEvent(new KeyboardEvent("keyup", defaultInitObj));
        }
        input.dispatchEvent(new InputEvent("input", defaultInitObj));
        input.dispatchEvent(new InputEvent("change", defaultInitObj));
        input.blur();
        input.focus();
        await js.time.delay(0.2);
        if (input.value != value) {
            input.value = value;
        }
    }
    async click(elem) {
        try {
            info(UserAction.name, "clicking: ", elem);
            highlighter.highlight(elem);
            await js.time.delay(0.3);
            elem.click();
            highlighter.removeHighLight(elem);
        }
        catch (e) {
            logError(e);
        }
    }
}
