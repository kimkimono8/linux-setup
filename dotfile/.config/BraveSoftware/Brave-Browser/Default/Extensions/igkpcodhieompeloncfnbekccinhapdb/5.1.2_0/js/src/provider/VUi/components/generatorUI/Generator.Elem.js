import { UIElemContainer } from "../../../../uiUtil/export.js";
export class GeneratorUIElem extends UIElemContainer {
    init() {
        this.container = UIUtil.createElem({ template: "#page_generator", preRender: true });
    }
}
