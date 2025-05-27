import { accountDb } from "../Context.js";
export class BgPolicyApiImpl {
    async getAll() {
        return accountDb.policyTable.loadAll();
    }
    async get(policy_id) {
        return accountDb.policyTable.load(policy_id);
    }
    async check(password) {
        return bg.vaultPolicies.checkPolicyFor(password);
    }
    async checkPolicyPassword(password, policyId) {
        return bg.vaultPolicies.checkPasswordPolicy(password, policyId);
    }
}
