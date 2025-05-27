import { bg } from "../bg.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgZTabApiImpl {
    async openZTab() {
        bg.ztabHandler.openZTab();
    }
    async closeZTab(port) {
        bg.ztabHandler.closeZTabFromId(ApiServerUtil.getTabId(port));
    }
    async addAddress() {
        bg.ztabHandler.addAddress();
    }
    async addPassword(prefillInput) {
        bg.ztabHandler.addPassword(prefillInput);
    }
    async addPaymentCard(prefillInput) {
        bg.ztabHandler.addPaymentCard(prefillInput);
    }
    async editPaymentCard(prefillInput, secretId) {
        bg.ztabHandler.editPaymentCard(prefillInput, secretId);
    }
    async sharePassword(secretId) {
        bg.ztabHandler.sharePassword(secretId);
    }
    async editPassword(secretId) {
        bg.ztabHandler.editPassword(secretId);
    }
    async enableAccessControl(secretId) {
        bg.ztabHandler.enableAccessControl(secretId);
    }
    async manageAccessControl(secretId) {
        bg.ztabHandler.manageAccessControl(secretId);
    }
    async saveGeneratedPassword(password) {
        bg.ztabHandler.saveGeneratedPassword(password);
    }
    async getZTabTask() {
        return bg.ztabHandler.getRemovePendingZTabTask();
    }
    async getSecretAccess(secretId) {
        return bg.ztabHandler.getSecretAccess(secretId);
    }
    async openSettings() {
        bg.ztabHandler.openSettings();
    }
}
