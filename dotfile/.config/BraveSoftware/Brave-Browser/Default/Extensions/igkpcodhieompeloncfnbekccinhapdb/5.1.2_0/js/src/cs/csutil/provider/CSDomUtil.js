import { AttributeChecker } from "./dom/AttributeChecker.js";
import { CSNodeIterator } from "./selector/CSNodeIterator.js";
export class CSDomUtilImpl {
    hasAttribute(params) {
        return AttributeChecker.check(params);
    }
    getAttributeValues(elem) {
        try {
            const ans = [];
            for (let i = 0; i < elem.attributes.length; i++) {
                ans.push(elem.attributes[i].value.toLowerCase());
            }
            return ans;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getAncestor(child1, child2) {
        try {
            const parent1List = this.getParentNodes(child1);
            const parent2List = this.getParentNodes(child2);
            let parent = document.documentElement;
            let i1 = parent1List.length - 1;
            let i2 = parent2List.length - 1;
            for (; (i1 >= 0) && (i2 >= 0); i1--, i2--) {
                if (parent1List[i1] != parent2List[i2]) {
                    return parent;
                }
                parent = parent1List[i1];
            }
            return parent;
        }
        catch (e) {
            logError(e);
            return document.documentElement;
        }
    }
    hasCaptchaFrame(container, input) {
        try {
            const captchaFrame = this.getCaptchaFrame(container);
            return captchaFrame && (!input || !captchaFrame.contains(input));
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getShadowRoot(elem) {
        try {
            if (elem instanceof SVGElement) {
                return null;
            }
            if (elem.shadowRoot) {
                return brApi.dom.getShadowRoot(elem);
            }
            if (!elem.nodeName.includes("-")) {
                return null;
            }
            return brApi.dom.getShadowRoot(elem);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    contains(parent, child) {
        try {
            if (parent.contains(child)) {
                return true;
            }
            for (let elem of new CSNodeIterator(parent)) {
                if (elem == child) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    *getParentIterator(elem) {
        try {
            while (elem.parentElement) {
                yield elem.parentElement;
                elem = elem.parentElement;
            }
            const shadowRoot = this.getShadowParent(elem);
            if (!shadowRoot) {
                return;
            }
            for (let elem of this.getParentIterator(shadowRoot)) {
                yield elem;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getParentNodes(elem) {
        return [...this.getParentIterator(elem)];
    }
    getElementsFromPoint(point) {
        try {
            return this.getElementsFromPointFn(point, document);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    getElementFromPoint(point) {
        try {
            const elemList = this.getElementsFromPoint(point);
            if (elemList.length == 0) {
                return null;
            }
            return elemList[0];
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getEventTarget(e) {
        try {
            const mEvent = e;
            if (mEvent.clientX && mEvent.clientY) {
                return this.getElementFromPoint({ x: mEvent.clientX, y: mEvent.clientY });
            }
            return e.target;
        }
        catch (e) {
            logError(e);
            return e.target;
        }
    }
    getEventTargetInput(e) {
        try {
            if (e.target instanceof HTMLInputElement) {
                return e.target;
            }
            const mEvent = e;
            if (!(mEvent.clientX && mEvent.clientY)) {
                return null;
            }
            const inputElem = this.getInputFromPoint({ x: mEvent.clientX, y: mEvent.clientY });
            if (inputElem) {
                return inputElem;
            }
            return null;
        }
        catch (e) {
            logError(e);
            return e.target;
        }
    }
    getInputFromPoint(point) {
        try {
            const elemList = this.getElementsFromPoint(point);
            if (elemList.length == 0) {
                return null;
            }
            for (let elem of elemList) {
                if (elem instanceof HTMLInputElement) {
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
    getElementsFromPointFn(point, fragment) {
        try {
            const elements = fragment.elementsFromPoint(point.x, point.y);
            if (elements.length == 0) {
                return [];
            }
            const innerShadowRoot = this.getShadowRoot(elements[0]);
            if (!innerShadowRoot) {
                return elements;
            }
            if (innerShadowRoot == fragment) {
                return elements;
            }
            return this.getElementsFromPointFn(point, innerShadowRoot);
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getShadowParent(elem) {
        return elem.getRootNode().host;
    }
    getCaptchaFrame(container) {
        try {
            const elements = csutil.selector.selectAll("iframe,button,input[type='submit']", { container, shadowRoot: false });
            let frame = null;
            for (let elem of elements) {
                if (!csutil.isVisible(elem)) {
                    continue;
                }
                if (elem.matches("iframe")) {
                    frame = elem;
                    continue;
                }
                if (frame != null && frame.getBoundingClientRect().bottom < elem.getBoundingClientRect().top) {
                    return frame;
                }
                return null;
            }
            if (frame != null && csutil.isVisible(frame)) {
                return frame;
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
