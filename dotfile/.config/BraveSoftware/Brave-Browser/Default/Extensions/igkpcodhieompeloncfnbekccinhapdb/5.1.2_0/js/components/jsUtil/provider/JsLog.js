import { gg } from "./GG.js";
export class JsLogUtilImpl {
    infoPrefix = "";
    start = Date.now();
    init() {
        gg.js.fn.bindThis(this, [this.infoFn]);
    }
    info = (..._args) => { };
    setInfoPrefix(prefix) {
        try {
            this.infoPrefix = prefix;
        }
        catch (e) {
            logError(e);
        }
    }
    enableLogging(enable) {
        try {
            if (enable) {
                globalThis.info = this.info = this.infoFn;
                return;
            }
            globalThis.info = this.info = gg.js.fn.emptyFn;
        }
        catch (e) {
            logError(e);
        }
    }
    mask(input, options) {
        try {
            if (typeof input == "string") {
                return this.maskFn(input);
            }
            if (typeof input != "object") {
                return input;
            }
            if (Array.isArray(input)) {
                return input.map(x => this.mask(x));
            }
            if (options?.keys) {
                return this.maskObjKeys(input, options.keys);
            }
            return this.maskObj(input);
        }
        catch (e) {
            logError(e);
            return input;
        }
    }
    maskObj(obj) {
        try {
            const maskObj = {};
            for (let key in obj) {
                maskObj[key] = this.mask(obj[key]);
            }
            return maskObj;
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
    maskObjKeys(obj, keys) {
        try {
            const maskObj = Object.assign({}, obj);
            for (let key of keys) {
                if (!(key in obj)) {
                    continue;
                }
                maskObj[key] = this.mask(obj[key]);
            }
            return maskObj;
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
    maskFn(x) {
        try {
            return `xxxxx(${x.length})`;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    infoFn(...args) {
        if (!globalThis["isDevMode"]) {
            return;
        }
        const currentSecond = ((Date.now() - this.start) / 1000) >> 0;
        console.debug(currentSecond, this.infoPrefix, ...args);
    }
}
