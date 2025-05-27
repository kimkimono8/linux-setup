import { zt } from "../../../../ztab/zt.js";
import { BasePasswordFilterUIData } from "../../../common/ui/passwords_ui/filter/BasePasswordFilterUIData.js";
export class PasswordFilterUIData extends BasePasswordFilterUIData {
    filterUI;
    constructor(filterUI) {
        super(filterUI);
        this.filterUI = filterUI;
    }
    getQuery() {
        return zt.passwordsOldUI.getQuery();
    }
}
