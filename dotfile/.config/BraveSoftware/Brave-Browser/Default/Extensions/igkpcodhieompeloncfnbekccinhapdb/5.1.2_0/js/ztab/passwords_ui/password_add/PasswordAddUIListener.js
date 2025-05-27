import { BasePasswordAddUIListener } from "./BasePasswordAddUIListener.js";
export class PasswordAddUIListener extends BasePasswordAddUIListener {
    p = null;
    constructor() {
        super();
        js.fn.bindThis(this, [
            this.handleSecretTypeChange
        ]);
    }
    async handleSecretTypeChange() {
        this.p.secretTypeComponent.handleSecretTypeChange();
    }
}
