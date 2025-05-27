import { UIUtil1 as UIUtil1 } from "../../../common/ui/ui_util.js";
import { PositionUtil } from "../../../src/common/common.js";
import { UIParent } from "../../../src/uiUtil/ui/UIParent.js";
export class SFPasswordsUI extends UIParent {
    scrollEndListener = js.fn.emptyFn;
    intersectionObserver = null;
    init() {
        this.elem = UIUtil.createElem({ preRender: true, template: "#passwords_ui_template" });
    }
    getSearchElem() {
        return this.select(`[data-name="searchPasswords"]`);
    }
    getSearchClearElem() {
        return this.select(`[data-name="searchClear"]`);
    }
    onSearchKeyupInput(listener) {
        UIUtil1.inst.addSearchListener(this.getSearchElem(), this.getSearchClearElem(), listener);
    }
    focusSearch() {
        this.getSearchElem().focus();
    }
    setSearchString(s) {
        this.getSearchElem().value = s;
        this.showIf(s.length > 0, this.getSearchClearElem());
    }
    setSearchPlaceholder(placeholder) {
        const searchElem = this.getSearchElem();
        if (searchElem) {
            searchElem.placeholder = placeholder;
        }
    }
    isShown() {
        return this.isUIShown();
    }
    showLoading() {
        js.dom.showOld("#uiLoading");
    }
    hideLoading() {
        js.dom.hideOld("#uiLoading");
    }
    showNoPasswordsUI() {
        const noPasswordsElem = UIUtil.createElem({ template: "#no_passwords_template" });
        js.dom.setContent("#main_out", noPasswordsElem);
        this.elem = noPasswordsElem;
    }
    getPasswordOut() {
        return this.select("#password_out");
    }
    showNoMatchingPasswordsUI() {
        const outElem = this.getPasswordOut();
        this.hide(outElem);
        $(outElem).slimScroll({ destroy: true });
        this.show(this.select(`[data-name="noMatchingPasswords"]`));
    }
    showNoMatchingPasswordsUITextIf(condition) {
        this.showIf(condition, `[data-name="noMatchingPasswords"] [data-text]`);
    }
    showPasswordListFn(list, firstPage) {
        const outElem = this.getPasswordOut();
        if (!firstPage) {
            outElem.append(list);
            return;
        }
        js.dom.setContent(outElem, list);
        this.hide(this.select(`[data-name="noMatchingPasswords"]`));
        this.show(outElem);
        outElem.scrollTop = 0;
    }
    showPasswordList(list, firstPage) {
        this.showPasswordListFn(list, firstPage);
    }
    handleScrollIntersection(entries, observer) {
        const intersected = entries.some(x => x.isIntersecting);
        if (!intersected) {
            return;
        }
        observer.disconnect();
        if (this.scrollEndListener) {
            this.scrollEndListener();
        }
    }
    onScrollEndInput(listener) {
        this.scrollEndListener = listener;
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        const secretListElem = this.getPasswordOut();
        this.intersectionObserver = new IntersectionObserver(this.handleScrollIntersection.bind(this), {
            root: secretListElem.parentElement,
            threshold: 0.5
        });
        const elementToObserve = secretListElem.lastElementChild;
        this.intersectionObserver.observe(elementToObserve);
    }
    onHideMoreActionsClickInput(listener) {
        this.select("#more_options_overlay").addEventListener("click", listener);
    }
    showMoreActions(moreActionsFragment, e) {
        const moreActionsElem = UIUtil.createElem({ preRender: true, template: "#password_more_actions_template" });
        js.dom.setContent(js.selector.selectFrom(moreActionsElem, "ul"), moreActionsFragment);
        document.body.append(moreActionsElem);
        PositionUtil.positionMoreActions(moreActionsElem, js.selector.closest(e.target, "[data-show_more_options]"));
        js.dom.showOld(this.select("#more_options_overlay"), moreActionsElem);
    }
    hideMoreActions() {
        this.hide("#more_options_overlay");
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
    getSecretElem(secretId) {
        return this.select(`[data-secret_id="${secretId}"]`);
    }
    getListScrollPosition() {
        return this.getPasswordOut().scrollTop;
    }
    setListScrollPosition(scrollTop) {
        const outElem = this.getPasswordOut();
        if (!outElem) {
            return;
        }
        outElem.scrollTop = scrollTop;
    }
}
