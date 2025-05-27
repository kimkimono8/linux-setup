import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
import { PoisitionUtil } from "../../util/dom/PositionUtil.js";
export class BasePasswordMoreActionsUI extends UIParent {
    overlaySelector = "#more_options_overlay";
    init() {
        this.elem = UIUtil.createElem({ template: "#password_more_actions_template", preRender: true });
    }
    addRow(text, listener) {
        this.appendRow(text, listener);
    }
    getList() {
        return this.select("ul");
    }
    addDeleteRow(text, listener) {
        this.appendRow(text, listener, "text-danger");
    }
    appendRow(text, listener, classText = "") {
        const row = UIUtil.createElem({ template: "#passwore_more_actions_item_template" });
        js.dom.setChildText(row, "[data-text]", text);
        row.addEventListener("click", listener);
        if (classText) {
            js.selector.selectFrom(row, "a").className = classText;
        }
        this.getList().append(row);
    }
    showAt(e) {
        this.highlightIcon(e);
        document.body.append(this.elem);
        PoisitionUtil.positionMoreActions(this.elem, js.selector.closest(e.target, "[data-show_more_options]"));
        js.dom.showOld(this.overlaySelector);
    }
    hideUI() {
        this.removeHighlight();
        this.elem.remove();
        js.dom.hideNoError(this.overlaySelector);
    }
    highlightIcon(e) {
        const ICON_SELECTED_CLASS = "action-icon-list-selected";
        const MORE_ACTIONS_SEC_CLASS = "more-actions";
        const moreActionsIcon = js.selector.closest(e.target, "[data-show_more_options]");
        js.selector.selectFrom(moreActionsIcon, "a").classList.add(ICON_SELECTED_CLASS);
        js.selector.closest(moreActionsIcon, "[data-secret_id]").classList.add(MORE_ACTIONS_SEC_CLASS);
    }
    removeHighlight() {
        const secretElem = js.selector.select(".more-actions");
        if (!secretElem) {
            return;
        }
        secretElem.classList.remove("more-actions");
        js.selector.selectFrom(secretElem, ".action-icon-list-selected").classList.remove("action-icon-list-selected");
    }
}
