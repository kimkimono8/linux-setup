import { zicon } from "./Context.js";
export class ZIconEventEmitter {
    visibilityObserver = null;
    init() {
        try {
            js.fn.bindThis(this, [this.clickedDocument, this.handleAnimationEnd, this.handlePreventedRightClick,
                this.handleFocusin,
            ]);
            this.initVisibilityObserver();
            this.addDomListeners();
            this.addMutationListener();
            csutil.input.waitForVisibleInput({ shadowRoot: false }).then(() => this.listener());
            info("ZICON:", "zicon event emitter initialized");
        }
        catch (e) {
            logError(e);
        }
    }
    initVisibilityObserver() {
        this.visibilityObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
            root: null,
            threshold: 0.8
        });
        const existingPasswords = csutil.input.getPasswords({ shadowRoot: false });
        this.addVisibleObserver(existingPasswords);
    }
    addDomListeners() {
        document.addEventListener("click", this.clickedDocument, true);
        document.addEventListener("contextmenu", this.clickedDocument, true);
        document.addEventListener("contextmenu", this.handlePreventedRightClick);
        document.addEventListener("focusin", this.handleFocusin, true);
        document.addEventListener("animationend", this.handleAnimationEnd, true);
    }
    async handleAnimationEnd(e) {
        const elem = e.target;
        if (elem.querySelector("input")) {
            this.listener();
        }
    }
    addMutationListener() {
        const mutationObserver = new MutationObserver(this.handleMutation.bind(this));
        mutationObserver.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    async clickedDocument() {
        this.listener();
        await js.time.delay(1);
        this.listener();
    }
    handleMutation(mutationRecords) {
        try {
            for (let record of mutationRecords) {
                for (let newNode of Array.from(record.addedNodes)) {
                    if (!(newNode instanceof HTMLElement)) {
                        continue;
                    }
                    this.addVisibleObserver(csutil.input.getPasswords({ container: newNode, shadowRoot: false }));
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async handleIntersection(entries) {
        for (let entry of entries) {
            if (!entry.isIntersecting || !csutil.isVisible(entry.target)) {
                continue;
            }
            this.listener();
        }
    }
    addVisibleObserver(passwordInputs) {
        try {
            for (let passwordInput of passwordInputs) {
                this.visibilityObserver.observe(passwordInput);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async handlePreventedRightClick(e) {
        try {
            if (!zicon.loggedIn) {
                return;
            }
            if (!e.isTrusted || !e.defaultPrevented) {
                return;
            }
            const input = csutil.dom.getEventTargetInput(e);
            if (!input) {
                return;
            }
            await zicon.addForContextMenuUsedInput(input);
        }
        catch (e) {
            logError(e);
        }
    }
    handleFocusin() {
        this.listener();
    }
    listener() {
        zicon.checker.check();
    }
}
