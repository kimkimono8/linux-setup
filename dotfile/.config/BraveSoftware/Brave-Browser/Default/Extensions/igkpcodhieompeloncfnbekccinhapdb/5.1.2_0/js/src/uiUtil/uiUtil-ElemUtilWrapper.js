export class Exp_ElemUtilWrapper {
    elem = null;
    constructor(elem) {
        this.elem = elem;
    }
    select(selector) {
        return js.selector.selectFrom(this.elem, selector);
    }
    selectAll(selector) {
        return js.selector.selectAll(selector, this.elem);
    }
    showIf(condition, ...selectors) {
        if (condition) {
            this.show(...selectors);
            return;
        }
        this.hide(...selectors);
    }
    show(...selectors) {
        this.showElems(selectors);
    }
    showElems(selectors) {
        const elems = this.selectElems(selectors);
        js.dom.showElems(elems);
    }
    hide(...selectors) {
        this.hideElems(selectors);
    }
    hideElems(selectors) {
        const elems = this.selectElems(selectors);
        js.dom.hideElems(elems);
    }
    selectElems(selectors) {
        const elems = selectors.map(x => typeof x == "string" ? this.select(x) : x);
        return elems;
    }
    text(selector, text) {
        js.dom.setChildText(this.elem, selector, text);
    }
    isUIShown() {
        return Boolean(this.elem && this.elem.parentElement);
    }
    remove(...selectors) {
        for (let selector of selectors) {
            this.select(selector).remove();
        }
    }
    setContent(selector, content) {
        js.dom.setContent(this.select(selector), content);
    }
    setParent(selector) {
        js.dom.setContent(selector, this.elem);
    }
}
