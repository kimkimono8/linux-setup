import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { UIParent } from "../../../uiUtil/ui/UIParent.js";
const elem = {
    THIRD_PARTY_SHARE_BUTTON: "[data-share_password_button]"
};
export class PasswordShareUI extends UIParent {
    static createInstance(fn) {
        const obj = new PasswordShareUI();
        obj.elem = UIUtil.createElem({ preRender: true, template: "#share_password_template" });
        fn.call(obj);
        return obj;
    }
    containerSelector = "#share_password_container";
    overlaySelector = "#share_password_overlay";
    showUI() {
        UIUtil1.inst.showAddLikeForm(this.containerSelector, this.elem, this.overlaySelector);
    }
    hideUI() {
        UIUtil1.inst.hideAddLikeForm(this.containerSelector, this.overlaySelector);
    }
    highlightTab(tabName) {
        const SELECTED_CLASS = "selected";
        this.select(`[data-show_tab] .${SELECTED_CLASS}`).classList.remove(SELECTED_CLASS);
        this.select(`[data-show_tab="${tabName}"] a`).classList.add(SELECTED_CLASS);
    }
    onShowTab(listener) {
        this.selectAll(`[data-show_tab]`).forEach(x => x.addEventListener("click", () => listener(x.dataset.show_tab)));
    }
    onCloseInput(listener) {
        try {
            const closeElems = this.selectAll(`[data-name="closeForm"]`);
            closeElems.forEach(x => x.addEventListener("click", listener));
        }
        catch (e) {
            logError(e);
        }
    }
    execute(fn) {
        fn.call(this);
    }
    setPasswordName(name) {
        this.text("[data-secret_name]", name);
    }
    setPasswordUserName(username) {
        this.text("[data-username]", username);
    }
    setPasswordLogo(logo) {
        const [logoElem, noLogoElem] = this.getLogoNoLogoElem();
        noLogoElem.remove();
        logoElem.style.backgroundImage = logo;
    }
    setPasswordLogoChars(chars, color) {
        const [logoElem, noLogoElem] = this.getLogoNoLogoElem();
        logoElem.remove();
        noLogoElem.textContent = chars;
        noLogoElem.style.background = color;
    }
    getLogoNoLogoElem() {
        return [this.select("[data-logo]"), this.select("[data-no_logo]")];
    }
    showThirdPartyShareButton() {
        this.show(elem.THIRD_PARTY_SHARE_BUTTON);
    }
    hideThirdPartyShareButton() {
        this.hide(elem.THIRD_PARTY_SHARE_BUTTON);
    }
    onThirdPartyShareClick(listener) {
        this.select(elem.THIRD_PARTY_SHARE_BUTTON).addEventListener("click", listener);
    }
}
