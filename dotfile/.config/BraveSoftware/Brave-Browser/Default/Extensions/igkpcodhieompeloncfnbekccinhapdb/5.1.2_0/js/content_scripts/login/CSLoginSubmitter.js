import { setGlobal } from "../../common/global/global.js";
import { userAction } from "../../src/cs/csfill/export.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { STRING } from "../../src/vutil/export.js";
import { csLoginContainer } from "./CSLoginContainer.js";
class CSLoginSubmitter {
    submitRegex = new NewSubmitRegex();
    async init() {
        try {
            const useOldSubmitRegex = (await zlocalStorage.load(LocalStorageKeys.USE_OLD_SUBMIT_REGEX, STRING.FALSE)) == STRING.TRUE;
            if (useOldSubmitRegex) {
                this.submitRegex = new SumbitRegex();
            }
            info(CSLoginSubmitter.name, "use old submit regex: ", useOldSubmitRegex);
        }
        catch (e) {
            logError(e);
        }
    }
    async submit(container, filledInput) {
        try {
            info(CSLoginSubmitter.name, "submitting: ", container, "filled input: ", filledInput);
            await js.time.delay(0.3);
            const submitElem = new SubmitButtonGetter(this.submitRegex).get(container, filledInput);
            if (!submitElem) {
                return false;
            }
            userAction.click(submitElem);
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async submitInputParent(input) {
        try {
            const container = csLoginContainer.getInputLoginContainer(input);
            info(CSLoginSubmitter.name, "submit input parent: ", input, "container: ", container);
            if (!container) {
                return false;
            }
            return await this.submit(container, input);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getSubmitButton(input) {
        try {
            const submitButton = new SubmitButtonGetter(this.submitRegex).get(csLoginContainer.getInputLoginContainer(input), input);
            return submitButton;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
class SumbitRegex {
    nextRegExp = /(?:next)|(?:continue)|(?:sign.?in)|(?:log.?in)|(?:log.?on)|(?:submit)/i;
    nonSubmitRegExp = /(?:\?)|(?:forg)|(?:password)|(?:\?)|(?:reset)|(?:show)|(?:cancel)/i;
}
class NewSubmitRegex extends SumbitRegex {
    nextRegExp = /(?:next)|(?:continue)|(?:sign.?in)|(?:log.?in)|(?:log.?on)|(?:submit)|(?:anmelden)|(?:einloggen)/i;
    nonSubmitRegExp = /(?:\?)|(?:forg)|(?:(?<!verify)password)|(?:\?)|(?:reset)|(?:show)|(?:cancel)|(?:regist)|(?:vergessen)/i;
}
class SubmitButtonGetter {
    submitRegex;
    static buttonNonAlphaRegex = /[^a-z?]/ig;
    container;
    filledInput;
    constructor(submitRegex) {
        this.submitRegex = submitRegex;
    }
    get(container, filledInput) {
        try {
            this.container = container;
            this.filledInput = filledInput;
            return this.getSubmit() ||
                this.getSingleButton() ||
                this.getNextTextButton() ||
                this.getNextTextInputButton() ||
                this.getTabIndexedButton() ||
                this.getNextRegexButton() ||
                this.getSingleButtonAfterInput() ||
                this.getInputValueLogin() ||
                this.getNextTextCustomButton() ||
                this.getAnchor() ||
                this.getDiv() ||
                this.getSubmitOutsiteForm();
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getSubmit() {
        try {
            const submitButtons = this.selectAllFiltered("input[type='submit'],button[type='submit'],input[value='Login']", { afterInput: true, visible: true });
            switch (submitButtons.length) {
                case 0: return null;
                case 1: return submitButtons[0];
            }
            const validSubmitButtons = submitButtons.filter(x => this.testSubmitElem(x));
            if (validSubmitButtons.length == 1) {
                return validSubmitButtons[0];
            }
            return submitButtons[0];
        }
        catch (e) {
            logError(e);
        }
        return null;
    }
    testSubmitElem(elem) {
        try {
            if (elem instanceof HTMLButtonElement) {
                return this.testSubmitButtonElem(elem);
            }
            if (elem instanceof HTMLInputElement) {
                return this.testSubmitInputElem(elem);
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    testSubmitButtonElem(elem) {
        try {
            const text = this.getButtonAlphaText(elem);
            return this.testSubmitButtonElemMinCheck(elem) && this.submitRegex.nextRegExp.test(text);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    testSubmitButtonElemMinCheck(elem) {
        try {
            const text = this.getButtonAlphaText(elem);
            return text && !this.submitRegex.nonSubmitRegExp.test(text) && this.checkNotShowButton(elem);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    testSubmitInputElem(elem) {
        try {
            const text = elem.value;
            return !this.submitRegex.nonSubmitRegExp.test(text);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getSingleButton() {
        try {
            const buttons = this.selectAllFiltered("button", { visible: true, afterInput: true });
            if (buttons.length != 1) {
                return null;
            }
            const reqButton = buttons[0];
            const isValidSubmitButton = this.testSubmitButtonElemMinCheck(reqButton);
            if (!isValidSubmitButton) {
                return null;
            }
            return reqButton;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getTabIndexedButton() {
        try {
            const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true });
            const tabIndexedButtons = buttons.filter(x => x.matches("button[tabindex]"));
            for (let button of tabIndexedButtons) {
                if (button.tabIndex >= 0 && this.testSubmitButtonElemMinCheck(button)) {
                    return button;
                }
            }
        }
        catch (e) {
            logError(e);
        }
        return null;
    }
    checkNotShowButton(button) {
        try {
            const rect = button.getBoundingClientRect();
            const midX = rect.x + (rect.width / 2);
            const midY = rect.y + (rect.height / 2);
            return !this.hasInputOn(midX, midY);
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
    hasInputOn(x, y) {
        try {
            const elements = csutil.dom.getElementsFromPoint({ x, y });
            for (let curElement of elements) {
                if (curElement instanceof HTMLInputElement) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getNextTextButton() {
        return this.getNextTextButtonFn(this.container);
    }
    getNextTextButtonFn(container) {
        try {
            const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true, container });
            return buttons.find(button => this.testSubmitButtonElem(button));
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getNextTextInputButton() {
        return this.getNextTextInputButtonFn(this.container);
    }
    getNextTextInputButtonFn(container) {
        try {
            const visibleInputButtons = this.selectAllFiltered("input[type='button']", { visible: true, afterInput: true, container });
            return visibleInputButtons.find(button => this.submitRegex.nextRegExp.test(this.getInputButtonAlphaText(button)));
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getAlphaTextFor(text) {
        try {
            return text.replace(SubmitButtonGetter.buttonNonAlphaRegex, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getButtonAlphaText(button) {
        return this.getAlphaTextFor(button.textContent || button.ariaLabel);
    }
    getInputButtonAlphaText(input) {
        return this.getAlphaTextFor(input.value);
    }
    getNextRegexButton() {
        try {
            const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true });
            const nextButton = buttons.find(button => this.testSubmitButtonElemMinCheck(button) &&
                csutil.dom.hasAttribute({ elem: button, key: this.submitRegex.nextRegExp }));
            return nextButton;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getSingleButtonAfterInput() {
        try {
            const buttons = this.selectAllFiltered("button", { afterInput: true, visible: true });
            if (buttons.length != 1) {
                return null;
            }
            const reqButton = buttons[0];
            if (this.submitRegex.nonSubmitRegExp.test(reqButton.outerHTML)) {
                return null;
            }
            return reqButton;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getInputValueLogin() {
        try {
            const visibleInputs = this.selectAllFiltered("input[type='image']", { afterInput: true, visible: true });
            return visibleInputs.find(x => this.submitRegex.nextRegExp.test(this.getInputButtonAlphaText(x)));
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getNextTextCustomButton() {
        try {
            const visibleCustomButtons = this.selectAllFiltered("[role='button'],[type='button'],[type='submit']", { afterInput: true, visible: true });
            return visibleCustomButtons.find(button => this.testSubmitButtonElem(button));
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getAnchor() {
        try {
            const elements = this.selectAllFiltered("a", { visible: true, afterInput: true });
            const hrefRegex = /(?:^$)|(?:^#$)|(?:javascript)/;
            for (let elem of elements) {
                if (this.submitRegex.nonSubmitRegExp.test(elem.outerHTML) ||
                    !hrefRegex.test(elem.getAttribute("href")) ||
                    !this.submitRegex.nextRegExp.test(this.getButtonAlphaText(elem))) {
                    continue;
                }
                return elem;
            }
        }
        catch (e) {
            logError(e);
        }
        return null;
    }
    getDiv() {
        try {
            const elements = this.selectAllFiltered("div", { visible: true, afterInput: true });
            for (let elem of elements) {
                if (window.getComputedStyle(elem).cursor != "pointer" ||
                    this.submitRegex.nonSubmitRegExp.test(this.getButtonAlphaText(elem)) ||
                    !this.submitRegex.nextRegExp.test(elem.outerHTML)) {
                    continue;
                }
                return elem;
            }
        }
        catch (e) {
            logError(e);
        }
        return null;
    }
    getSubmitOutsiteForm() {
        try {
            const isForm = this.container instanceof HTMLFormElement;
            if (!isForm) {
                return null;
            }
            let parent = this.container;
            let submitElem = null;
            while (parent) {
                submitElem = this.getNextTextButtonFn(parent) || this.getNextTextInputButtonFn(parent);
                if (submitElem) {
                    return submitElem;
                }
                parent = parent.parentElement;
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    selectAllFiltered(selector, { afterInput = true, visible = true, container = null }) {
        const reqContainer = container || this.container;
        const allElems = csutil.selector.selectAll(selector, { container: reqContainer, shadowRoot: true, visible, });
        const afterInputElems = afterInput ? this.filterAfter(allElems, this.filledInput) : allElems;
        return afterInputElems;
    }
    filterAfter(elemList, input) {
        const inputRect = input.getBoundingClientRect();
        return elemList.filter(x => x.getBoundingClientRect().bottom >= inputRect.top);
    }
}
export const csLoginSubmitter = new CSLoginSubmitter();
setGlobal("csLoginSubmitter", csLoginSubmitter);
