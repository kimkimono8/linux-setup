import { loginUtil } from "../../../src/cs/loginUtil/export.js";
class ContainerUsernameLogin {
    signinRegex = /\b((sign|log)\W*(i|o)n|continue|next)\b/i;
    getContainer() {
        try {
            const visibleUsernames = csutil.input.getUsernames({ visible: true, container: document.body, shadowRoot: false });
            if (visibleUsernames.length != 1) {
                return null;
            }
            const [visibleInput] = visibleUsernames;
            if (visibleInput.disabled || visibleInput.readOnly) {
                return null;
            }
            if (this.isUsernameInput(visibleUsernames[0])) {
                return loginUtil.getInputLoginContainer(visibleUsernames[0]);
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    isUsernameInput(input) {
        try {
            if (csutil.login.isLoginUrl(window.location.href) || this.isUsernameAutocomplete(input)) {
                return true;
            }
            if (input.form) {
                return this.isFormLoginInput(input);
            }
            return this.isContainerLoginInput(input);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isUsernameAutocomplete(input) {
        try {
            if (!input.autocomplete) {
                return false;
            }
            switch (input.autocomplete) {
                case "username":
                case "email":
                    return true;
                default:
                    return false;
            }
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isFormLoginInput(input) {
        try {
            const form = input.form;
            if (!form) {
                return false;
            }
            if (this.testLoginContainer(form)) {
                return true;
            }
            let formParent = form;
            for (let i = 0; i < 10 && (formParent.offsetWidth * formParent.offsetHeight <= 100000); i++) {
                formParent = formParent.parentElement;
            }
            if (this.testLoginContainer(formParent)) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isContainerLoginInput(input) {
        try {
            let parent = input.parentElement;
            for (let i = 0; i < 10 && (parent.offsetWidth * parent.offsetHeight <= 100000); i++) {
                parent = parent.parentElement;
            }
            return this.testLoginContainer(parent);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    testLoginContainer(container) {
        try {
            if (!container) {
                throw "EMPTY_CONTAINER";
            }
            const selectorList = [
                "*[type='submit']",
                "button",
                "*[type='button']",
                "*[role='button']",
                "input[type='image']",
                "a[href^='javascript:']",
                "a[href^='#']"
            ];
            let submitElems = null;
            for (let selector of selectorList) {
                submitElems = js.selector.selectAll(selector, container);
                if (submitElems.length == 0) {
                    continue;
                }
                return this.testLoginSubmitElems(submitElems);
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    testLoginSubmitElems(elems) {
        for (let elem of elems) {
            if (this.testLoginSubmitElem(elem) && csutil.isVisible(elem, false)) {
                return true;
            }
        }
        return false;
    }
    testLoginSubmitElem(elem) {
        try {
            if (elem instanceof HTMLInputElement) {
                if (elem.type == "image") {
                    return this.signinRegex.test(elem.alt);
                }
                return this.signinRegex.test(elem.value) || this.signinRegex.test(elem.parentElement.textContent);
            }
            return this.signinRegex.test(elem.textContent);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
export const _containerUsernameLogin = new ContainerUsernameLogin();
