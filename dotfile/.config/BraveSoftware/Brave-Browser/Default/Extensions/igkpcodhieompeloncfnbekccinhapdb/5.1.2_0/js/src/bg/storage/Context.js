import { Storage } from "./Storage.js";
class Context {
    storage = null;
    init() {
        this.storage = new Storage();
    }
}
export const context = new Context();
