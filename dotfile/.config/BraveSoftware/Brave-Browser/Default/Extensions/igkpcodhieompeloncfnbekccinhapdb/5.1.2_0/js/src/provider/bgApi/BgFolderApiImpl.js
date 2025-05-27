export class BgFolderApiImpl {
    context;
    prefix = "folder.";
    constructor(context) {
        this.context = context;
    }
    async queryTree(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.queryTree.name, args: [query] });
    }
    async query(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.query.name, args: [query] });
    }
    async queryEditable(query) {
        return this.context.apiClient.callApi({ path: this.prefix + this.queryEditable.name, args: [query] });
    }
    async get(folderId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [folderId] });
    }
}
