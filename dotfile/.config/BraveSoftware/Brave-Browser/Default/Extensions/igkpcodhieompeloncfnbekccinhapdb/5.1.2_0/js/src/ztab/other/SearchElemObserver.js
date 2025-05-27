export class SearchElemObserver {
    lastSearchElem;
    init() {
        try {
            document.addEventListener("focusin", e => this.onFocusIn(e));
            this.addKeyboardListener();
        }
        catch (e) {
            logError(e);
        }
    }
    onFocusIn(e) {
        try {
            if (!e.target.matches("[data-search]")) {
                return;
            }
            this.lastSearchElem = e.target;
        }
        catch (e) {
            logError(e);
        }
    }
    addKeyboardListener() {
        try {
            const h = this;
            VUI.keyboard.onKeyDown(document.body, {
                "/"(e) {
                    if (js.dom.isContentEditable(e.target)) {
                        return;
                    }
                    if (e.target.matches("[data-search]")) {
                        return;
                    }
                    e.preventDefault();
                    if (h.lastSearchElem) {
                        VUI.input.focus(h.lastSearchElem);
                        return;
                    }
                    const searchElem = js.selector.select("[data-search]");
                    searchElem && VUI.input.focus(searchElem);
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
