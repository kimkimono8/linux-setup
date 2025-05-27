import { BaseFolderFilterUI } from "../../../common/ui/folderUI/filter/BaseFolderFilterUI.js";
import { FilterUpdater } from "./FilterUpdater.js";
import { FolderFilterUIData } from "./FolderFilterUIData.js";
export class FolderFilterUI extends BaseFolderFilterUI {
    data = new FolderFilterUIData();
    updater = new FilterUpdater(this);
}
