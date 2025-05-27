import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
const DEFAULT_DP = "/images/user/profile.svg";
export class _ProfilePanelCli {
    signOut() {
        return bgApi.vault.signOut();
    }
    openHelp() {
        brApi.tab.createNormalTab("https://help.zoho.com/portal/en/kb/vault/browser-extension-and-mobile-apps/articles/vault-browser-extension");
    }
    openVideos() {
        brApi.tab.createNormalTab("https://www.zoho.com/vault/videos.html");
    }
    shareFeedback() {
        brApi.tab.createNormalTab("https://www.zoho.com/vault/contactus.html");
    }
    static instance = null;
    static get inst() {
        return this.instance || (this.instance = new _ProfilePanelCli());
    }
    lock() {
        return bgApi.vault.lock();
    }
    async getNameEmail() {
        let existing = {
            [LocalStorageKeys.USERNAME]: "",
            [LocalStorageKeys.EMAIL]: ""
        };
        existing = await zlocalStorage.loadAll(existing);
        return {
            name: existing[LocalStorageKeys.USERNAME],
            email: existing[LocalStorageKeys.EMAIL]
        };
    }
    getInitialDp() {
        try {
            return js.selector.select(`[data-name="dp"]`).src;
        }
        catch (e) {
            logError(e);
            return DEFAULT_DP;
        }
    }
    async getDp() {
        try {
            return await bgApi.user.getDpSized(120);
        }
        catch (e) {
            logError(e);
            return DEFAULT_DP;
        }
    }
}
