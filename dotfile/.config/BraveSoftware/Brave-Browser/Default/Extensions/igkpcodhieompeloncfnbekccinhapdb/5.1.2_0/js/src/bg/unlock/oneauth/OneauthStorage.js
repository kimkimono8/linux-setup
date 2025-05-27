import { LocalStorageKeys } from "../../../service/storage/constants/LocalStorageKeys.js";
export class OneauthStroage {
    async save(device, localEncMasterKey, oneAuthEncLocalKey) {
        await zlocalStorage.save(LocalStorageKeys.ONEAUTH_UNLOCK, { device, localEncMasterKey, oneAuthEncLocalKey });
    }
    async load() {
        return await zlocalStorage.load(LocalStorageKeys.ONEAUTH_UNLOCK, "");
    }
    async clear() {
        return zlocalStorage.remove(LocalStorageKeys.ONEAUTH_UNLOCK);
    }
}
