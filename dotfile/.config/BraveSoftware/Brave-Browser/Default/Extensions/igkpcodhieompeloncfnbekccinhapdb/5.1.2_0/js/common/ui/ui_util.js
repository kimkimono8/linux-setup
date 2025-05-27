import { KeyboardKeys } from "../../src/service/VUi/constants/KeyboardKeys.js";
import { ZVError } from "../error/ZVError.js";
import { setGlobal } from "../global/global.js";
import { globalDomListener } from "./globalDomListener.js";
export class UIUtil1 {
    static instance = null;
    static get inst() {
        return this.instance || (this.instance = new UIUtil1());
    }
    init() {
        try {
            if (!isDevMode) {
                js.dom.disableRightClick();
            }
            globalDomListener.init();
            this.handleGlobalErrors();
            this.setupInactivityMonitor();
        }
        catch (e) {
            logError(e);
        }
    }
    showSearchClear(input) {
        try {
            let clearElem = null;
            const hasParentSelector = Boolean(input.dataset.clear_parent_selector);
            if (hasParentSelector) {
                const parentElem = js.selector.closest(input, input.dataset.clear_parent_selector);
                clearElem = js.selector.selectFrom(parentElem, input.dataset.clear_selector);
            }
            else {
                clearElem = js.selector.select("#" + input.dataset.clear_id);
            }
            if (!clearElem) {
                throw "cannot find clear elem";
            }
            js.dom.showIf(input.value.length > 0, clearElem);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    clickedClearSearch(e) {
        const closeElem = js.selector.closest(e.target, "[data-on_click]");
        const inputElem = js.selector.select(closeElem.dataset.clear_input);
        this.clearInput(inputElem);
    }
    clickedShowHidePassphrase(e) {
        const eyeContainer = js.selector.closest(e.target, "[data-eye_for]");
        const eyeIcon = js.selector.selectFrom(eyeContainer, "i");
        const inputParentSelector = eyeContainer.dataset.eye_input_parent;
        let input;
        if (inputParentSelector) {
            const inputContainer = js.selector.closest(e.target, inputParentSelector);
            input = js.selector.selectFrom(inputContainer, eyeContainer.dataset.eye_for);
        }
        else {
            input = js.selector.select(eyeContainer.dataset.eye_for);
        }
        const hidePassword = input.type == "text";
        const autoHide = eyeContainer.dataset.auto_hide_eye !== undefined;
        if (hidePassword) {
            input.type = "password";
            eyeIcon.dataset.tooltip_content = "i18n:view";
            eyeIcon.className = "icon-view";
            if (autoHide) {
                clearTimeout(+eyeContainer.dataset.auto_hide_timeout);
            }
            return;
        }
        input.type = "text";
        eyeIcon.dataset.tooltip_content = "i18n:hide";
        eyeIcon.className = "icon-hide";
        if (autoHide) {
            eyeContainer.dataset.auto_hide_timeout = "" + setTimeout(() => this.clickedShowHidePassphrase(e), 10000);
        }
    }
    handleGlobalErrors() {
        window.addEventListener("error", function (e) {
            if (e.defaultPrevented) {
                return;
            }
            const errorMsg = e.error?.message || e.message;
            console.error(e, "window error...", e);
            if (e.target instanceof HTMLImageElement) {
                return;
            }
            const reqErrorMsg = errorMsg ? errorMsg.replace(/^.*ZV:/, "ZV:") : "ZV: Uncaught window error";
            VUI.notification.showError(reqErrorMsg);
        }, true);
        window.addEventListener("unhandledrejection", function (e) {
            if (e.defaultPrevented) {
                return;
            }
            ZVError.error(e);
            console.error(e, "unhandled rejection...: ", arguments);
            VUI.notification.showError(e.reason);
        }, true);
    }
    async scrollIntoView(elem) {
        try {
            const isVisible = await this.isVisible(elem);
            if (isVisible) {
                return;
            }
            elem.scrollIntoView();
        }
        catch (e) {
            logError(e);
        }
    }
    async isVisible(elem) {
        try {
            const promise = js.promise.createNew();
            const observer = new IntersectionObserver(function (records, observer) {
                promise.resolve(records[0].isIntersecting);
                observer.disconnect();
            });
            observer.observe(elem);
            const isVisible = await promise;
            if (!isVisible) {
                return false;
            }
            const isInFront = this.isVisibleZIndex(elem);
            return isInFront;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isVisibleZIndex(elem = new HTMLElement()) {
        const rect = elem.getBoundingClientRect();
        let left = Math.max(0, rect.left);
        let top = Math.max(0, rect.top);
        let right = Math.min(document.documentElement.clientWidth, rect.right);
        let bottom = Math.min(document.documentElement.clientHeight, rect.bottom);
        let x = left + (right - left) / 2;
        let y = top + (bottom - top) / 2;
        const elemAtXY = document.elementFromPoint(x, y);
        if (!elemAtXY) {
            return false;
        }
        if (elem.contains(elemAtXY) || elemAtXY.offsetWidth <= (elem.offsetWidth + 100)) {
            return true;
        }
        return false;
    }
    clearInput(inputElem) {
        try {
            inputElem.value = "";
            inputElem.dispatchEvent(new KeyboardEvent("keyup", {
                view: window,
                bubbles: true,
                cancelable: true
            }));
            inputElem.focus();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    setupInactivityMonitor() {
        function updateLastActive() {
            bgApi.other.updateLastActive();
        }
        document.addEventListener("click", updateLastActive);
        document.addEventListener("keyup", updateLastActive);
    }
    async copySelection(e) {
        e.preventDefault();
        const selection = document.getSelection() + "";
        await bgApi.other.copyToClipboard(selection);
    }
    async waitForConnectable() {
        let connectable = false;
        while (true) {
            connectable = await bgApi.login.checkConnectable();
            if (connectable) {
                return;
            }
            await js.time.delay(0.1);
        }
    }
    slimScroll(elem, height = "100%", width = "100%") {
        const reqHeight = typeof height == "string" ? height : Math.ceil(height) + "px";
        const reqWidth = typeof width == "string" ? width : Math.ceil(width) + "px";
        $(elem).slimScroll({
            height: reqHeight,
            wheelStep: 10,
            touchScrollStep: 75,
            width: reqWidth
        });
    }
    slimScrollRemove(elem) {
        $(elem).slimScroll({ destroy: true });
    }
    showOpenedEyeIcon(elem) {
        try {
            const eyeIcon = js.selector.selectFrom(elem, "i.icon-hide");
            eyeIcon.dataset.tooltip_content = "i18n:view";
            eyeIcon.className = "icon-view";
        }
        catch (e) {
            logError(e);
        }
    }
    showClosedEyeIcon(elem) {
        try {
            const eyeIcon = js.selector.selectFrom(elem, "i.icon-view");
            eyeIcon.dataset.tooltip_content = "i18n:hide";
            eyeIcon.className = "icon-hide";
        }
        catch (e) {
            logError(e);
        }
    }
    addSearchListener(searchElem, clearElem, listener) {
        try {
            function clear() {
                searchElem.value = "";
                listener("");
                js.dom.hideOld(clearElem);
                searchElem.focus();
            }
            searchElem.addEventListener("keyup", function (e) {
                if (e.key == KeyboardKeys.ESCAPE) {
                    clear();
                    return;
                }
                if (VUI.keyboard.isControlKey(e.key)) {
                    return;
                }
                listener(searchElem.value);
                js.dom.showIf(searchElem.value.length > 0, clearElem);
            });
            clearElem.addEventListener("click", clear);
        }
        catch (e) {
            logError(e);
        }
    }
    showAddLikeForm(containerElem, contentElem, overlaySelector) {
        const container = js.selector.select(containerElem);
        js.dom.setContent(containerElem, js.selector.select(contentElem));
        container.style.right = "0px";
        js.dom.showOld(overlaySelector);
    }
    hideAddLikeForm(containerElem, overlaySelector) {
        const container = js.selector.select(containerElem);
        container.style.right = "-710px";
        container.textContent = "";
        js.dom.hideOld(overlaySelector);
    }
}
export const uiUtilOld = new UIUtil1();
setGlobal("uiUtil", uiUtilOld);
