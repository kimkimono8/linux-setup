import { FnCaller } from "./FnCaller.js";
import { SingleInstanceFnWrapper } from "./SingleInstanceFnWrapper.js";
import { SingleInstanceListener } from "./SingleInstanceListener.js";
import { SingleInstanceTimedListener } from "./SingleInstanceTimedListener.js";
export class JsFnWrapperImpl {
    createSingleInstance(fn, thisArg = null) {
        return new SingleInstanceFnWrapper(new FnCaller(fn, thisArg)).execute;
    }
    createSingleInstListener(fn, thisArg = null) {
        return new SingleInstanceListener(new FnCaller(fn, thisArg)).execute;
    }
    createInitFn(fn) {
        let called = false;
        return function () {
            if (called) {
                return;
            }
            called = true;
            return fn.apply(this, arguments);
        };
    }
    createSingleInstTimedListener(fn, thisArg = null, interCallDelaySec) {
        return new SingleInstanceTimedListener(new FnCaller(fn, thisArg), interCallDelaySec).execute;
    }
}
