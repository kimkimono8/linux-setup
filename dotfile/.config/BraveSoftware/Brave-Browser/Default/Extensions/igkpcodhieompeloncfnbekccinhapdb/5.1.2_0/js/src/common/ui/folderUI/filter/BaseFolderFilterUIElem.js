import { UIElemContainer } from "../../../../uiUtil/export.js";
export class BaseFolderFilterUIElem extends UIElemContainer {
    init() {
        this.container = js.selector.select("#folders_filter_container");
    }
    getSharingCheckbox(value) {
        try {
            return this.select("input[name='folder_sharing'][value=" + value + "]");
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
