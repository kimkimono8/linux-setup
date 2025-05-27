import { csutil } from "./Context.js";
export class VisibilityChecker {
    isVisible(elem, checkZIndex = true) {
        try {
            return this.isVisibleOffset(elem) && (!checkZIndex || this.isVisibleZIndex(elem)) && this.isNotHidden(elem);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isVisibleOffset(elem) {
        const MIN_PX = 10;
        const isVisible = elem.offsetWidth >= MIN_PX && elem.offsetHeight >= MIN_PX;
        return isVisible;
    }
    isVisibleZIndex(elem) {
        try {
            const rect = elem.getBoundingClientRect();
            if (!this.isVisibleScroll(elem)) {
                return false;
            }
            let left = Math.max(0, rect.left);
            let top = Math.max(0, rect.top);
            let right = Math.min(document.documentElement.clientWidth, rect.right);
            let bottom = Math.min(document.documentElement.clientHeight, rect.bottom);
            let x = (right + left) / 2;
            let y = (bottom + top) / 2;
            const elemAtXY = csutil.dom.getElementFromPoint({ x, y });
            if (!elemAtXY) {
                return false;
            }
            if (elem.contains(elemAtXY) || elemAtXY.offsetWidth <= (elem.offsetWidth + 100)) {
                return true;
            }
            if (csutil.dom.contains(elemAtXY, elem)) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    isVisibleScroll(elem) {
        const rect = elem.getBoundingClientRect();
        if (rect.left > document.documentElement.clientWidth || rect.top > document.documentElement.clientHeight) {
            return false;
        }
        if (rect.right < 0 || rect.bottom < 0) {
            return false;
        }
        return true;
    }
    isNotHidden(elem) {
        return (window.getComputedStyle(elem).visibility != "hidden") && (elem.style.opacity != "0");
    }
}
