class Util {
    isNumberLoginAllowed(container) {
        try {
            const visibleInputs = csutil.selector.selectAll("input", { container, shadowRoot: true })
                .filter(x => csutil.isVisible(x));
            let lastInput = null;
            for (let input of visibleInputs) {
                if (csutil.input.typeOf(input) == "password") {
                    if (!lastInput) {
                        return false;
                    }
                    return ["tel", "number"].includes(lastInput.type);
                }
                lastInput = input;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
export const util = new Util();
