import { vutil } from "../../vutil/export.js";
export class TabDomainStorageImpl {
    static instance = null;
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new TabDomainStorageImpl();
    }
    async load(key, defaultVal = null) {
        return bgApi.tab.loadFromDomainMemory(key, defaultVal);
    }
    async save(key, val) {
        const allowedDomains = await vutil.getValidSaveDomains();
        return bgApi.tab.saveToDomainMemory(key, val, allowedDomains);
    }
    async saveDomain(key, val, allowedDomains) {
        return bgApi.tab.saveToDomainMemory(key, val, allowedDomains);
    }
    async remove(key) {
        return bgApi.tab.removeFromMemory(key);
    }
}
