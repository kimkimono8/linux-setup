import { ErrorCode } from "../../../../components/jsUtil/service/constants/ErrorCode.js";
import { zt } from "../../../../ztab/zt.js";
import { MainUITabType } from "../MainUI.Type.js";
import { SidebarUIElem } from "./Sidebar.Elem.js";
export class SidebarUI {
    elem = new SidebarUIElem();
    HIGHLIGHT_CLASS = "nav__menu--active";
    async showUI() {
        try {
            this.elem.init();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    highlight(tab) {
        try {
            VUI.highlightNav({ highlightClass: this.HIGHLIGHT_CLASS, targetElem: this.getTabElem(tab) });
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.passwordsTabNav.addEventListener("click", () => zt.mainUI.showTab({ type: MainUITabType.PASSWORDS }));
            this.elem.foldersTabNav.addEventListener("click", () => zt.mainUI.showTab({ type: MainUITabType.FOLDERS }));
            this.elem.settingsTabNav.addEventListener("click", () => zt.mainUI.showTab({ type: MainUITabType.SETTINGS }));
        }
        catch (e) {
            logError(e);
        }
    }
    getTabElem(tab) {
        try {
            switch (tab.type) {
                case MainUITabType.PASSWORDS:
                    return this.elem.passwordsTabNav;
                case MainUITabType.FOLDERS:
                    return this.elem.foldersTabNav;
                case MainUITabType.SETTINGS:
                    return this.elem.settingsTabNav;
                default:
                    throw ErrorCode.NOT_FOUND;
            }
        }
        catch (e) {
            logError(e);
            return this.elem.passwordsTabNav;
        }
    }
}
