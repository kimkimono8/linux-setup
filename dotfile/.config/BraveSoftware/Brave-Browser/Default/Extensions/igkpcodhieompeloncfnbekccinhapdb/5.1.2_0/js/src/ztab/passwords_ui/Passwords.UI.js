import { ErrorCode } from "../../../components/jsUtil/service/constants/ErrorCode.js";
import { zt } from "../../../ztab/zt.js";
import { GG } from "./GG.js";
import { PasswordsUIElem } from "./Passwords.Elem.js";
import { PasswordUITabType } from "./PasswordsUI.Type.js";
import { PasswordSidebarUI } from "./sidebar/PasswordSidebar.UI.js";
export class PasswordsUI {
    elem = new PasswordsUIElem();
    gg = new GG(this);
    sidebar = new PasswordSidebarUI(this.gg);
    async showUI(tabInfo) {
        try {
            this.elem.init();
            this.sidebar.showUI();
            tabInfo = tabInfo || { type: PasswordUITabType.ALL };
            this.showTab(tabInfo);
            js.dom.setContent("#content", this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    async showTab(tab) {
        try {
            this.sidebar.highlight(tab);
            switch (tab.type) {
                case PasswordUITabType.ALL:
                case PasswordUITabType.FOLDER:
                case PasswordUITabType.FILTER:
                case PasswordUITabType.SECRET_TYPE:
                    return zt.passwordsOldUI.showUI(tab);
                case PasswordUITabType.TRASH:
                    return zt.trashUI.showUI();
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
