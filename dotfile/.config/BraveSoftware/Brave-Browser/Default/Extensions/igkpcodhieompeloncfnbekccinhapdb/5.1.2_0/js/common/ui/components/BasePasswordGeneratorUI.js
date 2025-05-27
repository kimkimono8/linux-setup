import { GeneratorInput } from "../../../src/service/bgApi/types/Generator.js";
import { ChildUtil } from "../../../src/uiUtil/export.js";
import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
import { InvalidCharConsumer } from "../util/InvalidCharConsumer.js";
const uiNames = {
    generatedPassword: `[data-name="generatedPassword"]`,
};
export class BasePasswordGeneratorUI extends UIParent {
    generatedPasswordElem = null;
    optionListElem = null;
    modeOptionsElem = null;
    policyListElem = null;
    passwordLengthElem = null;
    lengthSliderElem = null;
    checkboxElem = null;
    excludeCharElem = null;
    init() {
        this.elem = UIUtil.createElem({ template: "#page_generator", preRender: true });
        this.generatedPasswordElem = new BaseGeneratedPasswordElem(this.select(`[data-part="generatedPassword"]`));
        this.generatedPasswordElem.init();
        this.modeOptionsElem = this.select("#generator_mode_options");
        this.initOptionListElem();
        this.policyListElem = new PolicyListElem(this.select(`[data-part="policyList"]`));
        this.policyListElem.init();
        this.passwordLengthElem = new PasswordLengthElem(this.select(`[data-part="passwordLengthInput"]`));
        this.passwordLengthElem.init();
        this.lengthSliderElem = new BasePasswordGeneratorLengthSliderElem(this.select(`[data-part="sliderLengthInput"]`));
        this.lengthSliderElem.init();
        this.checkboxElem = new CheckBoxElem(this.select(`[data-part="checkBoxInput"]`));
        this.excludeCharElem = new ExcludeCharElem(this.select(`[data-part="excludeChar"]`));
    }
    initOptionListElem() {
        this.optionListElem = new BaseOptionListElem(this.select(`[data-part="optionList"]`));
    }
}
class BaseGeneratedPasswordElem extends UIParent {
    keyInputListener = js.fn.emptyFn;
    constructor(elem) {
        super();
        this.elem = elem;
    }
    init() {
        const generatedPasswordElem = this.getGeneratedPasswordElem();
        generatedPasswordElem.addEventListener("keydown", e => {
            const isControlKey = js.event.isControlKey(e);
            if (isControlKey) {
                switch (e.key) {
                    case "Backspace":
                        setTimeout(() => this.keyInputListener(), 0);
                        break;
                }
                return;
            }
            js.event.preventDefault(e, true);
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const x = VUI.password.getColoredChar(e.key);
            const rangeEndElem = range.endContainer;
            if (rangeEndElem instanceof HTMLDivElement) {
                rangeEndElem.append(x);
                ChildUtil.removeIfPresent(rangeEndElem, "br");
            }
            else if (rangeEndElem instanceof HTMLElement) {
                rangeEndElem.after(x);
            }
            else {
                rangeEndElem.parentElement.after(x);
            }
            selection.removeAllRanges();
            range.setStart(x, x.childNodes.length);
            range.setEnd(x, x.childNodes.length);
            selection.addRange(range);
            this.keyInputListener();
        });
        generatedPasswordElem.addEventListener("mouseenter", function () {
            this.focus();
        });
        generatedPasswordElem.addEventListener("mouseleave", function () {
            this.blur();
        });
    }
    onKeyInput(listener) {
        this.keyInputListener = listener;
    }
    onCopyInput(listener) {
        this.getGeneratedPasswordElem().addEventListener("copy", listener);
    }
    setPassword(password) {
        const generatedPasswordElem = this.select(uiNames.generatedPassword);
        js.dom.setContent(generatedPasswordElem, VUI.password.getColoredPassword(password));
        generatedPasswordElem.dataset.expired = "";
    }
    getPassword() {
        try {
            const generatedPasswordElem = this.select(uiNames.generatedPassword);
            return generatedPasswordElem.textContent;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    setStrength(strength) {
        const strengthElem = this.select(`[data-name="passwordStrength"]`);
        strengthElem.style.width = (strength || 10) + "%";
        let colors = ["#ff0000", "#F75D56", "#FAA53F", "#00C5E4", "#3EB17D", "#3EB17D"];
        strengthElem.style.backgroundColor = colors[(strength / 20) >> 0];
    }
    getGeneratedPasswordElem() {
        return this.select(`[data-name="generatedPassword"]`);
    }
}
export class BaseOptionListElem extends UIParent {
    constructor(elem) {
        super();
        this.elem = elem;
    }
    onSaveInput(listener) {
        this.select('[data-name="saveGeneratedPassword"]').addEventListener("click", listener);
    }
    onCopyInput(listener) {
        this.select('[data-name="copyGeneratedPassword"]').addEventListener("click", listener);
    }
    onGenerateInput(listener) {
        this.select('[data-name="generateNewPassword"]').addEventListener("click", listener);
    }
    onShowHistoryInput(listener) {
        this.select('[data-name="showGeneratorHistory"]').addEventListener("click", listener);
    }
}
class PolicyListElem extends UIParent {
    constructor(elem) {
        super();
        this.elem = elem;
    }
    init() {
        $(this.select("select")).select2({
            minimumResultsForSearch: -1
        });
    }
    onPolicySelectInput(listener) {
        $(this.select("select")).on("change", e => listener(e.target.value));
    }
    setPolicies(policies, selectedPolicyId = "0") {
        const policyElem = this.select("#policies");
        const fragment = new DocumentFragment();
        policyElem.textContent = "";
        policies.forEach(policy => fragment.append(new Option(policy.name, policy.id, false, policy.id == selectedPolicyId)));
        policyElem.append(fragment);
    }
}
class PasswordLengthElem extends UIParent {
    minLength = 8;
    maxLength = 99;
    callbackListener = (_length = 0) => { };
    constructor(elem) {
        super();
        this.elem = elem;
    }
    init() {
        const input = this.select("input");
        input.addEventListener("click", e => e.target.select());
        new InvalidCharConsumer().consumeInvalidChars(input, /[0-9]/);
        input.addEventListener("blur", () => this.adjustAndCallCallback());
        input.addEventListener("paste", () => this.adjustAndCallCallback());
        input.addEventListener("keydown", this.keyDownInput.bind(this));
    }
    setLengthBounds(min = 8, max = 99) {
        this.minLength = min;
        this.maxLength = max;
    }
    onLengthInput(listener) {
        this.callbackListener = listener;
    }
    setLength(length) {
        this.select("input").value = length + "";
    }
    adjustAndCallCallback() {
        const length = this.getBoundedLength();
        this.setLength(length);
        this.callCallBack();
    }
    callCallBack() {
        const length = this.getBoundedLength();
        this.callbackListener(length);
    }
    keyDownInput(e) {
        const key = e.key;
        const input = e.target;
        if (key >= '0' && key <= '9') {
            input.value = (input.value + key).slice(-2);
            e.preventDefault();
        }
        else if (key == "ArrowUp") {
            this.addValue(1);
            e.preventDefault();
        }
        else if (key == "ArrowDown") {
            this.addValue(-1);
            e.preventDefault();
        }
        this.callCallBack();
    }
    addValue(n) {
        const input = this.select("input");
        const value = ((parseInt(input.value) || 0) + n);
        input.value = this.getPolicyBoundValue(value) + "";
    }
    getBoundedLength() {
        const input = this.select("input");
        const value = (parseInt(input.value) || 0);
        return this.getPolicyBoundValue(value);
    }
    getPolicyBoundValue(value) {
        return this.getBoundedValue(this.minLength, this.maxLength, value);
    }
    getBoundedValue(min, max, value) {
        return Math.min(Math.max(min, value), max);
    }
}
class BasePasswordGeneratorLengthSliderElem extends UIParent {
    callbackListener = (_length = 0) => { };
    constructor(elem) {
        super();
        this.elem = elem;
    }
    init() {
        const input = this.select("input");
        this.sliderLengthInput = js.fn.wrapper.createSingleInstListener(this.sliderLengthInput, this);
        input.addEventListener("input", () => this.sliderLengthInput());
        const updateSliderBarFn = js.fn.wrapper.createSingleInstListener(this.updateSliderBar, this);
        input.addEventListener("input", updateSliderBarFn);
    }
    setLengthBounds(min = 8, max = 99) {
        const input = this.select("input");
        input.min = min + "";
        input.max = max + "";
        this.setMinMaxText(min, max);
    }
    setMinMaxText(min, max) {
        this.text(`[data-name="minLength"]`, min + "");
        this.text(`[data-name="maxLength"]`, max + "");
    }
    onLengthInput(listener) {
        this.callbackListener = listener;
    }
    setLength(length) {
        this.select("input").value = length + "";
        this.updateSliderBar();
    }
    async sliderLengthInput() {
        const inputValue = this.select("input").value;
        this.callbackListener(+inputValue);
        await js.time.delay(0.15);
    }
    updateSliderBar() {
        const inputElem = this.select("input");
        const min = +inputElem.min;
        const max = +inputElem.max;
        const value = +inputElem.value;
        const percent = 100 / (max - min) * (value - min);
        const sliderLengthElem = this.select(".sliderBar");
        sliderLengthElem.style.width = percent + "%";
    }
}
class CheckBoxElem extends UIParent {
    constructor(elem) {
        super();
        this.elem = elem;
    }
    onInput(listener) {
        this.addListener(GeneratorInput.REQ_LOWERCASE, listener);
        this.addListener(GeneratorInput.REQ_UPPERCASE, listener);
        this.addListener(GeneratorInput.REQ_NUMBER, listener);
        this.addListener(GeneratorInput.REQ_SPL_CHAR, listener);
    }
    addListener(keyName, listener) {
        this.getCheckbox(keyName).addEventListener("input", e => listener(keyName, e.target.checked));
    }
    setCheckbox(keyName, checked) {
        this.getCheckbox(keyName).checked = checked;
    }
    setSpecialCharCount(count) {
        this.select("#no_of_spl_chars").textContent = count ? count + "" : "";
    }
    toggleCheckbox(keyName, enable) {
        enable ? this.enableCheckbox(keyName) : this.disableCheckbox(keyName);
    }
    disableCheckbox(keyName) {
        const input = this.getCheckbox(keyName);
        input.checked = false;
        input.disabled = true;
        input.parentElement.classList.add("disabled");
    }
    enableCheckbox(keyName) {
        const input = this.getCheckbox(keyName);
        input.disabled = false;
        input.parentElement.classList.remove("disabled");
    }
    getCheckbox(keyName) {
        return this.select(this.getSelector(keyName));
    }
    getSelector(keyName) {
        switch (keyName) {
            case GeneratorInput.REQ_LOWERCASE: return `input[data-name="lowercase"]`;
            case GeneratorInput.REQ_UPPERCASE: return `input[data-name="uppercase"]`;
            case GeneratorInput.REQ_NUMBER: return `input[data-name="numbers"]`;
            case GeneratorInput.REQ_SPL_CHAR: return `input[data-name="specialchars"]`;
            default:
                throw "INVALID_KEYNAME " + keyName;
        }
    }
}
class ExcludeCharElem extends UIParent {
    constructor(elem) {
        super();
        this.elem = elem;
    }
    onInput(listener) {
        const input = this.select("input");
        input.addEventListener("input", e => listener(e.target.value));
    }
    setExcludeChars(chars) {
        const input = this.select("input");
        input.value = chars;
    }
}
