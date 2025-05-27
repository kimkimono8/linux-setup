export class BgVaultWebApiImpl {
    context;
    prefix = "vaultWeb.";
    constructor(context) {
        this.context = context;
    }
    async syncSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.syncSecret.name, args: [secretId] });
    }
    async deleteLocalSecrets(secretIds) {
        return this.context.apiClient.callApi({ path: this.prefix + this.deleteLocalSecrets.name, args: [secretIds] });
    }
    async getWebUnlockKey() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getWebUnlockKey.name });
    }
    async getAfterUnlockRoute() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getAfterUnlockRoute.name });
    }
}
