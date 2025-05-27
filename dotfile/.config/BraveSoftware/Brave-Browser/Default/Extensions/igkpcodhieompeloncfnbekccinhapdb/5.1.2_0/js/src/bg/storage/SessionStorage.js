export class SessionMemory {
    static getInstance() {
        const isV2 = brApi.isV2();
        if (isV2) {
            return new SessionMemoryV2();
        }
        return new SessionMemoryImpl();
    }
    async load(key, defaultVal = null) {
        const existing = await this.loadAll({ [key]: defaultVal });
        return existing[key];
    }
    async save(key, val) {
        return this.saveAll({ [key]: val });
    }
}
class SessionMemoryImpl extends SessionMemory {
    async saveAll(keyValObj) {
        return brApi.storage.session.saveAll(keyValObj);
    }
    async loadAll(keyObj) {
        return brApi.storage.session.loadAll(keyObj);
    }
    async remove(keyOrKeys) {
        return brApi.storage.session.remove(keyOrKeys);
    }
    async clear() {
        try {
            const keys = Object.keys(await brApi.storage.session.loadAll(null));
            const nonDevCheckKeys = keys.filter(x => !x.includes("OPENED_DEV_TOOLS"));
            await this.remove(nonDevCheckKeys);
        }
        catch (e) {
            logError(e);
        }
    }
}
class SessionMemoryV2 extends SessionMemory {
    memory = new Map();
    async saveAll(keyValObj) {
        for (let key in keyValObj) {
            this.memory.set(key, keyValObj[key]);
        }
    }
    async loadAll(keyObj) {
        const reqObj = {};
        for (let key in keyObj) {
            reqObj[key] = this.memory.has(key) ? this.memory.get(key) : keyObj[key];
        }
        return reqObj;
    }
    async remove(keyOrKeys) {
        const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
        for (let curKey of keys) {
            this.memory.delete(curKey);
        }
    }
    async clear() {
        try {
            const keys = Array.from(this.memory.keys());
            const nonDevCheckKeys = keys.filter(x => !x.includes("OPENED_DEV_TOOLS"));
            await this.remove(nonDevCheckKeys);
        }
        catch (e) {
            logError(e);
        }
    }
}
