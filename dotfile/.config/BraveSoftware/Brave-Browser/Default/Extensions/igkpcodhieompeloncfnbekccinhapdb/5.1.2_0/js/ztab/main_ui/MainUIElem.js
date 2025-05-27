import { UIElemContainer } from "../../src/uiUtil/export.js";
export class MainUIElem extends UIElemContainer {
    syncIcon;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#main_ui_template" });
        this.syncIcon = this.select("#syncIcon");
    }
}
