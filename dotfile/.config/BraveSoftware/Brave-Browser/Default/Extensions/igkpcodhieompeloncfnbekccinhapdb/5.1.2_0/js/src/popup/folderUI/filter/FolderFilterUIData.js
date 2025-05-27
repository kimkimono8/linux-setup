import { BaseFolderFilterUIData } from "../../../common/ui/folderUI/filter/BaseFolderFilterUIData.js";
import { pp } from "../../pp.js";
export class FolderFilterUIData extends BaseFolderFilterUIData {
    getQuery() {
        return pp.foldersUI.getQuery();
    }
}
