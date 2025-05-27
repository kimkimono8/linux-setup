export class JsSelectorUtilImpl {
    select(selector) {
        if (selector instanceof Node) {
            return selector;
        }
        return document.querySelector(selector);
    }
    selectFrom(elem, selector) {
        const parent = this.select(elem);
        return parent.querySelector(selector);
    }
    selectAll(selector, parent = document.body) {
        const parentElem = (parent && this.select(parent)) || document.documentElement;
        return Array.from(parentElem.querySelectorAll(selector));
    }
    selectAllOld(parent = document.body, selector) {
        const parentElem = (parent && this.select(parent)) || document.documentElement;
        return Array.from(parentElem.querySelectorAll(selector));
    }
    closest(elem, selector) {
        const domElem = this.select(elem);
        return domElem.closest(selector);
    }
    selectQ(params) {
        try {
            const parentElem = (params.container && this.select(params.container)) || document.documentElement;
            return parentElem.querySelector(params.selector);
        }
        catch (e) {
            logError(e);
            throw e;
        }
    }
}
