import { SecretUtil } from "../../../../src/common/vault/SecretUtil.js";
import { SecretHighlightFields } from "../../../../src/service/vt/constants/constants.js";
import { TextHighlighter } from "../../../../src/uiUtil/export.js";
import { UIParent } from "../../../../src/uiUtil/ui/UIParent.js";
export class SFPasswordUI extends UIParent {
    moreActionsElem = null;
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#secret_template" });
    }
    setLogo(logo) {
        try {
            this.select("[data-no_logo]").remove();
            this.select("[data-logo]").style.backgroundImage = SecretUtil.getLogoStyleSrc(logo);
        }
        catch (e) {
            logError(e);
        }
    }
    setLogoName(name, createdOn) {
        try {
            const noLogoElem = this.select("[data-no_logo]");
            this.select("[data-logo]").remove();
            noLogoElem.textContent = SecretUtil.getFirst2Chars(name);
            noLogoElem.style.background = SecretUtil.getLogoColor(createdOn, name);
        }
        catch (e) {
            logError(e);
        }
    }
    setName(name) {
        js.dom.setText(this.getNameElem(), name);
    }
    setDescription(description) {
        js.dom.setText(this.getDescriptionElem(), description);
    }
    highlightSearch(field, pattern) {
        if (!field || !pattern) {
            return;
        }
        const elem = this.getHighlightElem(field);
        if (!elem) {
            return;
        }
        const content = elem.textContent;
        js.dom.setContent(elem, TextHighlighter.highlight(pattern, content));
    }
    getHighlightElem(field) {
        switch (field) {
            case SecretHighlightFields.NAME: return this.getNameElem();
            case SecretHighlightFields.UI_TEXT: return this.getDescriptionElem();
            default: return null;
        }
    }
    getNameElem() {
        return this.select("[data-name]");
    }
    getDescriptionElem() {
        return this.select("[data-description]");
    }
    setAccessControlIcon(needed) {
        if (needed) {
            return;
        }
        this.select("span.password-list-access-control-icon").remove();
    }
    removeIconList() {
        this.select(`[data-name="iconList"]`).remove();
    }
    disableFillIf(condition) {
        if (condition) {
            this.select(`li[data-fill_icon] i`).classList.add("disabled");
        }
    }
    disableMoreActionsIf(condition) {
        if (condition) {
            this.select(`li[data-show_more_options] a`).className = "disabled";
        }
    }
    disableAutoSubmitIf(condition) {
        if (condition) {
            this.select(`li[data-login_icon] i`).className = "icon-login-disabled";
        }
    }
    onPasswordClickInput(listener) {
        const iconList = this.select(`[data-name="iconList"]`);
        this.elem.addEventListener("click", e => {
            if (iconList && iconList.contains(e.target)) {
                return;
            }
            listener();
        });
    }
    onLoginIconClickInput(listener) {
        this.select(`[data-login_icon]`).addEventListener("click", listener);
    }
    onFillIconClickInput(condition, listener) {
        if (!condition) {
            return;
        }
        this.select(`[data-fill_icon]`).addEventListener("click", listener);
    }
    onMoreActionsClickInput(condition, listener) {
        if (!condition) {
            return;
        }
        this.select(`[data-show_more_options]`).addEventListener("click", e => {
            this.highlight_icon(e);
            listener(e);
        });
    }
    highlight_icon(e) {
        const ICON_SELECTED_CLASS = "action-icon-list-selected";
        const MORE_ACTIONS_SEC_CLASS = "more-actions";
        const more_actions_icon = js.selector.closest(e.target, "[data-show_more_options]");
        js.selector.selectFrom(more_actions_icon, "a").classList.add(ICON_SELECTED_CLASS);
        js.selector.closest(more_actions_icon, "[data-secret_id]").classList.add(MORE_ACTIONS_SEC_CLASS);
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
}
