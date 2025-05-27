import { SessionStorageKeys } from "../../service/storage/constants/SessionStorageKeys.js";
export class UnlockUtil {
    async setUnlockError(type, errorResp) {
        const nextTwoMinute = Date.now() + (2 * 60 * 1000);
        zsessionStorage.save(SessionStorageKeys.POPUP_UNLOCK_ERROR, { type, resp: errorResp, validUpto: nextTwoMinute });
    }
}
