import { SearchUtil } from "./SearchUtil.js";
import { VUtil } from "./VUtil.js";
class Context {
    searchUtil;
    vUtil;
    init() {
        this.searchUtil = new SearchUtil();
        this.vUtil = new VUtil();
    }
}
export const context = new Context();
