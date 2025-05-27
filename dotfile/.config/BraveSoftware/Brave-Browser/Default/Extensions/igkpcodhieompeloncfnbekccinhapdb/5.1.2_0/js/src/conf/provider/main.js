import { ConfigImpl } from "./Config.js";
function main() {
    globalThis.config = new ConfigImpl();
}
export { main as confMain };
