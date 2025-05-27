export class BasePasswordFormUIListener {
    p = null;
    clickedHideForm() {
        this.p.hideForm();
    }
    handleInputClearError(e) {
        try {
            js.dom.setChildText(js.selector.closest(e.target, "[data-field_row]"), "[data-error]", "");
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
