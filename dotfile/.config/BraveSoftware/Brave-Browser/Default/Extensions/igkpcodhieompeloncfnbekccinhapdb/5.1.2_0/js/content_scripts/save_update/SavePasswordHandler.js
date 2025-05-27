import { InputType } from "../../src/service/vt/constants/InputType.js";
import { TabDomainStorageKeys } from "../../src/service/storage/constants/TabDomainStorageKeys.js";
import { vutil } from "../../src/vutil/export.js";
import { csLoginContainer } from "../login/CSLoginContainer.js";
import { BaseSavePasswordHandler } from "./BaseSavePasswordHandler.js";
export class SavePasswordHandler extends BaseSavePasswordHandler {
    username = "";
    password = "";
    urls = [];
    lastPageContainerInput = null;
    pageLoginContainer = null;
    hasNonNumericLastSaveCredential = false;
    async init() {
        try {
            this.pageFinishSave();
            await super.init();
            info(SavePasswordHandler.name, "save password disabled: ", this.saveDisabled);
            await this.initNonNumericLastSaveCredential();
            await csutil.input.waitForVisibleInput({ shadowRoot: false });
            await this.restoreSavedUsername();
            await this.clearUsername();
            this.initDomListeners();
            info(SavePasswordHandler.name, "save password handler initialized");
        }
        catch (e) {
            logError(e);
        }
    }
    async disableSave() {
        try {
            super.disableSave();
            this.username = "";
            this.password = "";
            await bgApi.saveFrame.disableSavePassword();
            info(SavePasswordHandler.name, "save password disabled");
        }
        catch (e) {
            logError(e);
        }
    }
    check(input) {
        try {
            if (this.saveDisabled || !csutil.input.isValidTextPassword(input) || !input.value || input.hasAttribute("data-zvault-cc")) {
                return;
            }
            if (csutil.input.typeOf(input) == InputType.PASSWORD) {
                this.savePassword(input);
                return;
            }
            this.saveUsername(input);
        }
        catch (e) {
            logError(e);
        }
    }
    async saveUsername(usernameInput) {
        try {
            const loginContainer = this.getPageLoginContainer(usernameInput) ||
                csLoginContainer.getInputLoginContainer(usernameInput) || document.body;
            const usernameField = this.getUsernameField(loginContainer);
            if (usernameField != usernameInput) {
                return;
            }
            this.username = usernameInput.value;
            this.urls = await vutil.getSaveUrls();
            const saveUsername = {
                username: this.username,
                urls: this.urls
            };
            await ztabDomainStorage.save(TabDomainStorageKeys.SAVE_USERNAME, saveUsername);
            await this.updateToBeSavedCredential();
        }
        catch (e) {
            logError(e);
        }
    }
    getPageLoginContainer(input) {
        try {
            if (this.lastPageContainerInput != input) {
                this.lastPageContainerInput = input;
                this.pageLoginContainer = csLoginContainer.getPageLoginContainer() || document.body;
            }
            return this.pageLoginContainer;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getUsernameField(loginContainer) {
        try {
            const inputs = csutil.selector.selectAll("input", { container: loginContainer, shadowRoot: false });
            const validInputs = inputs.filter(input => csutil.input.isValidTextPassword(input));
            let lastTextInput = null;
            for (let input of validInputs) {
                if (input.type == "password") {
                    break;
                }
                if (csutil.isVisible(input) && csutil.input.isValidTextPassword(input)) {
                    lastTextInput = input;
                }
            }
            if (lastTextInput) {
                return lastTextInput;
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async savePassword(passwordInput) {
        try {
            const loginContainer = this.getPageLoginContainer(passwordInput) ||
                csLoginContainer.getInputLoginContainer(passwordInput) || document.body;
            const passwordField = csutil.input.getPassword({ visible: true, container: loginContainer, shadowRoot: false });
            if (passwordField != passwordInput) {
                info(SavePasswordHandler.name, "not saving as password field mismatches", passwordField, passwordInput);
                return;
            }
            this.password = passwordInput.value;
            await this.updateToBeSavedCredential();
        }
        catch (e) {
            logError(e);
        }
    }
    async updateToBeSavedCredential() {
        try {
            if (!this.username || !this.password || !this.urls || !this.urls.length) {
                return;
            }
            const credential = {
                username: this.username,
                password: this.password,
                urls: this.urls
            };
            const isPossibleMFA = this.hasNonNumericLastSaveCredential && !/\D/.test(this.password);
            if (isPossibleMFA) {
                info(SavePasswordHandler.name, "not updating to be saved credential because of possible MFA input");
                return;
            }
            info(SavePasswordHandler.name, "to be saved credential: ", js.log.mask(credential, { keys: ["username", "password"] }));
            const allowedDomains = this.urls.map(x => js.url.getParentDomain(x));
            await ztabDomainStorage.saveDomain(TabDomainStorageKeys.SAVE_CREDENTIAL, credential, allowedDomains);
        }
        catch (e) {
            logError(e);
        }
    }
    async pageFinishSave() {
        try {
            if (!csutil.window.isTopFrame()) {
                return;
            }
            const savedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null);
            if (!savedCredential) {
                return;
            }
            info(SavePasswordHandler.name, "has save credential: ", js.log.mask(savedCredential, { keys: ["username", "password"] }));
            await js.time.delay(0.5);
            const visiblePassword = csutil.input.getPassword({ visible: true, shadowRoot: false });
            if (visiblePassword) {
                info(SavePasswordHandler.name, "not showing save because of visible password");
                return;
            }
            this.finishSave();
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
            const hasSavedCredential = Boolean(await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null));
            if (!hasSavedCredential) {
                return;
            }
            info(SavePasswordHandler.name, "finish save - wait for password disappear");
            await js.time.delay(0.5);
            await csutil.input.waitForPasswordDisappear({ maxWaitSecs: Number.MAX_SAFE_INTEGER, shadowRoot: false });
            const savedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null);
            if (!savedCredential) {
                return;
            }
            await bgApi.saveFrame.saveCredential(savedCredential);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreSavedUsername() {
        try {
            const savedUsername = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_USERNAME, null);
            if (!savedUsername) {
                return;
            }
            info(SavePasswordHandler.name, "restoring saved username: ", js.log.mask(savedUsername.username), savedUsername.urls);
            const allowedDomains = savedUsername.urls.map(x => js.url.getParentDomain(x));
            const curDomain = await bgApi.tab.getTabDomain();
            if (!allowedDomains.includes(curDomain)) {
                if (csutil.window.isTopFrame()) {
                    await ztabDomainStorage.remove(TabDomainStorageKeys.SAVE_USERNAME);
                }
                return;
            }
            info(SavePasswordHandler.name, "restored saved username");
            this.username = savedUsername.username;
            this.urls = savedUsername.urls;
        }
        catch (e) {
            logError(e);
        }
    }
    async clearUsername() {
        try {
            if (!this.username) {
                return;
            }
            if (!csutil.window.isTopFrame()) {
                return;
            }
            const hasVisiblePassword = Boolean(csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: false }));
            if (hasVisiblePassword) {
                info(SavePasswordHandler.name, "has visible password - not clearing username");
                return;
            }
            info(SavePasswordHandler.name, "cleared saved username");
            await ztabDomainStorage.remove(TabDomainStorageKeys.SAVE_USERNAME);
        }
        catch (e) {
            logError(e);
        }
    }
    async initNonNumericLastSaveCredential() {
        try {
            const savedCredential = await ztabDomainStorage.load(TabDomainStorageKeys.SAVE_CREDENTIAL, null);
            if (!savedCredential || !savedCredential.password) {
                return;
            }
            const hasNonNumericPassword = /\D/.test(savedCredential.password);
            if (!hasNonNumericPassword) {
                return;
            }
            this.hasNonNumericLastSaveCredential = true;
            info(SavePasswordHandler.name, "has non numeric saved credential");
        }
        catch (e) {
            logError(e);
        }
    }
}
