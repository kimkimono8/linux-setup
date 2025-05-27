import { gg } from "../../GG.js";
export class SingleInstanceTimedListener {
    fnCaller;
    interCallDelaySec;
    args = null;
    callId = 0;
    timeoutId = -1;
    callFn = null;
    constructor(fnCaller, interCallDelaySec) {
        this.fnCaller = fnCaller;
        this.interCallDelaySec = interCallDelaySec;
        gg.js.fn.bindThis(this, [this.execute]);
        this.callFn = this.executeFn;
    }
    execute(...args) {
        this.callId++;
        this.args = args;
        this.callFn();
    }
    async executeFn() {
        this.callFn = this.emptyFn;
        clearTimeout(this.timeoutId);
        const callId = this.callId;
        await this.fnCaller.callFunction(this.args);
        await gg.js.time.delay(this.interCallDelaySec);
        if (callId != this.callId) {
            this.timeoutId = setTimeout(() => this.callFn(), 0);
        }
        this.callFn = this.executeFn;
    }
    emptyFn() { }
}
