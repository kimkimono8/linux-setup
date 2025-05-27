import { ErrorCode } from "../service/constants/ErrorCode.js";
export class JsTestImpl {
    initTest() {
        try {
            globalThis.assert = this.assert;
            globalThis.assertError = this.assertError;
            globalThis.logError = console.info;
        }
        catch (e) {
            logError(e);
        }
    }
    assert(condition, ...errorArgs) {
        if (condition) {
            return;
        }
        if (errorArgs.length == 0) {
            errorArgs.push("");
        }
        console.error.apply(console.error, errorArgs);
    }
    assertError(errorCode, code) {
        try {
            code();
        }
        catch (e) {
            if (e == errorCode) {
                return;
            }
            throw ErrorCode.ASSERT_ERROR + `: expected ${errorCode} got ${e}`;
        }
        throw ErrorCode.ASSERT_ERROR + ` expected ${errorCode} got no error`;
    }
    callTests(objList) {
        for (let obj of objList) {
            this.callTestsFn(obj);
        }
    }
    callTestsFn(obj) {
        for (let key of Object.getOwnPropertyNames(obj.__proto__)) {
            if (!key.startsWith("test")) {
                continue;
            }
            try {
                obj[key]();
            }
            catch (e) {
                console.error(e);
            }
        }
        info("DONE: ", obj?.constructor?.name);
    }
    logError(...errorArgs) {
        console.error.apply(console.error, errorArgs);
        console.trace();
    }
}
