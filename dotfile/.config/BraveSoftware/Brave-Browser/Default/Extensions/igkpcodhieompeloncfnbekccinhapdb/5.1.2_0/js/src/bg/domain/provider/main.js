import { domainHandler, initContext } from "./Context.js";
function main() {
    initContext();
    globalThis.domainHandler = domainHandler;
}
export { main as domainMain };
