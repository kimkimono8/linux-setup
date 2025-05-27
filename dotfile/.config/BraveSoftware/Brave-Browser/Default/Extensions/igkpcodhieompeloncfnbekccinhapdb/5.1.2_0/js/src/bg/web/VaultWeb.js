import { context } from "./Context.js";
export class VaultWeb {
    afterUnlockRoute = "";
    async openWebUI({ newTab = false, route = "" } = {}) {
        try {
            this.afterUnlockRoute = route;
            if (newTab) {
                await this.openWebUINewTab();
                return;
            }
            await this.openExistingWebUI() || await this.openWebUINewTab();
        }
        catch (e) {
            logError(e);
        }
    }
    getAfterUnlockRoute() {
        return this.afterUnlockRoute;
    }
    async openWebUINewTab() {
        const vaultWebUrl = urlProvider.getVaultWebUrl();
        const tab = await brApi.tab.create(vaultWebUrl);
        context.webUnlock.setAllowedTabId(tab.id);
    }
    async openExistingWebUI() {
        const activeTab = await brApi.tab.getActiveTab();
        if (!activeTab) {
            return false;
        }
        if (!activeTab.url) {
            return false;
        }
        const tabUrl = new URL(activeTab.url);
        const vaultUrl = new URL(urlProvider.getVaultUrl());
        const vaultHost = vaultUrl.host;
        if (tabUrl.host != vaultHost ||
            !tabUrl.hash.includes("/unlock/")) {
            return false;
        }
        context.webUnlock.setAllowedTabId(activeTab.id);
        csApi.web.tryUnlock(activeTab.id);
        return true;
    }
}
