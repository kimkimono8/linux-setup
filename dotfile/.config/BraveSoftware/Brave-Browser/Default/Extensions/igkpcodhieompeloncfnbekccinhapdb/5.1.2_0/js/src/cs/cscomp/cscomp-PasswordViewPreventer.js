import { LocalStorageKeys } from "../../service/storage/constants/LocalStorageKeys.js";
import { STRING } from "../../vutil/export.js";
import { userAction } from "../csfill/context.js";
import { InputType } from "../../service/vt/constants/InputType.js";
class PasswordViewPreventer {
    plainPassChecker = new PlainPasswordNodeChecker();
    skipBgConnectCheck = false;
    async init() {
        try {
            this.init = js.fn.emptyFn;
            this.skipBgConnectCheck = (await zlocalStorage.load(LocalStorageKeys.SKIP_ONE_CLICK_BG_CONNECT_CHECK, STRING.FALSE)) == STRING.TRUE;
            csutil.input.listenPasswordToText(this.onPasswordToText.bind(this));
            this.checkDevtools();
            this.plainPassChecker.init();
            info(PasswordViewPreventer.name, "password view preventer initialized");
        }
        catch (e) {
            logError(e);
        }
    }
    async filledPassword(password) {
        try {
            await this.init();
            info(PasswordViewPreventer.name, "filled password added to checks", js.log.mask(password));
            this.plainPassChecker.filledPasswords.add(password);
        }
        catch (e) {
            logError(e);
        }
    }
    async checkDevtools() {
        try {
            while (true) {
                await this.check();
                await js.time.delay(0.5);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async check() {
        try {
            const apiConnectable = this.skipBgConnectCheck ? true : await bgApi.tab.checkConnectable();
            if (!apiConnectable) {
                info(PasswordViewPreventer.name, "api not connectable");
                this.closeTab();
                return;
            }
            const isDevToolsOpen = await bgApi.tab.checkDevToolsOpen();
            if (isDevToolsOpen) {
                info(PasswordViewPreventer.name, "dev tools open");
                this.closeTab();
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    onPasswordToText(input) {
        try {
            if (input.type == InputType.PASSWORD) {
                return;
            }
            input.type = InputType.PASSWORD;
            info(PasswordViewPreventer.name, "input reverted to password type", input);
        }
        catch (e) {
            logError(e);
        }
    }
    async closeTab() {
        try {
            info(PasswordViewPreventer.name, "closing tab");
            await bgApi.other.devToolsCloseTab();
        }
        catch (e) {
            this.clearInputs();
            logError(e);
        }
    }
    clearInputs() {
        try {
            for (let input of Array.from(csutil.selector.selectAll("input", { shadowRoot: false }))) {
                if (input.value.length == 0) {
                    continue;
                }
                userAction.fill(input, "");
                info(PasswordViewPreventer.name, "clearing input: ", input);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
class PlainPasswordNodeChecker {
    filledPasswords = new Set();
    async init() {
        try {
            const TRUE = "true";
            const setting = await zlocalStorage.load(LocalStorageKeys.NEW_PLAIN_PASS_CHECK, TRUE);
            if (setting != TRUE) {
                return;
            }
            const observer = new MutationObserver(this.handleNewChildMutation.bind(this));
            observer.observe(document.body || document.documentElement, {
                subtree: true,
                childList: true,
            });
        }
        catch (e) {
            logError(e);
        }
    }
    handleNewChildMutation(mutations, _observer) {
        try {
            for (let mutation of mutations) {
                for (let input of this.getInputElements(mutation)) {
                    this.checkInput(input);
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getInputElements(mutation) {
        try {
            const inputs = [];
            if (mutation.target instanceof HTMLInputElement) {
                inputs.push(mutation.target);
            }
            let elem;
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                elem = mutation.addedNodes.item(i);
                if (!(elem instanceof HTMLElement)) {
                    continue;
                }
                if (elem instanceof HTMLInputElement) {
                    inputs.push(elem);
                    continue;
                }
                for (let inputElem of csutil.selector.selectAll("input", { container: elem, shadowRoot: false })) {
                    inputs.push(inputElem);
                }
            }
            return inputs;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    checkInput(input) {
        try {
            if (!this.filledPasswords.has(input.value)) {
                return;
            }
            if (input.type == InputType.PASSWORD) {
                return;
            }
            info(PasswordViewPreventer.name, "reverting newly appeared dom input with same filled value", input);
            input.type = InputType.PASSWORD;
        }
        catch (e) {
            logError(e);
        }
    }
}
export const exp_passwordViewPreventer = new PasswordViewPreventer();
