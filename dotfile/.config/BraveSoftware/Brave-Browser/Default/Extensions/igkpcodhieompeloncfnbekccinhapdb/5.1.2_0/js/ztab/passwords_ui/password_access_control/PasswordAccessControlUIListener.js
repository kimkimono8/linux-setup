import { BasePasswordFormUIListener } from "../BasePasswordFormUIListener.js";
export class PasswordAccessControlUIListener extends BasePasswordFormUIListener {
    p = null;
    clickedSaveEnable() {
        this.p.updateAccessControl();
    }
    clickedRequestTimeoutLabel() {
        this.selectFocusInput("[data-request_timeout]");
    }
    clickedCheckoutTimeoutLabel() {
        this.selectFocusInput("[data-checkout_timeout]");
    }
    clickedFocusInput(e) {
        try {
            const elem = js.selector.closest(e.target, "[data-on_click_focus]");
            const selector = elem.dataset.on_click_focus;
            this.selectFocusInput(selector);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    clickedTimeInput(e) {
        const input = e.target;
        input.select();
        input.focus();
    }
    selectFocusInput(selector) {
        try {
            const input = this.p.select(selector);
            input.select();
            input.focus();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    handleAutoApproveInput(e) {
        try {
            const optionsContainer = this.p.select("[data-auto_approve_options]");
            const DISABLED_CLASS = "disabled";
            const enable = e.target.checked;
            if (enable) {
                optionsContainer.classList.remove(DISABLED_CLASS);
                js.dom.hideOld(js.selector.selectFrom(optionsContainer, "[data-overlay]"));
                js.selector.selectFrom(optionsContainer, "input[type='radio']").checked = true;
                return;
            }
            optionsContainer.classList.add(DISABLED_CLASS);
            js.dom.showOld(js.selector.selectFrom(optionsContainer, "[data-overlay]"));
            const options = js.selector.selectAll("input[type='radio']", optionsContainer);
            options.forEach(x => x.checked = false);
            const timeInputs = js.selector.selectAll("[data-time_container] select", optionsContainer);
            timeInputs.forEach(x => $(x).val("0").trigger("change.select2"));
        }
        catch (e) {
            throw jserror(e);
        }
    }
    handleNumberInputKeyDown(e) {
        try {
            const key = e.key;
            const input = e.target;
            let noOfDigits = 2;
            if (input.dataset.digits) {
                noOfDigits = parseInt(input.dataset.digits);
            }
            const minValue = parseInt(input.dataset.min);
            const maxValue = parseInt(input.dataset.max);
            const isNumberInput = key >= "0" && key <= "9";
            if (isNumberInput) {
                input.value = (input.value + key).slice(-noOfDigits);
                e.preventDefault();
                return;
            }
            const isArrowUp = key == "ArrowUp";
            if (isArrowUp) {
                input.value = this.getBoundedValue(parseInt(input.value) + 1, minValue, maxValue) + "";
                e.preventDefault();
                return;
            }
            const isArrowDown = key == "ArrowDown";
            if (isArrowDown) {
                input.value = this.getBoundedValue(parseInt(input.value) - 1, minValue, maxValue) + "";
                e.preventDefault();
                return;
            }
            const allowEvent = js.event.isControlKey(e);
            if (allowEvent) {
                return;
            }
            e.preventDefault();
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getBoundedValue(val, min, max) {
        return Math.min(Math.max(min, val), max);
    }
    handleNumberInputBlur(e) {
        try {
            const input = e.target;
            const value = parseInt(input.value);
            const minValue = parseInt(input.dataset.min);
            const maxValue = parseInt(input.dataset.max);
            const reqMinReset = value < minValue;
            if (reqMinReset) {
                input.value = minValue + "";
                return;
            }
            const reqMaxReset = value > maxValue;
            if (reqMaxReset) {
                input.value = maxValue + "";
                return;
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
