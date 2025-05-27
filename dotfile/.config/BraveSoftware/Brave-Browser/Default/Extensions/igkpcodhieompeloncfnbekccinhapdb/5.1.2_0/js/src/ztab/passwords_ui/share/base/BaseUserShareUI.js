import { UIUtil1 } from "../../../../../common/ui/ui_util.js";
import { PositionUtil } from "../../../../common/common.js";
import { Secret } from "../../../../service/bgApi/types/Secret.js";
import { UIParent } from "../../../../uiUtil/ui/UIParent.js";
export class BaseUserShareUI extends UIParent {
    userList = null;
    execute(fn) {
        fn.call(this);
    }
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: this.getTemplateSelector() });
        this.select("[data-grant_overlay]").addEventListener("click", () => this.hideGrantMenu());
        this.select("[data-global_grant]").addEventListener("click", (e) => this.showGrantMenuAt("[data-global_grant_menu]", e));
    }
    showUI() {
        js.dom.setContent("#share_password_container [data-sharing_tab_container]", this.elem);
        this.select("[data-search]").focus();
    }
    initSearch(searchString) {
        try {
            const searchElem = this.getSearchElem();
            searchElem.value = searchString;
            this.showIf(searchString.length > 0, this.getClearSearchElem());
        }
        catch (e) {
            throw jserror(e);
        }
    }
    onSearchInput(listener) {
        UIUtil1.inst.addSearchListener(this.getSearchElem(), this.getClearSearchElem(), listener);
    }
    getSearchElem() {
        return this.select("[data-search]");
    }
    getClearSearchElem() {
        return this.select(`[data-name="clearSearch"]`);
    }
    initUserList() {
        this.userList = document.createDocumentFragment();
    }
    addUser(userElem) {
        this.userList.append(userElem);
    }
    showUserList() {
        this.hide("[data-no_users]");
        this.setContent("[data-user_list]", this.userList);
        this.show("[data-user_list]");
    }
    showNoUsers(msg) {
        this.text("[data-no_users] [data-text]", msg);
        this.show("[data-no_users]");
        this.hide("[data-user_list]");
    }
    showGlobalGrant(show) {
        this.showIf(show, "[data-global_grant_revoke_container]");
    }
    setGlobalCheckbox(selected) {
        this.select("[data-global_checkbox]").checked = selected;
    }
    onGlobalSelectInput(listener) {
        this.select("[data-global_checkbox]").addEventListener("input", function () {
            listener(this.checked);
        });
    }
    showGrantMenu(e, shareLevel) {
        const grantMenuSelector = "[data-grant_menu]";
        const grantMenu = this.select(grantMenuSelector);
        const SELECTED_CLASS = "vault-common-list-selected";
        const curSelected = js.selector.selectFrom(grantMenu, "." + SELECTED_CLASS);
        if (curSelected) {
            curSelected.classList.remove(SELECTED_CLASS);
        }
        const highlightCurrentLevel = shareLevel != Secret.SHARING_LEVEL.NONE;
        if (highlightCurrentLevel) {
            const uiShareString = this.getShareLevelSelector(shareLevel);
            const shareLevelUIElem = js.selector.selectFrom(grantMenu, "[data-share_level='" + uiShareString + "']");
            js.selector.selectFrom(shareLevelUIElem, "a").classList.add(SELECTED_CLASS);
        }
        this.showGrantMenuAt(grantMenuSelector, e);
    }
    showGrantMenuAt(selector, e) {
        const grantButton = js.selector.closest(e.target, "button");
        const grantMenu = this.select(selector);
        PositionUtil.positionMoreActions(grantMenu, grantButton);
        this.show(selector, "[data-grant_overlay]");
    }
    getShareLevelSelector(shareLevel) {
        const LEVEL = Secret.SHARING_LEVEL;
        switch (shareLevel) {
            case LEVEL.MANAGE: return "MANAGE";
            case LEVEL.MODIFY: return "MODIFY";
            case LEVEL.VIEW: return "VIEW";
            case LEVEL.LOGIN: return "LOGIN";
            default:
                throw "INVALID_SHARE_LEVEL";
        }
    }
    onUserGrantInput(listener) {
        const h = this;
        this.select(`[data-grant_menu]`).addEventListener("click", function (e) {
            const sharingLevelElem = js.selector.closest(e.target, "[data-share_level]");
            if (!sharingLevelElem) {
                throw "sharing level elem";
            }
            listener(Secret.SHARING_LEVEL[sharingLevelElem.dataset.share_level]);
            h.hideGrantMenu();
        });
    }
    hideGrantMenu() {
        this.hide("[data-grant_menu]", "[data-grant_overlay]", "[data-global_grant_menu]");
    }
    addScroll(scrollToTop) {
        if (scrollToTop) {
            this.select(".shareScroll").scrollTop = 0;
        }
        UIUtil1.inst.slimScroll(this.select(".shareScroll"), document.documentElement.clientHeight - 330);
    }
    onGlobalGrantInput(listener) {
        const h = this;
        this.select(`[data-global_grant_menu]`).addEventListener("click", function (e) {
            const sharingLevelElem = js.selector.closest(e.target, "[data-share_level]");
            if (!sharingLevelElem) {
                throw "sharing level elem";
            }
            listener(Secret.SHARING_LEVEL[sharingLevelElem.dataset.share_level]);
            h.hideGrantMenu();
        });
    }
    onGlobalRevokeInput(listener) {
        this.select("[data-global_revoke]").addEventListener("click", listener);
    }
    showPagination(show) {
        this.showIf(show, "[data-pagination_panel]");
    }
    allowPreviousPage(allow) {
        if (allow) {
            this.select("[data-pagination_left_arrow]").classList.remove("disabled");
        }
        else {
            this.select("[data-pagination_left_arrow]").classList.add("disabled");
        }
    }
    allowNextPage(allow) {
        if (allow) {
            this.select("[data-pagination_right_arrow]").classList.remove("disabled");
        }
        else {
            this.select("[data-pagination_right_arrow]").classList.add("disabled");
        }
    }
    setPagination(start, end, total) {
        this.text("[data-pagintation_displaying]", start + " - " + end);
        this.text("[data-pagintation_total]", total + "");
    }
    onGoPreviousPageInput(listener) {
        this.select("[data-pagination_left_arrow_container]").addEventListener("click", listener);
    }
    onGoNextPageInput(listener) {
        this.select("[data-pagination_right_arrow_container]").addEventListener("click", listener);
    }
}
