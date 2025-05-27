import { FilterType } from "../../../../service/bgApi/types.js";
import { FolderSharingType } from "../../../../service/bgApi/types/Folder.js";
import { BaseFolderFilterUIElem } from "./BaseFolderFilterUIElem.js";
export class BaseFolderFilterUI {
    elem = new BaseFolderFilterUIElem();
    init() {
        try {
            this.elem.init();
            this.initUI();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    showUI() {
        try {
            js.dom.show(this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    hideUI() {
        try {
            js.dom.hide(this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    isFiltered(query) {
        return query.sharingType != FilterType.ALL;
    }
    countFilters(query) {
        return this.isFiltered(query) ? 1 : 0;
    }
    initUI() {
        try {
            this.elem.getSharingCheckbox(this.data.getQuery().sharingType).checked = true;
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.elem.getSharingCheckbox(FilterType.ALL).addEventListener("input", () => this.updater.changeSharingType(FilterType.ALL));
            this.elem.getSharingCheckbox(FolderSharingType.SHARED_BY_ME).addEventListener("input", () => this.updater.changeSharingType(FolderSharingType.SHARED_BY_ME));
            this.elem.getSharingCheckbox(FolderSharingType.SHARED_TO_ME).addEventListener("input", () => this.updater.changeSharingType(FolderSharingType.SHARED_TO_ME));
            this.elem.getSharingCheckbox(FolderSharingType.NONE).addEventListener("input", () => this.updater.changeSharingType(FolderSharingType.NONE));
        }
        catch (e) {
            logError(e);
        }
    }
}
