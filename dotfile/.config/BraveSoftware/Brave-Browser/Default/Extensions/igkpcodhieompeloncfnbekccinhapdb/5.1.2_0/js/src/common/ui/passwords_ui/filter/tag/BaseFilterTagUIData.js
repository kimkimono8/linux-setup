import { TagQuery } from "../../../../../service/bgApi/types.js";
export class BaseFilterTagUIData {
    tags = [];
    async init() {
        try {
            const tagQuery = new TagQuery();
            tagQuery.rows_per_page = -1;
            const tagResult = await bgApi.secret.queryTags(tagQuery);
            this.tags = tagResult.tags;
        }
        catch (e) {
            logError(e);
        }
    }
}
