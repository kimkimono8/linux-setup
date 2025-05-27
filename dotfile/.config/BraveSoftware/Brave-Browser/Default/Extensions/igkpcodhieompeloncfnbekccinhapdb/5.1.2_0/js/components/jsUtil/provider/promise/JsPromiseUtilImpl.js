import { PromiseRRImpl } from "./PromiseRR.js";
import { TimedPromiseRRImpl } from "./TimedPromiseRR.js";
export class JsPromiseUtilImpl {
    constructor() { }
    createNew() {
        return new PromiseRRImpl();
    }
    createTimed(maxWaitSeconds) {
        return new TimedPromiseRRImpl(maxWaitSeconds);
    }
}
