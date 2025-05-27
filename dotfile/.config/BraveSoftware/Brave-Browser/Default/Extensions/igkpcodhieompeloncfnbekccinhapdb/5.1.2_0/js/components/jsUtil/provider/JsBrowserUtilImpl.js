import { BrowserName } from "../service/constants/constants.js";
export class JsBrowserUtilImpl {
    getName() {
        try {
            const agent = navigator.userAgent;
            if (agent.includes("Opera") || agent.includes("OPR")) {
                return BrowserName.OPERA;
            }
            if (agent.includes("Edg")) {
                return BrowserName.EDGE;
            }
            if (agent.includes("Chrome")) {
                return BrowserName.CHROME;
            }
            if (agent.includes("Safari")) {
                return BrowserName.SAFARI;
            }
            if (agent.includes("Firefox")) {
                return BrowserName.FIREFOX;
            }
            return BrowserName.CHROME;
        }
        catch (e) {
            logError(e);
            return BrowserName.CHROME;
        }
    }
    isSafari() {
        return this.getName() == BrowserName.SAFARI;
    }
}
