import { zcrypt } from "../../../../../../common/components/zcrypt.js";
import { ErrorCode } from "../../../../../../components/jsUtil/service/constants/ErrorCode.js";
import { Policy } from "../../../../../service/bgApi/types/Generator.js";
import { VI18N } from "../../../../../service/vt/VI18n.js";
import { GeneratorLengthInputUI } from "../comp/GeneratorLengthInput/GeneratorLengthInput.UI.js";
import { GeneratorPasswordOptionsElem } from "./GeneratorPasswordOptions.Elem.js";
export var GenerateInputFrom;
(function (GenerateInputFrom) {
    GenerateInputFrom["GENERATE_BUTTON"] = "GENERATE_BUTTON";
})(GenerateInputFrom || (GenerateInputFrom = {}));
export var GeneratorShowUIFrom;
(function (GeneratorShowUIFrom) {
    GeneratorShowUIFrom["MAIN_TAB"] = "MAIN_TAB";
})(GeneratorShowUIFrom || (GeneratorShowUIFrom = {}));
export class GeneratorPasswordOptions {
    gg;
    elem;
    lengthElem;
    curPolicy;
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorPasswordOptionsElem(this.gg);
        this.lengthElem = new GeneratorLengthInputUI(this.gg);
        js.fn.bindThis(this, [this.generate, this.inputListener, this.updateStrength, this.generatorGenerateListener]);
    }
    async showUI(from) {
        try {
            this.elem.init();
            this.createLengthInputUI();
            this.initPolicyInput();
            this.initCheckbox();
            this.initExcludeChars();
            await this.restoreValues(from);
            this.gg.generator.setGenerateListener(this.generatorGenerateListener);
            this.gg.generator.outUI.showStrengthBar(true);
            this.gg.generator.outUI.setKeyListener(this.updateStrength);
            js.dom.setContent(this.gg.generator.elem.select("#generator_mode_options"), this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    inputListener() {
        this.generate();
    }
    generatorGenerateListener() {
        this.generate(GenerateInputFrom.GENERATE_BUTTON);
    }
    async generate(from) {
        try {
            const password = await this.generatePassword(from);
            this.gg.generator.outUI.setPassword(password);
            this.gg.generator.data.newPasswordGenerated();
            this.updateStrength(password);
            this.saveState();
        }
        catch (e) {
            logError(e);
        }
    }
    async generatePassword(from) {
        try {
            const password = await bgApi.generator.generatePassword(this.getGeneratorInput());
            if (password) {
                return password;
            }
            if (from != GenerateInputFrom.GENERATE_BUTTON) {
                return "";
            }
            VUI.notification.showInfo(i18n(VI18N.GENERATOR_POLICY_DEFAULTS_USED));
            this.changePolicy(this.curPolicy.id);
            return await bgApi.generator.generatePassword(this.getGeneratorInput());
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    getGeneratorInput() {
        try {
            const input = {
                length: this.lengthElem.getLength(),
                reqLowercase: this.elem.lowercaseCheckbox.checked,
                reqUppercase: this.elem.uppercaseCheckbox.checked,
                reqSplChar: this.elem.splCharCheckbox.checked,
                reqNumber: this.elem.numberCheckbox.checked,
                noOfSplChar: this.curPolicy.no_of_splchar,
                excludeChars: this.elem.excludeCharsInput.value,
                startWithLetter: false,
            };
            return input;
        }
        catch (e) {
            logError(e);
            return {
                length: Policy.CUSTOM_POLICY_DEFAULT_LENGTH,
                reqLowercase: true,
                reqUppercase: true,
                reqSplChar: true,
                reqNumber: true,
                noOfSplChar: 0,
                excludeChars: "",
                startWithLetter: false
            };
        }
        ;
    }
    async saveState() {
        try {
            const input = this.getGeneratorInput();
            const saveGenerateOptions = {
                length: input.length,
                excludeChars: input.excludeChars,
                lowercase: input.reqLowercase,
                uppercase: input.reqUppercase,
                number: input.reqNumber,
                policyId: this.getPolicyId(),
                splChar: input.reqSplChar,
            };
            this.gg.generator.data.saveGeneratePasswordOptions(saveGenerateOptions);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreValues(from) {
        try {
            const options = this.gg.generator.data.state.passwordTab.options;
            this.changePolicy(options.policyId);
            this.lengthElem.setLength(options.length);
            this.elem.lowercaseCheckbox.checked = options.lowercase;
            this.elem.uppercaseCheckbox.checked = options.uppercase;
            this.elem.splCharCheckbox.checked = options.splChar;
            this.elem.numberCheckbox.checked = options.number;
            this.elem.excludeCharsInput.value = options.excludeChars;
            if (from == GeneratorShowUIFrom.MAIN_TAB) {
                const restored = await this.restoreGeneratedPassword();
                if (restored) {
                    return;
                }
            }
            await this.generate();
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreGeneratedPassword() {
        try {
            const state = this.gg.generator.data.state.passwordTab;
            if (!state?.lastUsedPassword?.password) {
                return false;
            }
            if (state.lastUsedPassword.validUpto < Date.now()) {
                return false;
            }
            const password = await zcrypt.extDecrypt(state.lastUsedPassword.password);
            this.gg.generator.outUI.setPassword(password);
            this.gg.generator.outUI.setColoredOut(false);
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    initExcludeChars() {
        try {
            this.elem.excludeCharsInput.addEventListener("input", () => this.inputListener());
        }
        catch (e) {
            logError(e);
        }
    }
    initCheckbox() {
        try {
            const listener = () => this.inputListener();
            this.elem.lowercaseCheckbox.addEventListener("input", listener);
            this.elem.uppercaseCheckbox.addEventListener("input", listener);
            this.elem.splCharCheckbox.addEventListener("input", listener);
            this.elem.numberCheckbox.addEventListener("input", listener);
        }
        catch (e) {
            logError(e);
        }
    }
    initPolicyInput() {
        try {
            js.dom.setContent(this.elem.policySelect, this.getPolicyOptions());
            const policyObj = $(this.elem.policySelect);
            policyObj.select2({
                minimumResultsForSearch: -1
            });
            policyObj.on("change", e => this.policyInputListener(e.target.value));
        }
        catch (e) {
            logError(e);
        }
    }
    getPolicyId() {
        try {
            return $(this.elem.policySelect).val();
        }
        catch (e) {
            logError(e);
            return "0";
        }
    }
    changePolicy(id) {
        try {
            const policy = this.gg.generator.data.policyList.find(x => x.id == id);
            if (!policy) {
                throw ErrorCode.NOT_FOUND;
            }
            this.curPolicy = policy;
            this.lengthElem.setLimits(policy.min_length, policy.max_length);
            const length = policy.id != Policy.CUSTOM_POLICY_ID ? policy.max_length : Policy.CUSTOM_POLICY_DEFAULT_LENGTH;
            this.lengthElem.setLength(length);
            this.elem.lowercaseCheckbox.checked = policy.req_lowercase;
            this.elem.uppercaseCheckbox.checked = policy.req_uppercase;
            this.elem.splCharCheckbox.checked = policy.req_splchar;
            this.elem.numberCheckbox.checked = policy.req_number;
            this.elem.excludeCharsInput.value = policy.exclude_chars;
            js.dom.setText(this.elem.noOfSplChars, policy.no_of_splchar ? policy.no_of_splchar + "" : "");
            $(this.elem.policySelect).val(id).trigger("change.select2");
        }
        catch (e) {
            logError(e);
        }
    }
    policyInputListener(policyId) {
        try {
            this.changePolicy(policyId);
            this.generate();
        }
        catch (e) {
            logError(e);
        }
    }
    getPolicyOptions() {
        try {
            const fragment = new DocumentFragment();
            const policies = this.gg.generator.data.policyList;
            policies.forEach(policy => fragment.append(new Option(policy.name, policy.id, false, false)));
            return fragment;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    createLengthInputUI() {
        try {
            const options = {
                min: 12,
                max: 99,
            };
            js.dom.setContent(this.elem.lengthInputOutElem, this.lengthElem.createUI(options));
            this.lengthElem.setInputListener(this.inputListener);
        }
        catch (e) {
            logError(e);
        }
    }
    async updateStrength(password) {
        try {
            const reqPassword = password || this.gg.generator.outUI.getPassword();
            const strength = await bgApi.generator.getComplexity(reqPassword);
            this.gg.generator.outUI.setStrength(strength);
        }
        catch (e) {
            logError(e);
        }
    }
}
