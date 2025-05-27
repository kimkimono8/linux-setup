import { CSNodeIterator } from "./CSNodeIterator.js";
export class CSSelectorMethodProviderImpl {
    getDomSelector() {
        return new DomSelectorMethod();
    }
    getShadowSelector() {
        return new ShadowSelectorMethod();
    }
}
class DomSelectorMethod {
    select(selector, param) {
        try {
            const container = param.container || document.documentElement;
            return container.querySelector(selector);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    selectAll(selector, param) {
        try {
            const container = param.container || document.documentElement;
            return Array.from(container.querySelectorAll(selector));
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
class ShadowSelectorMethod {
    select(selector, param) {
        try {
            const container = param.container || document.documentElement;
            for (let elem of new CSNodeIterator(container)) {
                if (elem.matches(selector)) {
                    return elem;
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    selectAll(selector, param) {
        try {
            const container = param.container || document.documentElement;
            const elemList = [];
            for (let elem of new CSNodeIterator(container)) {
                if (!elem.matches(selector)) {
                    continue;
                }
                elemList.push(elem);
            }
            return elemList;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
