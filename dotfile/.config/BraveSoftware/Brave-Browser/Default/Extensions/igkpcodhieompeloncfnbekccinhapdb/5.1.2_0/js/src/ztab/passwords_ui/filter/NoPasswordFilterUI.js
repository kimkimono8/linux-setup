import { zt } from "../../../../ztab/zt.js";
import { BaseNoPasswordFilterUI } from "../../../common/ui/passwords_ui/filter/noPasswordFilter/BaseNoPasswordFilterUI.js";
export class NoPasswordFilterUI extends BaseNoPasswordFilterUI {
    getPasswordsElem() {
        return zt.passwordsOldUI.elem;
    }
    getSearchElem() {
        return js.selector.selectFrom(zt.passwordsOldUI.elem, "[data-search]");
    }
}
