export class BgPolicyApiImpl {
    context;
    prefix = "policy.";
    constructor(context) {
        this.context = context;
    }
    checkPolicyPassword(password, policyId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkPolicyPassword.name, args: [password, policyId] });
    }
    check(password) {
        return this.context.apiClient.callApi({ path: this.prefix + this.check.name, args: [password] });
    }
    getAll() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
    }
    get(policyId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.get.name, args: [policyId] });
    }
}
