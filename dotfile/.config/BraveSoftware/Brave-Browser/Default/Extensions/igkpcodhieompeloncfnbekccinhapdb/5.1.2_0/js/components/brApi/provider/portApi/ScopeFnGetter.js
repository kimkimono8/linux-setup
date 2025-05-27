export class ScopeFnGetter {
    fnObj;
    constructor(fnObj) {
        this.fnObj = fnObj;
    }
    getFn(fnPath) {
        try {
            let parentObj = null;
            let fn = this.fnObj;
            let iteratorResult = null;
            const iterator = fnPath.split(".")[Symbol.iterator]();
            while (fn) {
                iteratorResult = iterator.next();
                if (iteratorResult.done) {
                    break;
                }
                parentObj = fn;
                fn = fn[iteratorResult.value];
            }
            if (typeof fn != "function") {
                return null;
            }
            return { fn, parentObj };
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
