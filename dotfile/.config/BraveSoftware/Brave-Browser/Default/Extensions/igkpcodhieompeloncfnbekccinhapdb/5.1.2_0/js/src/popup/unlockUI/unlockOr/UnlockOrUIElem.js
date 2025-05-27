import { UIElemContainer } from "../../../uiUtil/export.js";
export class UnlockOrUIElem extends UIElemContainer {
    passphraseButton;
    oneauthButton;
    webauthnButton;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#unlock_or_template" });
        this.passphraseButton = this.select("[data-unlock_master]");
        this.oneauthButton = this.select("[data-oneauth_unlock]");
        this.webauthnButton = this.select("[data-webauthn_unlock]");
    }
}
