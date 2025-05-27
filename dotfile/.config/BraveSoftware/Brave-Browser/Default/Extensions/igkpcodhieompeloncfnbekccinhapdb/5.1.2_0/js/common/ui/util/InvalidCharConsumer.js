export class InvalidCharConsumer {
    static LISTENER_ADDED = Symbol();
    validCharRegex = /./;
    consumeInvalidChars(input, validCharRegEx) {
        try {
            const isAddedPreviously = Boolean(input[InvalidCharConsumer.LISTENER_ADDED]);
            if (isAddedPreviously) {
                return;
            }
            input[InvalidCharConsumer.LISTENER_ADDED] = true;
            this.validCharRegex = validCharRegEx;
            input.addEventListener("keydown", this.handleKeyDown.bind(this), true);
            input.addEventListener("paste", this.handlePaste.bind(this));
        }
        finally {
        }
    }
    handleKeyDown(e) {
        const key = e.key;
        const isControlKey = js.event.isControlKey(e);
        if (isControlKey) {
            return;
        }
        const isValidChar = this.validCharRegex.test(key);
        if (isValidChar) {
            return;
        }
        js.event.preventDefault(e, true);
    }
    async handlePaste(e) {
        const isValidInput = e.target instanceof HTMLInputElement;
        if (!isValidInput) {
            return;
        }
        const input = e.target;
        await js.time.delay(0);
        this.removeInvalidCharsFromInput(input);
    }
    removeInvalidCharsFromInput(input) {
        const value = input.value;
        let validValue = "";
        let isValidChar = false;
        for (let s of value) {
            isValidChar = this.validCharRegex.test(s);
            if (isValidChar) {
                validValue += s;
            }
        }
        input.value = validValue;
    }
}
