import { UnlockMethod } from "../../service/bgApi/types.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { GG } from "./GG.js";
import { OneauthUnlockImpl } from "./oneauth/OneauthUnlock.js";
import { PassphraseUnlockImpl } from "./passphrase/PassphraseUnlock.js";
import { UnlockUtil } from "./UnlockUtil.js";
import { WebauthnUnlockImpl } from "./webauthn/WebauthnUnlock.js";
export class UnlockImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new UnlockImpl();
    }
    gg = new GG(this);
    passphrase = new PassphraseUnlockImpl(this.gg);
    oneauth = new OneauthUnlockImpl(this.gg);
    webauthn = new WebauthnUnlockImpl(this.gg);
    constructor() { }
    init() {
        try {
            const gg = this.gg;
            gg.util = new UnlockUtil();
            this.passphrase.init();
            this.oneauth.init();
            this.webauthn.init();
        }
        catch (e) {
            logError(e);
        }
    }
    async setLastUnlockMethod(method) {
        await zlocalStorage.save(LocalStorageKeys.LAST_USED_UNLOCK, method);
    }
    async getLastUnlockMethod() {
        return zlocalStorage.load(LocalStorageKeys.LAST_USED_UNLOCK, UnlockMethod.MASTER);
    }
}
