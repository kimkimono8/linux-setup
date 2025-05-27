import { bg } from "../bg.js";
import { vapi } from "../Context.js";
export class BgTrashApiImpl {
    async queryTrash(query) {
        return bg.vaultTrash.queryTrash(query);
    }
    async deletePermanent(secretId) {
        await vapi.secret.delete(secretId);
    }
    async restoreSecret(secretId) {
        return bg.vaultSecrets.restoreSecret(secretId);
    }
    async emptyTrash() {
        await vapi.emptyTrash();
    }
}
