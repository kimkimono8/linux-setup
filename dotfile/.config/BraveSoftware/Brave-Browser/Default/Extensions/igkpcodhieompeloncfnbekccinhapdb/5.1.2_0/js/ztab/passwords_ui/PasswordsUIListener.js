import { SecretAddPreFillInput } from "../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { MainUITabType } from "../../src/ztab/main_ui/MainUI.Type.js";
import { PasswordShareController } from "../../src/ztab/passwords_ui/share/PasswordShareController.js";
import { zt } from "../zt.js";
import { BasePasswordsUIListener } from "./BasePasswordsUIListener.js";
import { ZTPasswordMoreActionsController } from "./ZTPasswordMoreActionsController.js";
import { PasswordHistoryController } from "./password_history/PasswordHistoryController.js";
export class PasswordsUIListener extends BasePasswordsUIListener {
    p = null;
    clicked_add_password() {
        const folderId = this.p.query.folderId;
        if (!folderId) {
            this.p.passwordAddUI.showUI();
            return;
        }
        const secretAddPreFillInput = new SecretAddPreFillInput();
        secretAddPreFillInput.folderId = folderId;
        this.p.passwordAddUI.showFilledUI(secretAddPreFillInput);
    }
    clicked_show_password_filter() {
        const showPasswordFilter = js.selector.select("#show_password_filter");
        const SELECTED_CLASS = "filter-action-icon-list-selected";
        if (showPasswordFilter.classList.contains(SELECTED_CLASS)) {
            this.clicked_hide_password_filter();
            return;
        }
        showPasswordFilter.classList.add(SELECTED_CLASS);
        js.selector.selectAll("[data-show_above_password_filter_overlay]")
            .forEach(x => x.style.zIndex = "100");
        VUI.show("#passwords_filter_container", "#password_filter_overlay");
        this.p.filterUI.showTabFilter(zt.passwordsUI.sidebar.curTab);
    }
    clicked_hide_password_filter() {
        const showPasswordFilter = js.selector.select("#show_password_filter");
        const SELECTED_CLASS = "filter-action-icon-list-selected";
        showPasswordFilter.classList.remove(SELECTED_CLASS);
        js.selector.selectAll("[data-show_above_password_filter_overlay]")
            .forEach(x => x.style.zIndex = "0");
        js.dom.hide("#password_filter_overlay", "#passwords_filter_container");
        this.p.filterUI.hideUI();
    }
    async clicked_clear_password_filters() {
        const filterElems = js.selector.selectAll("input", "#passwords_filter_container");
        filterElems.forEach(x => x.checked = false);
        this.p.filterUI.updater.clearFilters();
        this.clicked_hide_password_filter();
    }
    async clicked_change_favourite(e) {
        const secretId = this.p.util.getSecretId(e);
        const secret = await bgApi.secret.getSecret(secretId);
        const favourite = !secret.is_favourite;
        bgApi.secret.edit.setFavourite(secretId, favourite);
        js.selector.selectAll("div[data-secret_id='" + secret.id + "'] span[data-favourite]", this.p.elem)
            .forEach(x => this.p.util.updateFavouriteElem(x, favourite));
    }
    clicked_show_more_actions(e) {
        const secretId = this.p.util.getSecretId(e);
        ZTPasswordMoreActionsController.inst.showUI(secretId, e);
    }
    clicked_hide_more_actions() {
        ZTPasswordMoreActionsController.inst.hideUI();
    }
    clicked_hide_history() {
        PasswordHistoryController.inst().onCloseInput();
    }
    async clicked_copy_password_icon(e, eventData) {
        const { fieldName, fieldLabel } = eventData;
        const secretId = this.p.util.getSecretId(e);
        zt.mainUI.showDotLoading(0.5);
        await bgApi.secret.copyField(secretId, fieldName);
        zt.mainUI.hideDotLoading();
        this.showCopiedMessage(e, fieldLabel + " " + i18n(VI18N.COPIED));
    }
    async clicked_copy_username_icon(e, eventData) {
        this.clicked_copy_password_icon(e, eventData);
    }
    async clicked_login(e, event_data) {
        const secretId = this.p.util.getSecretId(e);
        const { url, incognito = false } = event_data;
        bgApi.secret.login(secretId, url, incognito);
    }
    async clicked_share_password(e) {
        const secretId = this.p.util.getSecretId(e);
        PasswordShareController.showUI(secretId);
    }
    async clicked_close_share_password() {
        PasswordShareController.hideUI();
    }
    async clicked_close_password_details() {
        const containerElem = js.selector.select("[data-password_details_container]");
        if (!containerElem.firstElementChild) {
            return;
        }
        js.dom.hideOld("[data-password_details_overlay]");
        containerElem.style.right = "-710px";
        containerElem.textContent = "";
        if (!this.p.isCardView) {
            return;
        }
        const secretListContainer = js.selector.select("[data-list_container]");
        secretListContainer.classList.remove("calcWidth", "full-width");
        containerElem.classList.add("dis-hide");
        containerElem.style.height = "100%";
    }
    async clicked_back_to_folders() {
        await this.p.restorePreFolderQuery();
        zt.mainUI.showTab({ type: MainUITabType.FOLDERS });
    }
    showCopiedMessage(e, message) {
        try {
            const copyMessage = message || i18n(VI18N.COPIED);
            if (e.clientX) {
                VUI.tooltip.showElemMsg(e.target, copyMessage, 1);
                return;
            }
            const fieldRow = e.target.closest("[tabindex='0']");
            VUI.tooltip.showElemMsg(fieldRow, copyMessage, 1);
        }
        catch (e) {
            logError(e);
        }
    }
}
