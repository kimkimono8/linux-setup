import { BasePasswordFilterUI } from "../../../common/ui/passwords_ui/filter/BasePasswordFilterUI.js";
import { FilterUpdater } from "./FilterUpdater.js";
import { NoPasswordFilterUI } from "./NoPasswordFilterUI.js";
import { PasswordFilterUIData } from "./PasswordFilterUIData.js";
export class PasswordFilterUI extends BasePasswordFilterUI {
    data = new PasswordFilterUIData(this);
    updater = new FilterUpdater();
    noPasswordsUI = new NoPasswordFilterUI(this);
}
