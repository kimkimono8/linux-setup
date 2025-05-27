import { FilterType } from "../../../../service/bgApi/types.js";
import { SecretClassification } from "../../../../service/bgApi/types/Secret.js";
import { BasePasswordFilterUIElem } from "./BasePasswordFilterUIElem.js";
import { BaseFilterTagUI } from "./tag/BaseFilterTagUI.js";
export class BasePasswordFilterUI {
    elem = new BasePasswordFilterUIElem();
    tagUI = new BaseFilterTagUI(this);
    async showUI() {
        try {
            this.elem.init();
            await this.data.init();
            this.initSharingDropdown();
            this.tagUI.showUI();
            this.initUIValues();
            this.addUIListeners();
            this.initPlanFilters();
            js.dom.setContent("#passwords_filter_container", this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    hideUI() {
        try {
            this.elem.container?.remove?.();
        }
        catch (e) {
            logError(e);
        }
    }
    isQueryFiltered(query) {
        return this.countFilters(query) > 0;
    }
    countFilters(query) {
        const q = query;
        let count = 0;
        q.favourite && count++;
        q.domainMatching && count++;
        q.owned && count++;
        q.recentlyUsed && count++;
        q.recentlyAdded && count++;
        (q.classification != FilterType.ALL) && count++;
        (q.sharing != FilterType.ALL) && count++;
        (q.tags.length > 0) && count++;
        return count;
    }
    initSharingDropdown() {
        try {
            const query = this.data.getQuery();
            js.selector.selectFrom(this.elem.sharingSelect, `option[value="${query.sharing}"]`).selected = true;
            $(this.elem.sharingSelect).select2({ minimumResultsForSearch: -1 });
            $(this.elem.sharingSelect).on("change", e => {
                this.updater.changeSharing((e.target.value));
                this.updateSharingSelectionMark();
            });
        }
        catch (e) {
            logError(e);
        }
    }
    initUIValues() {
        try {
            const query = this.data.getQuery();
            this.elem.favouriteCheckbox.checked = query.favourite;
            this.elem.domainCheckbox.checked = query.domainMatching;
            this.elem.ownedCheckbox.checked = query.owned;
            this.elem.recentlyUsedCheckbox.checked = query.recentlyUsed;
            this.elem.recentlyAddedCheckbox.checked = query.recentlyAdded;
            this.elem.getClassificationCheckbox(query.classification).checked = true;
            this.updateGeneralSelectionMark();
            this.updateRecentSelectionMark();
            this.updateClassificationSelectionMark();
            this.updateSharingSelectionMark();
        }
        catch (e) {
            logError(e);
        }
    }
    addUIListeners() {
        try {
            this.elem.favouriteCheckbox.addEventListener("input", () => {
                this.updater.changeFavourite(this.elem.favouriteCheckbox.checked);
                this.updateGeneralSelectionMark();
            });
            this.elem.domainCheckbox.addEventListener("input", () => {
                this.updater.changeDomainMatching(this.elem.domainCheckbox.checked);
                this.updateGeneralSelectionMark();
            });
            this.elem.ownedCheckbox.addEventListener("input", () => {
                this.updater.changeOwned(this.elem.ownedCheckbox.checked);
                this.updateGeneralSelectionMark();
            });
            this.elem.recentlyUsedCheckbox.addEventListener("input", () => {
                this.updater.changeRecentlyUsed(this.elem.recentlyUsedCheckbox.checked);
                this.updateRecentSelectionMark();
            });
            this.elem.recentlyAddedCheckbox.addEventListener("input", () => {
                this.updater.changeRecentlyAdded(this.elem.recentlyAddedCheckbox.checked);
                this.updateRecentSelectionMark();
            });
            this.elem.getClassificationCheckbox(FilterType.ALL).addEventListener("input", () => {
                this.updater.changeClassification(FilterType.ALL);
                this.updateClassificationSelectionMark();
            });
            this.elem.getClassificationCheckbox(SecretClassification.PERSONAL).addEventListener("input", () => {
                this.updater.changeClassification(SecretClassification.PERSONAL);
                this.updateClassificationSelectionMark();
            });
            this.elem.getClassificationCheckbox(SecretClassification.ENTERPRISE).addEventListener("input", () => {
                this.updater.changeClassification(SecretClassification.ENTERPRISE);
                this.updateClassificationSelectionMark();
            });
        }
        catch (e) {
            logError(e);
        }
    }
    initPlanFilters() {
        try {
            if (!this.data.isPersonalPlan) {
                return;
            }
            VUI.hide(this.elem.classificationContainer, this.elem.sharingContainer, this.elem.ownedContainer);
        }
        catch (e) {
            logError(e);
        }
    }
    updateGeneralSelectionMark() {
        try {
            const query = this.data.getQuery();
            const selected = query.favourite || query.domainMatching || query.owned;
            js.dom.showHide(selected, this.elem.generalSelectionMark);
        }
        catch (e) {
            logError(e);
        }
    }
    updateRecentSelectionMark() {
        try {
            const query = this.data.getQuery();
            const selected = query.recentlyUsed || query.recentlyAdded;
            js.dom.showHide(selected, this.elem.recentSelectionMark);
        }
        catch (e) {
            logError(e);
        }
    }
    updateClassificationSelectionMark() {
        try {
            const query = this.data.getQuery();
            const selected = query.classification != FilterType.ALL;
            js.dom.showHide(selected, this.elem.classificationSelectionMark);
        }
        catch (e) {
            logError(e);
        }
    }
    updateSharingSelectionMark() {
        try {
            const query = this.data.getQuery();
            const selected = query.sharing != FilterType.ALL;
            js.dom.showHide(selected, this.elem.sharingSelectionMark);
        }
        catch (e) {
            logError(e);
        }
    }
}
