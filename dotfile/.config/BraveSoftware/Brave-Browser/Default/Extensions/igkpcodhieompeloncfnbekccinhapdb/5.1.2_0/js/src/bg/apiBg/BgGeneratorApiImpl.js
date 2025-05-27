import { bg } from "../bg.js";
import { generator } from "../Context.js";
export class BgGeneratorApiImpl {
    history = new BgGeneratorHistoryApiImpl();
    async generatePassword(input) {
        return generator.password.generate(input);
    }
    async getComplexity(password) {
        return generator.password.getComplexity(password);
    }
    async generatePolicyPassword(policyId) {
        return bg.vaultPolicies.generatePassword(policyId);
    }
    async generatePassphrase(input) {
        return generator.passphrase.generate(input);
    }
}
class BgGeneratorHistoryApiImpl {
    async get() {
        return generator.history.get();
    }
    async clear() {
        return generator.history.clean();
    }
    async add(password) {
        return generator.history.add(password);
    }
}
