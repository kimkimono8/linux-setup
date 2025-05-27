import { BasePasswordAddFolderDropDown } from "../../../../common/ui/components/BasePasswordAddFolderDropdown.js";
export class PasswordAddFolderComponent extends BasePasswordAddFolderDropDown {
    p = null;
    getFolderRowElem() {
        return this.p.select("[data-field_row='folder']");
    }
    setErrorMessage(errorMsg) {
        const folderRowElem = this.getFolderRowElem();
        const errorElem = js.selector.selectFrom(folderRowElem, "[data-error]");
        js.dom.setText(errorElem, errorMsg);
    }
}
