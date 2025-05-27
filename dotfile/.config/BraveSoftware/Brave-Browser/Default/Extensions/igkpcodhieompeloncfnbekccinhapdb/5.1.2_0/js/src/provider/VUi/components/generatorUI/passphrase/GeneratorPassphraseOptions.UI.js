import { zcrypt } from "../../../../../../common/components/zcrypt.js";
import { GeneratorLengthInputUI } from "../comp/GeneratorLengthInput/GeneratorLengthInput.UI.js";
import { GenerateInputFrom, GeneratorShowUIFrom } from "../password/GeneratorPasswordOptions.UI.js";
import { GeneratorPassphraseOptionsElem } from "./GeneratorPassphraseOptions.Elem.js";
export class GeneratorPassphraseOptions {
    gg;
    elem;
    wordCountElem;
    words;
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorPassphraseOptionsElem(this.gg);
        this.wordCountElem = new GeneratorLengthInputUI(this.gg);
        js.fn.bindThis(this, [this.generate, this.inputListener, this.generatorGenerateListener]);
    }
    async showUI(from) {
        try {
            this.elem.init();
            this.createWordCountInputUI();
            this.initCheckbox();
            this.initSeparatorInput();
            await this.restoreValues(from);
            this.gg.generator.setGenerateListener(this.generatorGenerateListener);
            this.gg.generator.outUI.showStrengthBar(false);
            this.gg.generator.outUI.setKeyListener(js.fn.emptyFn);
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
            const input = {
                noOfWords: this.wordCountElem.getLength(),
                reqCapital: this.elem.capitalCheckbox.checked,
                reqNumber: this.elem.numberCheckbox.checked,
                separator: this.elem.separatorInput.value,
            };
            if (from != GenerateInputFrom.GENERATE_BUTTON) {
                input.words = this.words;
            }
            const passphraseOutput = await bgApi.generator.generatePassphrase(input);
            this.words = passphraseOutput.words;
            this.gg.generator.outUI.setPassword(passphraseOutput.passphrase);
            this.gg.generator.data.newPasswordGenerated();
            this.saveState(input);
        }
        catch (e) {
            logError(e);
        }
    }
    async restoreValues(from) {
        try {
            const options = this.gg.generator.data.state.passphraseTab.options;
            this.wordCountElem.setLength(options.noOfWords);
            this.elem.capitalCheckbox.checked = options.reqCapital;
            this.elem.numberCheckbox.checked = options.reqNumber;
            this.elem.separatorInput.value = options.separator;
            this.words = options.words;
            if (from == GeneratorShowUIFrom.MAIN_TAB) {
                const restored = await this.restoreGeneratedPassphrase();
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
    async restoreGeneratedPassphrase() {
        try {
            const state = this.gg.generator.data.state.passphraseTab;
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
    async saveState(input) {
        try {
            this.gg.generator.data.saveGeneratePassphraseOptions(input);
        }
        catch (e) {
            logError(e);
        }
    }
    initSeparatorInput() {
        try {
            const input = this.elem.separatorInput;
            input.addEventListener("click", e => e.target.select());
            const listener = () => this.inputListener();
            input.addEventListener("paste", listener);
            input.addEventListener("input", listener);
        }
        catch (e) {
            logError(e);
        }
    }
    initCheckbox() {
        try {
            const listener = () => this.inputListener();
            this.elem.capitalCheckbox.addEventListener("input", listener);
            this.elem.numberCheckbox.addEventListener("input", listener);
        }
        catch (e) {
            logError(e);
        }
    }
    createWordCountInputUI() {
        try {
            const options = {
                min: 4,
                max: 10,
                label: i18n("no_of_words")
            };
            js.dom.setContent(this.elem.wordCountOutElem, this.wordCountElem.createUI(options));
            this.wordCountElem.setInputListener(this.inputListener);
        }
        catch (e) {
            logError(e);
        }
    }
}
