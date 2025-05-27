import { bgApiMain } from "../bgApi/main.js";
import { vtMain } from "../vt/main.js";
import { initContext, uiUtil } from "./Context.js";
async function main() {
    vtMain();
    bgApiMain();
    initContext();
    globalThis.UIUtil = uiUtil;
    globalThis.VUI = uiUtil;
}
export { main as vuiMain };
