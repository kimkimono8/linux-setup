import { UIParent } from "../../../../uiUtil/ui/UIParent.js";
import { ThirdParty_OutputUIElem as UI_ELEM } from "./If_ThirdPartyShareUI.js";
const ELEM = {
    SHARED_MSG: "[data-shared_msg]",
    ENCRYPTION_KEY: "[data-key]",
    COPY: "[data-copy]",
    OK: "[data-ok]",
};
export class ThirdPartyShareOutputUI extends UIParent {
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#third_party_output_popup" });
        this.select(ELEM.OK).addEventListener("click", () => this.hideUI());
    }
    showUI() {
        document.body.append(this.elem);
        js.dom.showOld("#no_action_overlay");
        window.requestAnimationFrame(() => this.elem.style.opacity = "1");
    }
    hideUI() {
        this.elem.remove();
        js.dom.hideOld("#no_action_overlay");
    }
    setText(elem, text) {
        const reqElem = this.mapUIElem(elem);
        js.dom.setText(reqElem, text);
    }
    onCopyInput(listener) {
        this.select(ELEM.COPY).addEventListener("click", listener);
    }
    mapUIElem(elem) {
        switch (elem) {
            case UI_ELEM.ENCRYPTION_KEY: return this.select(ELEM.ENCRYPTION_KEY);
            case UI_ELEM.SHARED_MSG: return this.select(ELEM.SHARED_MSG);
            default:
                throw "not implemented";
        }
    }
}
