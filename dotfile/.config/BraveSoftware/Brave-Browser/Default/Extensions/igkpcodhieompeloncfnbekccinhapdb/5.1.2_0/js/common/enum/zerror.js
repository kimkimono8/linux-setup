import { setGlobal } from "../global/global.js";
class ZErrors {
    OFFLINE = "Z_OFFLINE";
    NOT_FOUND = "Z_NOT_FOUND";
    NOT_SUPPORTED = "Z_NOT_SUPPORTED";
    TIMED_OUT = "Z_TIMED_OUT";
    INVALID_PASSPHRASE_SYNC = "INVALID_PASSPHRASE_SYNC";
}
export const zerror = new ZErrors();
setGlobal("zerror", zerror);
