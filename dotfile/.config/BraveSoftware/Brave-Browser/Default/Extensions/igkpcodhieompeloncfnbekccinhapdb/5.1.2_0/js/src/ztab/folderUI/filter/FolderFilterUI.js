import { BaseFolderFilterUI } from "../../../common/ui/folderUI/filter/BaseFolderFilterUI.js";
import { FolderFilterUIData } from "./FolderFilterData.js";
import { FolderFilterUpdater } from "./FolderFilterUpdater.js";
export class FolderFilterUI extends BaseFolderFilterUI {
    data = new FolderFilterUIData();
    updater = new FolderFilterUpdater(this);
}
