import { BaseNoPasswordFilterUI } from "../../../common/ui/passwords_ui/filter/noPasswordFilter/BaseNoPasswordFilterUI.js";
import { pp } from "../../pp.js";
export class NoPasswordFilterUI extends BaseNoPasswordFilterUI {
    getPasswordsElem() {
        return pp.passwordsUI.elem;
    }
    getSearchElem() {
        return pp.mainUI.elem1.searchElem;
    }
}
