import { globalNodeData } from "../../common/ui/globalNodeData.js";
import { Folder_Tree_Query } from "../../src/service/bgApi/types/Folder.js";
export class FolderTree {
    p = null;
    query = Folder_Tree_Query.createDefaultQuery();
    folder_template = null;
    folderListElem = null;
    intersectionObserver = null;
    init() {
        this.init = () => { };
        this.handleScrollIntersection = this.handleScrollIntersection.bind(this);
        this.showNextPage = js.fn.wrapper.createSingleInstListener(this.showNextPage, this);
        this.refreshFolderTree = js.fn.wrapper.createSingleInstListener(this.refreshFolderTree, this);
    }
    async show_ui() {
        this.folderListElem = this.p.select("#folders_list");
        this.folder_template = js.selector.select("#folder_list_item_template");
        this.folderListElem.replaceChildren();
        await this.refreshFolderTree();
    }
    async refreshFolderTree() {
        try {
            const result = await bgApi.folder.queryTree(this.query);
            const folders = result.folders;
            if (folders.length == 0) {
                this.p.show("#no_folders_div");
                return;
            }
            this.p.hide("#no_folders_div", "#no_matching_folders_div");
            this.folderListElem.replaceChildren(this.get_folder_tree(folders));
            if (result.total > this.query.end) {
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
                root: this.folderListElem.parentElement,
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
        try {
            const intersected = entries.some(x => x.isIntersecting);
            if (!intersected) {
                return;
            }
            observer.disconnect();
            this.showNextPage();
        }
        catch (e) {
            logError(e);
        }
    }
    async showNextPage() {
        const ROWS_PER_PAGE = 50;
        this.query.end += ROWS_PER_PAGE;
        await this.refreshFolderTree();
    }
    get_folder_tree(folders) {
        const fragment = document.createDocumentFragment();
        for (let folder of folders) {
            fragment.append(this.create_folder_elem(folder));
        }
        this.update_arrow_direction(fragment);
        this.update_padding(fragment);
        return fragment;
    }
    update_arrow_direction(container) {
        const folder_elems = container.children;
        const i_end = folder_elems.length - 1;
        for (let i = 0; i < i_end; i++) {
            const cur_elem = folder_elems[i];
            const next_elem = folder_elems[i + 1];
            if (next_elem.dataset.parent_id == cur_elem.dataset.id) {
                this.show_collapse_arrow(cur_elem);
            }
        }
    }
    update_padding(container) {
        const folder_elems = Array.from(container.children);
        const max_padding = document.documentElement.clientWidth / 2;
        for (let elem of folder_elems) {
            const padding = Math.min((elem.dataset.path.split("\\").length - 1) * 20, max_padding);
            js.selector.selectFrom(elem, "div.folder-list-panel-inner").style.marginLeft = padding + "px";
        }
    }
    create_folder_elem(folder) {
        const elem = UIUtil.createElem({ template: this.folder_template });
        js.dom.setChildText(elem, "[data-name]", folder.name);
        elem.dataset.path = folder.path;
        elem.dataset.id = folder.id;
        elem.dataset.parent_id = folder.parent_id;
        globalNodeData.setNodeData(elem, folder);
        this.update_arrow(elem, folder);
        this.p.updateSharingIcon(elem, folder);
        return elem;
    }
    show_expand_arrow(elem) {
        js.dom.showOld(js.selector.selectFrom(elem, "[data-expand]"));
        js.dom.hideOld(js.selector.selectFrom(elem, "[data-collapse]"));
    }
    show_collapse_arrow(elem) {
        js.dom.hideOld(js.selector.selectFrom(elem, "[data-expand]"));
        js.dom.showOld(js.selector.selectFrom(elem, "[data-collapse]"));
    }
    update_arrow(elem, folder) {
        const expand_elem = js.selector.selectFrom(elem, "[data-expand]");
        const collapse_elem = js.selector.selectFrom(elem, "[data-collapse]");
        if (!folder.has_subfolder) {
            expand_elem.remove();
            collapse_elem.remove();
            return;
        }
        globalNodeData.setClickData(expand_elem, { path: folder.path });
        globalNodeData.setClickData(collapse_elem, { path: folder.path });
    }
}
