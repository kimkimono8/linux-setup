import { InputType } from "../../service/vt/constants/InputType.js";
class InputLoginContainer {
    getContainer(input) {
        try {
            const form = csutil.selector.closest(input, "form");
            if (form) {
                return form;
            }
            return this.getContainerFn(input) || null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getContainerFn(input) {
        if (csutil.input.typeOf(input) == InputType.PASSWORD) {
            return ParentElemGetter.password.getParent(input) || ParentElemGetter.submitablePassword.getParent(input);
        }
        return ParentElemGetter.username.getParent(input) || ParentElemGetter.submitableUsername.getParent(input);
    }
}
class ValidParentChecker {
}
class ValidParentCheckerForUsername extends ValidParentChecker {
    static instance = new ValidParentCheckerForUsername();
    isValidParent(elem, parent) {
        return csutil.input.getUsername({ visible: true, container: parent, shadowRoot: false }) == elem;
    }
}
class ValidParentCheckerForPassword extends ValidParentChecker {
    static instance = new ValidParentCheckerForPassword();
    isValidParent(elem, parent) {
        return csutil.input.getPassword({ container: parent, visible: true, shadowRoot: false }) == elem;
    }
}
class RequiredParentChecker {
}
class RequiredParentCheckerForUsername extends RequiredParentChecker {
    static instance = new RequiredParentCheckerForUsername();
    isRequiredParent(elem) {
        return csutil.input.getPassword({ container: elem, visible: true, shadowRoot: false }) != null;
    }
}
class RequiredParentCheckerForPassword extends RequiredParentChecker {
    static instance = new RequiredParentCheckerForPassword();
    isRequiredParent(elem) {
        return csutil.input.getUsername({ visible: true, container: elem, shadowRoot: false }) != null;
    }
}
class RequiredParentCheckerSubmitable extends RequiredParentChecker {
    static instance = new RequiredParentCheckerSubmitable();
    isRequiredParent(elem) {
        return elem.querySelector("button,input[type='submit']") != null;
    }
}
class ParentElemGetter {
    validParentChecker;
    requiredParentChecker;
    static username = new ParentElemGetter(ValidParentCheckerForUsername.instance, RequiredParentCheckerForUsername.instance);
    static submitableUsername = new ParentElemGetter(ValidParentCheckerForUsername.instance, RequiredParentCheckerSubmitable.instance);
    static password = new ParentElemGetter(ValidParentCheckerForPassword.instance, RequiredParentCheckerForPassword.instance);
    static submitablePassword = new ParentElemGetter(ValidParentCheckerForPassword.instance, RequiredParentCheckerSubmitable.instance);
    constructor(validParentChecker, requiredParentChecker) {
        this.validParentChecker = validParentChecker;
        this.requiredParentChecker = requiredParentChecker;
    }
    getParent(elem) {
        try {
            for (let parent of csutil.dom.getParentIterator(elem)) {
                if (!this.validParentChecker.isValidParent(elem, parent)) {
                    return null;
                }
                if (this.requiredParentChecker.isRequiredParent(parent)) {
                    return parent;
                }
            }
            let parent = elem.parentElement;
            while (parent && this.validParentChecker.isValidParent(elem, parent)) {
                if (this.requiredParentChecker.isRequiredParent(parent)) {
                    return parent;
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
}
export const inputLoginContainer = new InputLoginContainer();
