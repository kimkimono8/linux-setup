import { KeyboardKeys } from "../../../service/VUi/constants/KeyboardKeys.js";
import { keyboardUtil } from "../Context.js";
import { FocusMover, KeyboardNavigatorUtil } from "./KeyboardNavigator.js";
export class KeyboardUpDownNavigator {
    param;
    focusMover;
    util = KeyboardNavigatorUtil.inst;
    constructor(param) {
        this.param = param;
        this.focusMover = new FocusMover(param);
    }
    addListener() {
        try {
            keyboardUtil.onKeyDown(this.param.parent, this);
        }
        catch (e) {
            logError(e);
        }
    }
    [KeyboardKeys.ARROW_UP](e) {
        try {
            if (!this.util.isValidEvent(e)) {
                return;
            }
            e.preventDefault();
            const moved = this.focusMover.move(-1);
            moved || this.param?.onTopUp?.();
        }
        catch (e) {
            logError(e);
        }
    }
    [KeyboardKeys.ARROW_DOWN](e) {
        try {
            if (!this.util.isValidEvent(e)) {
                return;
            }
            e.preventDefault();
            const moved = this.focusMover.move(1);
            moved || this.param?.onBottomDown?.();
        }
        catch (e) {
            logError(e);
        }
    }
}
