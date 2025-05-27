import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
export class SFMainUI extends UIParent {
    uiNames = {
        addPasswordPlus: `[data-name="addPasswordPlus"]`
    };
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#main_ui_template" });
    }
    showUI() {
        document.body.append(this.elem);
    }
    setArrow(arrowClass) {
        const marginClass = arrowClass.includes("top") ? "m-t-10" : "m-b-10";
        document.body.classList.remove("m-t-10");
        document.body.classList.add(marginClass);
        this.select("#arrow").className = "zvd-panel-arrow-" + arrowClass;
    }
    showLocked() {
        const lockedElem = UIUtil.createElem({ template: "#vault_locked_template" });
        js.dom.setContent(this.select("#main_out"), lockedElem);
    }
    onUnlockInput(listener) {
        this.select(`[data-name="unlock"]`).addEventListener("click", listener);
    }
    onShowPasswordsInput(listener) {
        this.select(`[data-name="showPasswordsTab"]`).addEventListener("click", listener);
    }
    onShowGeneratorInput(listener) {
        this.select(`[data-name="showGeneratorTab"]`).addEventListener("click", listener);
    }
    highlightTab(tabName) {
        try {
            js.selector.select(".zvd-nav-selected").classList.remove("zvd-nav-selected");
            js.selector.select("[data-tabIcon='" + tabName + "']").classList.add("zvd-nav-selected");
        }
        catch (e) {
            logError(e);
        }
    }
    setAddPasswordPlusVisible(visible) {
        this.showIf(visible, this.uiNames.addPasswordPlus);
    }
    onAddPasswordInput(listener) {
        this.select(this.uiNames.addPasswordPlus).addEventListener("click", listener);
    }
    setAddPasswordEnable(enable) {
        const addPassworPlus = this.select(this.uiNames.addPasswordPlus);
        if (enable) {
            addPassworPlus.classList.remove("disabled");
            addPassworPlus.dataset.tooltip_content = "i18n:add_password";
            return;
        }
        addPassworPlus.classList.add("disabled");
        addPassworPlus.dataset.tooltip_content = "i18n:add_password_restricted";
    }
}
