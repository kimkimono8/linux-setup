import { JsFnWrapperImpl } from "./wrapper/JsFnWrapperImpl.js";
export class JsFunctionUtilImpl {
    emptyFn = () => { };
    wrapper = new JsFnWrapperImpl();
    bindThis(obj, fns) {
        try {
            for (let fn of fns) {
                obj[fn.name] = fn.bind(obj);
                if (fn.name.startsWith("bound")) {
                    throw ["bound called multiple times", obj, fns];
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getArgHash(calledArguments) {
        return Array.from(calledArguments).map(x => this.getString(x)).join(";");
    }
    getString(x) {
        if (typeof x != "object") {
            return "" + x;
        }
        if (!x) {
            return x + "";
        }
        return Object.keys(x).map(key => `${key}:${"" + x[key]}`).join(";");
    }
}
