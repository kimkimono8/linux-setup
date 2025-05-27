import { BasePasswordMoreActionsController } from "../../common/ui/components/BasePasswordMoreActionsController.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { pp } from "../../src/popup/pp.js";
import { SecretAddPreFillInput } from "../../src/service/bgApi/types/Secret.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { VaultCSS } from "../../src/service/VUi/VaultCSS.js";
export class PasswordsUIListener {
    p = null;
    init() {
        this.keyed_search_string = js.fn.wrapper.createSingleInstListener(this.keyed_search_string, this);
    }
    async clicked_clear_password_filters() {
        await this.p.filterUI.updater.clearFilters();
        js.selector.select("#show_domain_matching_icon").classList.remove("disabled");
        this.clicked_hide_password_filter();
    }
    async clicked_back_to_folders() {
        await this.p.restorePreFolderQuery();
        pp.mainUI.showTab(pp.mainUI.PP_TABS.FOLDERS);
    }
    async clicked_filter(e, event_data) {
        const input = e.target;
        const enable = input.checked;
        const { filter } = event_data;
        const query = await this.p.loadQuery();
        query[filter] = enable;
        await this.p.filterUI.updater.updateFilter(query);
    }
    clicked_show_password_filter() {
        const showFilterElem = js.selector.select("#show_password_filter");
        const isShown = showFilterElem.style.zIndex != "";
        if (isShown) {
            this.clicked_hide_password_filter();
            return;
        }
        this.p.showPasswordsFilter();
    }
    clicked_hide_password_filter() {
        this.p.filterUI.hideUI();
        const showFilterElem = js.selector.select("#show_password_filter");
        js.selector.selectFrom(showFilterElem, "a").classList.remove("filter-action-icon-list-selected");
        showFilterElem.style.zIndex = "";
        js.dom.hide("#passwords_filter_container", "#password_filter_overlay", "#password_filter_overlay_color_bg");
    }
    async keyed_search_string(e) {
        if (VUI.keyboard.isControlKey(e.key)) {
            return;
        }
        const input = e.target;
        UIUtil1.inst.showSearchClear(input);
        const query = await zsessionStorage.load(pp.passwordsUI.PP_QUERY_KEY, null) || this.p.createNewSecretQuery();
        query.search_string = input.value;
        await this.p.filterUI.updater.updateFilter(query);
    }
    clicked_show_more_actions(e) {
        const secretId = this.p.util.getSecretId(e);
        BasePasswordMoreActionsController.inst.showUI(secretId, e);
    }
    clicked_hide_more_actions() {
        BasePasswordMoreActionsController.inst.hideUI();
    }
    async clicked_share_password(e) {
        const secretId = this.p.util.getSecretId(e);
        bgApi.ztab.sharePassword(secretId);
        js.dom.closeWindow();
    }
    async clicked_login(e, event_data) {
        const secretId = this.p.util.getSecretId(e);
        const { url, incognito = false } = event_data;
        bgApi.secret.login(secretId, url, incognito);
        js.dom.closeWindow();
    }
    async clicked_copy_password_icon(e, eventData) {
        try {
            const { fieldName, fieldLabel } = eventData;
            const secretId = this.p.util.getSecretId(e);
            pp.mainUI.showDotLoading(0.5);
            await bgApi.secret.copyField(secretId, fieldName);
            pp.mainUI.hideDotLoading();
            const target = e.target;
            if (target.nodeName == "I") {
                VUI.tooltip.showActionMsg(e, fieldLabel + " " + i18n(VI18N.COPIED), 1);
                return;
            }
            const passwordElem = js.selector.select(`[data-secret_id="${secretId}"]`);
            VUI.tooltip.showElemMsg(passwordElem, fieldLabel + " " + i18n(VI18N.COPIED), 1);
        }
        catch (e) {
            logError(e);
        }
    }
    async clicked_copy_username_icon(e, eventData) {
        this.clicked_copy_password_icon(e, eventData);
    }
    async clicked_show_password_details(e) {
        const secretId = this.p.util.getSecretId(e);
        this.p.passwordDetailsUI.showDetails(secretId);
    }
    async clicked_change_favourite(e) {
        const secretId = this.p.util.getSecretId(e);
        const secret = await bgApi.secret.getSecret(secretId);
        const favourite = !secret.is_favourite;
        bgApi.secret.edit.setFavourite(secretId, favourite);
        js.selector.selectAll("div[data-secret_id='" + secret.id + "'] span[data-favourite]", this.p.elem)
            .forEach(x => this.p.util.updateFavouriteElem(x, favourite));
    }
    async clicked_add_password() {
        const query = await this.p.loadQuery();
        const prefillInput = new SecretAddPreFillInput();
        if (query.folderId) {
            prefillInput.folderId = query.folderId;
        }
        await bgApi.ztab.addPassword(prefillInput);
        await js.dom.closeWindow();
    }
    async clicked_sync(e) {
        const syncIcon = e.target;
        const syncing = syncIcon.classList.contains(VaultCSS.SYNCING_ANIMATION);
        if (syncing) {
            return;
        }
        bgApi.vault.sync();
    }
}
