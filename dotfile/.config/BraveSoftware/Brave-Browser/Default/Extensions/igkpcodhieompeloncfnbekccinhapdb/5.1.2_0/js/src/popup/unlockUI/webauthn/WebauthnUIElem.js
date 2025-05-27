import { UIElemContainer } from "../../../uiUtil/export.js";
export class WebauthnUIElem extends UIElemContainer {
    unlockElem;
    loadingElem;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#webauthn_unlock_template" });
        this.unlockElem = this.select("[data-unlock]");
        this.loadingElem = this.select("[data-loading_container]");
    }
}
