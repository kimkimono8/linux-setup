export class JsStringUtilImpl {
    capitalize(word) {
        try {
            if (!word) {
                return "";
            }
            return word[0].toUpperCase() + word.slice(1);
        }
        catch (e) {
            logError(e);
            return word;
        }
    }
    removeChars(s, removeChars) {
        const set = new Set(removeChars);
        const replacedString = Array.from(s).filter(ch => !set.has(ch)).join("");
        return replacedString;
    }
    parseInt(s) {
        return parseInt(s) || 0;
    }
}
