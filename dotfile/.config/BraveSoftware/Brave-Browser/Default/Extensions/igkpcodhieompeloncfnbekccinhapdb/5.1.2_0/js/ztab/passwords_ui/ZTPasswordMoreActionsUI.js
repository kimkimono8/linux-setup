import { BasePasswordMoreActionsUI } from "../../common/ui/components/BasePasswordMoreActionsUI.js";
export class ZTPasswordMoreActionsUI extends BasePasswordMoreActionsUI {
    highlightIcon(e) {
        const ICON_SELECTED_CLASS = "action-icon-list-selected";
        const moreActionsIcon = js.selector.closest(e.target, "[data-show_more_options]");
        js.selector.selectFrom(moreActionsIcon, "a").classList.add(ICON_SELECTED_CLASS);
        e.target.closest("div.card-view-password-list-inner").classList.add("password-list-view-selected");
        js.selector.closest(e.target, "[data-icon_list]").classList.add("password-icon-active");
    }
    removeHighlight() {
        const secretElem = js.selector.select(".password-list-view-selected");
        if (!secretElem) {
            return;
        }
        try {
            secretElem.classList.remove("password-list-view-selected");
            const activeClassElem = js.selector.select(".password-icon-active");
            if (activeClassElem) {
                activeClassElem.classList.remove("password-icon-active");
            }
            const selectedListElem = js.selector.selectFrom(secretElem, ".action-icon-list-selected");
            if (selectedListElem) {
                selectedListElem.classList.remove("action-icon-list-selected");
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
