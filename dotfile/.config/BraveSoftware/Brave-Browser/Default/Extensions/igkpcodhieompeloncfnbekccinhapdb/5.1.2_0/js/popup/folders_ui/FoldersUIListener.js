import { UIUtil1 } from "../../common/ui/ui_util.js";
import { AlertUI } from "../../src/common/common.js";
import { pp } from "../../src/popup/pp.js";
import { FilterType } from "../../src/service/bgApi/types.js";
import { Folder_Tree_Query } from "../../src/service/bgApi/types/Folder.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { FolderTree, folderTree } from "./FolderTree.js";
export class FoldersUIListener {
    p = null;
    async clicked_clear_folder_filters() {
        const query = await this.p.loadQuery();
        const filterElems = js.selector.selectAll("input", "#folders_filter_container");
        filterElems.forEach(x => x.checked = false);
        query.sharingType = FilterType.ALL;
        await this.p.filterUI.updater.updateFilter(query);
        this.clicked_hide_folders_filter();
    }
    async clicked_filter(e, event_data) {
        const input = e.target;
        const enable = input.checked;
        const { filter } = event_data;
        const query = await this.p.loadQuery();
        query[filter] = enable;
        await this.p.filterUI.updater.updateFilter(query);
    }
    clicked_show_folders_filter() {
        const showFilterElem = js.selector.select("#show_folders_filter");
        const isShown = showFilterElem.style.zIndex != "";
        if (isShown) {
            this.clicked_hide_folders_filter();
            return;
        }
        js.selector.selectFrom(showFilterElem, "a").classList.add("filter-action-icon-list-selected");
        showFilterElem.style.zIndex = "100";
        js.dom.show("#folder_filter_overlay", "#folder_filter_overlay_color_bg");
        this.p.filterUI.showUI();
    }
    clicked_hide_folders_filter() {
        const showFilterElem = js.selector.select("#show_folders_filter");
        js.selector.selectFrom(showFilterElem, "a").classList.remove("filter-action-icon-list-selected");
        showFilterElem.style.zIndex = "";
        js.dom.hide("#folder_filter_overlay", "#folder_filter_overlay_color_bg");
        this.p.filterUI.hideUI();
    }
    async clicked_show_folder_passwords(_e, _event_data, node_data) {
        const folder = node_data;
        pp.passwordsUI.showFolderPasswords(folder);
    }
    async clicked_expand_arrow(_e, event_data) {
        const { path } = event_data;
        const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
        js.array.addUnique(query.visible_sub_roots, path);
        await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
        folderTree.refreshFolderTree();
    }
    async clicked_collapse_arrow(_e, event_data) {
        const { path } = event_data;
        const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
        query.visible_sub_roots = query.visible_sub_roots.filter(x => !x.startsWith(path));
        await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
        folderTree.refreshFolderTree();
    }
    async keyed_search_string(e) {
        const input = e.target;
        UIUtil1.inst.showSearchClear(input);
        const query = await this.p.loadQuery();
        query.search_string = input.value;
        await this.p.filterUI.updater.updateFilter(query);
    }
    async clicked_add_folder() {
        const confirmed = await AlertUI.inst.createAlert()
            .title(" ")
            .text("You can only create folders from our web app and mobile apps at the moment.")
            .addButton("confirm", AlertUI.inst.createButton().text(i18n(VI18N.OPEN_WEB_APP)).value(true).build())
            .addButton("cancel", AlertUI.inst.createButton().text(i18n(VI18N.CANCEL)).value(false).build())
            .show();
        if (!confirmed) {
            return;
        }
        await bgApi.vault.openWebUI({ route: "/main/folders" });
        await js.dom.closeWindow();
    }
}
