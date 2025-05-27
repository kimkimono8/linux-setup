import { util } from "./loginutil-Util.js";
class LoginFieldIteratorProvider {
    iterate(container) {
        return new CSLoginFieldIterator(container);
    }
}
class CSLoginFieldIterator {
    container;
    constructor(container) {
        this.container = container;
    }
    *[Symbol.iterator]() {
        const inputs = csutil.selector.selectAll("input", { container: this.container, shadowRoot: false });
        const allowNumberLogin = util.isNumberLoginAllowed(this.container);
        let validInput = false;
        for (let input of inputs) {
            if (!csutil.isVisible(input)) {
                continue;
            }
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
export const loginFieldIterator = new LoginFieldIteratorProvider();
