import { zt } from "../../../../../ztab/zt.js";
import { UIUtil1 } from "../../../../common/common.js";
import { VaultApiParamRegex, VaultApiParamUtil } from "../../../../common/vault/VaultApiParamUtil.js";
import { ThirdPartyShareInput } from "../../../../service/bgApi/types.js";
import { LocalStorageKeys } from "../../../../service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../../service/vt/VI18n.js";
import { PasswordShareController } from "../PasswordShareController.js";
import { ThirdPartyShareOutputProvider, ThirdParty_OutputUIElem, ThirdParty_UIElem as UI_ELEM } from "./If_ThirdPartyShareUI.js";
import { ThirdPartyShareUI } from "./ThirdPartyShareUI.js";
export class ThirdPartyShareController {
    static instance = null;
    static get inst() {
        if (!this.instance) {
            this.instance = new ThirdPartyShareController();
        }
        return this.instance;
    }
    secretId = "";
    ui = null;
    sharingRestricted = false;
    initPromise = null;
    async init(secretId) {
        try {
            this.initPromise = js.promise.createNew();
            this.secretId = secretId;
            this.ui = null;
            await bgApi.vault.syncConfig();
            this.sharingRestricted = !(await zlocalStorage.load(LocalStorageKeys.ALLOW_THIRD_PARTY_SHARING, true));
            PasswordShareController.getUI().onThirdPartyShareClick(() => this.onShareInput());
            this.initPromise.resolve();
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI() {
        try {
            if (this.ui == null) {
                this.ui = ThirdPartyShareUI.createInstance();
            }
            this.ui.setUIContent();
            if (this.initPromise) {
                await this.initPromise;
            }
            if (this.sharingRestricted) {
                this.ui.showRestrictedUI();
                return;
            }
            this.ui.showUI();
        }
        catch (e) {
            logError(e);
        }
    }
    beforeExit() {
        PasswordShareController.getUI().hideThirdPartyShareButton();
    }
    async onShareInput() {
        const email = this.getEmail();
        if (email == null) {
            return;
        }
        const message = this.getMessage();
        if (message == null) {
            return;
        }
        const shareInput = new ThirdPartyShareInput();
        shareInput.secretId = this.secretId;
        shareInput.thirdPartyEmail = email;
        shareInput.allowedTime = +this.ui.getValue(UI_ELEM.TIME);
        shareInput.message = message;
        const shareOutput = await this.shareToThirdParty(shareInput);
        PasswordShareController.hideUI();
        this.showOutput(shareInput, shareOutput);
    }
    async shareToThirdParty(input) {
        zt.mainUI.showDotLoading();
        try {
            return await bgApi.secret.share.shareToThirdParty(input);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    getEmail() {
        const email = this.ui.getValue(UI_ELEM.EMAIL);
        if (email.length == 0) {
            this.ui.setErrorMessage(UI_ELEM.EMAIL, i18n(VI18N.PLEASE_ENTER_AN_EMAIL));
            return null;
        }
        if (!VaultApiParamUtil.checkParam(VaultApiParamRegex.EMAIL, email)) {
            this.ui.setErrorMessage(UI_ELEM.EMAIL, i18n(VI18N.INVALID_EMAIL_ADDRESS));
            return null;
        }
        return email;
    }
    getMessage() {
        const message = this.ui.getValue(UI_ELEM.MESSAGE);
        if (!message) {
            return "";
        }
        const isValidMessage = VaultApiParamUtil.checkParam(VaultApiParamRegex.CLEAR_TEXT, message);
        if (isValidMessage) {
            return message;
        }
        const invalidChars = VaultApiParamUtil.getInvalidChars(VaultApiParamRegex.CLEAR_TEXT, message);
        this.ui.setErrorMessage(UI_ELEM.MESSAGE, UIUtil1.getMustNotContain(i18n(VI18N.MESSAGE), invalidChars));
        return null;
    }
    showOutput(input, output) {
        try {
            if (!output.ok) {
                VUI.notification.showError(output.error);
                return;
            }
            const shareOutput = output.result;
            const ui = ThirdPartyShareOutputProvider.createInstance();
            const timeString = UIUtil1.convertMinuteToUIString(input.allowedTime);
            ui.setText(ThirdParty_OutputUIElem.SHARED_MSG, i18n(VI18N.THIRD_PARTY_SHARED_OUTPUT, input.thirdPartyEmail, timeString));
            ui.setText(ThirdParty_OutputUIElem.ENCRYPTION_KEY, shareOutput.passphrase);
            ui.onCopyInput(function () {
                js.dom.copyToClipboard(shareOutput.passphrase);
                VUI.notification.showSuccess(i18n(VI18N.COPIED), 1.5);
            });
            ui.showUI();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
    }
}
