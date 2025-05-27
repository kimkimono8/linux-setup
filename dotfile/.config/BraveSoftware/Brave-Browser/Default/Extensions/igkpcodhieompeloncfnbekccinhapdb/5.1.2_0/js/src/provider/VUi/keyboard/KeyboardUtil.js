import { KeyboardKeys } from "../../../service/VUi/constants/KeyboardKeys.js";
import { KeyboardUpDownLeftRightNavigator } from "./KeyboardUpDownLeftRightNavigator.js";
import { KeyboardUpDownNavigator } from "./KeyboardUpDownNavigator.js";
export class KeyboardUtilImpl {
    isControlKey(key) {
        try {
            if (key.length == 0) {
                return false;
            }
            switch (key) {
                case KeyboardKeys.ARROW_DOWN:
                case KeyboardKeys.ARROW_LEFT:
                case KeyboardKeys.ARROW_RIGHT:
                case KeyboardKeys.ARROW_UP:
                case KeyboardKeys.CONTROL:
                case KeyboardKeys.META:
                case KeyboardKeys.SHIFT:
                    return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isCtrlPressed(key) {
        try {
            return key.ctrlKey || key.metaKey;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    onKeyDown(elem, listener) {
        try {
            elem.addEventListener("keydown", function (e) {
                if (listener[e.key]) {
                    listener[e.key](e, elem);
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    onKeyUp(elem, listener) {
        try {
            elem.addEventListener("keyup", function (e) {
                if (listener[e.key]) {
                    listener[e.key](e, elem);
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
    getOnKeyDownProxy(elem) {
        try {
            const proxy = new KeyboardProxyListenerImpl();
            proxy.listen(elem);
            return proxy;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    addUpDownNavigation(param) {
        return new KeyboardUpDownNavigator(param).addListener();
    }
    addUpDownLeftRightNavigation(param) {
        return new KeyboardUpDownLeftRightNavigator(param).addListener();
    }
}
class KeyboardProxyListenerImpl {
    subject = {};
    setSubject(listener) {
        this.subject = listener;
    }
    listen(elem) {
        elem.addEventListener("keyup", this.onKeyDown.bind(this));
    }
    onKeyDown(e) {
        if (this.subject?.[e.key]) {
            this.subject[e.key](e);
        }
    }
}
