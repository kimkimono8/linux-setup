import { passwordViewPreventer } from "../../src/cs/cscomp/export.js";
import { userAction } from "../../src/cs/csfill/export.js";
import { InputType } from "../../src/service/vt/constants/InputType.js";
import { loginUtil } from "../../src/cs/loginUtil/export.js";
import { LoginData, Secret } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { contextChecker } from "../components/contextChecker.js";
import { cs } from "../cs.js";
import { csLoginContainer } from "./CSLoginContainer.js";
import { csLoginSubmitter } from "./CSLoginSubmitter.js";
export class CSLogin {
    loginData = null;
    init() {
        this.restoreLogin();
    }
    async login(loginData) {
        try {
            const validContext = await contextChecker.isValidLoginContext(loginData);
            info(CSLogin.name, "valid login context?", window.location.href, validContext);
            if (!validContext) {
                return;
            }
            const inputAppeared = await csutil.input.waitForVisibleInput({ shadowRoot: true });
            info(CSLogin.name, "visible input appeared?", inputAppeared);
            if (!inputAppeared) {
                return;
            }
            await ztabStorage.save(TabStorageKeys.LOGIN_DATA, loginData);
            info(CSLogin.name, "login: ", js.log.mask(loginData, { keys: ["texts", "passwords"] }));
            if (loginData.step == LoginData.STEP.FILL_TOTP) {
                cs.totpLogin.login(loginData);
                return;
            }
            const loginContainer = csLoginContainer.getPageLoginContainer() || document.body;
            info(CSLogin.name, "login container: ", loginContainer);
            if (loginContainer) {
                await this.loginFn(loginContainer, loginData);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async frameLogin(loginData) {
        try {
            const validContext = await contextChecker.isValidFrameLoginContext(loginData);
            info(CSLogin.name, "valid frame login container?", validContext);
            if (!validContext) {
                return;
            }
            const activeInput = csutil.input.getActiveInput() ||
                csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: true }) ||
                csutil.input.getUsername({ visible: true, container: document.body, shadowRoot: true });
            info(CSLogin.name, "active input: ", activeInput);
            if (!activeInput) {
                return;
            }
            if (loginData.hasTotp && loginUtil.isTotpInput(activeInput)) {
                const totpFillInput = cs.totpLogin.getTotpCSFillInput();
                if (totpFillInput) {
                    info(CSLogin.name, "totp fill input", totpFillInput);
                    await cs.totpLogin.totpFrameLogin(totpFillInput, loginData);
                }
                return;
            }
            await ztabStorage.save(TabStorageKeys.LOGIN_DATA, loginData);
            const loginContainer = csLoginContainer.getInputLoginContainer(activeInput) || document.body;
            info(CSLogin.name, "login container: ", loginContainer);
            if (loginContainer) {
                await this.loginFn(loginContainer, loginData);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getActiveInputLoginType() {
        try {
            const activeInput = csutil.input.getActiveInput();
            if (!activeInput) {
                return "text";
            }
            if (csutil.input.typeOf(activeInput) == "password") {
                return "password";
            }
            if (loginUtil.isTotpInput(activeInput)) {
                return "totp";
            }
            return "text";
        }
        catch (e) {
            logError(e);
            return "text";
        }
    }
    hasValidLoginField() {
        try {
            const hasPassword = Boolean(csutil.input.getPassword({ visible: true, shadowRoot: true }));
            if (hasPassword) {
                return true;
            }
            const hasUsername = Boolean(csutil.input.getUsername({ visible: true, shadowRoot: true }));
            if (hasUsername) {
                return true;
            }
            const totpInput = Boolean(cs.totpLogin.getTotpCSFillInput());
            if (totpInput) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async loginFn(container, loginData) {
        try {
            info(CSLogin.name, "login fn - login data: ", js.log.mask(loginData, { keys: ["texts", "passwords"] }));
            this.loginData = loginData;
            let passwordFilled = false;
            const inputs = csutil.selector.selectAll("input", { container, visible: true, shadowRoot: true });
            let textI = 0;
            let passwordI = 0;
            let hasCaptcha = false;
            let unfilledInput = null;
            let oneClickChecksOk = false;
            const textInputs = [];
            const texts = [];
            const allowNumberLogin = loginUtil.isNumberLoginAllowed(container);
            let validInput = false;
            let lastValidInput = null;
            for (let input of inputs) {
                if (input.type == "text" && csutil.input.isCaptcha(input)) {
                    if (input.value == "") {
                        hasCaptcha = true;
                        unfilledInput = input;
                    }
                    continue;
                }
                validInput = allowNumberLogin ? csutil.input.isValidTextPasswordNumber(input) : csutil.input.isValidTextPassword(input);
                if (!validInput) {
                    continue;
                }
                switch (csutil.input.typeOf(input)) {
                    case "tel":
                    case "number":
                        if (!allowNumberLogin) {
                            continue;
                        }
                    case "text":
                    case "email":
                        textInputs.push(input);
                        if (textI == loginData.texts.length) {
                            continue;
                        }
                        texts.push(loginData.texts[textI++]);
                        await this.filledUsername();
                        lastValidInput = input;
                        break;
                    case "password":
                        passwordFilled = true;
                        await this.fillTextInputs(textInputs, texts);
                        if (passwordI == loginData.passwords.length) {
                            if (unfilledInput == null && input.value == "") {
                                unfilledInput = input;
                            }
                            continue;
                        }
                        oneClickChecksOk = await this.checkOneClickLoginChecks(loginData);
                        if (!oneClickChecksOk) {
                            info(CSLogin.name, "failed one click checks");
                            await this.finishLogin();
                            return;
                        }
                        await this.goingToFillPassword(input, passwordI);
                        await userAction.userFill(input, loginData.passwords[passwordI]);
                        loginUtil.setFilledPassword(input);
                        await this.filledPassword();
                        lastValidInput = input;
                        passwordI++;
                        break;
                }
            }
            await this.fillTextInputs(textInputs, texts);
            if (!unfilledInput && textInputs.length > 0) {
                for (let i = 0; i < textInputs.length; i++) {
                    if (textInputs[i].value == "") {
                        unfilledInput = textInputs[i];
                        break;
                    }
                }
            }
            if (unfilledInput) {
                unfilledInput.focus();
            }
            const filled = Boolean(lastValidInput);
            if (loginData.submit && !hasCaptcha && !unfilledInput && !csutil.dom.hasCaptchaFrame(container, lastValidInput) && filled) {
                csLoginSubmitter.submit(container, lastValidInput);
            }
            if (!passwordFilled) {
                this.fillPasswordOnAppear(loginData);
            }
            if (loginData.hasTotp) {
                cs.totpLogin.fillTotpOnApper(loginData);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async fillTextInputs(inputs, texts) {
        const inputStart = inputs.length - texts.length;
        let curInput = null;
        for (let i = 0; i < texts.length; i++) {
            curInput = inputs[inputStart + i];
            await userAction.userFill(curInput, texts[i]);
            loginUtil.setFilledText(curInput);
        }
        inputs.splice(inputStart, texts.length);
        texts.length = 0;
    }
    async fillPasswordOnAppear(loginData) {
        try {
            info(CSLogin.name, "filling password on appear");
            let reqPasswordElem = null;
            for (let _ of js.loop.range(15)) {
                try {
                    reqPasswordElem = csutil.input.getPassword({ visible: true, container: document.body, shadowRoot: true });
                    if (reqPasswordElem) {
                        break;
                    }
                }
                catch (e) {
                    logError(e);
                }
                await js.time.delay(1);
            }
            if (!reqPasswordElem) {
                return;
            }
            if (!await this.checkOneClickLoginChecks(loginData)) {
                await this.finishLogin();
                return;
            }
            await this.goingToFillPassword(reqPasswordElem, 0);
            await userAction.userFill(reqPasswordElem, loginData.passwords[0]);
            loginUtil.setFilledPassword(reqPasswordElem);
            await this.filledPassword();
            if (loginData.submit) {
                csLoginSubmitter.submitInputParent(reqPasswordElem);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async filledUsername() {
        try {
            this.loginData.step = LoginData.STEP.FILL_PASSWORD;
            await ztabStorage.save(TabStorageKeys.LOGIN_DATA, this.loginData);
            info(CSLogin.name, "tab storage - login data", this.loginData);
        }
        catch (e) {
            logError(e);
        }
    }
    async goingToFillPassword(passwordInput, passwordIndex) {
        try {
            await cs.savePasswordHandler.disableSave();
            if (Secret.hasEditPermission(this.loginData.shareLevel)) {
                await cs.loginPasswordChangeHandler.checkPasswordChange(this.loginData.secretId, passwordInput, this.loginData.passwordFieldNames[passwordIndex]);
            }
            if (!Secret.hasViewPermission(this.loginData.shareLevel)) {
                passwordInput.type = InputType.PASSWORD;
                passwordViewPreventer.filledPassword(this.loginData.passwords[passwordIndex]);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async checkOneClickLoginChecks(loginData) {
        try {
            if (Secret.hasViewPermission(loginData.shareLevel)) {
                return true;
            }
            const isPasswordChangePage = await this.checkOneClickPasswordChange();
            if (isPasswordChangePage) {
                info(CSLogin.name, "in password change page");
                bgApi.tab.showAlert({ message: i18n(VI18N.ONE_CLICK_PASSWORD_CHANGE_PREVENTED_POPUP) });
                return false;
            }
            const isDevToolsOpen = await bgApi.tab.checkDevToolsOpen();
            if (isDevToolsOpen) {
                info(CSLogin.name, "dev tools open");
                bgApi.tab.showAlert({ message: i18n(VI18N.CLOSE_DEV_TOOLS_ONE_CLICK_LOGIN) });
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
    async filledPassword() {
        try {
            if (!this.loginData.hasTotp && this.loginData.oneauthId == "") {
                await this.finishLogin();
                return;
            }
            this.loginData.step = LoginData.STEP.FILL_TOTP;
            await ztabStorage.save(TabStorageKeys.LOGIN_DATA, this.loginData);
            info(CSLogin.name, "tab storage - login data", this.loginData);
        }
        catch (e) {
            logError(e);
        }
    }
    async finishLogin() {
        try {
            info(CSLogin.name, "login finished");
            await ztabStorage.remove(TabStorageKeys.LOGIN_DATA);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreLogin() {
        const loginData = await ztabStorage.load(TabStorageKeys.LOGIN_DATA, null);
        if (!loginData) {
            return;
        }
        const validContext = (await contextChecker.isValidTabLoginContext(loginData)) &&
            (loginData.redirectedCount < LoginData.MAX_REDIRECT_COUNT);
        info(CSLogin.name, "restore login - valid context?", validContext);
        if (!validContext) {
            await this.finishLogin();
            return;
        }
        if (loginData.step == LoginData.STEP.FILL_PASSWORD) {
            loginData.texts = [];
        }
        if (csutil.window.isTopFrame()) {
            loginData.redirectedCount++;
            await ztabStorage.save(TabStorageKeys.LOGIN_DATA, loginData);
        }
        this.login(loginData);
    }
    async checkOneClickPasswordChange() {
        try {
            const TRUE = "true";
            const setting = await zlocalStorage.load(LocalStorageKeys.ONE_CLICK_PASS_CHANGE_CHECK, TRUE);
            if (setting != TRUE) {
                return false;
            }
            return csutil.page.isPasswordChangePage();
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
