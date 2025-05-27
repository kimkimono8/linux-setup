import { uiUtilOld } from "../../../../../../common/ui/ui_util.js";
import { FilterType } from "../../../../../service/bgApi/types.js";
import { SecretSharingType, SecretClassification } from "../../../../../service/bgApi/types/Secret.js";
import { VI18N } from "../../../../../service/vt/VI18n.js";
import { BaseNoPasswordFilterUIElem } from "./BaseNoPasswordFilterUIElem.js";
export class BaseNoPasswordFilterUI {
    filterUI;
    elem = new BaseNoPasswordFilterUIElem();
    query;
    constructor(filterUI) {
        this.filterUI = filterUI;
    }
    showUI() {
        try {
            this.elem.init();
            this.query = this.filterUI.data.getQuery();
            this.showHideFilters();
            this.addListeners();
            js.dom.setContent(js.selector.selectFrom(this.getPasswordsElem(), "[data-applied_filters_container]"), this.elem.container);
        }
        catch (e) {
            logError(e);
        }
    }
    showHideFilters() {
        try {
            const showElems = [];
            this.query.favourite && showElems.push(this.elem.favouriteElem);
            this.query.domainMatching && showElems.push(this.elem.domainMatchingElem);
            this.query.owned && showElems.push(this.elem.ownedElem);
            this.query.recentlyUsed && showElems.push(this.elem.recentlyUsedElem);
            this.query.recentlyAdded && showElems.push(this.elem.recentlyAddedElem);
            this.showClassification();
            this.showSharing();
            this.query.tags.length > 0 && showElems.push(this.elem.tagsElem);
            this.query.search_string && showElems.push(this.elem.searchElem);
            if (this.query.search_string) {
                js.dom.setChildText(this.elem.searchElem, "[data-text]", this.query.search_string);
            }
            if (!this.filterUI.isQueryFiltered(this.query)) {
                js.dom.hide(this.elem.viewFiltersElem);
            }
            VUI.show(...showElems);
        }
        catch (e) {
            logError(e);
        }
    }
    showSharing() {
        try {
            if (this.query.sharing == FilterType.ALL) {
                return;
            }
            js.dom.setText(this.elem.sharingText, i18n(this.getSharingText()));
            js.dom.show(this.elem.sharingElem);
        }
        catch (e) {
            logError(e);
        }
    }
    getSharingText() {
        try {
            switch (this.query.sharing) {
                case SecretSharingType.SHARED_BY_ME:
                    return VI18N.SHARED_BY_ME;
                case SecretSharingType.SHARED_TO_ME:
                    return VI18N.SHARED_WITH_ME;
                case SecretSharingType.NONE:
                    return VI18N.UNSHARED;
                default:
                    throw "NEW_STATE";
            }
        }
        catch (e) {
            logError(e);
            return VI18N.EMPTY;
        }
    }
    showClassification() {
        try {
            if (this.query.classification == FilterType.ALL) {
                return;
            }
            js.dom.setText(this.elem.classificationText, i18n(this.getClassificationText()));
            js.dom.show(this.elem.classificationElem);
        }
        catch (e) {
            logError(e);
        }
    }
    getClassificationText() {
        try {
            switch (this.query.classification) {
                case SecretClassification.PERSONAL:
                    return VI18N.PERSONAL;
                case SecretClassification.ENTERPRISE:
                    return VI18N.ENTERPRISE;
                default:
                    throw "NEW_STATE";
            }
        }
        catch (e) {
            logError(e);
            return VI18N.EMPTY;
        }
    }
    addListeners() {
        try {
            this.query.favourite && this.elem.favouriteElem.addEventListener("click", () => this.filterUI.updater.changeFavourite(false));
            this.query.domainMatching && this.elem.domainMatchingElem.addEventListener("click", () => this.filterUI.updater.changeDomainMatching(false));
            this.query.owned && this.elem.ownedElem.addEventListener("click", () => this.filterUI.updater.changeOwned(false));
            this.query.recentlyUsed && this.elem.recentlyUsedElem.addEventListener("click", () => this.filterUI.updater.changeRecentlyUsed(false));
            this.query.recentlyAdded && this.elem.recentlyAddedElem.addEventListener("click", () => this.filterUI.updater.changeRecentlyAdded(false));
            this.query.classification != FilterType.ALL && this.elem.classificationElem.addEventListener("click", () => this.filterUI.updater.changeClassification(FilterType.ALL));
            this.query.sharing != FilterType.ALL && this.elem.sharingElem.addEventListener("click", () => this.filterUI.updater.changeSharing(FilterType.ALL));
            this.query.tags.length > 0 && this.elem.tagsElem.addEventListener("click", () => this.filterUI.updater.changeTags([]));
            this.query.search_string && this.elem.searchElem.addEventListener("click", () => this.onClearSearch());
        }
        catch (e) {
            logError(e);
        }
    }
    onClearSearch() {
        try {
            this.filterUI.updater.changeSearchString("");
            const searchElem = this.getSearchElem();
            searchElem.value = "";
            uiUtilOld.showSearchClear(searchElem);
        }
        catch (e) {
            logError(e);
        }
    }
}
