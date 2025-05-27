import { VaultCrypto } from "../../crypto/VaultCrypto.js";
import { UnlockAlgorithm } from "./UnlockAlgorithm.js";
export class PBKDF2Algorithm extends UnlockAlgorithm {
    constructor(gg) { super(gg); }
    async unlock(passphrase) {
        try {
            const { salt, iterations, encryptedDate } = this.gg.unlock.passphrase.data;
            const key = await VaultCrypto.pbkdf2(passphrase, salt, iterations);
            try {
                JSON.parse(await VaultCrypto.aesDecrypt(encryptedDate, key));
            }
            catch (e) {
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
