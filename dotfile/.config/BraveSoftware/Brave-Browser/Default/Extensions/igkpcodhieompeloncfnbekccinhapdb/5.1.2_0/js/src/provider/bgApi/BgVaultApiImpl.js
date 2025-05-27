export class BgVaultApiImpl {
    context;
    prefix = "vault.";
    constructor(context) {
        this.context = context;
    }
    async openWebUI({ route = "" } = {}) {
        return this.context.apiClient.callApi({ path: this.prefix + this.openWebUI.name, args: [{ route }] });
    }
    async sync() {
        return this.context.apiClient.callApi({ path: this.prefix + this.sync.name });
    }
    async getUrl() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getUrl.name });
    }
    async getDomain() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getDomain.name });
    }
    async lock() {
        return this.context.apiClient.callApi({ path: this.prefix + this.lock.name });
    }
    async signOut() {
        return this.context.apiClient.callApi({ path: this.prefix + this.signOut.name });
    }
    async syncConfig() {
        return this.context.apiClient.callApi({ path: this.prefix + this.syncConfig.name });
    }
    async syncThemeFromWeb() {
        return this.context.apiClient.callApi({ path: this.prefix + this.syncThemeFromWeb.name });
    }
}
