import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
export class PassphraseUnlockData {
    loginType;
    salt;
    iterations;
    encryptedDate;
    async init() {
        const KEYS = LocalStorageKeys;
        const stored = await zlocalStorage.loadAll({
            [KEYS.LOGIN_TYPE]: "NONE",
            [KEYS.SALT]: "",
            [KEYS.ITERATIONS]: 0,
            [KEYS.ENCRYPTED_DATE]: "",
        });
        this.loginType = stored[KEYS.LOGIN_TYPE];
        this.salt = stored[KEYS.SALT];
        this.iterations = stored[KEYS.ITERATIONS];
        this.encryptedDate = stored[KEYS.ENCRYPTED_DATE];
    }
}
