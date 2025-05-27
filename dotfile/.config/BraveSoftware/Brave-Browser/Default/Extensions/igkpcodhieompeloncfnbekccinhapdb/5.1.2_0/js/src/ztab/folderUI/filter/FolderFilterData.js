import { zt } from "../../../../ztab/zt.js";
import { BaseFolderFilterUIData } from "../../../common/ui/folderUI/filter/BaseFolderFilterUIData.js";
export class FolderFilterUIData extends BaseFolderFilterUIData {
    getQuery() {
        return zt.foldersUI.getQuery();
    }
}
