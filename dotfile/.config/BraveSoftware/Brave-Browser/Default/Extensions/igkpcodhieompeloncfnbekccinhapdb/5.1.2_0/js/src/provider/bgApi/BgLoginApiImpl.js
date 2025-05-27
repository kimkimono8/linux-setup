export class BgLoginApiImpl {
    context;
    prefix = "login.";
    constructor(context) {
        this.context = context;
    }
    async isLoggedIn() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isLoggedIn.name, args: [] });
    }
    async isUnlocked() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isUnlocked.name, args: [] });
    }
    async generateOauthTokens() {
        return this.context.apiClient.callApi({ path: this.prefix + this.generateOauthTokens.name, args: [] });
    }
    async refreshTokenIfExpired() {
        return this.context.apiClient.callApi({ path: this.prefix + this.refreshTokenIfExpired.name, args: [] });
    }
    async initLogin() {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.initLogin.name, args: [] }));
    }
    async unlock(passphrase) {
        return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name, args: [passphrase] });
    }
    async lock() {
        return this.context.apiClient.callApi({ path: this.prefix + this.lock.name, args: [] });
    }
    async signOut() {
        return this.context.apiClient.callApi({ path: this.prefix + this.signOut.name, args: [] });
    }
    async checkConnectable() {
        return this.context.apiClient.isConnectable();
    }
}
