import { BaseUserRow } from "../base/BaseUserRow.js";
export class UserRow extends BaseUserRow {
    static createRow(...fns) {
        const obj = new UserRow();
        obj.elem = this.createElem();
        fns.forEach(fn => fn.call(obj));
        return obj;
    }
    static template = null;
    static createElem() {
        if (!this.template) {
            this.template = js.selector.select("#password_share_user_row_template");
        }
        return UIUtil.createElem({ template: this.template });
    }
    setEmail(email) {
        js.dom.setText(this.getEmailElement(), email);
    }
    setDp(dp) {
        this.select("[data-dp]").src = dp;
    }
    highlightEmail(searchString) {
        this.hightlightElem(this.getEmailElement(), searchString);
    }
    getEmailElement() {
        return this.select("[data-email]");
    }
}
