export class ActiveInputObserver {
    activeInput = null;
    init() {
        js.fn.bindThis(this, [this.check]);
        document.addEventListener("focusin", this.check, true);
        document.addEventListener("click", this.check, true);
        document.addEventListener("contextmenu", this.check, true);
        const activeElem = this.getActiveDomElement();
        if (activeElem instanceof HTMLInputElement) {
            this.activeInput = activeElem;
        }
    }
    getActiveInput() {
        const activeElem = this.getActiveDomElement();
        if (activeElem instanceof HTMLInputElement) {
            return activeElem;
        }
        return this.activeInput;
    }
    check(e) {
        try {
            if (!e.isTrusted) {
                return;
            }
            const activeElem = this.getActiveDomElement();
            if (activeElem instanceof HTMLInputElement) {
                this.checkSetValidInput(activeElem);
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getActiveDomElement() {
        if (!document.activeElement) {
            return null;
        }
        return this.getActiveDomElementFn(document.activeElement);
    }
    getActiveDomElementFn(elem) {
        try {
            if (!elem) {
                return null;
            }
            const shadowRoot = csutil.dom.getShadowRoot(elem);
            if (shadowRoot) {
                return this.getActiveDomElementFn(shadowRoot.activeElement);
            }
            return elem;
        }
        catch (e) {
            logError(e);
            return elem;
        }
    }
    checkSetValidInput(input) {
        try {
            if (this.isValidInput(input)) {
                this.activeInput = input;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    isValidInput(input) {
        const validInputTypes = ["text", "email", "number", "password", "tel", "search"];
        const isValidInputType = validInputTypes.includes(input.type);
        return isValidInputType;
    }
}
