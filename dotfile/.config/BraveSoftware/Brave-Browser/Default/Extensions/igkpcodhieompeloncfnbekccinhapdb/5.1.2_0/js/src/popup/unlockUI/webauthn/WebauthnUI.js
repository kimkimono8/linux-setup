import { VI18N } from "../../../service/vt/VI18n.js";
import { VaultCSS } from "../../../service/VUi/VaultCSS.js";
import { pp } from "../../pp.js";
import { context } from "../Context.js";
import { WebauthnUIElem } from "./WebauthnUIElem.js";
export class WebauthnUI {
    elem;
    showUI({ unlockClicked = false } = {}) {
        this.elem = new WebauthnUIElem();
        this.elem.init();
        this.addListeners();
        if (unlockClicked) {
            this.unlock();
        }
        context.unlockOrUI.showUI({ webauthnUI: true });
        js.dom.setContent(context.unlockUI.elem.unlockOut, this.elem.container);
    }
    webauthnUnlockComplete(resp) {
        if (resp.ok) {
            pp.mainUI.showUI();
            return;
        }
        VUI.notification.showError(i18n(VI18N.ONEAUTH_UNLOCK_FAILED));
        context.passphraseUI.showUI();
        console.info(resp.error);
    }
    addListeners() {
        this.elem.unlockElem.addEventListener("click", () => this.unlock());
    }
    async unlock() {
        this.elem.unlockElem.classList.add(VaultCSS.DIS_HIDE);
        this.elem.loadingElem.classList.remove(VaultCSS.DIS_HIDE);
        await bgApi.unlock.webauthn.unlock();
    }
}
