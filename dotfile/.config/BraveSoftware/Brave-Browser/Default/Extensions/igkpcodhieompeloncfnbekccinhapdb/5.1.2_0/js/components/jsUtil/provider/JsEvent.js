export class JsEventImpl {
    isControlKey(e) {
        try {
            return (e.key.length > 1) || e.ctrlKey || e.metaKey || e.altKey;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    preventDefault(e, stopImmediate = false) {
        e.preventDefault();
        if (stopImmediate) {
            e.stopPropagation();
        }
    }
    onEnter(elem, listener, thisArg = null) {
        elem.addEventListener("keyup", function (e) {
            if (e.key == "Enter") {
                listener.apply(thisArg || this, arguments);
            }
        }, true);
    }
}
