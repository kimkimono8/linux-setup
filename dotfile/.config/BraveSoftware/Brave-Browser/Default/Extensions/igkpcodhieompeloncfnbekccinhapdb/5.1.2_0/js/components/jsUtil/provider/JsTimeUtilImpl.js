import { gg } from "./GG.js";
export class JsTimeUtilImpl {
    async delay(seconds = 0) {
        return new Promise(res => setTimeout(res, seconds * 1000));
    }
    getSecondsPassed(fromTime) {
        return ((Date.now() - fromTime) / 1000) >> 0;
    }
    async waitForever() {
        return new Promise(gg.js.fn.emptyFn);
    }
}
