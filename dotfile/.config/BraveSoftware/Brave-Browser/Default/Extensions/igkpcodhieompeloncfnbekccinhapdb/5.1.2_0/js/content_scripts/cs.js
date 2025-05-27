import { setGlobal } from "../common/global/global.js";
class CS {
    fieldFillder = null;
    card = null;
    form = null;
    login = null;
    totpLogin = null;
    passwordReset = null;
    savePasswordHandler = null;
    sitePasswordChangeObserver = null;
    loginPasswordChangeHandler = null;
    other = null;
    downloadUtil = null;
}
export const cs = new CS();
setGlobal("cs", cs);
