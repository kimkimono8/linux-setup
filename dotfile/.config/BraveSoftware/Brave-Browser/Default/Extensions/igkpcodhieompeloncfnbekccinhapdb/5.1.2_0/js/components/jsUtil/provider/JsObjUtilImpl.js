export class JsObjUtilImpl {
    DISABLED_FN_SUFFIX = "_disabled__";
    isEmpty(obj) {
        for (let _key in obj) {
            return false;
        }
        return true;
    }
    disableMethod(obj, fnName) {
        obj[fnName + this.DISABLED_FN_SUFFIX] = obj[fnName];
        function empty_fn() { }
        Object.defineProperty(empty_fn, "name", { value: fnName });
        obj[fnName] = empty_fn;
    }
    enableMethod(obj, fnName) {
        obj[fnName] = obj[fnName + this.DISABLED_FN_SUFFIX];
    }
    getFirstProperty(obj) {
        try {
            for (let key in obj) {
                return obj[key];
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    isNonEmpty(obj) {
        return !this.isEmpty(obj);
    }
}
