import { CSApiImpl } from "./CSApiImpl.js";
function main() {
    globalThis.csApi = new CSApiImpl();
}
export { main as csApiMain };
