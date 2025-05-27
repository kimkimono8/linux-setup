import { SFGeneratorActionsUI } from "./SFGeneratorActionsUI.js";
export class SFGeneratorUI {
    generator;
    actionsUI;
    constructor() {
        this.generator = VUI.components.createGeneratorUI();
        this.actionsUI = new SFGeneratorActionsUI(this.generator);
    }
    init() {
        try {
            this.init = js.fn.emptyFn;
            this.generator.setOutputElem("#main_out");
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI() {
        try {
            this.init();
            await this.generator.showUI();
            this.actionsUI.init();
        }
        catch (e) {
            logError(e);
        }
    }
}
