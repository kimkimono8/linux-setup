import { UIElemContainer } from "../../uiUtil/export.js";
export class SettingsUIElem extends UIElemContainer {
    tabHeader;
    tabContent;
    settingsTab;
    advancedTab;
    scrollContainer;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#settings_page_template" });
        this.tabHeader = this.select("#settingsTabHeader");
        this.tabContent = this.select("#settingsTabContent");
        this.settingsTab = this.select("#settingsLocalTab");
        this.advancedTab = this.select("#advancedSettingsTab");
        this.scrollContainer = this.select("#settings_scroll_container");
    }
}
