import { gg } from "./GG.js";
const DISPLAY_DATA_KEY = "display_css";
export class JsDomUtilImpl {
    async waitDomLoad() {
        const promise = gg.js.promise.createNew();
        window.addEventListener("DOMContentLoaded", () => promise.resolve());
        window.addEventListener("load", () => promise.resolve());
        function checkReadyState() {
            if (document.readyState == "complete") {
                promise.resolve();
            }
        }
        document.addEventListener("readystatechange", checkReadyState);
        checkReadyState();
        return promise;
    }
    async waitAnimationFrame() {
        try {
            await new Promise(res => window.requestAnimationFrame(res));
        }
        catch (e) {
            logError(e);
        }
    }
    setContent(elem, content) {
        try {
            const reqElem = gg.js.selector.select(elem);
            reqElem.replaceChildren(content);
        }
        catch (e) {
            logError(e);
        }
    }
    setChildContent(elem, selector, content) {
        try {
            const childElem = gg.js.selector.selectFrom(elem, selector);
            if (!childElem) {
                throw "CHILD_ELEM_NOT_FOUND: " + selector;
            }
            return this.setContent(childElem, content);
        }
        catch (e) {
            logError(e);
        }
    }
    copyToClipboard(text) {
        try {
            const lastActiveElement = document.activeElement;
            let elem = document.createElement('textarea');
            elem.value = text;
            document.body.append(elem);
            elem.select();
            document.execCommand('copy');
            elem.remove();
            if (lastActiveElement != document.activeElement) {
                lastActiveElement.focus();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    showIf(condition, ...selectors) {
        if (condition) {
            this.showOld(...selectors);
            return;
        }
        this.hideOld(...selectors);
    }
    showOld(...selectors) {
        this.showElems(selectors);
    }
    showElems(selectors) {
        for (let selector of selectors) {
            try {
                const elem = gg.js.selector.select(selector);
                elem.style.display = elem.dataset[DISPLAY_DATA_KEY] || "block";
            }
            catch (e) {
                logError(e);
            }
        }
    }
    hideOld(...selectors) {
        this.hideElems(selectors);
    }
    hideElems(selectors) {
        for (let selector of selectors) {
            try {
                const elem = gg.js.selector.select(selector);
                if (!elem) {
                    throw new Error("NO_ELEMENT_FOUND: " + selector);
                }
                const curDisplay = window.getComputedStyle(elem).display;
                if (curDisplay != "none" && curDisplay != "block") {
                    elem.dataset[DISPLAY_DATA_KEY] = curDisplay;
                }
                elem.style.display = "none";
            }
            catch (e) {
                logError(e);
            }
        }
    }
    showNoError(...selectors) {
        try {
            for (let selector of selectors) {
                try {
                    const elem = gg.js.selector.select(selector);
                    if (elem) {
                        elem.style.display = elem.dataset[DISPLAY_DATA_KEY] || "block";
                    }
                }
                catch (e) { }
            }
        }
        catch (e) { }
    }
    hideNoError(...selectors) {
        try {
            for (let selector of selectors) {
                try {
                    const elem = gg.js.selector.select(selector);
                    if (!elem) {
                        continue;
                    }
                    const curDisplay = window.getComputedStyle(elem).display;
                    if (curDisplay != "none" && curDisplay != "block") {
                        elem.dataset[DISPLAY_DATA_KEY] = curDisplay;
                    }
                    elem.style.display = "none";
                }
                catch (e) { }
            }
        }
        catch (e) { }
    }
    clearContent(elem) {
        try {
            const reqElem = gg.js.selector.select(elem);
            reqElem.replaceChildren();
        }
        catch (e) {
            logError(e);
        }
    }
    setText(selector, text) {
        try {
            const reqElem = gg.js.selector.select(selector);
            reqElem.dataset["tooltip_content"] = text;
            reqElem.textContent = text;
        }
        catch (e) {
            logError(e);
        }
    }
    setChildText(parentSelector, childSelector, text) {
        try {
            const elem = gg.js.selector.selectFrom(parentSelector, childSelector);
            this.setText(elem, text);
        }
        catch (e) {
            logError(e);
        }
    }
    disableRightClick() {
        try {
            document.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }, true);
        }
        catch (e) {
            logError(e);
        }
    }
    async closeWindow() {
        setTimeout(() => window.close(), 100);
        await new Promise(res => { res; });
    }
    getContentRect(elem) {
        const oldLeft = elem.style.left;
        const oldTop = elem.style.top;
        elem.style.left = "0";
        elem.style.top = "0";
        const oldDisplay = elem.style.display;
        elem.style.display = "block";
        const rect = elem.getBoundingClientRect();
        elem.style.display = oldDisplay;
        elem.style.left = oldLeft;
        elem.style.top = oldTop;
        return rect;
    }
    getPasswordMask(value) {
        try {
            const mask = "*".repeat(value.length);
            return mask;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    setStyleImportant(elem, obj) {
        try {
            for (let key in obj) {
                elem.style.setProperty(key, obj[key], "important");
            }
        }
        catch (e) {
            logError(e);
        }
    }
    changeClass(elem, oldClassName, newClassName) {
        elem.classList.remove(oldClassName);
        elem.classList.add(newClassName);
    }
    removeElem(selector) {
        const elem = gg.js.selector.select(selector);
        if (elem) {
            elem.remove();
        }
    }
    finishAnimation(elem) {
        gg.js.selector.select(elem).getAnimations({ subtree: true }).forEach(x => x.finish());
    }
    findParent(params) {
        try {
            for (let elem of this.nodeTopIterator(params)) {
                if (params.criteria(elem)) {
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
    show(...elemList) {
        this.showHideFn(true, elemList);
    }
    hide(...elemList) {
        this.showHideFn(false, elemList);
    }
    showHide(show, ...elemList) {
        this.showHideFn(show, elemList);
    }
    isContentEditable(elem) {
        try {
            if (elem.isContentEditable) {
                return true;
            }
            if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
                return !elem.readOnly && !elem.disabled;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    hasEllipsis(elem) {
        try {
            if (elem.scrollWidth > 0) {
                return this.hasEllipsisFn(elem);
            }
            return this.hasEllipsisFn(elem.parentElement);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    hasEllipsisFn(elem) {
        return elem.scrollWidth > elem.offsetWidth;
    }
    showHideFn(show, elemList) {
        try {
            const fn = show ? this.removeClass : this.addClass;
            for (let selector of elemList) {
                fn.call(this, selector, "dis-hide");
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addClass(selector, className) {
        gg.js.selector.select(selector).classList.add(className);
    }
    removeClass(selector, className) {
        gg.js.selector.select(selector).classList.remove(className);
    }
    nodeTopIterator(params) {
        return NodeTopIterator.getIteratorInstance(params);
    }
}
class NodeTopIterator {
    selector;
    static getIteratorInstance(params) {
        const iterator = new NodeTopIterator(params.selector);
        if (params.limitTop) {
            return new TopLimitedNodeTopIterator(iterator, params.limitTop);
        }
        return iterator;
    }
    constructor(selector) {
        this.selector = selector;
    }
    *[Symbol.iterator]() {
        let elem = gg.js.selector.select(this.selector);
        for (; elem; elem = elem.parentElement) {
            yield elem;
        }
    }
}
class TopLimitedNodeTopIterator {
    iterator;
    topElem;
    constructor(iterator, topElemSelector) {
        this.iterator = iterator;
        const topElem = gg.js.selector.select(topElemSelector);
        this.topElem = topElem.parentElement ?? topElem;
    }
    *[Symbol.iterator]() {
        for (let elem of this.iterator) {
            if (elem == this.topElem) {
                return;
            }
            yield elem;
        }
    }
}
