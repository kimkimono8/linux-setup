import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { SFPasswordCli } from "../passwords_ui/password/SFPasswordCli.js";
export class SFMainCli {
    static instance = null;
    constructor() { }
    static get inst() {
        return this.instance || (this.instance = new SFMainCli());
    }
    async openUnlockPage() {
        try {
            await bgApi.siteFrame.openUnlockVaultPage();
        }
        catch (e) {
            logError(e);
        }
    }
    async isUnlocked() {
        return await bgApi.login.isUnlocked();
    }
    async addPassword() {
        await bgApi.siteFrame.addPassword(await SFPasswordCli.inst.getActiveFrameId());
    }
    async checkAddPasswordAllowed() {
        try {
            return await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
}
