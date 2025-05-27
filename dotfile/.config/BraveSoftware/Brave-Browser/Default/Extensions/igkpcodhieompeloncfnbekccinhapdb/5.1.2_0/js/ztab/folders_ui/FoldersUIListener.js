import { UIUtil1 } from "../../common/ui/ui_util.js";
import { AlertUI } from "../../src/common/common.js";
import { FilterType } from "../../src/service/bgApi/types.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { zt } from "../zt.js";
export class FoldersUIListener {
    p = null;
    constructor() {
        this.keyed_search_string = js.fn.wrapper.createSingleInstListener(this.keyed_search_string, this);
    }
    async clickedAddFolder() {
        const openWebUI = await AlertUI.inst.createAlert()
            .title(" ")
            .text("You can only create folders from our web app and mobile apps at the moment.")
            .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.OPEN_WEB_APP)).value(true).build())
            .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
            .show();
        if (openWebUI) {
            bgApi.vault.openWebUI({ route: "/main/folders" });
        }
    }
    async clicked_clear_folder_filters() {
        const query = this.p.getQuery();
        const filter_elems = js.selector.selectAll("input", "#folders_filter_container");
        filter_elems.forEach(x => x.checked = false);
        query.sharingType = FilterType.ALL;
        await this.update_filter(query);
        this.clicked_hide_folders_filter();
    }
    clicked_show_folders_filter() {
        const showPasswordFilter = js.selector.select("#show_folders_filter");
        const SELECTED_CLASS = "action-icon-list-selected";
        if (showPasswordFilter.classList.contains(SELECTED_CLASS)) {
            this.clicked_hide_folders_filter();
            return;
        }
        showPasswordFilter.classList.add(SELECTED_CLASS);
        js.dom.showOld("#folder_filter_overlay");
        js.selector.selectAll("[data-show_above_folder_filter_overlay]")
            .forEach(x => x.style.zIndex = "100");
        this.p.filterUI.showUI();
    }
    clicked_hide_folders_filter() {
        const showPasswordFilter = js.selector.select("#show_folders_filter");
        const SELECTED_CLASS = "action-icon-list-selected";
        showPasswordFilter.classList.remove(SELECTED_CLASS);
        js.dom.hideOld("#folder_filter_overlay");
        this.p.filterUI.hideUI();
    }
    async clicked_show_folder_passwords(_e, _event_data, node_data) {
        const folder = node_data;
        zt.passwordsOldUI.showFolderPasswords(folder);
    }
    async clicked_expand_arrow(_e, event_data) {
        const { path } = event_data;
        const query = this.p.folderTree.query;
        js.array.addUnique(query.visible_sub_roots, path);
        this.p.folderTree.refreshFolderTree();
    }
    async clicked_collapse_arrow(_e, event_data) {
        const { path } = event_data;
        const query = this.p.folderTree.query;
        query.visible_sub_roots = query.visible_sub_roots.filter(x => !x.startsWith(path));
        this.p.folderTree.refreshFolderTree();
    }
    async keyed_search_string(e) {
        const input = e.target;
        UIUtil1.inst.showSearchClear(input);
        const query = await this.p.getQuery();
        query.search_string = input.value;
        await this.update_filter(query);
    }
    clicked_clear_search(e) {
        UIUtil1.inst.clickedClearSearch(e);
    }
    pressed_search_escape(e) {
        UIUtil1.inst.clearInput(e.target);
    }
    async update_filter(query) {
        query.page_no = 0;
        this.p.query = query;
        await this.p.refresh_folder_list();
    }
}
