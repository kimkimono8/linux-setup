import { TagQueryResult } from "../../../../service/bgApi/types.js";
import { vutil } from "../../../../vutil/export.js";
import { TableHelper } from "../parts/TableHelper.js";
class TagTableRow {
    tag = "";
}
export class TagTableImpl {
    table;
    init(tableHelperInput) {
        this.table = new TableHelper(tableHelperInput);
    }
    rowMapper = new SecretToRowMapper();
    async saveAll(secrets, clear = false) {
        try {
            const rows = this.rowMapper.getRows(secrets);
            await this.table.addAllRows(rows, clear);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async save(secret) {
        return this.saveAll([secret]);
    }
    async query(query) {
        return new SecretTagQuerier(this).queryTags(query);
    }
    async loadAll() {
        try {
            const rows = await this.table.getAllRows();
            const tags = rows.map(x => x.tag);
            return tags;
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
class SecretToRowMapper {
    getRows(secrets) {
        try {
            const tagSet = new Set();
            for (let secret of secrets) {
                if (!secret.tags) {
                    continue;
                }
                secret.tags.forEach(x => tagSet.add(x));
            }
            const tags = js.array.toArray(tagSet.values());
            const rows = tags.map(x => ({ tag: x }));
            return rows;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
class SecretTagQuerier {
    p = null;
    static SORT_WEIGHT = {
        NAME_START: 100,
        NAME_INCLUDES: 90,
        NAME_REGEX: 80,
        NO_MATCH: 0
    };
    search_regex = null;
    searchString = "";
    sortWeightMap = new Map();
    query = null;
    constructor(p) {
        this.p = p;
    }
    async queryTags(query) {
        try {
            this.query = query;
            const allTags = await this.p.loadAll();
            const reqTags = [];
            let searchWeight = 0;
            this.searchString = query.search_string.toLocaleLowerCase();
            if (this.searchString) {
                this.search_regex = vutil.search.getSearchRegex(this.searchString);
            }
            for (let tag of allTags) {
                if (query.excludeTags.includes(tag)) {
                    continue;
                }
                if (!query.search_string) {
                    reqTags.push(tag);
                    continue;
                }
                searchWeight = this.getSearchWeight(tag);
                if (!searchWeight) {
                    continue;
                }
                this.sortWeightMap.set(tag, searchWeight);
                reqTags.push(tag);
            }
            const sortFn = this.getSortFunction();
            reqTags.sort(sortFn);
            const pagedTags = js.array.getPage(reqTags, query.page_no, query.rows_per_page);
            const result = new TagQueryResult();
            result.query = { ...query };
            result.tags = pagedTags;
            result.total_count = allTags.length;
            return result;
        }
        catch (e) {
            throw jserror(e);
        }
    }
    getSortFunction() {
        if (this.query.search_string) {
            return this.compareSortweight.bind(this);
        }
        return this.compareName;
    }
    compareSortweight(x, y) {
        return this.getSortWeight(y) - this.getSortWeight(x);
    }
    getSortWeight(tag) {
        return this.sortWeightMap.get(tag) || 0;
    }
    compareName(x, y) {
        return x.toLocaleLowerCase().localeCompare(y.toLocaleLowerCase());
    }
    getSearchWeight(tag) {
        const name = tag.toLocaleLowerCase();
        if (name.startsWith(this.searchString)) {
            return SecretTagQuerier.SORT_WEIGHT.NAME_START;
        }
        if (name.includes(this.searchString)) {
            return SecretTagQuerier.SORT_WEIGHT.NAME_INCLUDES;
        }
        if (this.search_regex.test(name)) {
            return SecretTagQuerier.SORT_WEIGHT.NAME_REGEX;
        }
        return SecretTagQuerier.SORT_WEIGHT.NO_MATCH;
    }
}
