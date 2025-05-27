import { generatedPasswordFiller } from "../../src/cs/cscomp/export.js";
import { cs } from "../cs.js";
export class CSLoginApiBackend {
    async fillActiveInput(value) {
        return cs.fieldFillder.fillActiveInput(value);
    }
    async fillValue(fillValue) {
        return cs.fieldFillder.fillValue(fillValue);
    }
    async login(loginData) {
        cs.login.login(loginData);
    }
    async frameLogin(loginData) {
        cs.login.frameLogin(loginData);
    }
    async fillCard(secret) {
        return cs.card.fillCard(secret);
    }
    async fillForm(secret) {
        return cs.form.fillAddress(secret);
    }
    async fillFormField(data) {
        return cs.form.fillFormField(data);
    }
    async getActiveInputLoginType() {
        return cs.login.getActiveInputLoginType();
    }
    async fillGeneratedPassword(value) {
        return generatedPasswordFiller.fill(value);
    }
    async hasValidLoginField() {
        return cs.login.hasValidLoginField();
    }
}
