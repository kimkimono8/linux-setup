export class FnCaller {
    fn;
    thisArg;
    constructor(fn, thisArg) {
        this.fn = fn;
        this.thisArg = thisArg;
    }
    callFunction(args) {
        return this.fn.apply(this.thisArg, args);
    }
}
