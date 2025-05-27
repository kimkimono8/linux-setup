import { accountDb } from "../../../src/bg/Context.js";
import { secretLogoAdder } from "../../../src/bg/logo/export.js";
import { FilterType } from "../../../src/service/bgApi/types.js";
import { SecretClassification, SecretSharingType } from "../../../src/service/bgApi/types/Secret.js";
import { SecretQueryOrderBy, SecretQueryResult } from "../../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { SecretHighlightFields } from "../../../src/service/vt/constants/constants.js";
import { vutil } from "../../../src/vutil/export.js";
const RECENT_ADDITION_ELAPSE_MS = (30 * 24 * 60 * 60 * 1000);
export class DbSecretQuerier {
    static query(allSecrets, query) {
        return new DbSecretQuerier().querySecrets(allSecrets, query);
    }
    constructor() { }
    query = null;
    searchString = "";
    filteredSecretsParts = {
        nameStart: [],
        uiTextStart: [],
        nameInclude: [],
        uiTextInclude: [],
        words: [],
        wordsInclude: [],
        namePattern: [],
        uiTextPattern: [],
    };
    filteredSecrets = null;
    recentlyUsedMap = null;
    hostRecentIds = null;
    recentAdditionStartMs = Date.now() - RECENT_ADDITION_ELAPSE_MS;
    domainMatchingIds = null;
    filterByClassification = false;
    filterBySharingType = false;
    filterByTags = false;
    tagFilterFn = this.tagFilterAll;
    folderSecretIds = [];
    userId = "";
    result = new SecretQueryResult();
    async querySecrets(allSecrets, query) {
        try {
            this.query = query;
            await this.init();
            for (let secret of allSecrets) {
                await this.filter(secret);
            }
            this.filteredSecrets = this.getFilteredSecrets();
            await this.sortSecrets();
            const result = this.getQueryResult();
            if (!query.noLogo) {
                await secretLogoAdder.addLogo(result.secrets);
            }
            return result;
        }
        catch (e) {
            logError(e);
            return new SecretQueryResult();
        }
    }
    async init() {
        const query = this.query;
        this.searchString = query.search_string.toLocaleLowerCase();
        if (query.recentlyUsed) {
            this.recentlyUsedMap = await accountDb.recentSecretTable.getMap();
        }
        if (query.orderBy == SecretQueryOrderBy.HOST_RECENT) {
            this.hostRecentIds = await accountDb.hostRecentSecretTable.load(query.domainMatchingUrl);
        }
        if (query.domainMatching) {
            this.domainMatchingIds = new Set(await domainHandler.getDomainMatchingIds({ url: query.domainMatchingUrl }));
        }
        switch (query.classification) {
            case SecretClassification.PERSONAL:
            case SecretClassification.ENTERPRISE:
                this.filterByClassification = true;
                break;
        }
        switch (query.sharing) {
            case SecretSharingType.SHARED_BY_ME:
            case SecretSharingType.SHARED_TO_ME:
            case SecretSharingType.NONE:
                this.filterBySharingType = true;
                break;
        }
        if (query.folderId) {
            this.folderSecretIds = await accountDb.folderSecretMapTable.loadSecretIds(query.folderId);
        }
        if (query.recentlyAdded) {
            this.userId = await zlocalStorage.load(LocalStorageKeys.USER_ID, "");
        }
        this.filterByTags = this.query.tags.length > 0;
        if (this.filterByTags && this.query.tagMode == FilterType.ANY) {
            this.tagFilterFn = this.tagFilterAny;
        }
    }
    async filter(secret) {
        const query = this.query;
        if (query.typeId && secret.type_id != query.typeId) {
            return;
        }
        if (query.favourite && !secret.is_favourite) {
            return;
        }
        if (query.recentlyUsed && !this.recentlyUsedMap.has(secret.id)) {
            return;
        }
        if (query.recentlyAdded && ((secret.user_id != this.userId) || (secret.created_on < this.recentAdditionStartMs))) {
            return;
        }
        if (query.domainMatching && !this.domainMatchingIds.has(secret.id)) {
            return;
        }
        if (this.filterByClassification && this.query.classification != secret.classification) {
            return;
        }
        if (this.filterBySharingType && this.query.sharing != secret.sharing_type) {
            return;
        }
        if (query.folderId && !this.folderSecretIds.includes(secret.id)) {
            return;
        }
        if (this.filterByTags && !this.tagFilterFn(secret)) {
            return;
        }
        if (query.owned && !secret.owned) {
            return;
        }
        if (!this.searchString) {
            secret.highlight_field = "";
            this.filteredSecretsParts.nameInclude.push(secret);
            return;
        }
        return this.filterSearchString(secret);
    }
    tagFilterAny(secret) {
        return this.query.tags.some(x => secret.tags.includes(x));
    }
    tagFilterAll(secret) {
        return this.query.tags.every(x => secret.tags.includes(x));
    }
    async filterSearchString(secret) {
        const searchString = this.searchString;
        if (secret.name_lowercase.startsWith(searchString)) {
            this.filteredSecretsParts.nameStart.push(secret);
            secret.highlight_field = SecretHighlightFields.NAME;
            return;
        }
        const uiText = (secret.ui_text && (await bg.zcrypt.decrypt(secret.ui_text, secret.shared))) || "";
        const uiTextLower = uiText.toLocaleLowerCase();
        if (uiTextLower && uiTextLower.startsWith(searchString)) {
            this.filteredSecretsParts.uiTextStart.push(secret);
            secret.highlight_field = SecretHighlightFields.UI_TEXT;
            return;
        }
        if (secret.name_lowercase.includes(searchString)) {
            this.filteredSecretsParts.nameInclude.push(secret);
            secret.highlight_field = SecretHighlightFields.NAME;
            return;
        }
        if (uiTextLower && uiTextLower.includes(searchString)) {
            this.filteredSecretsParts.uiTextInclude.push(secret);
            secret.highlight_field = SecretHighlightFields.UI_TEXT;
            return;
        }
        if (secret.search_words.includes(searchString)) {
            this.filteredSecretsParts.words.push(secret);
            secret.highlight_field = SecretHighlightFields.WORDS;
            return;
        }
        if (secret.search_words.some(x => x.includes(searchString))) {
            this.filteredSecretsParts.wordsInclude.push(secret);
            secret.highlight_field = SecretHighlightFields.WORDS_INCLUDE;
            return;
        }
        if (vutil.search.isPresent(searchString, secret.name_lowercase)) {
            this.filteredSecretsParts.namePattern.push(secret);
            secret.highlight_field = SecretHighlightFields.NAME;
            return;
        }
        if (uiTextLower && vutil.search.isPresent(searchString, uiTextLower)) {
            this.filteredSecretsParts.uiTextPattern.push(secret);
            secret.highlight_field = SecretHighlightFields.UI_TEXT;
            return;
        }
    }
    async sortSecrets() {
        const filteredSecrets = this.filteredSecrets;
        if (this.searchString.length > 0) {
            return;
        }
        const query = this.query;
        if (query.recentlyUsed) {
            filteredSecrets.sort(this.sortByRecentUse.bind(this));
            return;
        }
        if (query.recentlyAdded) {
            filteredSecrets.sort(this.sortByRecentAdd.bind(this));
            return;
        }
        switch (query.orderBy) {
            case SecretQueryOrderBy.HOST_RECENT:
                filteredSecrets.sort(this.sortByHostRecent.bind(this));
                return;
            case SecretQueryOrderBy.DOMAIN_FAVOURITE:
                await this.orderByDomainFavourite();
                return;
        }
    }
    async orderByDomainFavourite() {
        try {
            const activeTab = await brApi.tab.getActiveTab();
            const isWebsiteUrl = activeTab?.url?.startsWith?.("http");
            if (!isWebsiteUrl) {
                this.filteredSecrets.sort(this.sortByFavourite.bind(this));
                return;
            }
            this.domainMatchingIds = new Set(await domainHandler.getDomainMatchingIds({ url: activeTab.url }));
            this.filteredSecrets.sort(this.sortByDomainFavourite.bind(this));
        }
        catch (e) {
            logError(e);
        }
    }
    sortByDomainFavourite(x, y) {
        try {
            return this.sortByDomainFavouriteFn(x, y) || this.sortByFavourite(x, y);
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    sortByDomainFavouriteFn(x, y) {
        try {
            const xMatch = this.domainMatchingIds.has(x.id);
            const yMatch = this.domainMatchingIds.has(y.id);
            return Number(yMatch) - Number(xMatch);
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    sortByRecentUse(x, y) {
        const xIndex = this.recentlyUsedMap.has(x.id) ? this.recentlyUsedMap.get(x.id) : -1;
        const yIndex = this.recentlyUsedMap.has(y.id) ? this.recentlyUsedMap.get(y.id) : -1;
        return (yIndex - xIndex) || this.sortByName(x, y);
    }
    sortByName(x, y) {
        return x.name_lowercase.localeCompare(y.name_lowercase);
    }
    sortByRecentAdd(x, y) {
        return y.created_on - x.created_on;
    }
    sortByHostRecent(x, y) {
        return this.hostRecentIds.indexOf(y.id) - this.hostRecentIds.indexOf(x.id);
    }
    sortByFavourite(x, y) {
        return Number(y.is_favourite) - Number(x.is_favourite);
    }
    getFilteredSecrets() {
        for (let key in this.filteredSecretsParts) {
            this.filteredSecretsParts[key].sort(this.sortByName.bind(this));
        }
        return js.array.concat(this.filteredSecretsParts.nameStart, this.filteredSecretsParts.uiTextStart, this.filteredSecretsParts.nameInclude, this.filteredSecretsParts.uiTextInclude, this.filteredSecretsParts.words, this.filteredSecretsParts.wordsInclude, this.filteredSecretsParts.namePattern, this.filteredSecretsParts.uiTextPattern);
    }
    getQueryResult() {
        const pageSecrets = js.array.getPage(this.filteredSecrets, this.query.page_no, this.query.rows_per_page);
        const result = this.result;
        result.query = { ...this.query };
        result.secrets = pageSecrets;
        result.total_count = this.filteredSecrets.length;
        return result;
    }
}
