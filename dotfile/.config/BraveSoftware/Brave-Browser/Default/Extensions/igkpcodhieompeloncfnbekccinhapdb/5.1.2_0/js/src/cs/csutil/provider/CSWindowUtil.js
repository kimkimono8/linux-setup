export class CSWindowUtilImpl {
    respPromise = js.promise.createNew();
    listenWindowEvents = [
        "click", "mouseover", "contextmenu", "resize"
    ];
    init() {
        this.check = js.fn.wrapper.createSingleInstListener(this.check, this);
    }
    async waitForValidWindow() {
        try {
            if (this.isValidWindow()) {
                return;
            }
            this.init();
            this.addListeners();
            return this.respPromise;
        }
        catch (e) {
            logError(e);
        }
    }
    isTopFrame() {
        try {
            return window == window.top;
        }
        catch (e) {
            return false;
        }
    }
    addListeners() {
        for (let eventName of this.listenWindowEvents) {
            window.addEventListener(eventName, this.check);
        }
    }
    removeListeners() {
        for (let eventName of this.listenWindowEvents) {
            window.removeEventListener(eventName, this.check);
        }
    }
    check() {
        const valid = this.isValidWindow();
        if (!valid) {
            return;
        }
        this.respPromise.resolve();
        this.removeListeners();
    }
    isValidWindow() {
        return this.isTopFrame() ||
            document.documentElement.clientWidth * document.documentElement.clientHeight >= 9000;
    }
}
