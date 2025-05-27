import { VI18N } from "../../../../service/vt/VI18n.js";
import { BaseUserShareController } from "../base/BaseUserShareController.js";
import { UserQuerier } from "./UserQuerier.js";
import { UserRow } from "./UserRow.js";
import { UserShareCli } from "./UserShareCli.js";
import { UserShareUI } from "./UserShareUI.js";
export class UserShareController extends BaseUserShareController {
    ui = null;
    uiInput = null;
    users = null;
    displayedUsers = null;
    userQuerier = null;
    cli = null;
    static instance = null;
    static get inst() {
        if (!this.instance) {
            this.instance = new UserShareController();
        }
        return this.instance;
    }
    async init(secretId) {
        try {
            super.init(secretId);
            this.cli = UserShareCli.inst;
            this.uiInput = await bgApi.secret.share.user.getUIInput(secretId);
            this.users = this.uiInput.users;
            const h = this;
            this.userQuerier = UserQuerier.createInstance(function () {
                this.setUsers(h.users);
            });
        }
        catch (e) {
            logError(e);
        }
    }
    createUIInstance() {
        return UserShareUI.createInstance();
    }
    getNoMatchText(searchString) {
        const hasValidSearchString = searchString.length > 0;
        return hasValidSearchString ? i18n(VI18N.NO_USERS_MATCHING_FOUND, searchString) : i18n(VI18N.NO_USERS_FOUND);
    }
    getUserRow(user) {
        return UserRow.createRow(function () {
            this.setEmail(user.email);
            if (user.dp) {
                this.setDp(user.dp);
                return;
            }
            bgApi.user.getDpOf(user.zuid).then(dp => { user.dp = dp; this.setDp(dp); });
        });
    }
    highlightRow(row, user, searchString) {
        const hightlightField = this.userQuerier.getMatchField(user);
        switch (hightlightField) {
            case UserQuerier.FIELDS.NAME:
                row.highlightName(searchString);
                break;
            case UserQuerier.FIELDS.EMAIL:
                row.highlightEmail(searchString);
                break;
        }
    }
}
