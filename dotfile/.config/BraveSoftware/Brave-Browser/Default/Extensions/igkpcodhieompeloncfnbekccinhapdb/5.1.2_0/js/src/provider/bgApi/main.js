import { BgApiImpl } from "./BgApiImpl.js";
function main() {
    globalThis.bgApi = BgApiImpl.getInstance();
}
export { main as bgApiMain };
