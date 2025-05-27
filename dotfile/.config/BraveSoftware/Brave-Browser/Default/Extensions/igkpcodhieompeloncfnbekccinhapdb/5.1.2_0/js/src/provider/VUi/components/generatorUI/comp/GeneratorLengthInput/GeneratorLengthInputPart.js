import { InvalidCharConsumer } from "../../../../../../../common/ui/util/InvalidCharConsumer.js";
export class GeneratorLengthInputPart {
    p;
    constructor(p) {
        this.p = p;
        js.fn.bindThis(this, [this.onInputComplete]);
    }
    addListeners() {
        try {
            const input = this.p.elem.lengthInput;
            input.addEventListener("click", e => e.target.select());
            new InvalidCharConsumer().consumeInvalidChars(input, /[0-9]/);
            input.addEventListener("blur", this.onInputComplete);
            input.addEventListener("paste", this.onInputComplete);
            input.addEventListener("keydown", this.onKeyDownInput.bind(this));
        }
        catch (e) {
            logError(e);
        }
    }
    onInputComplete() {
        this.p.setLength(js.string.parseInt(this.p.elem.lengthInput.value));
        this.p.callInputListener();
    }
    onKeyDownInput(e) {
        const key = e.key;
        const input = e.target;
        if (key >= '0' && key <= '9') {
            input.value = (input.value + key).slice(-2);
            e.preventDefault();
        }
        else if (key == "ArrowUp") {
            this.addValue(1);
            e.preventDefault();
        }
        else if (key == "ArrowDown") {
            this.addValue(-1);
            e.preventDefault();
        }
        this.p.setLength(parseInt(input.value));
        this.p.callInputListener();
    }
    addValue(n) {
        const input = this.p.elem.lengthInput;
        const value = (js.string.parseInt(input.value) + n);
        input.value = this.p.getPolicyBoundValue(value) + "";
    }
}
