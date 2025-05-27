import { ActiveTabObserver } from "./ActiveTabObserver.js";
export class UrlChangeObserver {
    callback;
    static listen(callback) {
        new UrlChangeObserver(callback).init();
    }
    lastUrl = "";
    constructor(callback) {
        this.callback = callback;
    }
    init() {
        js.fn.bindThis(this, [this.handleTabChange]);
        ActiveTabObserver.listen(this.handleTabChange);
    }
    handleTabChange(tab) {
        if (!tab || tab.url == this.lastUrl) {
            return;
        }
        this.lastUrl = tab.url;
        this.callback(tab);
    }
}
