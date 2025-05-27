export class BgUnlockApiImpl {
    context;
    prefix = "unlock.";
    oneauth;
    webauthn;
    constructor(context) {
        this.context = context;
        this.oneauth = new BgOneAuthUnlockApiImpl(context);
        this.webauthn = new BgWebauthnUnlockApiImpl(context);
    }
    async getLastUsedUnlock() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getLastUsedUnlock.name });
    }
    async setLastUnlock(method) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setLastUnlock.name, args: [method] });
    }
}
class BgOneAuthUnlockApiImpl {
    context;
    prefix = "unlock.oneauth.";
    constructor(context) {
        this.context = context;
    }
    resendPush() {
        return this.context.apiClient.callApi({ path: this.prefix + this.resendPush.name });
    }
    async enable(enable) {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.enable.name, args: [enable] }));
    }
    isUnlockable() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isUnlockable.name });
    }
    unlock() {
        return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name });
    }
}
class BgWebauthnUnlockApiImpl {
    context;
    prefix = "unlock.webauthn.";
    constructor(context) {
        this.context = context;
    }
    async setWebAuthnCredential(credential) {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.setWebAuthnCredential.name, args: [credential] }));
    }
    async getCredentialCount() {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.getCredentialCount.name }));
    }
    async enable(enable) {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.enable.name, args: [enable] }));
    }
    isUnlockable() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isUnlockable.name });
    }
    unlock() {
        return this.context.apiClient.callApi({ path: this.prefix + this.unlock.name });
    }
}
