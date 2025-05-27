export class CredentialGetter {
    tabCreator = null;
    init() {
        this.tabCreator = bgUtil.newTabCreator({ tabName: "WEBAUTHN_TAB" });
    }
    async getCredential(challenge, credentialIds) {
        try {
            const tab = (await this.tabCreator.create(urlProvider.getVaultUrl() + "/extension/unlock")).result;
            csApi.webauthnUnlock.getCredential(challenge, credentialIds, tab.id);
        }
        catch (e) {
            logError(e);
        }
    }
    closeTab() {
        return this.tabCreator.close();
    }
}
