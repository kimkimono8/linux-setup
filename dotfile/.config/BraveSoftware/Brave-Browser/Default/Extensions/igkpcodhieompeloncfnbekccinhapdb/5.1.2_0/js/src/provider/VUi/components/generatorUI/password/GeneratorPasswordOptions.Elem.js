import { UIElemContainer } from "../../../../../uiUtil/export.js";
export class GeneratorPasswordOptionsElem extends UIElemContainer {
    gg;
    constructor(gg) {
        super();
        this.gg = gg;
        this.gg;
    }
    lengthInputOutElem;
    policySelect;
    lowercaseCheckbox;
    uppercaseCheckbox;
    splCharCheckbox;
    numberCheckbox;
    noOfSplChars;
    excludeCharsInput;
    init() {
        this.container = VUI.createElem({ template: "#password_generator_options_template", preRender: true });
        this.lengthInputOutElem = this.select(`[data-out="lengthInput"]`);
        this.policySelect = this.select(`[data-input="policy"]`);
        this.lowercaseCheckbox = this.select(`[data-input="lowercase"]`);
        this.uppercaseCheckbox = this.select(`[data-input="uppercase"]`);
        this.splCharCheckbox = this.select(`[data-input="specialchars"]`);
        this.numberCheckbox = this.select(`[data-input="numbers"]`);
        this.noOfSplChars = this.select(`[data-text="noOfSplChars"]`);
        this.excludeCharsInput = this.select(`[data-input="excludeChar"]`);
    }
}
