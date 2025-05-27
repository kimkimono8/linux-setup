import { UIElemContainer } from "../../../../../uiUtil/export.js";
export class GeneratorPassphraseOptionsElem extends UIElemContainer {
    gg;
    constructor(gg) {
        super();
        this.gg = gg;
        this.gg;
    }
    wordCountOutElem;
    capitalCheckbox;
    numberCheckbox;
    separatorInput;
    init() {
        this.container = VUI.createElem({ template: "#passphrase_generator_options_template", preRender: true });
        this.wordCountOutElem = this.select(`[data-out="wordCountInput"]`);
        this.capitalCheckbox = this.select(`[data-input="capital"]`);
        this.numberCheckbox = this.select(`[data-input="numbers"]`);
        this.separatorInput = this.select(`[data-input="separator"]`);
    }
}
