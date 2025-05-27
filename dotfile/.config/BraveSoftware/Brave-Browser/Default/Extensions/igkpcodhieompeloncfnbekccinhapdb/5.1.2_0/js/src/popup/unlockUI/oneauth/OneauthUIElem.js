import { UIElemContainer } from "../../../uiUtil/export.js";
export class OneauthUIElem extends UIElemContainer {
    unlockElem;
    loadingElem;
    resendPushButton;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#oneauth_unlock_template" });
        this.unlockElem = this.select("[data-unlock_oneauth]");
        this.loadingElem = this.select("[data-loading_container]");
        this.resendPushButton = this.select("[data-resend_push]");
    }
}
