export class ActiveTabObserver {
    callback;
    constructor(callback) {
        this.callback = callback;
    }
    static listen(callback) {
        new ActiveTabObserver(callback).init();
    }
    init() {
        js.fn.bindThis(this, [this.callCallback, this.tabUpdated]);
        brApi.tab.onTabActivate(this.callCallback);
        brApi.tab.onWindowFocus(this.callCallback);
        brApi.tab.onTabUpdate(this.tabUpdated);
    }
    tabUpdated(_tabId, changeInfo, tab) {
        if (!tab.active || !changeInfo.url) {
            return;
        }
        this.callCallback();
    }
    async callCallback() {
        const activeTab = await brApi.tab.getActiveTab();
        await this.callback(activeTab);
    }
}
