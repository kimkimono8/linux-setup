import { VI18N } from "../../../../../service/vt/VI18n.js";
import { ChildUtil } from "../../../../../uiUtil/export.js";
import { GeneratorOutTextUIElem } from "./GeneratourOutTextElem.js";
export class GeneratorOutTextUIImpl {
    gg;
    elem = null;
    USED_PASS_CLASS = "zv-generator-used-pass";
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorOutTextUIElem(this.gg);
        js.fn.bindThis(this, [this.onGeneratedPasswordKeyDown]);
    }
    async showUI() {
        try {
            this.elem.init();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    setPassword(password) {
        try {
            const generatedPasswordElem = this.elem.generatedPasswordElem;
            js.dom.setContent(generatedPasswordElem, VUI.password.getColoredPassword(password));
            this.setColoredOut(true);
        }
        catch (e) {
            logError(e);
        }
    }
    getPassword() {
        try {
            return this.elem.generatedPasswordElem.textContent;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    setStrength(strength) {
        try {
            const strengthElem = this.elem.strengthElem;
            strengthElem.style.width = (strength || 10) + "%";
            let colors = ["#ff0000", "#F75D56", "#FAA53F", "#00C5E4", "#3EB17D", "#3EB17D"];
            strengthElem.style.backgroundColor = colors[(strength / 20) >> 0];
            this.setColoredOut(true);
        }
        catch (e) {
            logError(e);
        }
    }
    showStrengthBar(show) {
        try {
            js.dom.showIf(show, this.elem.strengthBarElem);
        }
        catch (e) {
            logError(e);
        }
    }
    setKeyListener(listener) {
        try {
            this.keyListener = listener;
        }
        catch (e) {
            logError(e);
        }
    }
    setColoredOut(enable) {
        try {
            if (enable) {
                this.elem.generatedPasswordElem.classList.remove(this.USED_PASS_CLASS);
                return;
            }
            this.elem.generatedPasswordElem.classList.add(this.USED_PASS_CLASS);
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.generatedPasswordElem.addEventListener("mouseenter", function () { this.focus(); });
            this.elem.generatedPasswordElem.addEventListener("mouseleave", function () { this.blur(); });
            this.elem.generatedPasswordElem.addEventListener("keydown", this.onGeneratedPasswordKeyDown);
            this.elem.generatedPasswordElem.addEventListener("copy", e => this.onSelectedCopyInput(e));
        }
        catch (e) {
            logError(e);
        }
    }
    onGeneratedPasswordKeyDown(e) {
        try {
            const isControlKey = js.event.isControlKey(e);
            if (isControlKey) {
                switch (e.key) {
                    case "Backspace":
                        setTimeout(() => this.keyListener(), 0);
                        break;
                }
                return;
            }
            js.event.preventDefault(e, true);
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const x = VUI.password.getColoredChar(e.key);
            const rangeEndElem = range.endContainer;
            this.addGeneratorChar(x, rangeEndElem);
            selection.removeAllRanges();
            range.setStart(x, x.childNodes.length);
            range.setEnd(x, x.childNodes.length);
            selection.addRange(range);
            this.keyListener();
            x?.scrollIntoView?.();
        }
        catch (e) {
            logError(e);
        }
    }
    addGeneratorChar(ch, rangeEndElem) {
        try {
            if (rangeEndElem instanceof HTMLDivElement) {
                rangeEndElem.append(ch);
                ChildUtil.removeIfPresent(rangeEndElem, "br");
                return;
            }
            if (rangeEndElem instanceof HTMLElement) {
                rangeEndElem.after(ch);
                return;
            }
            rangeEndElem.parentElement.after(ch);
        }
        catch (e) {
            logError(e);
        }
    }
    keyListener() { }
    async onSelectedCopyInput(e) {
        try {
            js.event.preventDefault(e, true);
            const password = document.getSelection().toString() || this.getPassword();
            await this.gg.generator.actions.copyPassword(password);
            VUI.tooltip.showElemMsg(this.elem.generatedPasswordElem, i18n(VI18N.COPIED));
        }
        catch (e) {
            logError(e);
        }
    }
}
