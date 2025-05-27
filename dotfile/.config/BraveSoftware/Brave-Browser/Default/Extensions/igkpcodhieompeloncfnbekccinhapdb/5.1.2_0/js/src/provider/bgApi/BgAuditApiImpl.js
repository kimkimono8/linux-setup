export class BgAuditApiImpl {
    context;
    prefix = "audit.";
    constructor(context) {
        this.context = context;
    }
    async secretAccessed(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.secretAccessed.name, args: [secretId] });
    }
    async fieldViewed(secretId, fieldName) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fieldViewed.name, args: [secretId, fieldName] });
    }
    async columnViewed(secretId, columnId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.columnViewed.name, args: [secretId, columnId] });
    }
    async totpKeyViewed(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.totpKeyViewed.name, args: [secretId] });
    }
    async fieldCopied(secretId, fieldName) {
        return this.context.apiClient.callApi({ path: this.prefix + this.fieldCopied.name, args: [secretId, fieldName] });
    }
    async customColumnCopied(secretId, columnId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.customColumnCopied.name, args: [secretId, columnId] });
    }
    async notesCopied(secretId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.notesCopied.name, args: [secretId] });
    }
}
