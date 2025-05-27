export class BgTrashApiImpl {
    context;
    prefix = "trash.";
    constructor(context) {
        this.context = context;
    }
    async queryTrash(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.queryTrash.name, args: [query] });
    }
    async deletePermanent(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.deletePermanent.name, args: [secretId] });
    }
    async restoreSecret(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.restoreSecret.name, args: [secretId] });
    }
    async emptyTrash() {
        return this.context.apiClient.callApi({ path: this.prefix + this.emptyTrash.name });
    }
}
