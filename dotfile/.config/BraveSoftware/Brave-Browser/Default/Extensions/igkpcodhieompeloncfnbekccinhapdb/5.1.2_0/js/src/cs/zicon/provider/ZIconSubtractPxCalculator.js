export class SubtractPxCalculator {
    input;
    static MIN_SPACE = 3;
    static ICON_SPACE = 15;
    static calculate(input) {
        return new SubtractPxCalculator(input).calculate();
    }
    constructor(input) {
        this.input = input;
    }
    calculate() {
        try {
            const isRightToLeft = csutil.input.checkIsRightToLeft(this.input);
            if (isRightToLeft) {
                return this.getSubtractPixelRTL() || SubtractPxCalculator.MIN_SPACE;
            }
            return this.getSubtractPixel() || SubtractPxCalculator.MIN_SPACE;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    getSubtractPixel() {
        try {
            const boundary = this.input.getBoundingClientRect();
            const y = boundary.top + (boundary.height / 2);
            const INTER_SPACE = 2;
            let x = 0;
            let leftTopElem = null;
            let rightTopElem = null;
            let subtractPx = SubtractPxCalculator.MIN_SPACE;
            const maxSubtractPx = boundary.width / 2;
            for (let i = 0; i < 10 && subtractPx < maxSubtractPx; i++) {
                x = boundary.right - subtractPx - SubtractPxCalculator.ICON_SPACE;
                leftTopElem = csutil.dom.getElementFromPoint({ x, y });
                if (!leftTopElem) {
                    return 0;
                }
                if (this.isAllowedElem(leftTopElem)) {
                    return subtractPx;
                }
                if (leftTopElem != this.input) {
                    subtractPx = boundary.right - leftTopElem.getBoundingClientRect().left + INTER_SPACE;
                    continue;
                }
                rightTopElem = csutil.dom.getElementFromPoint({ x: x + SubtractPxCalculator.ICON_SPACE, y });
                if (!rightTopElem) {
                    return 0;
                }
                if (this.isAllowedElem(rightTopElem)) {
                    return subtractPx;
                }
                if (rightTopElem != this.input) {
                    subtractPx = boundary.right - rightTopElem.getBoundingClientRect().left + INTER_SPACE;
                    continue;
                }
                return subtractPx;
            }
            return 0;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    isAllowedElem(elem) {
        try {
            if (elem instanceof HTMLLabelElement) {
                return true;
            }
            if (elem instanceof HTMLIFrameElement && elem.id.startsWith("zoho")) {
                return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getSubtractPixelRTL() {
        try {
            const boundary = this.input.getBoundingClientRect();
            const y = boundary.top + (boundary.height / 2);
            const INTER_SPACE = 2;
            let x = 0;
            let leftTopElem = null;
            let rightTopElem = null;
            const minSubtractPixel = boundary.width / 2;
            let subtractPx = this.input.getBoundingClientRect().width - SubtractPxCalculator.ICON_SPACE - SubtractPxCalculator.MIN_SPACE;
            for (let i = 0; i < 10 && subtractPx > minSubtractPixel; i++) {
                x = boundary.right - subtractPx - SubtractPxCalculator.ICON_SPACE;
                leftTopElem = csutil.dom.getElementFromPoint({ x, y });
                if (!leftTopElem) {
                    return 0;
                }
                if (leftTopElem != this.input) {
                    subtractPx = boundary.right - leftTopElem.getBoundingClientRect().right - SubtractPxCalculator.ICON_SPACE - INTER_SPACE;
                    continue;
                }
                if (this.isAllowedElem(leftTopElem)) {
                    return subtractPx;
                }
                rightTopElem = csutil.dom.getElementFromPoint({ x: x + SubtractPxCalculator.ICON_SPACE, y });
                if (!rightTopElem) {
                    return 0;
                }
                if (this.isAllowedElem(rightTopElem)) {
                    return subtractPx;
                }
                if (rightTopElem != this.input) {
                    subtractPx = boundary.right - rightTopElem.getBoundingClientRect().right - SubtractPxCalculator.ICON_SPACE - INTER_SPACE;
                    continue;
                }
                return subtractPx;
            }
            return 0;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
}
