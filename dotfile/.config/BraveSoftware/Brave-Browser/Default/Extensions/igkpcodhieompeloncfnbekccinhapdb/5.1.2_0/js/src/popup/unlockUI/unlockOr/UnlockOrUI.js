import { VaultCSS } from "../../../service/VUi/VaultCSS.js";
import { context } from "../Context.js";
import { UnlockOrUIElem } from "./UnlockOrUIElem.js";
export class UnlockOrUI {
    oneauthUnlockable = false;
    webauthnUnlockable = false;
    elem;
    async init() {
        this.elem = new UnlockOrUIElem();
        this.elem.init();
        this.addListeners();
        this.oneauthUnlockable = await bgApi.unlock.oneauth.isUnlockable();
        ;
        this.webauthnUnlockable = await bgApi.unlock.webauthn.isUnlockable();
        js.dom.setContent(context.unlockUI.elem.unlockOrOut, this.elem.container);
    }
    showUI({ passphraseUI = false, oneauthUI = false, webauthnUI = false }) {
        const unlockable = this.oneauthUnlockable || this.webauthnUnlockable;
        this.elem.container.classList.toggle(VaultCSS.DIS_HIDE, !unlockable);
        if (!unlockable) {
            return;
        }
        this.elem.passphraseButton.classList.toggle(VaultCSS.DIS_HIDE, passphraseUI);
        this.elem.oneauthButton.classList.toggle(VaultCSS.DIS_HIDE, oneauthUI || !this.oneauthUnlockable);
        this.elem.webauthnButton.classList.toggle(VaultCSS.DIS_HIDE, webauthnUI || !this.webauthnUnlockable);
    }
    addListeners() {
        this.elem.oneauthButton.addEventListener("click", () => context.oneauthUI.showUI({ unlockClicked: true }));
        this.elem.passphraseButton.addEventListener("click", () => context.passphraseUI.showUI());
        this.elem.webauthnButton.addEventListener("click", () => context.webauthnUI.showUI({ unlockClicked: true }));
    }
}
