export class KeyboardNavigatorUtil {
    static inst = new KeyboardNavigatorUtil();
    isValidEvent(e) {
        try {
            if (js.dom.isContentEditable(e.target)) {
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getFocusableElems(param) {
        try {
            return js.selector.selectAll("[tabindex]", param.parent).filter(x => x.tabIndex >= 0);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
export class FocusMover {
    param;
    constructor(param) {
        this.param = param;
    }
    move(inc) {
        try {
            const elems = KeyboardNavigatorUtil.inst.getFocusableElems(this.param);
            const activeElem = document.activeElement;
            const index = elems.findIndex(x => x == activeElem);
            if (index < 0) {
                return false;
            }
            const moveIndex = index + inc;
            if (moveIndex < 0 || moveIndex >= elems.length) {
                return false;
            }
            const reqElem = elems[moveIndex];
            reqElem.focus();
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
