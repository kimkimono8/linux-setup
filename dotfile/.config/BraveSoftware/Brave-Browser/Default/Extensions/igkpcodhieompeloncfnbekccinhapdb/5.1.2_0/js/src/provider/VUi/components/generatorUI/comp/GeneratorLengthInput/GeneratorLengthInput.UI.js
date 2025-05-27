import { GeneratorLengthInputElem } from "./GeneratorLengthInput.Elem.js";
import { GeneratorLengthInputPart } from "./GeneratorLengthInputPart.js";
import { GeneratorSliderInput } from "./GeneratorSliderInput.js";
export class GeneratorLengthInputUI {
    gg;
    elem;
    limit = {
        min: 1,
        max: 99
    };
    sliderInput = new GeneratorSliderInput(this);
    lengthInput = new GeneratorLengthInputPart(this);
    constructor(gg) {
        this.gg = gg;
        this.elem = new GeneratorLengthInputElem(this.gg);
    }
    createUI(input) {
        try {
            this.elem.init();
            this.setInput(input);
            this.addListeners();
            return this.elem.container;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    setInputListener(listener) {
        try {
            this.inputListener = listener;
        }
        catch (e) {
            logError(e);
        }
    }
    setLength(length) {
        try {
            const validLength = this.getPolicyBoundValue(length);
            this.elem.lengthInput.value = validLength + "";
            this.sliderInput.setValue(validLength);
        }
        catch (e) {
            logError(e);
        }
    }
    setLimits(min, max) {
        try {
            this.limit.min = min;
            this.limit.max = max;
            this.elem.sliderInput.min = "" + min;
            this.elem.sliderInput.max = "" + max;
            js.dom.setText(this.elem.minTextElem, this.elem.sliderInput.min);
            js.dom.setText(this.elem.maxTextElem, this.elem.sliderInput.max);
        }
        catch (e) {
            logError(e);
        }
    }
    getLength() {
        try {
            return js.string.parseInt(this.elem.lengthInput.value);
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    getPolicyBoundValue(value) {
        return js.math.getBoundedValueLEGE(this.limit.min, this.limit.max, value);
    }
    callInputListener() {
        try {
            this.inputListener(parseInt(this.elem.lengthInput.value));
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.lengthInput.addListeners();
            this.sliderInput.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    inputListener(n) { n; }
    setInput(input) {
        try {
            if (!input) {
                return;
            }
            this.setLimits(input.min, input.max);
            if (input.label) {
                js.dom.setText(this.elem.labelElem, input.label);
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
