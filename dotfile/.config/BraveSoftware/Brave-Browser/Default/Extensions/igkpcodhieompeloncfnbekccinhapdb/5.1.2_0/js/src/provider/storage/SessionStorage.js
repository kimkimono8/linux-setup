export class SessionStorageImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new SessionStorageImpl();
    }
    async save(key, val) {
        return this.saveAll({ [key]: val });
    }
    async load(key, defaultVal = null) {
        const existing = await this.loadAll({ [key]: defaultVal });
        return existing[key];
    }
    async saveAll(keyValObj) {
        return bgApi.session.saveAll(keyValObj);
    }
    async loadAll(keyObj) {
        return bgApi.session.loadAll(keyObj);
    }
    async remove(keyOrKeys) {
        return bgApi.session.remove(keyOrKeys);
    }
    async clear() {
        return bgApi.session.clear();
    }
}
