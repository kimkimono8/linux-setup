import { UIElemContainer } from "../../../uiUtil/export.js";
export class PassphraseUIElem extends UIElemContainer {
    errorMsgElem;
    passphraseElem;
    eyeIconElem;
    openButton;
    showHideButton;
    init() {
        this.container = UIUtil.createElem({ preRender: true, template: "#master_unlock_template" });
        this.errorMsgElem = this.select("#error_passphrase");
        this.passphraseElem = this.select("#input_passphrase");
        this.eyeIconElem = this.select("#icon_view_hide_passphrase i");
        this.openButton = this.select(`[data-name="open_vault_button"]`);
        this.showHideButton = this.select("[data-show_hide_passphrase]");
    }
}
