export class InputUtilImpl {
    focus(elem) {
        try {
            elem.focus();
            this.moveCursorToEnd(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    moveCursorToEnd(elem) {
        try {
            elem.setSelectionRange(elem.value.length, elem.value.length);
        }
        catch (e) {
            logError(e);
        }
    }
}
