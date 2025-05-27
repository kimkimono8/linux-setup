export class PassphraseGeneratorImpl {
    words;
    async init() {
        try {
            this.init = js.fn.emptyFn;
            const wordsJson = await fetch("/resources/passphrase_words.json").then(x => x.json());
            this.words = wordsJson.words;
        }
        catch (e) {
            logError(e);
        }
    }
    async generate(input) {
        try {
            await this.init();
            const words = this.getWords(input);
            const outWords = Array.from(words);
            this.capitalize(words, input);
            this.addNumbers(words, input);
            const passphrase = words.join(input.separator);
            return {
                passphrase,
                words: outWords
            };
        }
        catch (e) {
            logError(e);
            return { passphrase: "", words: [] };
        }
    }
    getWords(input) {
        try {
            if (input?.words?.length == input.noOfWords) {
                return Array.from(input.words);
            }
            const words = [];
            for (let _ of js.loop.range(input.noOfWords)) {
                words.push(this.words[js.crypto.generateRandom(this.words.length)]);
            }
            return words;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    capitalize(words, input) {
        try {
            if (!input.reqCapital) {
                return;
            }
            for (let i of js.loop.range(words.length)) {
                words[i] = js.string.capitalize(words[i]);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addNumbers(words, input) {
        try {
            if (!input.reqNumber) {
                return;
            }
            const numCount = js.crypto.generateRandomRange(1, words.length);
            for (let _ of js.loop.range(numCount)) {
                this.addDigit(words);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    addDigit(words) {
        try {
            const digit = js.crypto.generateRandom(10);
            const index = js.crypto.generateRandomRange(0, words.length);
            words[index] = words[index] + digit;
        }
        catch (e) {
            logError(e);
        }
    }
}
