import { PromiseRRImpl } from "./PromiseRR.js";
export class TimedPromiseRRImpl extends PromiseRRImpl {
    constructor(maxWaitSeconds) {
        super();
        this.setupAutoReject(maxWaitSeconds);
    }
    setupAutoReject(maxWaitSeconds) {
        const timeout = setTimeout(() => this.reject("Z_TIMEOUT"), maxWaitSeconds * 1000);
        const clearTimeoutFn = () => clearTimeout(timeout);
        this.then(clearTimeoutFn, clearTimeoutFn);
    }
}
