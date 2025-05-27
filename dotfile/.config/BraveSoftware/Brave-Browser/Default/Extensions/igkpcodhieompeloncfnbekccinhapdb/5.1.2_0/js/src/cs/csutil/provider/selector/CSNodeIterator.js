import { csutil } from "../Context.js";
export class CSNodeIterator {
    root;
    constructor(root) {
        this.root = root;
    }
    *[Symbol.iterator]() {
        try {
            if (!this.root) {
                throw "INVALID_ROOT";
            }
            const walker = document.createTreeWalker(this.root, NodeFilter.SHOW_ELEMENT);
            let shadowRoot = null;
            while (walker.nextNode()) {
                if (!(walker.currentNode instanceof HTMLElement)) {
                    continue;
                }
                yield walker.currentNode;
                shadowRoot = csutil.dom.getShadowRoot(walker.currentNode);
                if (!shadowRoot) {
                    continue;
                }
                for (let elem of new CSNodeIterator(shadowRoot)) {
                    yield elem;
                }
            }
            const isHtmlElement = this.root instanceof HTMLElement;
            if (!isHtmlElement) {
                return;
            }
            shadowRoot = csutil.dom.getShadowRoot(this.root);
            if (!shadowRoot) {
                return;
            }
            for (let elem of new CSNodeIterator(shadowRoot)) {
                yield elem;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
