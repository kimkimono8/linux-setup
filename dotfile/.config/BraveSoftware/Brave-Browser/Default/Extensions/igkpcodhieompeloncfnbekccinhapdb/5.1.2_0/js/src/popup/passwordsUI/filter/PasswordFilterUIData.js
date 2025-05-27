import { BasePasswordFilterUIData } from "../../../common/ui/passwords_ui/filter/BasePasswordFilterUIData.js";
import { pp } from "../../pp.js";
export class PasswordFilterUIData extends BasePasswordFilterUIData {
    filterUI;
    constructor(filterUI) {
        super(filterUI);
        this.filterUI = filterUI;
    }
    getQuery() {
        return pp.passwordsUI.getQuery();
    }
}
