import { zicon } from "./Context.js";
import { SubtractPxCalculator } from "./ZIconSubtractPxCalculator.js";
export class ZIconAdjuster {
    adjustOnEvents = [
        "focusin",
        "click",
        "keyup",
    ];
    constructor() {
        js.fn.bindThis(this, [this.adjustZIcon]);
    }
    adjust(input) {
        try {
            this.adjustOnEvents.forEach(x => input.addEventListener(x, this.adjustZIcon));
        }
        catch (e) {
            logError(e);
        }
    }
    adjustZIcon(e) {
        try {
            if (!e.isTrusted) {
                return;
            }
            const input = csutil.dom.getEventTargetInput(e);
            if (!input) {
                return;
            }
            const subtractPixel = SubtractPxCalculator.calculate(input);
            const existing = input[zicon.adder.iconSubtractPixel];
            if (subtractPixel == existing) {
                e.target.removeEventListener(e.type, this.adjustZIcon);
                return;
            }
            input[zicon.adder.iconSubtractPixel] = subtractPixel;
            js.dom.setStyleImportant(input, {
                "background-position": `calc(100% - ${subtractPixel}px) center`,
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
