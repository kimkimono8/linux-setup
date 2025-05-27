import { bg } from "../bg.js";
export class BgAccessCtrlApiImpl {
    async update(apiInput) {
        return bg.vaultSecrets.accessControl.updateAccessControl(apiInput);
    }
    async getAccessCtrlSettings(secretId) {
        return bg.vaultSecrets.accessControl.getSecretAccessControlSettings(secretId);
    }
    async createRequest(input) {
        return bg.vaultSecrets.accessControl.createAccessRequest(input);
    }
    async getAccessPendingUIInfo(accessRequestId) {
        return bg.vaultSecrets.accessControl.getPendingAccessRequestUIInfo(accessRequestId);
    }
    async cancel(accessRequestId) {
        return bg.vaultSecrets.accessControl.cancelAccessRequest(accessRequestId);
    }
    async checkout(accessRequestId, secretId) {
        return bg.vaultSecrets.accessControl.checkoutSecret(accessRequestId, secretId);
    }
    async checkin(secretId) {
        return bg.vaultSecrets.accessControl.checkinSecret(secretId);
    }
    async disable(secretId) {
        return bg.vaultSecrets.accessControl.disable(secretId);
    }
    async isHelpdeskEnabled(secretId) {
        return bg.vaultSecrets.accessControl.isHelpdeskEnabled(secretId);
    }
}
