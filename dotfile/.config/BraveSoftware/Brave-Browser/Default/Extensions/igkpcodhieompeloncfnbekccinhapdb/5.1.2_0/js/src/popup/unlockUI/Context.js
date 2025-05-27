import { UnlockOrUI } from "./unlockOr/UnlockOrUI.js";
import { UnlockUI } from "./UnlockUI.js";
import { OneAuthUI } from "./oneauth/OneauthUI.js";
import { PassphraseUI } from "./passphrase/PassphraseUI.js";
import { WebauthnUI } from "./webauthn/WebauthnUI.js";
class Context {
    unlockUI;
    passphraseUI;
    oneauthUI;
    unlockOrUI;
    webauthnUI;
    init() {
        this.unlockUI = new UnlockUI();
        this.passphraseUI = new PassphraseUI();
        this.oneauthUI = new OneAuthUI();
        this.unlockOrUI = new UnlockOrUI();
        this.webauthnUI = new WebauthnUI();
    }
}
export const context = new Context();
