import { bg } from "../../../src/bg/bg.js";
import { accountDb } from "../../../src/bg/Context.js";
import { SecretQueryResult } from "../../../src/service/bgApi/types/SecretQuery.js";
import { SecretHighlightFields } from "../../../src/service/vt/constants/constants.js";
import { vutil } from "../../../src/vutil/export.js";
import { DbSecretQuerier } from "./DbSecretQuerier.js";
export class SecretQuerier {
    async getHighlightField(secret, searchString) {
        try {
            searchString = searchString.toLocaleLowerCase();
            if (secret.name_lowercase.startsWith(searchString)) {
                return SecretHighlightFields.NAME;
            }
            const uiText = (secret.ui_text && (await bg.zcrypt.decrypt(secret.ui_text, secret.shared))) || "";
            const uiTextLower = uiText.toLocaleLowerCase();
            if (uiTextLower && uiTextLower.startsWith(searchString)) {
                return SecretHighlightFields.UI_TEXT;
            }
            if (secret.name_lowercase.includes(searchString)) {
                return SecretHighlightFields.NAME;
            }
            if (uiTextLower && uiTextLower.includes(searchString)) {
                return SecretHighlightFields.UI_TEXT;
            }
            if (secret.search_words.includes(searchString)) {
                return SecretHighlightFields.WORDS;
            }
            if (secret.search_words.some(x => x.includes(searchString))) {
                return SecretHighlightFields.WORDS_INCLUDE;
            }
            if (vutil.search.isPresent(searchString, secret.name_lowercase)) {
                return SecretHighlightFields.NAME;
            }
            if (uiTextLower && vutil.search.isPresent(searchString, uiTextLower)) {
                return SecretHighlightFields.UI_TEXT;
            }
            return "";
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async query(query) {
        try {
            await this.updateFolderMap(query);
            const allSecrets = await accountDb.secretTable.loadAll();
            const result = await DbSecretQuerier.query(allSecrets, query);
            if (query.includeSecretData) {
                await bg.vaultSecrets.secretDataHandler.decodeSecretData(result.secrets);
            }
            return result;
        }
        catch (e) {
            logError(e);
            return new SecretQueryResult();
        }
    }
    async updateFolderMap(query) {
        try {
            if (!query.folderId) {
                return;
            }
            const folderId = query.folderId;
            const existing = await accountDb.folderSecretMapTable.load(folderId);
            const hasValidIds = existing && (existing.validUpto > Date.now());
            if (hasValidIds) {
                return;
            }
            const offlineHasValidIds = !navigator.onLine && existing?.secretIds && (existing.secretIds.length > 0);
            if (offlineHasValidIds) {
                return;
            }
            await bg.vaultFolders.getFolderSecrets(folderId);
        }
        catch (e) {
            logError(e);
        }
    }
}
