import { InputType } from "../../src/service/vt/constants/InputType.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
export class BaseSavePasswordHandler {
    saveDisabled = false;
    async init() {
        try {
            js.fn.bindThis(this, [
                this.check,
                this.handleClick,
                this.onDomInput,
            ]);
            this.finishSave = js.fn.wrapper.createSingleInstance(this.finishSave, this);
            this.saveDisabled = await this.checkNeedSaveDisable();
        }
        catch (e) {
            logError(e);
        }
    }
    async disableSave() {
        try {
            this.saveDisabled = true;
        }
        catch (e) {
            logError(e);
        }
    }
    async enableSave() {
        try {
            this.saveDisabled = false;
        }
        catch (e) {
            logError(e);
        }
    }
    initDomListeners() {
        try {
            document.addEventListener("input", this.onDomInput, true);
            document.addEventListener("submit", this.finishSave, true);
            document.addEventListener("click", this.handleClick, true);
        }
        catch (e) {
            logError(e);
        }
    }
    onDomInput(e) {
        try {
            const target = csutil.dom.getEventTarget(e);
            if (target instanceof HTMLInputElement) {
                this.check(target);
                return;
            }
            if (target instanceof HTMLTextAreaElement) {
                return;
            }
            const activeInput = csutil.input.getActiveInput();
            if (!activeInput) {
                return;
            }
            this.check(activeInput);
        }
        catch (e) {
            logError(e);
        }
    }
    async checkNeedSaveDisable() {
        try {
            const autoSave = await zlocalStorage.load(LocalStorageKeys.AUTO_SAVE_UPDATE_PASSWORDS, true);
            if (!autoSave) {
                return true;
            }
            const isNeverSaveUrl = await bgApi.tab.isNeverSaveUrl();
            if (isNeverSaveUrl) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    handleClick(e) {
        try {
            const isSubmitClick = this.isSubmitClick(e);
            if (isSubmitClick) {
                this.finishSave();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    isSubmitClick(e) {
        try {
            const target = csutil.dom.getEventTarget(e);
            const isInputElement = target instanceof HTMLInputElement;
            if (isInputElement) {
                if (target.type == InputType.SUBMIT) {
                    return true;
                }
                if (zicon.hasZIcon(target)) {
                    return false;
                }
            }
            const isPointableElem = window.getComputedStyle(target).cursor == "pointer";
            if (isPointableElem) {
                return true;
            }
            const checkSubmitInPoint = Number.isFinite(e.clientX) && Number.isFinite(e.clientY);
            if (checkSubmitInPoint) {
                const pointElements = csutil.dom.getElementsFromPoint({ x: e.clientX, y: e.clientY });
                const hasSubmitInPoint = pointElements.some(x => (x instanceof HTMLInputElement) && (x.type == "submit"));
                if (hasSubmitInPoint) {
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
}
