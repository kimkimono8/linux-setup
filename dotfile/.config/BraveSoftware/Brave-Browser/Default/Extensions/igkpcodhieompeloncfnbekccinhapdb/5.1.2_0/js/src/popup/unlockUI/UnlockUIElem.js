import { UIElemContainer } from "../../uiUtil/export.js";
export class UnlockUIElem extends UIElemContainer {
    unlockOut;
    unlockOrOut;
    usernameSpan;
    signoutButton;
    dpImg;
    loadingElem;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#passphrase_page" });
        this.unlockOut = this.select("#unlock_out");
        this.unlockOrOut = this.select("#unlock_or_out");
        this.usernameSpan = this.select("[data-name]");
        this.signoutButton = this.select(`[data-name="signout_button"]`);
        this.dpImg = this.select("[data-dp]");
        this.loadingElem = this.select("[data-open_vault_loading]");
    }
}
