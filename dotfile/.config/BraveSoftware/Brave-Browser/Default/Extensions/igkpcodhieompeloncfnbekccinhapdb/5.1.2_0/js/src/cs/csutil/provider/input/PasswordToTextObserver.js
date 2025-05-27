export class PasswordToTextObserver {
    listener;
    constructor(listener) {
        this.listener = listener;
    }
    init() {
        try {
            js.fn.bindThis(this, [this.handleMutation]);
            const observer = new MutationObserver(this.handleMutation);
            observer.observe(document.body || document.documentElement, {
                attributeFilter: ["type"],
                subtree: true,
                attributeOldValue: true
            });
        }
        catch (e) {
            logError(e);
        }
    }
    handleMutation(mutations, _observer) {
        let reqMutation = false;
        for (let mutation of mutations) {
            reqMutation = (mutation.target instanceof HTMLInputElement) && (mutation.oldValue == "password");
            if (!reqMutation) {
                continue;
            }
            this.listener(mutation.target);
        }
    }
}
