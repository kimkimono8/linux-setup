import { UnlockMethod } from "../../../service/bgApi/types.js";
import { SessionStorageKeys } from "../../../service/storage/constants/SessionStorageKeys.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { VaultCSS } from "../../../service/VUi/VaultCSS.js";
import { pp } from "../../pp.js";
import { context } from "../Context.js";
import { OneauthUIElem } from "./OneauthUIElem.js";
export class OneAuthUI {
    elem;
    async showUI({ unlockClicked = false } = {}) {
        this.elem = new OneauthUIElem();
        this.elem.init();
        this.addListeners();
        if (await this.isUnlockInProgress()) {
            this.showLoading();
            this.elem.resendPushButton.classList.remove(VaultCSS.DIS_HIDE);
        }
        if (unlockClicked) {
            this.unlock();
        }
        context.unlockOrUI.showUI({ oneauthUI: true });
        js.dom.setContent(context.unlockUI.elem.unlockOut, this.elem.container);
    }
    oneAuthPushSent() {
        VUI.notification.showSuccess(i18n(VI18N.PUSH_SENT_SUCCESS));
        this.elem.resendPushButton.classList.remove(VaultCSS.DIS_HIDE);
    }
    oneAuthUnlockComplete(resp) {
        if (resp.ok) {
            pp.mainUI.showUI();
            return;
        }
        switch (resp.error) {
            case "DENIED":
                context.passphraseUI.showUI();
                break;
            default:
                VUI.notification.showError(i18n(VI18N.ONEAUTH_UNLOCK_FAILED));
                context.passphraseUI.showUI();
                console.info(resp.error);
                break;
        }
    }
    addListeners() {
        this.elem.unlockElem.addEventListener("click", () => this.unlock());
        this.elem.resendPushButton.addEventListener("click", () => bgApi.unlock.oneauth.resendPush());
    }
    async isUnlockInProgress() {
        const lastStarted = await zsessionStorage.load(SessionStorageKeys.ONEAUTH_UNLOCK_STARTED, 0);
        const secondsPassed = js.time.getSecondsPassed(lastStarted);
        return secondsPassed <= 60;
    }
    unlock() {
        bgApi.unlock.setLastUnlock(UnlockMethod.ONEAUTH);
        this.showLoading();
        bgApi.unlock.oneauth.unlock();
    }
    showLoading() {
        this.elem.unlockElem.classList.add(VaultCSS.DIS_HIDE);
        this.elem.loadingElem.classList.remove(VaultCSS.DIS_HIDE);
    }
}
