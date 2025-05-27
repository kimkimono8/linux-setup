import { ZVError } from "../../common/error/ZVError.js";
import { userAction } from "../../src/cs/csfill/export.js";
import { CSCardFieldDetector } from "./csCardFieldDetector.js";
import { CardField } from "./csCardFiller.js";
export class CSCardFieldMasking extends CSCardFieldDetector {
    devtoolsFunc = this.devToolsOpened.bind(this);
    devtoolsFuncIframe = this.devToolsOpenedIframe.bind(this);
    currentCCForm = null;
    iframeElement = null;
    constructor() {
        super();
        js.fn.bindThis(this, [this.onMessageListener, this.onMessageDevToolsFncIframeListener]);
    }
    async applyMasking(field) {
        await this.removeMasking(field);
        const dimensions = await this.getmaskingDimensions(field);
        const top = ($(field).outerHeight() - $(field).innerHeight()) / 2;
        const left = ($(field).outerWidth() - $(field).innerWidth()) / 2;
        const mainTag = document.createElement('span');
        mainTag.setAttribute("data-zvault-mask", "");
        mainTag.style.backgroundImage = `url(${chrome.runtime.getURL("/images/web_access/red-star.png")})`;
        mainTag.style.backgroundPosition = "center";
        mainTag.style.backgroundSize = "15px";
        mainTag.style.backgroundRepeat = "repeat-x";
        mainTag.style.height = dimensions.maxHeight + "px";
        mainTag.style.width = dimensions.maxWidth + "px";
        mainTag.style.display = "inline-block";
        mainTag.style.backgroundColor = "white";
        mainTag.style.position = "absolute";
        mainTag.style.zIndex = "1000";
        mainTag.style.marginTop = top + "px";
        mainTag.style.marginLeft = left + "px";
        mainTag.style.borderRadius = "5px";
        $(mainTag).insertBefore(field);
        this.setTabIndex(field);
        setTimeout(function () {
            mainTag.click();
        }, 50);
        return;
    }
    async removeMasking(field) {
        const parent = $(field).parent();
        const masking = parent.find('span[data-zvault-mask=""]');
        if (masking.length) {
            field.removeEventListener("focus", this.preventFocus);
            masking.remove();
        }
        return;
    }
    async getmaskingDimensions(field) {
        let maxHeight = $(field).innerHeight();
        let maxWidth = $(field).innerWidth();
        if (field.tagName == "INPUT") {
            maxWidth = (0.98 * maxWidth) - 14;
            return { maxHeight, maxWidth };
        }
        $(field).parent().children().each(function () {
            const height = $(this).innerHeight();
            maxHeight = height > maxHeight ? height : maxHeight;
            const width = this.offsetWidth;
            maxWidth = width > maxWidth ? width : maxWidth;
        });
        return { maxHeight, maxWidth };
    }
    setTabIndex(field) {
        $(field).attr("tabindex", "-1");
        field.removeEventListener("focus", this.preventFocus);
        field.addEventListener("focus", this.preventFocus);
    }
    preventFocus(objEvent) {
        $(objEvent.currentTarget).blur();
        objEvent.preventDefault();
        objEvent.stopImmediatePropagation();
    }
    preventTabClicks(formId) {
        const form = document.querySelector(`[${this.formAttribute} = ${formId}]`);
        form.removeEventListener("keydown", this.tabClickListener);
        form.addEventListener("keydown", this.tabClickListener);
    }
    tabClickListener(objEvent) {
        if (objEvent.keyCode == 9) {
            objEvent.preventDefault();
            objEvent.stopImmediatePropagation();
        }
    }
    clearCCData() {
        const form = document.querySelector("form[" + this.formAttribute + "=" + this.currentCCForm);
        this.clearMaskingField(form, CardField.NUMBER);
        this.clearMaskingField(form, CardField.NAME);
        this.clearMaskingField(form, CardField.LABEL);
        this.clearMaskingField(form, CardField.EXPIRATION);
        this.clearMaskingField(form, CardField.MONTH);
        this.clearMaskingField(form, CardField.YEAR);
        this.clearMaskingField(form, CardField.CVV);
        form.removeEventListener("keydown", this.tabClickListener);
        this.currentCCForm = null;
    }
    async clearMaskingField(form, name) {
        const field = form.querySelector(`[${this.attributeName} = ${name}]`);
        if (!field) {
            return;
        }
        await userAction.fill(field, "");
        this.removeMasking(field);
    }
    addDevToolsListener(masking, formId) {
        chrome.runtime.onMessage.removeListener(this.onMessageListener);
        this.currentCCForm = null;
        if (masking) {
            chrome.runtime.onMessage.addListener(this.onMessageListener);
            this.currentCCForm = formId;
            this.preventTabClicks(formId);
        }
        return;
    }
    onMessageListener(msg, sender) {
        this.devtoolsFunc(msg, sender);
        return false;
    }
    onMessageDevToolsFncIframeListener(msg, sender) {
        this.devtoolsFuncIframe(msg, sender);
        return false;
    }
    async devToolsOpened(request, _sender, _sendResponse) {
        if (request.action != "devToolsOpened") {
            return;
        }
        this.clearCCData();
    }
    addDevToolsListenerIframe(masking, element) {
        chrome.runtime.onMessage.removeListener(this.onMessageDevToolsFncIframeListener);
        this.currentCCForm = null;
        if (masking) {
            chrome.runtime.onMessage.addListener(this.onMessageDevToolsFncIframeListener);
            this.iframeElement = element;
            element.removeEventListener("keydown", this.tabClickListener);
            element.addEventListener("keydown", this.tabClickListener);
        }
        return;
    }
    async devToolsOpenedIframe(request, _sender, _sendResponse) {
        if (request.action != "devToolsOpened") {
            return;
        }
        try {
            await userAction.fill(this.iframeElement, "");
            this.removeMasking(this.iframeElement);
        }
        catch (e) {
            ZVError.error(e);
        }
    }
}
