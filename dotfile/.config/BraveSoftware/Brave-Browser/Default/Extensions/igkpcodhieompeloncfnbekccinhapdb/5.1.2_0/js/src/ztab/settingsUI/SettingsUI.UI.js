import { VaultCSS } from "../../service/VUi/VaultCSS.js";
import { advancedSettingsTab, context, settingsTab } from "./Context.js";
import { SettingsUIElem } from "./SettingsUI.Elem.js";
var SUB_TAB;
(function (SUB_TAB) {
    SUB_TAB["SETTINGS"] = "SETTINGS";
    SUB_TAB["ADVANCED"] = "ADVANCED";
})(SUB_TAB || (SUB_TAB = {}));
export class UI {
    elem = new SettingsUIElem();
    curTab = SUB_TAB.SETTINGS;
    init() {
        try {
            this.init = js.fn.emptyFn;
            context.init();
        }
        catch (e) {
            logError(e);
        }
    }
    async showUI() {
        try {
            this.init();
            this.elem.init();
            this.addListeners();
            js.dom.setContent("#content", this.elem.container);
            await this.showTab(SUB_TAB.SETTINGS);
        }
        catch (e) {
            logError(e);
        }
    }
    async refreshUI() {
        const isUIShown = this.elem?.container?.parentElement;
        if (!isUIShown) {
            return;
        }
        switch (this.curTab) {
            case SUB_TAB.SETTINGS:
                await settingsTab.refreshUI();
                return;
        }
    }
    addListeners() {
        this.elem.settingsTab.addEventListener("click", () => this.showTab(SUB_TAB.SETTINGS));
        this.elem.advancedTab.addEventListener("click", () => this.showTab(SUB_TAB.ADVANCED));
        this.elem.tabContent.addEventListener("click", e => this.handleCheckboxLabelClick(e));
    }
    async showTab(tab) {
        this.curTab = tab;
        VUI.setLoadingContent(this.elem.tabContent);
        js.selector.selectFrom(this.elem.tabHeader, "." + VaultCSS.SELECTED)?.classList.remove(VaultCSS.SELECTED);
        switch (tab) {
            case SUB_TAB.SETTINGS:
                this.elem.settingsTab.classList.add(VaultCSS.SELECTED);
                await settingsTab.showUI();
                return;
            case SUB_TAB.ADVANCED:
                await advancedSettingsTab.showUI();
                this.elem.advancedTab.classList.add(VaultCSS.SELECTED);
                return;
        }
    }
    handleCheckboxLabelClick(e) {
        const target = e.target;
        if (!target.matches("[data-checkbox_label]")) {
            return;
        }
        const checkboxSelector = `input[type="checkbox"]`;
        const parent = js.dom.findParent({ selector: target, criteria: x => Boolean(x.querySelector(checkboxSelector)) });
        const checkboxInput = js.selector.selectFrom(parent, checkboxSelector);
        checkboxInput.click();
    }
}
