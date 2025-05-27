import { KeyboardKeys } from "../../../service/VUi/constants/KeyboardKeys.js";
import { keyboardUtil } from "../Context.js";
import { FocusMover, KeyboardNavigatorUtil } from "./KeyboardNavigator.js";
export class KeyboardUpDownLeftRightNavigator {
    params;
    focusMover;
    util = KeyboardNavigatorUtil.inst;
    elemFinder = null;
    constructor(params) {
        this.params = params;
        this.focusMover = new FocusMover(params);
        this.elemFinder = new UpDownElemFinder(params);
    }
    addListener() {
        try {
            keyboardUtil.onKeyDown(this.params.parent, this);
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
            const upElem = this.elemFinder.findUpElem();
            if (upElem) {
                upElem.focus();
                return;
            }
            this.params?.onTopUp?.();
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
            const downElem = this.elemFinder.findDownElem();
            if (downElem) {
                downElem.focus();
                return;
            }
            this.params?.onBottomDown?.();
        }
        catch (e) {
            logError(e);
        }
    }
    [KeyboardKeys.ARROW_LEFT](e) {
        try {
            if (!this.util.isValidEvent(e)) {
                return;
            }
            e.preventDefault();
            const moved = this.focusMover.move(-1);
            moved || this.params?.onTopUp?.();
        }
        catch (e) {
            logError(e);
        }
    }
    [KeyboardKeys.ARROW_RIGHT](e) {
        try {
            if (!this.util.isValidEvent(e)) {
                return;
            }
            e.preventDefault();
            const moved = this.focusMover.move(1);
            moved || this.params?.onBottomDown?.();
        }
        catch (e) {
            logError(e);
        }
    }
}
class UpDownElemFinder {
    params;
    constructor(params) {
        this.params = params;
    }
    findUpElem() {
        return this.findElem({ from: 0, inc: -1 });
    }
    findDownElem() {
        return this.findElem({ from: 0, inc: 1 });
    }
    findElem(arrayIterateParam) {
        try {
            const elems = KeyboardNavigatorUtil.inst.getFocusableElems(this.params);
            if (!this.params.parent.contains(document.activeElement)) {
                return null;
            }
            const pos = elems.indexOf(document.activeElement);
            if (pos < 0) {
                return null;
            }
            const rect = document.activeElement.getBoundingClientRect();
            arrayIterateParam.from = pos + arrayIterateParam.inc;
            for (let elem of js.array.iterate(elems, arrayIterateParam)) {
                if (this.isBoundedLeftRight(rect, elem)) {
                    return elem;
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    isBoundedLeftRight(rect, elem) {
        try {
            const elemRect = elem.getBoundingClientRect();
            const x = elemRect.x + (elemRect.width / 2);
            return this.isBounded(x, rect.left, rect.right);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isBounded(x, low, high) {
        return (x >= low) && (x <= high);
    }
}
