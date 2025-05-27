import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { FolderFilterUI } from "../../src/popup/folderUI/filter/FolderFilterUI.js";
import { pp } from "../../src/popup/pp.js";
import { FolderQuery, FolderSharingType } from "../../src/service/bgApi/types/Folder.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TextHighlighter } from "../../src/uiUtil/export.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { folderTree } from "./FolderTree.js";
import { FoldersUIListener } from "./FoldersUIListener.js";
export class FoldersUI extends UIParent {
    static PP_FOLDER_QUERY = "PP_FOLDER_QUERY";
    query = null;
    intersectionObserver = null;
    isPersonalPlan = false;
    filterUI = new FolderFilterUI();
    listener = new FoldersUIListener();
    async init() {
        this.init = async () => { };
        this.listener.p = this;
        folderTree.p = this;
        this.isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
        folderTree.init();
        this.refreshFolderList = js.fn.wrapper.createSingleInstListener(this.refreshFolderList, this);
        this.refreshQueriedList = js.fn.wrapper.createSingleInstListener(this.refreshQueriedList, this);
        this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
        this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
        globalDomListener.register("folders_ui", this.listener);
    }
    async showUI() {
        await this.init();
        if (this.elem) {
            this.elem.remove();
        }
        pp.passwordsUI.restorePreFolderQuery();
        const elem = this.elem = UIUtil.createElem({ preRender: true, template: "#page_folders" });
        await this.initQuery();
        this.initSearch();
        this.initFilters();
        await this.refreshFolderList();
        js.dom.setContent("#content_tab", elem);
    }
    async synced() {
        if (!this.isUIShown()) {
            return;
        }
        this.refreshFolderList();
    }
    initSearch() {
        const searchElem = js.selector.select("#search");
        searchElem.dataset.on_keyup = "folders_ui.keyed_search_string";
        searchElem.focus();
        searchElem.value = this.query.search_string || "";
        UIUtil1.inst.showSearchClear(searchElem);
    }
    async refreshFolderList() {
        this.hide("#no_folders_div", "#no_matching_folders_div");
        this.query = (await zsessionStorage.load(FoldersUI.PP_FOLDER_QUERY, null)) || FolderQuery.createDefaultQuery();
        this.updateFilterIndication();
        const isQueried = this.isQueried();
        if (!isQueried) {
            await folderTree.showUI();
            return;
        }
        await this.refreshQueriedList();
    }
    async initFilters() {
        const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
        if (isPersonalPlan) {
            this.select("#show_folders_filter").remove();
            return;
        }
        this.filterUI.init();
    }
    async refreshQueriedList() {
        const query = this.query =
            (await zsessionStorage.load(FoldersUI.PP_FOLDER_QUERY, null)) || FolderQuery.createDefaultQuery();
        const folders = await bgApi.folder.query(this.query);
        this.updateFilterIndication();
        const folderListElem = this.select("#folders_list");
        if (query.page_no == 0) {
            js.dom.clearContent(folderListElem);
        }
        if (folders.length == 0) {
            if (query.page_no == 0) {
                this.hide(folderListElem);
                this.show("#no_matching_folders_div");
                const filtered = this.filterUI.isFiltered(this.query);
                this.showIf(filtered, "[data-view_filters]");
            }
            return;
        }
        this.show(folderListElem);
        this.hide("#no_folders_div", "#no_matching_folders_div");
        folderListElem.append(this.getQueriedFoldersList(folders));
        this.addScrollListener();
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
    addScrollListener() {
        const LAST_NTH = 10;
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection, {
            root: document.body,
            threshold: 0.5
        });
        const folderListElem = this.select("#folders_list");
        const elementToObserve = folderListElem.children[folderListElem.children.length - LAST_NTH];
        if (elementToObserve) {
            this.intersectionObserver.observe(elementToObserve);
        }
        if (folderListElem.children.length == this.query.rows_per_page) {
            this.intersectionObserver.observe(folderListElem.lastElementChild);
        }
    }
    handleScrollIntersection(entries, observer) {
        const intersected = entries.some(x => x.isIntersecting);
        if (!intersected) {
            return;
        }
        observer.disconnect();
        this.showNextPage();
    }
    async showNextPage() {
        this.query.page_no++;
        await zsessionStorage.save(FoldersUI.PP_FOLDER_QUERY, this.query);
        await this.refreshQueriedList();
    }
    getQueriedFoldersList(folders) {
        const fragment = document.createDocumentFragment();
        const folderTemplate = js.selector.select("#folder_search_list_item_template");
        for (let folder of folders) {
            fragment.append(this.createQueriedFolderElem(folderTemplate, folder));
        }
        return fragment;
    }
    createQueriedFolderElem(template, folder) {
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
    isQueried() {
        return Boolean(this.query.search_string) || this.filterUI.isFiltered(this.query);
    }
    async initQuery() {
        this.query = await this.loadQuery();
        this.query.page_no = 0;
        await zsessionStorage.save(FoldersUI.PP_FOLDER_QUERY, this.query);
    }
    async loadQuery() {
        return this.query = (await zsessionStorage.load(FoldersUI.PP_FOLDER_QUERY, null)) || FolderQuery.createDefaultQuery();
    }
    getQuery() {
        return this.query;
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
