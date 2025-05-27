export class LocalStorageImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new LocalStorageImpl();
    }
    async save(key, val) {
        return this.saveAll({ [key]: val });
    }
    async saveAll(keyValObj) {
        return brApi.storage.local.saveAll(keyValObj);
    }
    async load(key, defaultVal = "") {
        const existing = await brApi.storage.local.loadAll({ [key]: defaultVal });
        return existing[key];
    }
    async loadAll(keyObj) {
        return brApi.storage.local.loadAll(keyObj);
    }
    async remove(keyOrKeys) {
        return brApi.storage.local.remove(keyOrKeys);
    }
    async clear() {
        return brApi.storage.local.clear();
    }
}
