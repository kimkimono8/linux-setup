import { unlock } from "../Context.js";
export class BgUnlockApiImpl {
    oneauth = new BgOneAuthUnlockApiImpl();
    webauthn = new BgWebauthnUnlockApiImpl();
    async setLastUnlock(method) {
        return unlock.setLastUnlockMethod(method);
    }
    async getLastUsedUnlock() {
        return unlock.getLastUnlockMethod();
    }
}
class BgOneAuthUnlockApiImpl {
    resendPush() {
        return unlock.oneauth.resendPush();
    }
    enable(enable) {
        return unlock.oneauth.enable(enable);
    }
    isUnlockable() {
        return unlock.oneauth.isUnlockable();
    }
    unlock() {
        return unlock.oneauth.unlock();
    }
}
class BgWebauthnUnlockApiImpl {
    setWebAuthnCredential(credential) {
        return unlock.webauthn.setCredential(fnOut.parse(credential));
    }
    getCredentialCount() {
        return unlock.webauthn.getCredentialCount();
    }
    enable(enable) {
        return unlock.webauthn.enable(enable);
    }
    isUnlockable() {
        return unlock.webauthn.isUnlockable();
    }
    unlock() {
        return unlock.webauthn.unlock();
    }
}
