export class GeneratorSliderInput {
    p;
    constructor(p) {
        this.p = p;
        this.sliderLengthInput = js.fn.wrapper.createSingleInstListener(this.sliderLengthInput, this);
        this.updateSliderBar = js.fn.wrapper.createSingleInstListener(this.updateSliderBar, this);
    }
    addListeners() {
        try {
            const input = this.p.elem.sliderInput;
            input.addEventListener("input", this.sliderLengthInput);
            input.addEventListener("input", this.updateSliderBar);
        }
        catch (e) {
            logError(e);
        }
    }
    setValue(value) {
        try {
            this.p.elem.sliderInput.value = value + "";
            this.updateSliderBar();
        }
        catch (e) {
            logError(e);
        }
    }
    async sliderLengthInput() {
        try {
            this.p.elem.lengthInput.value = this.p.elem.sliderInput.value;
            this.p.callInputListener();
            await js.time.delay(0.15);
        }
        catch (e) {
            logError(e);
        }
    }
    updateSliderBar() {
        const inputElem = this.p.elem.sliderInput;
        const min = this.p.limit.min;
        const max = this.p.limit.max;
        const value = +inputElem.value;
        const percent = 100 / (max - min) * (value - min);
        this.p.elem.sliderBarElem.style.width = percent + "%";
    }
}
