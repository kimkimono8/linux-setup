import { BgUtilImpl } from "./BgUtil.js";
function main() {
    globalThis.bgUtil = new BgUtilImpl();
}
export { main as bgUtilMain };
