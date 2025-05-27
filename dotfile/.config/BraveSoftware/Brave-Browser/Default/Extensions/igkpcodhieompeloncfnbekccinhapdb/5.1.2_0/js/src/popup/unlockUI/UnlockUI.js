import { UnlockMethod } from "../../service/bgApi/types.js";
import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
import { pp } from "../pp.js";
import { context } from "./Context.js";
import { UnlockUIElem } from "./UnlockUIElem.js";
export class UnlockUI {
    elem;
    async showUI() {
        this.elem = new UnlockUIElem();
        this.elem.init();
        const username = await zlocalStorage.load(LocalStorageKeys.USERNAME, "");
        js.dom.setText(this.elem.usernameSpan, username);
        bgApi.user.getDp().then(dp => this.elem.dpImg.src = dp);
        this.elem.signoutButton.addEventListener("click", this.signout);
        await context.unlockOrUI.init();
        await this.showUnlockMethod();
        js.dom.setContent("#output", this.elem.container);
    }
    showLoading(show) {
        js.dom.showIf(show, this.elem.loadingElem);
    }
    async showUnlockMethod() {
        try {
            const existingError = await zsessionStorage.load(SessionStorageKeys.POPUP_UNLOCK_ERROR);
            if (existingError) {
                this.handleUnlockError(existingError);
                context.passphraseUI.showUI();
                return;
            }
            const lastUsedMethod = await bgApi.unlock.getLastUsedUnlock();
            if (lastUsedMethod == UnlockMethod.MASTER) {
                context.passphraseUI.showUI();
                return;
            }
            if (lastUsedMethod == UnlockMethod.ONEAUTH && await bgApi.unlock.oneauth.isUnlockable()) {
                context.oneauthUI.showUI();
                return;
            }
            if (lastUsedMethod == UnlockMethod.WEBAUTHN && await bgApi.unlock.webauthn.isUnlockable()) {
                context.webauthnUI.showUI();
                return;
            }
        }
        catch (e) {
            logError(e);
        }
        context.passphraseUI.showUI();
    }
    handleUnlockError(error) {
        try {
            zsessionStorage.remove(SessionStorageKeys.POPUP_UNLOCK_ERROR);
            if (Date.now() > error.validUpto) {
                return;
            }
            switch (error.type) {
                case UnlockMethod.ONEAUTH:
                    context.oneauthUI.oneAuthUnlockComplete(error.resp);
                    break;
                case UnlockMethod.WEBAUTHN:
                    context.webauthnUI.webauthnUnlockComplete(error.resp);
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    signout() {
        bgApi.login.signOut();
        pp.mainUI.closeUI();
    }
}
