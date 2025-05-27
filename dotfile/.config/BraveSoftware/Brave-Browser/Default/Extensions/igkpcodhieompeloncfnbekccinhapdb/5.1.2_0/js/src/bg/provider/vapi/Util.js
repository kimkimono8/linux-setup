import { BrowserName } from "../../../../components/jsUtil/service/constants/constants.js";
import { ErrorCode } from "../../../../components/jsUtil/service/constants/ErrorCode.js";
export class Util {
    getBrowserName() {
        try {
            const name = js.browser.getName();
            switch (name) {
                case BrowserName.CHROME:
                    return "chrome";
                case BrowserName.EDGE:
                    return "edge";
                case BrowserName.FIREFOX:
                    return "firefox";
                case BrowserName.SAFARI:
                    return "safari";
                case BrowserName.OPERA:
                    return "opera";
                default:
                    throw ErrorCode.UNHANDLED_CASE;
            }
        }
        catch (e) {
            logError(e);
            return "chrome";
        }
    }
    getStringParams(input) {
        try {
            if (!input.params) {
                return "";
            }
            if (typeof input.params == "string") {
                return input.params;
            }
            if (input instanceof URLSearchParams) {
                return input.toString();
            }
            const urlSearchParam = new URLSearchParams();
            for (let key in input.params) {
                urlSearchParam.set(key, input.params[key]);
            }
            return urlSearchParam.toString();
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    printRespType(resp) {
        const type = this.getRespType(resp);
        let type_string = JSON.stringify(type);
        type_string = type_string.replace(/,"/g, ';"');
        type_string = type_string.replace(/([^:"]*?):/g, "$1: ");
        type_string = type_string.replace(/"(string|number|boolean)"/g, "$1");
        type_string = type_string.replace(/"/g, "");
        console.info("\n", type_string);
    }
    getRespType(resp) {
        const types = {};
        let type;
        let cur;
        if (typeof resp != "object") {
            return typeof resp;
        }
        for (let key in resp) {
            cur = resp[key];
            type = typeof cur;
            if (type != "object") {
            }
            else if (Array.isArray(cur)) {
                type = [this.getRespType(cur[0])];
            }
            else {
                type = this.getRespType(cur);
            }
            types[key] = type;
        }
        return types;
    }
}
