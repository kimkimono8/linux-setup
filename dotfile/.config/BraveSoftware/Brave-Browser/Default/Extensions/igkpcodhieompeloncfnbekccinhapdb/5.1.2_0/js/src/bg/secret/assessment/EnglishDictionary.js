import { cdnUtil, commonDb } from "../../Context.js";
export class EnglishDictionary {
    async init() {
        try {
            this.init = js.fn.emptyFn;
            if (await commonDb.dictionaryTable.hasWords()) {
                return;
            }
            const words = await this.getWordsFromServer();
            await commonDb.dictionaryTable.saveAll(words);
        }
        catch (e) {
            logError(e);
        }
    }
    async isPresent(word) {
        try {
            await this.init();
            return await commonDb.dictionaryTable.isPresent(word);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async getWordsFromServer() {
        try {
            const DICTIONARY_PATH = "/js/English_dic.js";
            const contents = await cdnUtil.getTextContents(DICTIONARY_PATH);
            const jsonContents = contents.slice(contents.indexOf("["), contents.lastIndexOf("]") + 1);
            const words = JSON.parse(jsonContents);
            return words;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
