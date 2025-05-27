import { PositionUtil } from "../../common/common.js";
export class ZTabGeneratorUI {
    containerId = "generator_container";
    targetHighlightClass = "action-icon-list-selected";
    input;
    generator;
    init() {
        try {
            this.init = js.fn.emptyFn;
            this.generator = VUI.components.createGeneratorUI();
            this.generator.history.disableRestore();
            this.generator.history.listCreator.setOnUseListener(password => this.fillOnUI(password));
            js.fn.bindThis(this, [this.onDocumentClick]);
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI(input) {
        try {
            this.init();
            this.input = input;
            this.generator.showUI();
            this.addListeners();
            this.positionUI();
        }
        catch (e) {
            logError(e);
        }
    }
    positionUI() {
        try {
            const position = PositionUtil.newPositionInput();
            position.target.elem = this.input.targetElem;
            position.popupElem = this.generator.elem.container;
            position.alignLeft = false;
            position.containerId = this.containerId;
            position.adjust.right_x = 25;
            PositionUtil.positionElem(position);
            this.input.targetElem.classList.add(this.targetHighlightClass);
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            const fillElem = this.generator.elem.select(`[data-action="fill"]`);
            fillElem.addEventListener("click", () => this.onFill());
            document.removeEventListener("click", this.onDocumentClick, true);
            document.addEventListener("click", this.onDocumentClick, true);
        }
        catch (e) {
            logError(e);
        }
    }
    onDocumentClick(e) {
        try {
            const rect = this.generator.elem.container.getBoundingClientRect();
            const isInsideClick = rect.left <= e.x && e.x <= rect.right
                && rect.top <= e.y && e.y <= rect.bottom;
            if (isInsideClick) {
                return;
            }
            this.closeUI();
            document.removeEventListener("click", this.onDocumentClick, true);
        }
        catch (e) {
            logError(e);
        }
    }
    closeUI() {
        try {
            js.dom.removeElem("#" + this.containerId);
            this.input.targetElem.classList.remove(this.targetHighlightClass);
        }
        catch (e) {
            logError(e);
        }
    }
    async onFill() {
        try {
            const password = this.generator.outUI.getPassword();
            await this.fillOnUI(password);
            this.generator.data.saveLastUsedPassword(password);
        }
        catch (e) {
            logError(e);
        }
    }
    async fillOnUI(password) {
        try {
            this.closeUI();
            VUI.password.showText(this.input.inputElem);
            this.input.inputElem.value = password;
            this.clearInputErrors();
            await js.time.delay(0.8);
            VUI.password.hideText(this.input.inputElem);
        }
        catch (e) {
            logError(e);
        }
    }
    clearInputErrors() {
        try {
            const fieldRowElem = js.selector.closest(this.input.inputElem, "[data-field_row]");
            js.dom.setChildText(fieldRowElem, "[data-error]", "");
        }
        catch (e) {
            logError(e);
        }
    }
}
