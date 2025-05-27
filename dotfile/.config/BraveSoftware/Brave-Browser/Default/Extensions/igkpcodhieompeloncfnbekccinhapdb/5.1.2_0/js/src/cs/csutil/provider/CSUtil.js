import { CSDomUtilImpl } from "./CSDomUtil.js";
import { CSInputUtilImpl } from "./CSInputUtil.js";
import { LoginUtilImpl } from "./CSLoginUtil.js";
import { CSPageUtilImpl } from "./CSPageUtil.js";
import { CSWindowUtilImpl } from "./CSWindowUtil.js";
import { CSSelectorUtilImpl } from "./selector/CSSelectorUtil.js";
import { CSUniqSelectorUtilImpl } from "./uniqSelector/CSUniqSelectorUtil.js";
import { VisibilityChecker } from "./VisibilityChecker.js";
export class CSUtilImpl {
    visibilityChecker = new VisibilityChecker();
    window = new CSWindowUtilImpl();
    uniqSelector = new CSUniqSelectorUtilImpl();
    login = new LoginUtilImpl();
    input = new CSInputUtilImpl();
    dom = new CSDomUtilImpl();
    page = new CSPageUtilImpl();
    selector = new CSSelectorUtilImpl();
    async init() {
        try {
            this.window.init();
            await this.selector.init();
            await this.input.init();
        }
        catch (e) {
            logError(e);
        }
    }
    isVisible(elem, checkZIndex = true) {
        return this.visibilityChecker.isVisible(elem, checkZIndex);
    }
}
