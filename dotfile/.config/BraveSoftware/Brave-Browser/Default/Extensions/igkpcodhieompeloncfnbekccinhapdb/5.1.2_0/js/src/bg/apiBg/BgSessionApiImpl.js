export class BgSessionApiImpl {
    async saveAll(keyValObj) {
        return zsessionStorage.saveAll(keyValObj);
    }
    async loadAll(keyObj) {
        return zsessionStorage.loadAll(keyObj);
    }
    async remove(keyOrKeys) {
        return zsessionStorage.remove(keyOrKeys);
    }
    async clear() {
        return zsessionStorage.clear();
    }
}
