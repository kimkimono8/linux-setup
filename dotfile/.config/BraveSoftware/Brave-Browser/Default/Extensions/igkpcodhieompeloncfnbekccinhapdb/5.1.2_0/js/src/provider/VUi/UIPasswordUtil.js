import { InputType } from "../../service/vt/constants/InputType.js";
export class UIPasswordUtilImpl {
    passwordColorer = new PasswordColorer();
    getColoredPassword(password) {
        return this.passwordColorer.createColoredPassword(password);
    }
    getColoredChar(ch) {
        return this.passwordColorer.getColoredSpan(ch);
    }
    showText(input) {
        try {
            input.type = InputType.TEXT;
            const eyeIcon = this.getEyeIcon(input);
            if (!eyeIcon) {
                return;
            }
            eyeIcon.dataset.tooltip_content = "i18n:hide";
            eyeIcon.className = "icon-hide";
        }
        catch (e) {
            logError(e);
        }
    }
    hideText(input) {
        try {
            input.type = InputType.PASSWORD;
            const eyeIcon = this.getEyeIcon(input);
            if (!eyeIcon) {
                return;
            }
            eyeIcon.dataset.tooltip_content = "i18n:view";
            eyeIcon.className = "icon-view";
        }
        catch (e) {
            logError(e);
        }
    }
    getEyeIcon(input) {
        try {
            if (!input.dataset.parent) {
                return null;
            }
            const parentElem = js.selector.closest(input, input.dataset.parent);
            if (!parentElem) {
                return null;
            }
            const eyeIcon = js.selector.selectFrom(parentElem, `[data-icon="eye"]`);
            return eyeIcon;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
class PasswordColorer {
    createColoredPassword(password) {
        try {
            const fragment = document.createDocumentFragment();
            for (let ch of password) {
                fragment.append(this.getColoredSpan(ch));
            }
            return fragment;
        }
        catch (e) {
            logError(e);
            return document.createDocumentFragment();
        }
    }
    getColoredSpan(ch) {
        try {
            const span = document.createElement("span");
            span.textContent = ch;
            span.className = this.getColoredSpanClass(ch);
            return span;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getColoredSpanClass(ch) {
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            return "";
        }
        if (ch >= '0' && ch <= '9') {
            return "pwd-numbers";
        }
        return "pwd-specialchar";
    }
}
