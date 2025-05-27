import { bg } from "../../bg.js";
import { vapi } from "../../Context.js";
import { UnlockAlgorithm } from "./UnlockAlgorithm.js";
export class SHAAlgorithm extends UnlockAlgorithm {
    constructor(gg) { super(gg); }
    async unlock(passphrase) {
        try {
            const { salt } = this.gg.unlock.passphrase.data;
            const key = bg.zcrypt.hash(passphrase);
            const authPass = bg.zcrypt.hash(key + salt);
            const valid = (await vapi.login.isValidAuthPass(authPass)).result.operation.details.IS_VALID_AUTHPASS;
            if (!valid) {
                return fnOut.error("INVALID_KEY");
            }
            return fnOut.result(key);
        }
        catch (e) {
            logError(e);
            return fnOut.error(e);
        }
    }
}
