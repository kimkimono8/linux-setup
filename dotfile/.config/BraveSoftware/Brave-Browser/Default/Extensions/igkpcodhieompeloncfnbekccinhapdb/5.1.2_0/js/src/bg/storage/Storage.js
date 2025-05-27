import { SessionMemory } from "./SessionStorage.js";
import { TabStorage } from "./TabStorage.js";
import { TAB_STORAGE_PREFIX } from "./types.js";
export class Storage {
    tab = new TabStorage(TAB_STORAGE_PREFIX.TAB);
    init() {
        try {
            globalThis.zsessionStorage = SessionMemory.getInstance();
            this.tab.init();
        }
        catch (e) {
            logError(e);
        }
    }
    createTabStorage(prefix) {
        return new TabStorage(prefix);
    }
}
