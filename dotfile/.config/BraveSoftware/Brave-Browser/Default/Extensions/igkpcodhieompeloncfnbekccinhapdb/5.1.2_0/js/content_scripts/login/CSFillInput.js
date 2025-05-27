import { userAction } from "../../src/cs/csfill/export.js";
export class CSFillInputImpl {
    input = null;
    constructor(input) {
        this.input = input;
    }
    async fillValue(value) {
        await userAction.userFill(this.input, value);
    }
    getInputForZIconAddition() {
        return this.input;
    }
    getInputForSubmitting() {
        return this.input;
    }
}
