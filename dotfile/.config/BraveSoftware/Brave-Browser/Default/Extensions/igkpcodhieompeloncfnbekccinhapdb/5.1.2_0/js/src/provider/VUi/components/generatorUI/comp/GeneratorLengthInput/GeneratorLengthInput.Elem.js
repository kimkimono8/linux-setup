import { UIElemContainer } from "../../../../../../uiUtil/export.js";
export class GeneratorLengthInputElem extends UIElemContainer {
    gg;
    constructor(gg) {
        super();
        this.gg = gg;
        this.gg;
    }
    minTextElem;
    maxTextElem;
    labelElem;
    sliderBarElem;
    lengthInput;
    sliderInput;
    init() {
        try {
            this.container = VUI.createElem({ template: "#generator_length_input_template" });
            this.minTextElem = this.select(`[data-content="minLength"]`);
            this.maxTextElem = this.select(`[data-content="maxLength"]`);
            this.labelElem = this.select(`[data-content="label"]`);
            this.sliderBarElem = this.select(`[data-name="sliderBar"]`);
            this.lengthInput = this.select(`[data-input="length"]`);
            this.sliderInput = this.select(`[data-input="lengthSlider"]`);
        }
        catch (e) {
            logError(e);
        }
    }
}
