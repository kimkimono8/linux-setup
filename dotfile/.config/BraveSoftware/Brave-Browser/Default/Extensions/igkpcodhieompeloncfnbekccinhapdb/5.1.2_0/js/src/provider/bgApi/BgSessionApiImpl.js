export class BgSessionApiImpl {
    context;
    prefix = "session.";
    constructor(context) {
        this.context = context;
    }
    async saveAll(keyValObj) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveAll.name, args: [keyValObj] });
    }
    async loadAll(keyObj) {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadAll.name, args: [keyObj] });
    }
    async remove(keyOrKeys) {
        return this.context.apiClient.callApi({ path: this.prefix + this.remove.name, args: [keyOrKeys] });
    }
    async clear() {
        return this.context.apiClient.callApi({ path: this.prefix + this.clear.name });
    }
}
