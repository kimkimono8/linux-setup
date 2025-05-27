import { Folder, FolderSharingType } from "../../../../../service/bgApi/types/Folder.js";
import { FolderQuerySearcher } from "./FolderQuerySearcher.js";
export class EditableFolderQuerier {
    static queryEditable(folders, query) {
        return new EditableFolderQuerier().queryEditable(folders, query);
    }
    constructor() { }
    query = null;
    searcher = new FolderQuerySearcher();
    async queryEditable(folders, query) {
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
    }
    filter(folder) {
        if (!this.hasEditPermission(folder)) {
            return;
        }
        this.searcher.addIfValid(folder);
    }
    hasEditPermission(folder) {
        try {
            const sharedWithMe = folder.sharing_type == FolderSharingType.SHARED_TO_ME;
            if (!sharedWithMe) {
                return true;
            }
            switch (folder.sharing_level) {
                case Folder.SHARING_LEVEL.MANAGE:
                case Folder.SHARING_LEVEL.MODIFY:
                case Folder.SHARING_LEVEL_USER_GROUP.MANAGE:
                case Folder.SHARING_LEVEL_USER_GROUP.MODIFY:
                    return true;
            }
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
