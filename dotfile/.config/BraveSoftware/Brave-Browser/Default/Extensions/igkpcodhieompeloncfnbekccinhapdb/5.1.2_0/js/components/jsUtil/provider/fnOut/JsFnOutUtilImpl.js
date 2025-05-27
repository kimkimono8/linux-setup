import { FnOutImpl } from "./FnOut.js";
export class JsFnOutImpl {
    constructor() { }
    OK = new FnOutImpl(true, null);
    NONE = new FnOutImpl(false, null);
    result(result) {
        return new FnOutImpl(true, result);
    }
    error(errorMsg) {
        return new FnOutImpl(false, errorMsg + "");
    }
    parse(obj) {
        return new FnOutImpl(obj.ok, obj.out);
    }
    getResult(obj) {
        return obj.out;
    }
}
