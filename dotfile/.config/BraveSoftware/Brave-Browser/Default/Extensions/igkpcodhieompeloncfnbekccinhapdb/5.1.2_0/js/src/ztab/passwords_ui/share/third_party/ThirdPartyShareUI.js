import { InvalidCharConsumer } from "../../../../../common/ui/util/InvalidCharConsumer.js";
import { regexUtil } from "../../../../../common/util/regexUtil.js";
import { VI18N } from "../../../../service/vt/VI18n.js";
import { UIParent } from "../../../../uiUtil/ui/UIParent.js";
import { PasswordShareController } from "../PasswordShareController.js";
import { ThirdParty_UIElem } from "./If_ThirdPartyShareUI.js";
const ELEM = {
    EMAIL: "[data-email]",
    TIME_SELECT: "[data-time_select]",
    MESSAGE: "[data-message]",
    ROW: "[data-field_row]",
    ERROR: "[data-error]",
    LOADING: "[data-loading]",
    SHARING_RESTRICTED: "[data-sharing_restricted]",
    SHARING_FORM: "form"
};
export class ThirdPartyShareUI extends UIParent {
    static createInstance() {
        const obj = new ThirdPartyShareUI();
        obj.init();
        return obj;
    }
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#third_party_share_template" });
        this.clearErrorsOnInput();
        this.initTimeSelect();
        this.initFormEnter();
        this.consumeInvalidChars();
    }
    consumeInvalidChars() {
        new InvalidCharConsumer().consumeInvalidChars(this.select(ELEM.MESSAGE), regexUtil.vaultRegex.cleartext);
    }
    clearErrorsOnInput() {
        this.select(ELEM.EMAIL).addEventListener("input", e => this.setError(e.target, ""));
        this.select(ELEM.MESSAGE).addEventListener("input", e => this.setError(e.target, ""));
    }
    initTimeSelect() {
        const timeSelect = this.select(ELEM.TIME_SELECT);
        const minutesOptions = [30, 45];
        const minutesSuffix = " " + i18n(VI18N.MINUTES);
        minutesOptions.forEach(minute => timeSelect.append(new Option(minute + minutesSuffix, minute + "")));
        timeSelect.append(new Option("1 " + i18n(VI18N.HOUR), (1 * 60) + ""));
        const hoursSuffix = " " + i18n(VI18N.HOURS);
        for (let hour = 2; hour <= 24; hour++) {
            timeSelect.append(new Option(hour + hoursSuffix, (hour * 60) + ""));
        }
        const selectedOption = timeSelect.querySelector(`option[value='30']`);
        if (selectedOption) {
            selectedOption.selected = true;
        }
        $(timeSelect).select2({
            minimumResultsForSearch: -1
        });
    }
    initFormEnter() {
        const formElem = this.select("form");
        formElem.onsubmit = () => false;
        js.event.onEnter(formElem, this.focusNextElem, this);
    }
    focusNextElem() {
        const focusableElems = this.selectAll(ELEM.ROW).map(x => js.selector.selectFrom(x, "input,select,textarea"));
        const currentElem = document.activeElement;
        const elemIndex = focusableElems.indexOf(currentElem);
        if (elemIndex < 0 || elemIndex >= (focusableElems.length - 1)) {
            return;
        }
        const nextElem = focusableElems[elemIndex + 1];
        nextElem.focus();
    }
    setError(input, errorMessage) {
        const rowElem = js.selector.closest(input, ELEM.ROW);
        const errorElem = js.selector.selectFrom(rowElem, ELEM.ERROR);
        js.dom.setText(errorElem, errorMessage);
    }
    execute(fn) {
        fn.call(this);
    }
    setUIContent() {
        js.dom.setContent("#share_password_container [data-sharing_tab_container]", this.elem);
    }
    showUI() {
        this.show(ELEM.SHARING_FORM);
        this.select(ELEM.EMAIL).focus();
        PasswordShareController.getUI().showThirdPartyShareButton();
        this.hide(ELEM.LOADING);
    }
    showRestrictedUI() {
        this.show(ELEM.SHARING_RESTRICTED);
        this.hide(ELEM.LOADING);
    }
    onEmailBlurInput(listener) {
        this.select(ELEM.EMAIL).addEventListener("blur", listener);
    }
    getEmail() {
        return this.select(ELEM.EMAIL).value;
    }
    setErrorMessage(errorElem, errorMessage) {
        const inputElem = this.mapUIElem(errorElem);
        this.setError(inputElem, errorMessage);
        inputElem.focus();
    }
    getValue(inputElem) {
        switch (inputElem) {
            case ThirdParty_UIElem.EMAIL: return this.select(ELEM.EMAIL).value.trim();
            case ThirdParty_UIElem.TIME: return $(this.select(ELEM.TIME_SELECT)).select2().val();
            case ThirdParty_UIElem.MESSAGE: return this.select(ELEM.MESSAGE).value;
            default:
                throw "not implemented";
        }
    }
    mapUIElem(inputElem) {
        switch (inputElem) {
            case ThirdParty_UIElem.EMAIL: return this.select(ELEM.EMAIL);
            case ThirdParty_UIElem.TIME: return this.select(ELEM.TIME_SELECT);
            case ThirdParty_UIElem.MESSAGE: return this.select(ELEM.MESSAGE);
            default:
                throw "not implemented";
        }
    }
}
