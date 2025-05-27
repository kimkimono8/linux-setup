import { VtColors } from "../../service/vt/constants/VtColors.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
export class Highlighter {
    colorMap = {
        [VtColors.BLUE]: "#4780da",
        [VtColors.RED]: "#d23040",
        [VtColors.GREEN]: "#58bc66",
        [VtColors.ORANGE]: "#db7942",
        [VtColors.PURPLE]: "#6847a5",
    };
    styleObj = {
        color: this.colorMap[VtColors.BLUE],
        opacity: "0.6",
        "text-decoration": "underline"
    };
    prevValSymbols = {};
    async init() {
        try {
            const theme = await zlocalStorage.load(VtSettings.THEME, VtColors.BLUE);
            this.styleObj.color = theme in this.colorMap ? this.colorMap[theme] : this.colorMap[VtColors.BLUE];
            for (let key in this.styleObj) {
                this.prevValSymbols[key] = Symbol();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    highlight(elem) {
        try {
            for (let key in this.styleObj) {
                elem[this.prevValSymbols[key]] = elem.style.getPropertyValue(key);
            }
            js.dom.setStyleImportant(elem, this.styleObj);
        }
        catch (e) {
            logError(e);
        }
    }
    removeHighLight(elem) {
        try {
            for (let key in this.styleObj) {
                elem.style.setProperty(key, elem[this.prevValSymbols[key]]);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
