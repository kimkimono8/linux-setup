import { zt } from "../../../../ztab/zt.js";
import { BasePasswordFilterUI } from "../../../common/ui/passwords_ui/filter/BasePasswordFilterUI.js";
import { PasswordUIFilterTabs, PasswordUITabType } from "../PasswordsUI.Type.js";
import { FilterUpdater } from "./FilterUpdater.js";
import { NoPasswordFilterUI } from "./NoPasswordFilterUI.js";
import { PasswordFilterUIData } from "./PasswordFilterUIData.js";
export class PasswordFilterUI extends BasePasswordFilterUI {
    data = new PasswordFilterUIData(this);
    updater = new FilterUpdater();
    noPasswordsUI = new NoPasswordFilterUI(this);
    async showTabFilter(tab) {
        try {
            super.showUI();
            if (tab.type != PasswordUITabType.FILTER) {
                return;
            }
            switch (tab.filter) {
                case PasswordUIFilterTabs.FAVOURITES:
                    js.dom.hide(this.elem.favouriteContainer);
                    return;
                case PasswordUIFilterTabs.SHARED_BY_ME:
                case PasswordUIFilterTabs.SHARED_WITH_ME:
                    js.dom.hide(this.elem.sharingContainer);
                    return;
                case PasswordUIFilterTabs.OWNED_BY_ME:
                    js.dom.hide(this.elem.ownedContainer);
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    countFilters(query) {
        try {
            const count = super.countFilters(query);
            const curTab = zt.passwordsUI.sidebar.curTab;
            if (curTab.type != PasswordUITabType.FILTER) {
                return count;
            }
            switch (curTab.filter) {
                case PasswordUIFilterTabs.FAVOURITES:
                    if (query.favourite) {
                        return count - 1;
                    }
                case PasswordUIFilterTabs.SHARED_BY_ME:
                    if (query.sharing) {
                        return count - 1;
                    }
                case PasswordUIFilterTabs.SHARED_WITH_ME:
                    if (query.sharing) {
                        return count - 1;
                    }
                case PasswordUIFilterTabs.OWNED_BY_ME:
                    if (query.owned) {
                        return count - 1;
                    }
            }
            return count;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    updateGeneralSelectionMark() {
        try {
            const isInGeneralTab = this.checkIsGeneralFilterTab();
            if (!isInGeneralTab) {
                super.updateGeneralSelectionMark();
                return;
            }
            const query = this.data.getQuery();
            const count = +query.favourite + +query.owned;
            const selected = count > 1;
            js.dom.showHide(selected, this.elem.generalSelectionMark);
        }
        catch (e) {
            logError(e);
        }
    }
    checkIsGeneralFilterTab() {
        try {
            const curTab = zt.passwordsUI.sidebar.curTab;
            if (curTab.type != PasswordUITabType.FILTER) {
                return false;
            }
            switch (curTab.filter) {
                case PasswordUIFilterTabs.FAVOURITES:
                case PasswordUIFilterTabs.OWNED_BY_ME:
                    return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
}
