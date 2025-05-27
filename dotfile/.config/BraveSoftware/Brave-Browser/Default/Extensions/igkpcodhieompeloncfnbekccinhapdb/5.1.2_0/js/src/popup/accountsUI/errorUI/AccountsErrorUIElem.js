import { UIElemContainer } from "../../../uiUtil/export.js";
export class AccountsErrorUIElem extends UIElemContainer {
    usernameElem;
    emailElem;
    dpImg;
    errorMsg;
    actionButton;
    signoutButton;
    init() {
        this.container = UIUtil.createElem({ template: "#accounts_error" });
        this.usernameElem = this.select("#username");
        this.emailElem = this.select("#email");
        this.dpImg = this.select("#dp");
        this.errorMsg = this.select("#errorMsg");
        this.actionButton = this.select("#actionBtn");
        this.signoutButton = this.select(`[data-name="signout_button"]`);
    }
}
