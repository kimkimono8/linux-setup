import { FilterType } from "../../../../../service/bgApi/types.js";
import { VI18N } from "../../../../../service/vt/VI18n.js";
import { BaseFilterTagUIData } from "./BaseFilterTagUIData.js";
import { BaseFilterTagUIElem } from "./BaseFilterTagUIElem.js";
export class BaseFilterTagUI {
    filterUI;
    elem = new BaseFilterTagUIElem(this);
    data = new BaseFilterTagUIData();
    constructor(filterUI) {
        this.filterUI = filterUI;
    }
    showUI() {
        try {
            this.elem.init();
            if (this.data.tags.length == 0) {
                js.dom.hide(this.elem.container);
                return;
            }
            this.initUIValues();
            this.initTagSelect();
            this.addUIListeners();
            this.addSlimScroll();
        }
        catch (e) {
            logError(e);
        }
    }
    initUIValues() {
        try {
            this.elem.getTagModeCheckbox(this.filterUI.data.getQuery().tagMode).checked = true;
            this.updateTagsSelectionMark();
        }
        catch (e) {
            logError(e);
        }
    }
    initTagSelect() {
        try {
            const tags = this.data.tags;
            const query = this.filterUI.data.getQuery();
            const tagElem = UIUtil.createListSelectElem({
                list: tags,
                selected: query.tags,
                placeholder: i18n(VI18N.SELECT) + " " + i18n(VI18N.TAG),
                keepDropdownOpen: query.tags.length > 0,
            });
            this.elem.tagSelectElem = tagElem;
            js.dom.setContent(this.elem.selectContainer, tagElem.elem);
            tagElem.refreshUI();
        }
        catch (e) {
            logError(e);
        }
    }
    addUIListeners() {
        try {
            this.elem.getTagModeCheckbox(FilterType.ALL).addEventListener("input", () => this.filterUI.updater.changeTagMode(FilterType.ALL));
            this.elem.getTagModeCheckbox(FilterType.ANY).addEventListener("input", () => this.filterUI.updater.changeTagMode(FilterType.ANY));
            this.elem.tagSelectElem.onSelectionChanged((tags) => {
                this.filterUI.updater.changeTags(tags);
                this.updateTagsSelectionMark();
            });
        }
        catch (e) {
            logError(e);
        }
    }
    addSlimScroll() {
        try {
            const tagListElem = this.elem.select("[data-dropdown_list_container]");
            UIUtil.addSlimScroll(tagListElem);
        }
        catch (e) {
            logError(e);
        }
    }
    updateTagsSelectionMark() {
        try {
            const query = this.filterUI.data.getQuery();
            const selected = query.tags.length > 0;
            js.dom.showHide(selected, this.filterUI.elem.tagsSelectionMark);
        }
        catch (e) {
            logError(e);
        }
    }
}
