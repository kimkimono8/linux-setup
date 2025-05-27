import { FilterType } from "../../../../../service/bgApi/types.js";
import { FolderQuerySearcher } from "./FolderQuerySearcher.js";
export class FolderQuerier {
    static query(folders, query) {
        return new FolderQuerier().queryFolders(folders, query);
    }
    constructor() { }
    query = null;
    filterBySharingType = false;
    searcher = new FolderQuerySearcher();
    async queryFolders(folders, query) {
        this.init(query);
        for (let curFolder of folders) {
            this.filter(curFolder);
        }
        const filteredFolders = this.searcher.getFilteredFolders();
        const result = js.array.getPage(filteredFolders, this.query.page_no, this.query.rows_per_page);
        return result;
    }
    init(query) {
        this.query = query;
        this.searcher.init(query.search_string);
        this.filterBySharingType = query.sharingType != FilterType.ALL;
    }
    filter(folder) {
        if (this.filterBySharingType && (folder.sharing_type != this.query.sharingType)) {
            return;
        }
        this.searcher.addIfValid(folder);
    }
}
