import { loginUtil } from "../../src/cs/loginUtil/export.js";
export class CSLoginFieldIterator {
    constructor() { }
    container = null;
    static iterate(container) {
        const iterator = new CSLoginFieldIterator();
        iterator.container = container;
        return iterator;
    }
    *[Symbol.iterator]() {
        const inputs = csutil.selector.selectAll("input", { container: this.container, visible: true, shadowRoot: false });
        const allowNumberLogin = loginUtil.isNumberLoginAllowed(this.container);
        let validInput = false;
        for (let input of inputs) {
            if (input.type == "text" && csutil.input.isCaptcha(input)) {
                continue;
            }
            validInput = allowNumberLogin ? csutil.input.isValidTextPasswordNumber(input) : csutil.input.isValidTextPassword(input);
            if (!validInput) {
                continue;
            }
            switch (csutil.input.typeOf(input)) {
                case "tel":
                case "number":
                    if (!allowNumberLogin) {
                        continue;
                    }
                case "text":
                case "email":
                case "password":
                    yield input;
                    break;
            }
        }
    }
}
