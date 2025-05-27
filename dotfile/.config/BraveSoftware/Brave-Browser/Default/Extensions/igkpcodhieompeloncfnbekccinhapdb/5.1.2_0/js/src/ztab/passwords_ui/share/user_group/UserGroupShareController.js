import { VI18N } from "../../../../service/vt/VI18n.js";
import { BaseUserShareController } from "../base/BaseUserShareController.js";
import { UserGroupQuerier } from "./UserGroupQuerier.js";
import { UserGroupRow } from "./UserGroupRow.js";
import { UserGroupShareCli } from "./UserGroupShareCli.js";
import { UserGroupSharingUI } from "./UserGroupSharingUI.js";
export class UserGroupShareController extends BaseUserShareController {
    ui = null;
    uiInput = null;
    users = null;
    displayedUsers = null;
    userQuerier = null;
    static instance = null;
    static get inst() {
        if (!this.instance) {
            this.instance = new UserGroupShareController();
        }
        return this.instance;
    }
    async init(secretId) {
        try {
            super.init(secretId);
            this.cli = UserGroupShareCli.inst;
            this.uiInput = await bgApi.secret.share.userGroup.getUIInput(secretId);
            this.users = this.uiInput.users;
            const h = this;
            this.userQuerier = UserGroupQuerier.createInstance(function () {
                this.setUsers(h.users);
            });
        }
        catch (e) {
            logError(e);
        }
    }
    createUIInstance() {
        return UserGroupSharingUI.createInstance();
    }
    getNoMatchText(searchString) {
        const hasValidSearchString = searchString.length > 0;
        return hasValidSearchString ? i18n(VI18N.NO_USER_GROUPS_MATCHING_FOUND, searchString) : i18n(VI18N.NO_USER_GROUPS_FOUND);
    }
    getUserRow(_userGroup) {
        return UserGroupRow.createRow();
    }
    highlightRow(row, _user, searchString) {
        row.highlightName(searchString);
    }
}
