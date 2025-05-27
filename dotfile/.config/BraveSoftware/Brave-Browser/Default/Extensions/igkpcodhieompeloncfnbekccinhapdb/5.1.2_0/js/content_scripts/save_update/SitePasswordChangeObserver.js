import { ChangedCredential } from "../../src/service/bgApi/types.js";
import { TabDomainStorageKeys } from "../../src/service/storage/constants/TabDomainStorageKeys.js";
import { csLoginContainer } from "../login/CSLoginContainer.js";
import { BaseSavePasswordHandler } from "./BaseSavePasswordHandler.js";
export class SitePasswordChangeObserver extends BaseSavePasswordHandler {
    oldPasswordChecker = new OldPasswordChecker();
    newPasswordChecker = new NewPasswordChecker();
    savedNewConfirmToMemory = false;
    async init() {
        try {
            this.finishSave();
            await super.init();
            await csutil.input.waitForVisibleInput({ shadowRoot: false });
            super.initDomListeners();
            info(SitePasswordChangeObserver.name, "initialized site password change observer");
        }
        catch (e) {
            logError(e);
        }
    }
    async check(input) {
        try {
            if (this.saveDisabled || csutil.input.typeOf(input) != "password") {
                return;
            }
            const visiblePasswords = csutil.input.getPasswords({ visible: true, shadowRoot: false });
            const hasAtleast2PasswordInputs = visiblePasswords.length >= 2;
            if (!hasAtleast2PasswordInputs) {
                return;
            }
            const hasUsername = this.checkHasUsernameInput(input);
            if (hasUsername) {
                return;
            }
            const hasNewConfirm = visiblePasswords.length == 2 && (visiblePasswords[0].value == visiblePasswords[1].value);
            if (hasNewConfirm) {
                const changedCredential = {
                    oldPassword: "",
                    newPassword: visiblePasswords[0].value
                };
                ztabDomainStorage.save(TabDomainStorageKeys.CHANGED_CREDENTIAL, changedCredential);
                this.savedNewConfirmToMemory = true;
                return;
            }
            if (this.savedNewConfirmToMemory) {
                await ztabDomainStorage.remove(TabDomainStorageKeys.CHANGED_CREDENTIAL);
                this.savedNewConfirmToMemory = false;
            }
            const inputIndex = visiblePasswords.indexOf(input);
            switch (inputIndex) {
                case 0:
                    this.oldPasswordChecker.check(input);
                    break;
                case 1:
                    this.newPasswordChecker.check(input);
                    break;
                case 2:
                    this.checkOldNewPassword();
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    checkHasUsernameInput(passwordInput) {
        const containerElem = csLoginContainer.getInputLoginContainer(passwordInput) || document.body;
        const userNameInput = csutil.input.getUsername({ visible: true, container: containerElem, shadowRoot: false });
        return Boolean(userNameInput);
    }
    async checkOldNewPassword() {
        try {
            const [oldPassword, newPassword, confirmNewPassword] = csutil.input.getPasswords({ visible: true, shadowRoot: false }).slice(0, 3);
            if (newPassword.value != confirmNewPassword.value || !oldPassword.value || !newPassword.value) {
                return;
            }
            const changeCredential = {
                oldPassword: oldPassword.value,
                newPassword: newPassword.value
            };
            await ztabDomainStorage.save(TabDomainStorageKeys.CHANGED_CREDENTIAL, changeCredential);
        }
        catch (e) {
            logError(e);
        }
    }
    async finishSave() {
        try {
            if (!csutil.window.isTopFrame()) {
                return;
            }
            const hasCredential = Boolean(await ztabDomainStorage.load(TabDomainStorageKeys.CHANGED_CREDENTIAL, null));
            if (!hasCredential) {
                return;
            }
            info(SitePasswordChangeObserver.name, "finish save - waiting for password disappear");
            await js.time.delay(0.5);
            await csutil.input.waitForPasswordDisappear({ maxWaitSecs: Number.MAX_SAFE_INTEGER, shadowRoot: false });
            const changedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.CHANGED_CREDENTIAL, null);
            if (!changedCredential) {
                return;
            }
            await bgApi.updateFrame.saveChangedCredential(changedCredential);
        }
        catch (e) {
            logError(e);
        }
    }
}
class PasswordChecker {
    fieldRegEx = /test/i;
    credentialObjKey = "";
    async check(input) {
        try {
            if (!input.value) {
                return;
            }
            const matchesRegex = csutil.dom.hasAttribute({ elem: input, key: this.fieldRegEx });
            if (!matchesRegex) {
                return;
            }
            await this.updateValue(input.value);
        }
        catch (e) {
            logError(e);
        }
    }
    async updateValue(value) {
        try {
            const credential = await ztabDomainStorage.load(TabDomainStorageKeys.CHANGED_CREDENTIAL, new ChangedCredential());
            credential[this.credentialObjKey] = value;
            await ztabDomainStorage.save(TabDomainStorageKeys.CHANGED_CREDENTIAL, credential);
        }
        catch (e) {
            logError(e);
        }
    }
}
class OldPasswordChecker extends PasswordChecker {
    fieldRegEx = /(?:(\b|_)old)|(?:(\b|_)cur[^a-z])|(?:(\b|_)current)/i;
    credentialObjKey = "oldPassword";
}
class NewPasswordChecker extends PasswordChecker {
    fieldRegEx = /(?:(\b|_)new)/i;
    credentialObjKey = "newPassword";
}
