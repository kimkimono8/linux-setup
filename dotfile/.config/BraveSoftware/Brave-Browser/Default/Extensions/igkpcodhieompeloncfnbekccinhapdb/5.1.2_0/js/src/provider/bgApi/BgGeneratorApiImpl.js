export class BgGeneratorApiImpl {
    context;
    prefix = "generator.";
    history;
    constructor(context) {
        this.context = context;
        this.history = new BgGeneratorHistoryApiImpl(context);
    }
    async generatePassword(input) {
        return this.context.apiClient.callApi({ path: this.prefix + this.generatePassword.name, args: [input] });
    }
    async getComplexity(password) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getComplexity.name, args: [password] });
    }
    async generatePolicyPassword(policyId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.generatePolicyPassword.name, args: [policyId] });
    }
    async generatePassphrase(input) {
        return this.context.apiClient.callApi({ path: this.prefix + this.generatePassphrase.name, args: [input] });
    }
}
class BgGeneratorHistoryApiImpl {
    context;
    prefix = "generator.history.";
    constructor(context) {
        this.context = context;
    }
    async get() {
        return this.context.apiClient.callApi({ path: this.prefix + this.get.name });
    }
    async clear() {
        return this.context.apiClient.callApi({ path: this.prefix + this.clear.name });
    }
    async add(password) {
        return this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [password] });
    }
}
