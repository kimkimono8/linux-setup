import { ErrorCode } from "../service/constants/ErrorCode.js";
export class JsTSUtilImpl {
    getEnum(key, all) {
        if (key in all) {
            return all[key];
        }
        throw ErrorCode.INVALID_ENUM_KEY;
    }
}
