import { i18n } from "../../../provider/vt/i18n.js";
import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
import { VtErrorCode } from "../../../service/vt/constants/ErrorCode.js";
import { VI18N } from "../../../service/vt/VI18n.js";
import { pp } from "../../pp.js";
import { AccountsErrorUIElem } from "./AccountsErrorUIElem.js";
export class AccountsErrorUI {
    elem;
    constructor() { }
    init() {
        this.elem = new AccountsErrorUIElem();
    }
    async showError(errorCode) {
        try {
            this.init();
            this.elem.init();
            this.addListeners();
            await this.showUserInfo();
            js.dom.setText(this.elem.errorMsg, this.getErrorMsg(errorCode));
            this.showAction(errorCode);
            js.dom.setContent("#output", this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.signoutButton.addEventListener("click", () => this.signOut());
        }
        catch (e) {
            logError(e);
        }
    }
    async showUserInfo() {
        try {
            const data = await zlocalStorage.loadAll({
                [LocalStorageKeys.USERNAME]: "",
                [LocalStorageKeys.EMAIL]: "",
            });
            js.dom.setText(this.elem.usernameElem, data[LocalStorageKeys.USERNAME]);
            js.dom.setText(this.elem.emailElem, data[LocalStorageKeys.EMAIL]);
            bgApi.user.getDp().then(dp => this.elem.dpImg.src = dp);
        }
        catch (e) {
            logError(e);
        }
    }
    getErrorMsg(errorCode) {
        try {
            switch (errorCode) {
                case VtErrorCode.NEED_SIGN_UP:
                    return i18n(VI18N.SIGNUP_FOR_VAULT);
                default:
                    return errorCode;
            }
        }
        catch (e) {
            logError(e);
            return errorCode;
        }
    }
    showAction(errorCode) {
        try {
            switch (errorCode) {
                case VtErrorCode.NEED_SIGN_UP:
                    js.dom.setText(this.elem.actionButton, i18n(VI18N.SIGN_UP));
                    this.elem.actionButton.addEventListener("click", function () {
                        bgApi.vault.openWebUI();
                        js.dom.closeWindow();
                    });
                    return;
                default:
                    this.elem.actionButton.addEventListener("click", () => window.location.reload());
            }
        }
        catch (e) {
            logError(e);
        }
    }
    signOut() {
        try {
            bgApi.login.signOut();
            pp.mainUI.closeUI();
        }
        catch (e) {
            logError(e);
        }
    }
}
