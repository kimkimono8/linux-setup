import { PositionUtil } from "../../src/common/common.js";
import { Secret } from "../../src/service/bgApi/types/Secret.js";
import { UIParent } from "../../src/uiUtil/ui/UIParent.js";
import { ADDRESS_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
import { SFPasswordUI } from "../site_frame/passwords_ui/password/SFPasswordUI.js";
import { al } from "./addressList.js";
export class AddressListUI extends UIParent {
    secretUI;
    moreActionsElem;
    init() {
        this.elem = UIUtil.createElem({ template: "#main_ui_template", preRender: true });
    }
    showUI() {
        document.body.append(this.elem);
    }
    showNoPasswordsUI() {
        const noPasswordsElem = UIUtil.createElem({ template: "#no_passwords_template" });
        js.dom.setContent("#main_out", noPasswordsElem);
        this.elem = noPasswordsElem;
    }
    showNoMatchingPasswordsUI() {
        this.show('[data-name="noMatchingPasswords"]');
        this.hide('#password_out');
    }
    showMatchingPasswordsUI() {
        this.hide('[data-name="noMatchingPasswords"]');
        this.show('#password_out');
    }
    showPasswordListUI() {
        const noPasswordsElem = UIUtil.createElem({ template: "#passwords_ui_template" });
        js.dom.setContent("#main_out", noPasswordsElem);
        this.elem = noPasswordsElem;
    }
    async showLocked() {
        const lockedElem = UIUtil.createElem({ template: "#vault_locked_template", preRender: true });
        await js.dom.setContent("#main_out", lockedElem);
        document.querySelector('[data-name="unlock"]').addEventListener("click", al.openUnlockPage);
    }
    addLogo(secret) {
        if (secret.logo) {
            this.secretUI.setLogo(secret.logo);
            return;
        }
        this.secretUI.setLogoName(secret.name, secret.created_on);
    }
    addIcons(secret) {
        try {
            if (!Secret.hasAccess(secret)) {
                this.secretUI.removeIconList();
                return;
            }
            const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
            this.secretUI.disableFillIf(!hasViewPermission);
            this.secretUI.disableMoreActionsIf(!hasViewPermission && !secret.has_totp);
        }
        catch (e) {
            logError(e);
        }
    }
    async buildUI(secret, query) {
        try {
            this.secretUI = new SFPasswordUI();
            this.secretUI.init();
            this.secretUI.elem.dataset.secret_id = secret.id;
            this.addLogo(secret);
            this.secretUI.setName(secret.name);
            this.secretUI.setDescription(await bgApi.crypto.decrypt(secret.encrypted.fields[ADDRESS_FIELDS.ADDRESS_1], secret.shared));
            this.secretUI.highlightSearch(secret.highlight_field, query.search_string);
            this.secretUI.setAccessControlIcon(secret.access_controlled);
            this.addIcons(secret);
            const hasViewPermission = Secret.hasViewPermission(secret.sharing_level);
            this.secretUI.onFillIconClickInput(hasViewPermission, () => al.fillAddress(secret));
            hasViewPermission ? this.secretUI.onPasswordClickInput(() => al.fillAddress(secret)) : "";
            this.secretUI.onMoreActionsClickInput(hasViewPermission, (e) => al.moreAction(secret, e));
            return this.secretUI.elem;
        }
        catch (e) {
            return null;
        }
    }
    showMoreActions(moreActionsFragment, e) {
        const moreActionsElem = UIUtil.createElem({ template: "#password_more_actions_template", preRender: true });
        js.dom.setContent(js.selector.selectFrom(moreActionsElem, "ul"), moreActionsFragment);
        document.body.append(moreActionsElem);
        PositionUtil.positionMoreActions(moreActionsElem, js.selector.closest(e.target, "[data-show_more_options]"));
        js.dom.showOld(this.select("#more_options_overlay"), moreActionsElem);
    }
    createMoreActions() {
        this.moreActionsElem = document.createDocumentFragment();
    }
    getMoreActions() {
        return this.moreActionsElem;
    }
    addMoreActionsRow(text, listener) {
        const elem = UIUtil.createElem({ template: "#passwore_more_actions_item_template" });
        js.dom.setChildText(elem, "[data-text]", text);
        elem.addEventListener("click", listener);
        this.moreActionsElem.append(elem);
    }
    hideMoreActions() {
        js.dom.hideOld("#more_options_overlay");
        const moreActions = js.selector.select("#password_more_actions");
        if (!moreActions) {
            return;
        }
        moreActions.remove();
        const secretElem = js.selector.select(".more-actions");
        if (!secretElem) {
            return;
        }
        secretElem.classList.remove("more-actions");
        const selectedIcon = js.selector.selectFrom(secretElem, ".action-icon-list-selected");
        if (selectedIcon) {
            selectedIcon.classList.remove("action-icon-list-selected");
        }
    }
}
