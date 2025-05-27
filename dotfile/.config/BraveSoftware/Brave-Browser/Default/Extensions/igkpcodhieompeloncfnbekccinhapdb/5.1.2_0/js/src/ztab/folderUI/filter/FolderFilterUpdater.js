import { zt } from "../../../../ztab/zt.js";
import { BaseFolderFilterUpdater } from "../../../common/ui/folderUI/filter/BaseFolderFilterUpdater.js";
export class FolderFilterUpdater extends BaseFolderFilterUpdater {
    async updateFilter(query) {
        query.page_no = 0;
        await zt.foldersUI.refresh_queried_list();
    }
}
