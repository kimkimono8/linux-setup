export class SearchUtil {
    isPresent(pattern, input, ignoreCase = false) {
        if (ignoreCase) {
            pattern = pattern.toLowerCase();
            input = input.toLowerCase();
        }
        let patternI = 0;
        for (let i = 0; patternI < pattern.length && i < input.length; i++) {
            if (pattern[patternI] == input[i]) {
                patternI++;
            }
        }
        return patternI == pattern.length;
    }
    getSearchRegex(searchString) {
        const regExInput = searchString.split("").map(this.getSearchRegexChar, this).join("");
        const searchRegex = new RegExp(regExInput, "i");
        return searchRegex;
    }
    escapeRegex(s) {
        return s.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&");
    }
    getSearchRegexChar(inputChar) {
        const ch = this.escapeRegex(inputChar);
        return "[^" + ch + "]*?" + ch;
    }
}
