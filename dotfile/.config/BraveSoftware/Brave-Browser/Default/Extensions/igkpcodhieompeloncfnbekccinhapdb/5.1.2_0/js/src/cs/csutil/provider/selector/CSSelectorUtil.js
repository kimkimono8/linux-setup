import { VtSettings } from "../../../../service/vt/constants/VtSettings.js";
import { csSelectorMethodProvider, csutil } from "../Context.js";
export class CSSelectorUtilImpl {
    domSelector;
    shadowSelector;
    async init() {
        try {
            this.domSelector = csSelectorMethodProvider.getDomSelector();
            await this.initShadowSelector();
        }
        catch (e) {
            logError(e);
        }
    }
    async initShadowSelector() {
        try {
            const noShadow = await zlocalStorage.load(VtSettings.DISABLE_SHADOW_ROOT, false);
            if (noShadow) {
                this.shadowSelector = this.domSelector;
                return;
            }
            this.shadowSelector = csSelectorMethodProvider.getShadowSelector();
        }
        catch (e) {
            logError(e);
        }
    }
    select(selector, param) {
        try {
            return this.getSelectorMethod(param).select(selector, param);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    selectAll(selector, param) {
        try {
            const elemList = this.getSelectorMethod(param).selectAll(selector, param);
            const visibleElems = param.visible ? elemList.filter(x => csutil.isVisible(x)) : elemList;
            return visibleElems;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    closest(elem, selector) {
        try {
            if (!elem) {
                return null;
            }
            if (elem.matches(selector)) {
                return elem;
            }
            for (let x of csutil.dom.getParentIterator(elem)) {
                if (x.matches(selector)) {
                    return x;
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getSelectorMethod(param) {
        try {
            if (param.shadowRoot) {
                return this.shadowSelector;
            }
            return this.domSelector;
        }
        catch (e) {
            logError(e);
            return this.domSelector;
        }
    }
}
