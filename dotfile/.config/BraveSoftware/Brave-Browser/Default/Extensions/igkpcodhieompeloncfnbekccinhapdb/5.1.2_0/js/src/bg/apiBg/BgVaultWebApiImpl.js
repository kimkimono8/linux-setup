import { bg } from "../bg.js";
import { vaultWeb, webUnlock } from "../web/export.js";
import { ApiServerUtil } from "./BgApiServerUtil.js";
export class BgVaultWebApiImpl {
    async syncSecret(secretId) {
        return bg.vaultSecrets.secretGetter.getSecretFromWeb(secretId);
    }
    async deleteLocalSecrets(secretIds) {
        return bg.vaultSecrets.removeLocalSecrets(secretIds);
    }
    async getWebUnlockKey(port) {
        return webUnlock.getUnlockKey(ApiServerUtil.getTabId(port));
    }
    async getAfterUnlockRoute() {
        return vaultWeb.getAfterUnlockRoute();
    }
}
