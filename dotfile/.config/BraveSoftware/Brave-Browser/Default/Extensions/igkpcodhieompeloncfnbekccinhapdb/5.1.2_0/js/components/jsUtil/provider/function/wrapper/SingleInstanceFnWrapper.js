import { gg } from "../../GG.js";
export class SingleInstanceFnWrapper {
    fnCaller;
    constructor(fnCaller) {
        this.fnCaller = fnCaller;
        gg.js.fn.bindThis(this, [this.execute]);
    }
    inProgressMap = new Map();
    async execute() {
        const argHash = gg.js.fn.getArgHash(arguments);
        if (this.inProgressMap.has(argHash)) {
            return this.inProgressMap.get(argHash);
        }
        const promise = gg.js.promise.createNew();
        this.inProgressMap.set(argHash, promise);
        try {
            const resp = await this.fnCaller.callFunction(arguments);
            promise.resolve(resp);
        }
        catch (e) {
            promise.reject(e);
        }
        this.inProgressMap.delete(argHash);
        return promise;
    }
}
