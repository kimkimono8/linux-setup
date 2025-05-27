import { TabDomainStorageKeys } from "../../src/service/storage/constants/TabDomainStorageKeys.js";
class LoginPasswordFillInfo {
    secretId = "";
    observedInputSelector = null;
    filledPassword = "";
    updatedPassword = "";
    fieldName = "";
}
export class LoginPasswordChangeHandler {
    fillInfo = null;
    passwordInput = null;
    saveDisabled = false;
    async init() {
        try {
            js.fn.bindThis(this, [this.inputValueChanged]);
            this.fillInfo = await ztabDomainStorage.load(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO, null);
            this.addChangeListener();
            await this.finishSave();
        }
        catch (e) {
            logError(e);
        }
    }
    async checkPasswordChange(secretId, passwordInput, fieldName) {
        try {
            info(LoginPasswordChangeHandler.name, "checking password change: ", passwordInput);
            const selector = csutil.uniqSelector.getSelector(passwordInput);
            this.fillInfo = {
                secretId,
                filledPassword: passwordInput.value,
                observedInputSelector: selector,
                updatedPassword: "",
                fieldName
            };
            this.passwordInput = passwordInput;
            this.addInputChangeListener(passwordInput);
            await ztabDomainStorage.save(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO, this.fillInfo);
        }
        catch (e) {
            logError(e);
        }
    }
    async disableSave() {
        try {
            this.saveDisabled = true;
            this.clear();
        }
        catch (e) {
            logError(e);
        }
    }
    addInputChangeListener(input) {
        try {
            if (input.getRootNode() == document) {
                return;
            }
            input.removeEventListener("change", this.inputValueChanged);
            input.addEventListener("change", this.inputValueChanged);
        }
        catch (e) {
            logError(e);
        }
    }
    async inputValueChanged(e) {
        try {
            if (this.saveDisabled) {
                return;
            }
            if (!this.fillInfo) {
                return;
            }
            if (!e.isTrusted) {
                return;
            }
            const curInput = csutil.dom.getEventTargetInput(e);
            if (!curInput) {
                return;
            }
            if (!this.passwordInput || this.passwordInput != curInput) {
                return;
            }
            if (this.fillInfo.observedInputSelector && (csutil.uniqSelector.select(this.fillInfo.observedInputSelector) != curInput)) {
                return;
            }
            const newValue = curInput.value;
            if (newValue == this.fillInfo.filledPassword) {
                return;
            }
            this.fillInfo.updatedPassword = newValue;
            await ztabDomainStorage.save(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO, this.fillInfo);
        }
        catch (e) {
            logError(e);
        }
    }
    async finishSave() {
        try {
            await csutil.input.waitForPasswordDisappear({ shadowRoot: false });
            const visiblePassword = csutil.input.getPassword({ visible: true, shadowRoot: false });
            if (visiblePassword) {
                return;
            }
            const fillInfo = this.fillInfo;
            if (!fillInfo) {
                return;
            }
            await this.clear();
            if (!fillInfo.updatedPassword) {
                return;
            }
            const changedLogin = {
                secretId: fillInfo.secretId,
                newPassword: fillInfo.updatedPassword,
                passwordFieldName: fillInfo.fieldName
            };
            await bgApi.updateFrame.updateChangedLoginPassword(changedLogin);
        }
        catch (e) {
            logError(e);
        }
    }
    async clear() {
        try {
            this.passwordInput = null;
            this.fillInfo = null;
            await ztabDomainStorage.remove(TabDomainStorageKeys.LOGIN_PASSWORD_FILL_INFO);
        }
        catch (e) {
            logError(e);
        }
    }
    addChangeListener() {
        try {
            if (document.body) {
                document.body.addEventListener("change", this.inputValueChanged);
                return;
            }
            document.documentElement.addEventListener("change", this.inputValueChanged);
        }
        catch (e) {
            logError(e);
        }
    }
}
