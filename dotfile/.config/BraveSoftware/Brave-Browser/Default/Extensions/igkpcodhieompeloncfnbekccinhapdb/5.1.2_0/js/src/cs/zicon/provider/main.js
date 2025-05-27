import { initContext, zicon } from "./Context.js";
function main() {
    initContext();
    globalThis.zicon = zicon;
}
export { main as ziconMain };
