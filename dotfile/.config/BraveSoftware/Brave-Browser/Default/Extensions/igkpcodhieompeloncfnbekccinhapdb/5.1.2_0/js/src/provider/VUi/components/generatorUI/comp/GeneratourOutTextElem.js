import { UIElemContainer } from "../../../../../uiUtil/export.js";
export class GeneratorOutTextUIElem extends UIElemContainer {
    gg;
    generatedPasswordElem;
    strengthBarElem;
    strengthElem;
    constructor(gg) {
        super();
        this.gg = gg;
    }
    init() {
        this.container = this.gg.generator.elem.container;
        this.generatedPasswordElem = this.select(`[data-name="generatedPassword"]`);
        this.strengthElem = this.select(`[data-name="passwordStrength"]`);
        this.strengthBarElem = this.select(`[data-name="strength_bar"]`);
    }
}
