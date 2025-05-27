import { UIElemContainer } from "../../uiUtil/export.js";
export class PasswordsUIElem extends UIElemContainer {
    init() {
        this.container = UIUtil.createElem({ template: "#passwords_tab_template", preRender: true });
    }
}
