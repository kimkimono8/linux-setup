import { BasePasswordAddFolderDropDown } from "../../common/ui/components/BasePasswordAddFolderDropdown.js";
export class SaveFrameFolderComponent extends BasePasswordAddFolderDropDown {
    getFolderRowElem() {
        return js.selector.select("[data-field_row='folder']");
    }
}
