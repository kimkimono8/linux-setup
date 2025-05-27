import { vapi } from "../../../src/bg/Context.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VaultApi } from "../../server_api/VaultApi.js";
export class BgSecretUtil {
    async suggestNewName(params) {
        try {
            const domain = params.url ? js.url.getParentDomain(params.url) : params.domain;
            if (!domain) {
                return "";
            }
            const resp = await VaultApi.post("/api/rest/json/v1/ext/suggestnewname", "domain=" + domain);
            if (!vapi.isRespOk(resp)) {
                return "";
            }
            return resp.operation.Details.name;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async checkExistingPasswordName(name) {
        try {
            const sameNameAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_SAME_NAME, false);
            if (sameNameAllowed) {
                return false;
            }
            const resp = (await vapi.getExistingSecretNames(name)).result;
            const passwordNames = resp.operation.Details;
            const exists = passwordNames.includes(name);
            return exists;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
