import { BaseUserShareUI } from "../base/BaseUserShareUI.js";
export class UserShareUI extends BaseUserShareUI {
    static createInstance() {
        const obj = new UserShareUI();
        obj.init();
        return obj;
    }
    getTemplateSelector() {
        return "#user_sharing_tab_template";
        ;
    }
}
