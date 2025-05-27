import { ZIconImpl } from "./ZIcon.js";
import { ZIconExternal } from "./ZIconExternal.js";
import { ZIconUtil } from "./ZIconUtil.js";
export let zicon = null;
export let external = null;
export let util = null;
export function initContext() {
    util = new ZIconUtil();
    zicon = new ZIconImpl();
    external = new ZIconExternal();
}
