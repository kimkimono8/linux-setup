import { BaseUserShareUI } from "../base/BaseUserShareUI.js";
export class UserGroupSharingUI extends BaseUserShareUI {
    static createInstance() {
        const obj = new UserGroupSharingUI();
        obj.init();
        return obj;
    }
    getTemplateSelector() {
        return "#user_group_sharing_tab_template";
    }
}
