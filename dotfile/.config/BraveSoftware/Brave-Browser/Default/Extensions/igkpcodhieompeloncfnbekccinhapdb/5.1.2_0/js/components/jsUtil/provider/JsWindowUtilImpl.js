export class JSWindowImpl {
    isTopFrame() {
        try {
            return window == window.top;
        }
        catch (e) {
            return false;
        }
    }
}
