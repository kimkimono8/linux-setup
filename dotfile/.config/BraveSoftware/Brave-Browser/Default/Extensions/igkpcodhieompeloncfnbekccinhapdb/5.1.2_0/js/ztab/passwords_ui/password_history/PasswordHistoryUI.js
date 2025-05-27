import { UIUtil1 as UIUtil2 } from "../../../common/ui/ui_util.js";
import { PoisitionUtil } from "../../../common/util/dom/PositionUtil.js";
import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
export class PasswordHistoryUI extends UIParent {
    overlaySelector = "#password_history_overlay";
    lastTableElem = null;
    PASSWORD_MASK = "************";
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#password_history_template" });
    }
    addSlimScroll() {
        const hasNoContent = this.select(`[data-name="noHistory"]`).style.display == "block";
        if (hasNoContent) {
            return;
        }
        const containerElem = this.elem.firstElementChild;
        containerElem.style.overflowY = "";
        UIUtil.addSlimScroll(this.select(`[data-name="tableContainer"]`), { height: containerElem.offsetHeight - 46 });
    }
    showAt(e) {
        document.body.append(this.elem);
        PoisitionUtil.positionMoreActions(this.elem, js.selector.closest(e.target, "[data-on_click]"));
        this.addSlimScroll();
        js.dom.showOld(this.overlaySelector);
    }
    hideUI() {
        this.elem.remove();
        js.dom.hideNoError(this.overlaySelector);
    }
    createTable(fieldLabel) {
        const tableElem = this.lastTableElem = UIUtil.createElem({ preRender: true, template: "#password_history_table_template" });
        js.dom.setChildText(tableElem, `[data-field_name]`, fieldLabel);
        this.select(`[data-name="tableContainer"]`).append(tableElem);
    }
    addTextRow(fieldValue, modifiedTime, listener) {
        this.addRow("#password_history_text_field_row_template", fieldValue, modifiedTime, listener);
    }
    addPasswordRow(modifiedTime, copyListener, showListener) {
        try {
            const row = this.addRow("#password_history_password_field_row_template", this.PASSWORD_MASK, modifiedTime, copyListener);
            const textElem = js.selector.selectFrom(row, `[data-name="fieldValue"]`);
            js.selector.selectFrom(row, `[data-name="viewValue"]`).addEventListener("click", function () {
                showListener(textElem);
            });
        }
        catch (e) {
            logError(e);
        }
    }
    addRow(selector, fieldValue, modifiedTime, copyListener) {
        try {
            const row = UIUtil.createElem({ preRender: true, template: selector });
            js.dom.setChildText(row, `[data-name="fieldValue"]`, fieldValue);
            js.dom.setChildText(row, `[data-name="modifiedTime"]`, modifiedTime);
            js.selector.selectFrom(row, `[data-name="copyValue"]`).addEventListener("click", copyListener);
            js.selector.selectFrom(this.lastTableElem, "tbody").append(row);
            return row;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    showEmpty() {
        this.hide(`[data-name="tableContainer"]`);
        this.show(`[data-name="noHistory"]`);
    }
    showPassword(elem, value) {
        try {
            js.dom.setContent(elem, VUI.password.getColoredPassword(value));
            elem.dataset.tooltip_content = value;
            UIUtil2.inst.showClosedEyeIcon(elem.parentElement);
        }
        catch (e) {
            logError(e);
        }
    }
    hidePassword(elem) {
        js.dom.setText(elem, this.PASSWORD_MASK);
        UIUtil2.inst.showOpenedEyeIcon(elem.parentElement);
    }
    onCloseInput(listener) {
        this.select(`[data-name="closeHistory"]`).addEventListener("click", listener);
    }
}
