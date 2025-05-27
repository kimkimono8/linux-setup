import { Secret } from "../../../../service/bgApi/types/Secret.js";
import { VI18N } from "../../../../service/vt/VI18n.js";
import { TextHighlighter } from "../../../../uiUtil/export.js";
import { UIParent } from "../../../../uiUtil/ui/UIParent.js";
export class BaseUserRow extends UIParent {
    execute(...fns) {
        for (let fn of fns) {
            fn.call(this);
        }
    }
    setUserId(id) {
        this.elem.dataset.id = id;
    }
    setName(name) {
        js.dom.setText(this.getNameElement(), name);
    }
    setShareLevel(shareLevel) {
        this.text("[data-share_level]", this.getAccessPrivilegeText(shareLevel));
        const hideRevokeButton = shareLevel == Secret.SHARING_LEVEL.NONE;
        if (hideRevokeButton) {
            this.hide("[data-revoke]");
        }
    }
    getAccessPrivilegeText(shareLevel) {
        const LEVEl = Secret.SHARING_LEVEL;
        switch (shareLevel) {
            case LEVEl.MANAGE: return i18n(VI18N.MANAGE);
            case LEVEl.MODIFY: return i18n(VI18N.MODIFY);
            case LEVEl.VIEW: return i18n(VI18N.VIEW);
            case LEVEl.LOGIN: return i18n(VI18N.SHARE_ONE_CLICK_LOGIN);
            default: return "";
        }
    }
    setSelected(selected) {
        this.select("[data-selected]").checked = selected;
    }
    onSelectInput(listener) {
        this.select(`[data-user_detail=""]`).addEventListener("click", function (e) {
            const container = js.selector.closest(e.target, "tr");
            const checkBoxInput = js.selector.selectFrom(container, "input[data-selected]");
            checkBoxInput.click();
        });
        this.select(`[data-select_checkbox=""]`).addEventListener("click", function (e) {
            if (!(e.target instanceof HTMLTableCellElement)) {
                return;
            }
            const container = js.selector.closest(e.target, "tr");
            const checkBoxInput = js.selector.selectFrom(container, "input[data-selected]");
            checkBoxInput.click();
        });
        this.select(`[data-select_checkbox=""] input`).addEventListener("input", function () {
            listener(this.checked);
        });
    }
    onShowGrantInput(listener) {
        this.select(`[data-grant]`).addEventListener("click", listener);
    }
    onUserRevokeInput(listener) {
        this.select("[data-revoke]").addEventListener("click", listener);
    }
    highlightName(searchString) {
        this.hightlightElem(this.getNameElement(), searchString);
    }
    hightlightElem(elem, searchString) {
        const fragment = TextHighlighter.highlight(searchString, elem.textContent);
        js.dom.setContent(elem, fragment);
    }
    getNameElement() {
        return this.select("[data-name]");
    }
}
