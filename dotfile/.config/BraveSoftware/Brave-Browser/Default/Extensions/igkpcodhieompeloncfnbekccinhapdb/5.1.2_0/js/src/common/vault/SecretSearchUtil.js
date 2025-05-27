export class SecretSearchUtil {
    static getSearchWords(secret) {
        try {
            return js.array.concat(this.getTagSearchWords(secret), this.getDescriptionSearchWords(secret), this.getUrlSearchWords(secret));
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    static getTagSearchWords(secret) {
        try {
            return this.filterMapSearchWords(secret.tags);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    static filterMapSearchWords(words) {
        return words.filter(x => x.length).map(x => x.toLowerCase());
    }
    static getDescriptionSearchWords(secret) {
        try {
            const searchWords = secret.description.split(/\W/g).filter(x => Boolean(x.length > 2));
            return this.filterMapSearchWords(searchWords);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    static getUrlSearchWords(secret) {
        try {
            const searchWords = secret.valid_urls.map(x => js.url.getParentDomain(x));
            return this.filterMapSearchWords(searchWords);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
