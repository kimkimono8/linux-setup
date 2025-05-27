import { ConfigKeys } from "../../../conf/service/constants.js";
import { Browser } from "../../../service/vt/constants/Browser.js";
import { Exp_TabCreator } from "./TabCreator.js";
export class BgUtilImpl {
    newTabCreator = Exp_TabCreator.newInstance;
    async getClients() {
        try {
            return await globalThis["clients"].matchAll();
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    isSafari() {
        try {
            const browser = config.get(ConfigKeys.BROWSER);
            return browser == Browser.SAFARI;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
