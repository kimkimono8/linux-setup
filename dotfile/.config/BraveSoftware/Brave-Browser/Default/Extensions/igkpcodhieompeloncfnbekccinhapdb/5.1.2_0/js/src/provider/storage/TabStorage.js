export class TabStorageImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new TabStorageImpl();
    }
    async load(key, defaultVal = null) {
        return bgApi.tab.loadFromMemory(key, defaultVal);
    }
    async save(key, val) {
        return bgApi.tab.saveToMemory(key, val);
    }
    async remove(key) {
        return bgApi.tab.removeFromMemory(key);
    }
    async clear() {
        return bgApi.tab.clearMemory();
    }
}
