import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { UIUtil1 as UIUtil2 } from "../../common/ui/ui_util.js";
import { FolderQuery, FolderSharingType } from "../../src/service/bgApi/types/Folder.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { TextHighlighter } from "../../src/uiUtil/export.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { FolderFilterUI } from "../../src/ztab/folderUI/filter/FolderFilterUI.js";
import { zt } from "../zt.js";
import { FolderTree } from "./FolderTree.js";
import { FoldersUIListener } from "./FoldersUIListener.js";
export class FoldersUI extends UIParent {
    elem = null;
    listener = new FoldersUIListener();
    folderTree = new FolderTree();
    query = FolderQuery.createDefaultQuery();
    intersection_observer = null;
    isPersonalPlan = false;
    filterUI = new FolderFilterUI();
    async init() {
        this.init = async () => { };
        this.listener.p = this;
        this.folderTree.p = this;
        this.isPersonalPlan = zt.mainUI.data.isPersonalPlan;
        this.folderTree.init();
        this.refresh_folder_list = js.fn.wrapper.createSingleInstListener(this.refresh_folder_list, this);
        this.refresh_queried_list = js.fn.wrapper.createSingleInstListener(this.refresh_queried_list, this);
        this.intersected_scroll = this.intersected_scroll.bind(this);
        this.show_next_page = js.fn.wrapper.createSingleInstListener(this.show_next_page, this);
        globalDomListener.register("folders_ui", this.listener);
    }
    async showUI() {
        await this.init();
        if (this.elem) {
            this.elem.remove();
        }
        zt.passwordsOldUI.restorePreFolderQuery();
        const elem = this.elem = UIUtil.createElem({ preRender: true, template: "#folders_page_template" });
        await this.init_query();
        this.init_search();
        this.init_filters();
        await this.refresh_folder_list();
        js.dom.setContent("#content", elem);
        this.select("#folders_search").focus();
    }
    async syncing() {
        if (!this.isUIShown()) {
            return;
        }
        await this.refresh_sync_ui_status();
    }
    async synced() {
        if (!this.isUIShown()) {
            return;
        }
        await this.refresh_sync_ui_status();
        this.refresh_folder_list();
    }
    init_search() {
        const search_elem = js.selector.select("#folders_search");
        search_elem.dataset.on_keyup = "folders_ui.keyed_search_string";
        search_elem.focus();
        search_elem.value = this.query.search_string || "";
        UIUtil2.inst.showSearchClear(search_elem);
        this.refresh_sync_ui_status();
    }
    async refresh_folder_list() {
        this.hide("#no_folders_div", "#no_matching_folders_div");
        this.updateFilterIndication();
        const is_queried = this.is_queried();
        if (!is_queried) {
            await this.folderTree.show_ui();
            return;
        }
        await this.refresh_queried_list();
    }
    async init_filters() {
        const is_personal_plan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
        if (is_personal_plan) {
            this.select("#show_folders_filter").remove();
            return;
        }
        this.filterUI.init();
    }
    async refresh_queried_list() {
        const folders = await bgApi.folder.query(this.query);
        this.updateFilterIndication();
        const folder_list = this.select("#folders_list");
        if (this.query.page_no == 0) {
            js.dom.clearContent(folder_list);
        }
        if (folders.length == 0) {
            if (this.query.page_no == 0) {
                this.show("#no_matching_folders_div");
            }
            return;
        }
        this.hide("#no_folders_div", "#no_matching_folders_div");
        folder_list.append(this.get_queried_folders_list(folders));
        this.add_scroll_listener();
    }
    updateFilterIndication() {
        if (this.isPersonalPlan) {
            return;
        }
        const isFiltered = this.filterUI.isFiltered(this.query);
        const filterCountElem = this.select("[data-filter_counter]");
        const clearFilterElem = "#clear_folder_filters";
        if (!isFiltered) {
            js.dom.hide(clearFilterElem, filterCountElem);
            return;
        }
        const filterCount = this.filterUI.countFilters(this.query);
        filterCountElem.textContent = filterCount + "";
        js.dom.show(clearFilterElem, filterCountElem);
    }
    add_scroll_listener() {
        const LAST_NTH = 10;
        if (this.intersection_observer) {
            this.intersection_observer.disconnect();
        }
        const intersection_observer = new IntersectionObserver(this.intersected_scroll, {
            root: document.body,
            threshold: 0.5
        });
        const folder_list = this.select("#folders_list");
        const element_to_observe = folder_list.children[folder_list.children.length - LAST_NTH];
        if (element_to_observe) {
            intersection_observer.observe(element_to_observe);
        }
        if (folder_list.children.length == this.query.rows_per_page) {
            intersection_observer.observe(folder_list.lastElementChild);
        }
    }
    intersected_scroll(entries, observer) {
        const intersected = entries.some(x => x.isIntersecting);
        if (!intersected) {
            return;
        }
        observer.disconnect();
        this.show_next_page();
    }
    async show_next_page() {
        this.query.page_no++;
        await this.refresh_queried_list();
    }
    get_queried_folders_list(folders) {
        const fragment = document.createDocumentFragment();
        const folder_template = js.selector.select("#folder_search_list_item_template");
        for (let folder of folders) {
            fragment.append(this.create_queried_folder_elem(folder_template, folder));
        }
        return fragment;
    }
    create_queried_folder_elem(template, folder) {
        const folderElem = UIUtil.createElem({ template: template });
        const nameElem = js.selector.selectFrom(folderElem, "[data-name]");
        js.dom.setText(nameElem, folder.name);
        js.dom.setChildText(folderElem, "[data-path]", folder.path.includes("\\") ? this.getDisplayFolderPath(folder.path) : " ");
        if (this.query.search_string) {
            js.dom.setContent(nameElem, TextHighlighter.highlight(this.query.search_string, folder.name));
        }
        this.updateSharingIcon(folderElem, folder);
        globalNodeData.setNodeData(folderElem, folder);
        return folderElem;
    }
    getDisplayFolderPath(path) {
        return path.replace(/\\/g, " / ");
    }
    is_queried() {
        return Boolean(this.query.search_string) || this.filterUI.isFiltered(this.query);
    }
    async init_query() {
        this.query.page_no = 0;
    }
    getQuery() {
        return this.query;
    }
    async refresh_sync_ui_status() {
        const search_elem = this.select("#folders_search");
        const syncing = await zlocalStorage.load(LocalStorageKeys.SYNCING, false);
        if (syncing) {
            search_elem.placeholder = i18n(VI18N.SYNCING) + "...";
            return;
        }
        search_elem.placeholder = i18n(VI18N.SEARCH);
    }
    updateSharingIcon(elem, folder) {
        const sharedByMeIcon = js.selector.selectFrom(elem, "[data-shared_by_me]");
        const sharedToMeIcon = js.selector.selectFrom(elem, "[data-shared_to_me]");
        const removeBothIcons = this.isPersonalPlan || folder.sharing_type == FolderSharingType.NONE;
        if (removeBothIcons) {
            sharedByMeIcon.remove();
            sharedToMeIcon.remove();
            return;
        }
        const removeSharedToMe = folder.sharing_type == FolderSharingType.SHARED_BY_ME;
        if (removeSharedToMe) {
            sharedToMeIcon.remove();
            return;
        }
        sharedByMeIcon.remove();
    }
}
