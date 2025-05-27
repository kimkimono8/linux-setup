import { i18n } from "./i18n.js";
import { VtImpl } from "./Vt.js";
function main() {
    globalThis.i18n = i18n;
    globalThis.vt = VtImpl.getInstance();
}
export { main as vtMain };
