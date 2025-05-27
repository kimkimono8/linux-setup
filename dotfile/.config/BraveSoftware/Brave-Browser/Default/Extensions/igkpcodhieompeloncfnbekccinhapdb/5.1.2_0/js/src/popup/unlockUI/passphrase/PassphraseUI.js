import { uiUtilOld } from "../../../../common/ui/ui_util.js";
import { UnlockMethod } from "../../../service/bgApi/types.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { pp } from "../../pp.js";
import { context } from "../Context.js";
import { PassphraseUIElem } from "./PassphraseUIElem.js";
export class PassphraseUI {
    elem;
    showUI() {
        this.elem = new PassphraseUIElem();
        this.elem.init();
        this.addListeners();
        bgApi.unlock.setLastUnlock(UnlockMethod.MASTER);
        context.unlockOrUI.showUI({ passphraseUI: true });
        js.dom.setContent(context.unlockUI.elem.unlockOut, this.elem.container);
    }
    addListeners() {
        this.elem.openButton.addEventListener("click", () => this.unlock());
        this.elem.showHideButton.addEventListener("click", e => uiUtilOld.clickedShowHidePassphrase(e));
        const input = this.elem.passphraseElem;
        input.addEventListener("focus", function () {
            js.selector.closest(input, "div.form-group").classList.add("active");
        });
        input.addEventListener("blur", function () {
            if (!input.value) {
                js.selector.closest(input, "div.form-group").classList.remove("active");
            }
        });
        js.event.onEnter(input, () => this.unlock());
        input.addEventListener("keyup", (e) => {
            if (e.key != "Enter") {
                js.dom.hideOld(this.elem.errorMsgElem);
            }
        });
        if (globalThis.sidePanel) {
            document.documentElement.addEventListener("click", function () {
                js.selector.select("#input_passphrase")?.focus?.();
            }, { once: true });
        }
    }
    async unlock() {
        const passphraseElem = this.elem.passphraseElem;
        const passphrase = passphraseElem.value;
        if (!passphrase) {
            passphraseElem.focus();
            return;
        }
        passphraseElem.blur();
        const showLoadingTimeout = setTimeout(() => context.unlockUI.showLoading(true), 300);
        const unlockResult = await bgApi.login.unlock(passphrase);
        const unlocked = unlockResult.unlocked;
        clearTimeout(showLoadingTimeout);
        if (!unlocked) {
            this.showErrorMessage(unlockResult);
            context.unlockUI.showLoading(false);
            passphraseElem.focus();
            return;
        }
        this.clearPassphraseBeforeLogin();
        context.unlockUI.showLoading(true);
        pp.mainUI.showUI();
    }
    clearPassphraseBeforeLogin() {
        this.elem.passphraseElem.type = "password";
        this.elem.passphraseElem.value = "";
        this.elem.eyeIconElem.className = "icon-view";
    }
    showErrorMessage(unlockResult) {
        try {
            js.dom.setText(this.elem.errorMsgElem, this.getUnlockErrorMessage(unlockResult));
            js.dom.showOld(this.elem.errorMsgElem);
        }
        catch (e) {
            logError(e);
        }
    }
    getUnlockErrorMessage(unlockResult) {
        try {
            if (unlockResult.attemptsRemaining > 3) {
                return i18n(VI18N.INVALID_MASTER_PASSWORD);
            }
            return i18n(VI18N.INVALID_MASTER_PASSWORD_N_REMAINING, unlockResult.attemptsRemaining);
        }
        catch (e) {
            logError(e);
            return i18n(VI18N.INVALID_MASTER_PASSWORD);
        }
    }
}
