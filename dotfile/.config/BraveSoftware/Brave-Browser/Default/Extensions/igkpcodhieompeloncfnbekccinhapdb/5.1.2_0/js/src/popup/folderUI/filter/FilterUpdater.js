import { FoldersUI } from "../../../../popup/folders_ui/FoldersUI.js";
import { BaseFolderFilterUpdater } from "../../../common/ui/folderUI/filter/BaseFolderFilterUpdater.js";
import { pp } from "../../pp.js";
export class FilterUpdater extends BaseFolderFilterUpdater {
    async updateFilter(query) {
        query.page_no = 0;
        await zsessionStorage.save(FoldersUI.PP_FOLDER_QUERY, query);
        await pp.foldersUI.refreshFolderList();
    }
}
