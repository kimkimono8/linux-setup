import { gg } from "../../GG.js";
export class SingleInstanceListener {
    fnCaller;
    inProgress = false;
    callId = 0;
    lastArgs = [];
    constructor(fnCaller) {
        this.fnCaller = fnCaller;
        gg.js.fn.bindThis(this, [this.execute]);
    }
    async execute() {
        const callId = ++this.callId;
        if (this.inProgress) {
            this.lastArgs = Array.from(arguments);
            return;
        }
        this.inProgress = true;
        try {
            await this.fnCaller.callFunction(arguments);
        }
        finally {
            this.inProgress = false;
            if (this.callId != callId) {
                setTimeout(this.execute.bind(this, ...this.lastArgs), 0);
            }
        }
    }
}
