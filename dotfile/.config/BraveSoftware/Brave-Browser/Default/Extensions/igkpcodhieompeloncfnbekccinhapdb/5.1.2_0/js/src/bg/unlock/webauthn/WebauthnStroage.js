import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
export class WebAuthnStorage {
    async save(localEncMasterKey, serverEncLocalKey) {
        await zlocalStorage.save(LocalStorageKeys.WEBAUTHN_UNLOCK, { localEncMasterKey, serverEncLocalKey });
    }
    async load() {
        return await zlocalStorage.load(LocalStorageKeys.WEBAUTHN_UNLOCK, "");
    }
    async clear() {
        return zlocalStorage.remove(LocalStorageKeys.WEBAUTHN_UNLOCK);
    }
}
