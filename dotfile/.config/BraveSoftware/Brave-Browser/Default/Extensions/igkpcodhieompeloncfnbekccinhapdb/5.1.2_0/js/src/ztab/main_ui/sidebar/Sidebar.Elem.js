import { zt } from "../../../../ztab/zt.js";
import { UIElemContainer } from "../../../uiUtil/export.js";
export class SidebarUIElem extends UIElemContainer {
    passwordsTabNav;
    foldersTabNav;
    settingsTabNav;
    init() {
        this.container = js.selector.selectFrom(zt.mainUI.elem, "#sidebarNav");
        this.passwordsTabNav = this.select("#passwordsTabNav");
        this.foldersTabNav = this.select("#foldersTabNav");
        this.settingsTabNav = this.select("#settingsTabNav");
    }
}
