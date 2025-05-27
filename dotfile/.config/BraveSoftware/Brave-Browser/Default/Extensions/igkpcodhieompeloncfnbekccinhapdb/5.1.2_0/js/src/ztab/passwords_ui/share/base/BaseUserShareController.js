import { Secret } from "../../../../service/bgApi/types/Secret.js";
import { VI18N } from "../../../../service/vt/VI18n.js";
export class BaseUserShareController {
    ui = null;
    uiInput = null;
    users = null;
    displayedUsers = null;
    grantUser = null;
    userQuerier = null;
    cli = null;
    init(secretId) {
        secretId;
        this.initRefreshList();
    }
    showUI() {
        try {
            this.ui = this.createUIInstance();
            const h = this;
            this.ui.execute(function () {
                this.initSearch(h.userQuerier.getSearchString());
                this.onSearchInput(h.onSearchInput.bind(h));
                this.onGlobalSelectInput(h.onGlobalSelectInput.bind(h));
                this.onUserGrantInput(h.onUserGrantInput.bind(h));
                this.onGlobalGrantInput(h.onGlobalGrantInput.bind(h));
                this.onGlobalRevokeInput(h.onGlobalRevokeInput.bind(h));
                this.onGoPreviousPageInput(h.onPreviousPageInput.bind(h));
                this.onGoNextPageInput(h.onNextPageInput.bind(h));
            });
            this.refreshList();
            this.ui.showUI();
        }
        catch (e) {
            logError(e);
        }
    }
    showUsers(users) {
        if (users.length == 0) {
            this.showNoUsers();
            return;
        }
        this.ui.initUserList();
        const h = this;
        const searchString = this.userQuerier.getSearchString();
        const validSearchString = searchString.length > 0;
        let row = null;
        for (let user of users) {
            row = this.getUserRow(user);
            row.execute(function () {
                this.setUserId(user.id);
                this.setName(user.name);
                this.setShareLevel(user.shareLevel);
                this.setSelected(user.selected);
                this.onSelectInput(selected => h.onSelectInput(user, selected));
                this.onShowGrantInput((e) => h.onShowUserGrantInput(user, e));
                this.onUserRevokeInput(() => h.onUserRevokeInput(user));
            });
            if (validSearchString) {
                this.highlightRow(row, user, searchString);
            }
            this.ui.addUser(row.elem);
        }
        this.ui.showUserList();
    }
    showNoUsers() {
        const searchString = this.userQuerier.getSearchString();
        const msg = this.getNoMatchText(searchString);
        this.ui.showNoUsers(msg);
    }
    onSearchInput(searchString) {
        this.userQuerier.setSearchString(searchString);
        this.refreshList();
    }
    onSelectInput(user, selected) {
        user.selected = selected;
        this.refreshGlobalGrantDisplay();
        this.refreshGlobalCheckbox();
    }
    refreshGlobalGrantDisplay() {
        const displayGlobalMenu = this.uiInput.users.some(x => x.selected);
        this.ui.showGlobalGrant(displayGlobalMenu);
    }
    refreshGlobalCheckbox() {
        const notEmpty = this.displayedUsers.length > 0;
        const allSelected = this.displayedUsers.every(x => x.selected);
        this.ui.setGlobalCheckbox(notEmpty && allSelected);
    }
    onGlobalSelectInput(selected) {
        for (let user of this.displayedUsers) {
            user.selected = selected;
        }
        this.refreshList();
    }
    initRefreshList() {
        this.initRefreshList = js.fn.emptyFn;
        this.refreshList = js.fn.wrapper.createSingleInstListener(this.refreshList, this);
    }
    async refreshList(scrollToTop = true) {
        const users = this.displayedUsers = this.userQuerier.query();
        this.showUsers(users);
        this.refreshPagination();
        this.refreshGlobalGrantDisplay();
        this.refreshGlobalCheckbox();
        this.ui.addScroll(scrollToTop);
    }
    refreshPagination() {
        this.ui.showPagination(this.displayedUsers.length > 0);
        this.ui.setPagination(this.userQuerier.getStartPaginationNumber(), this.userQuerier.getEndPaginationNumber(), this.userQuerier.getTotal());
        this.ui.allowPreviousPage(this.userQuerier.hasPreviousPage());
        this.ui.allowNextPage(this.userQuerier.hasNextPage());
    }
    onShowUserGrantInput(user, e) {
        this.grantUser = user;
        this.ui.showGrantMenu(e, user.shareLevel);
    }
    async onUserGrantInput(shareLevel) {
        const user = this.grantUser;
        user.shareLevel = shareLevel;
        await this.cli.updateSharing(this.uiInput.secretId, this.users);
        this.refreshList(false);
        VUI.notification.showSuccess(i18n(VI18N.SHARE_USER_SUCCESS, user.name));
    }
    async onUserRevokeInput(user) {
        user.shareLevel = Secret.SHARING_LEVEL.NONE;
        await this.cli.updateSharing(this.uiInput.secretId, this.users);
        this.refreshList(false);
        VUI.notification.showSuccess(i18n(VI18N.ACCESS_REVOKED_USER_SUCCESS, user.name));
    }
    async onGlobalGrantInput(shareLevel) {
        await this.changeSelectedUsersSharing(shareLevel);
        VUI.notification.showSuccess(i18n(VI18N.SHARE_SUCCESS));
    }
    async onGlobalRevokeInput() {
        await this.changeSelectedUsersSharing(Secret.SHARING_LEVEL.NONE);
        VUI.notification.showSuccess(i18n(VI18N.ACCESS_REVOKED_SUCCESS));
    }
    async changeSelectedUsersSharing(shareLevel) {
        const selectedUsers = this.users.filter(user => user.selected);
        selectedUsers.forEach(function (user) {
            user.shareLevel = shareLevel;
            user.selected = false;
        });
        await this.cli.updateSharing(this.uiInput.secretId, this.users);
        this.refreshList(false);
    }
    async onPreviousPageInput() {
        if (!this.userQuerier.hasPreviousPage()) {
            return;
        }
        this.userQuerier.goPreviousPage();
        await this.refreshList();
    }
    async onNextPageInput() {
        if (!this.userQuerier.hasNextPage()) {
            return;
        }
        this.userQuerier.goNextPage();
        await this.refreshList();
    }
    beforeExit() { }
}
