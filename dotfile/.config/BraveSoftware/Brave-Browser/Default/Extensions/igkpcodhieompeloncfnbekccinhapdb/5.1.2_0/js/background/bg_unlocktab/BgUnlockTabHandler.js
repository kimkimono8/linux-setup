export class BgUnlockTabHandler {
    tabCreator = null;
    init() {
        try {
            this.tabCreator = bgUtil.newTabCreator({ tabName: "UNLOCK_TAB", url: "/html/unlockPage.html" });
        }
        catch (e) {
            logError(e);
        }
    }
    async create() {
        return this.tabCreator.createTab();
    }
    async close() {
        return this.tabCreator.close();
    }
}
