export class PasswordHistoryCli {
    static instance = null;
    constructor() { }
    static inst() {
        return this.instance || (this.instance = new PasswordHistoryCli());
    }
    secretId = "";
    init(secretId) {
        this.secretId = secretId;
    }
    async getHistory() {
        return bgApi.secret.history.getPasswordHistory(this.secretId);
    }
    async getColumnHistory(columnName) {
        return bgApi.secret.history.getColumnHistory(this.secretId, columnName);
    }
    async copyValue(value, columnName) {
        try {
            await bgApi.other.copyToClipboard(value);
            bgApi.audit.fieldCopied(this.secretId, columnName);
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
