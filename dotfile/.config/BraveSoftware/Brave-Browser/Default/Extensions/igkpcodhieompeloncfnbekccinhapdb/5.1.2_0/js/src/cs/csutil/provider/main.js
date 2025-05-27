import { csutil, initContext } from "./Context.js";
function main() {
    initContext();
    globalThis.csutil = csutil;
}
export { main as csUtilMain };
