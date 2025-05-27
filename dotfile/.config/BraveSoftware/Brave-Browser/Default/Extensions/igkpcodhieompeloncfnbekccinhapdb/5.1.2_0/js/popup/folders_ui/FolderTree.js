import { setGlobal } from "../../common/global/global.js";
import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { Folder_Tree_Query } from "../../src/service/bgApi/types/Folder.js";
export class FolderTree {
    p = null;
    static PP_FOLDER_TREE_QUERY = "PP_FOLDER_TREE_QUERY";
    folderTemplateElem = null;
    folderListElem = null;
    intersectionObserver = null;
    async init() {
        this.init = async () => { };
        this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
        this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
        this.refreshFolderTree = js.fn.wrapper.createSingleInstListener(this.refreshFolderTree, this);
    }
    async showUI() {
        await this.initQuery();
        this.folderListElem = this.p.select("#folders_list");
        this.folderTemplateElem = js.selector.select("#folder_list_item_template");
        this.folderListElem.replaceChildren();
        await this.refreshFolderTree();
    }
    async refreshFolderTree() {
        try {
            const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
            const result = await bgApi.folder.queryTree(query);
            const folders = result.folders;
            if (folders.length == 0) {
                this.p.show("#no_folders_div");
                return;
            }
            this.p.show("#folders_list");
            this.p.hide("#no_folders_div", "#no_matching_folders_div");
            this.folderListElem.replaceChildren(this.getFolderTree(folders));
            if (result.total > query.end) {
                this.addScrollListener();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addScrollListener() {
        try {
            const LAST_NTH = 3;
            const folderListElem = this.folderListElem;
            const elementToObserve = folderListElem.children[folderListElem.children.length - LAST_NTH];
            if (!elementToObserve) {
                return;
            }
            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }
            this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection, {
                root: document.body,
                threshold: 1,
            });
            if (elementToObserve) {
                this.intersectionObserver.observe(elementToObserve);
            }
        }
        catch (e) {
            logError(e);
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
        const ROWS_PER_PAGE = 50;
        const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
        query.end += ROWS_PER_PAGE;
        await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
        await this.refreshFolderTree();
    }
    getFolderTree(folders) {
        const fragment = document.createDocumentFragment();
        for (let folder of folders) {
            fragment.append(this.createFolderElem(folder));
        }
        this.updateArrowDirection(fragment);
        this.updatePadding(fragment);
        return fragment;
    }
    updateArrowDirection(container) {
        const folderElems = container.children;
        const iEnd = folderElems.length - 1;
        let curElem = null;
        let nextElem = null;
        for (let i = 0; i < iEnd; i++) {
            curElem = folderElems[i];
            nextElem = folderElems[i + 1];
            if (nextElem.dataset.parent_id == curElem.dataset.id) {
                this.showCollapseArrow(curElem);
            }
        }
    }
    updatePadding(container) {
        const folderElems = Array.from(container.children);
        const maxPadding = document.documentElement.clientWidth / 2;
        for (let elem of folderElems) {
            const padding = Math.min((elem.dataset.path.split("\\").length - 1) * 10, maxPadding);
            js.selector.selectFrom(elem, "div.folder-list-panel-inner").style.marginLeft = padding + "px";
        }
    }
    createFolderElem(folder) {
        const elem = UIUtil.createElem({ template: this.folderTemplateElem });
        js.dom.setChildText(elem, "[data-name]", folder.name);
        elem.dataset.path = folder.path;
        elem.dataset.id = folder.id;
        elem.dataset.parent_id = folder.parent_id;
        globalNodeData.setNodeData(elem, folder);
        this.updateArrow(elem, folder);
        this.p.updateSharingIcon(elem, folder);
        return elem;
    }
    showExpandArrow(elem) {
        js.dom.showOld(js.selector.selectFrom(elem, "[data-expand]"));
        js.dom.hideOld(js.selector.selectFrom(elem, "[data-collapse]"));
    }
    showCollapseArrow(elem) {
        js.dom.hideOld(js.selector.selectFrom(elem, "[data-expand]"));
        js.dom.showOld(js.selector.selectFrom(elem, "[data-collapse]"));
    }
    updateArrow(elem, folder) {
        const expandElem = js.selector.selectFrom(elem, "[data-expand]");
        const collapseElem = js.selector.selectFrom(elem, "[data-collapse]");
        if (!folder.has_subfolder) {
            expandElem.remove();
            collapseElem.remove();
            return;
        }
        globalNodeData.setClickData(expandElem, { path: folder.path });
        globalNodeData.setClickData(collapseElem, { path: folder.path });
    }
    async initQuery() {
        const query = await zsessionStorage.load(FolderTree.PP_FOLDER_TREE_QUERY, null) || Folder_Tree_Query.createDefaultQuery();
        await zsessionStorage.save(FolderTree.PP_FOLDER_TREE_QUERY, query);
        return query;
    }
}
export const folderTree = new FolderTree();
setGlobal("folderTree", folderTree);
