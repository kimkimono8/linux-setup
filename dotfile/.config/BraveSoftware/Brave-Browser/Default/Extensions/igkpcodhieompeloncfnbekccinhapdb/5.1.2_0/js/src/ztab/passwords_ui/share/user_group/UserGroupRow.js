import { BaseUserRow } from "../base/BaseUserRow.js";
export class UserGroupRow extends BaseUserRow {
    static createRow(...fns) {
        const obj = new UserGroupRow();
        obj.elem = this.createElem();
        fns.forEach(fn => fn.call(obj));
        return obj;
    }
    static template = null;
    static createElem() {
        if (!this.template) {
            this.template = js.selector.select("#password_share_user_group_row_template");
        }
        return UIUtil.createElem({ template: this.template });
    }
}
