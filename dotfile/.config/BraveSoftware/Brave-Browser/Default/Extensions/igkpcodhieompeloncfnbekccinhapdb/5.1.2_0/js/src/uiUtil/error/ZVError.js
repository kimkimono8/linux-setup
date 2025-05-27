export class ZVError {
    static error(e) {
        if (ZVUIError.isUIError(e)) {
            throw ZVUIError.getInstance(e);
        }
    }
    static getUIErrorMsg(e) {
        if (!ZVUIError.isUIError(e)) {
            return e + "";
        }
        const errorMsg = ZVUIError.getUIErrorMsg(e);
        if (errorMsg.startsWith("i18n:")) {
            return chrome.i18n.getMessage(errorMsg.slice("i18n:".length));
        }
        return errorMsg;
    }
}
class ZVUIError extends Error {
    static PREFIX = "ZV: ";
    constructor(message) {
        super(message);
    }
    static getErrorMsg(error) {
        error = error + "";
        return error.startsWith(this.PREFIX) ? error : this.PREFIX + error;
    }
    static getInstance(error) {
        if (error instanceof ZVUIError) {
            return error;
        }
        throw new ZVUIError(this.getErrorMsg(error));
    }
    static isUIError(e) {
        return e instanceof ZVUIError ||
            ((typeof e == "string") && e.startsWith(this.PREFIX));
    }
    [Symbol.toPrimitive]() {
        return this.message;
    }
    static getUIErrorMsg(error) {
        try {
            if (!this.isUIError(error)) {
                return error;
            }
            return (error + "").slice(this.PREFIX.length);
        }
        catch (e) {
            logError(e);
            return "" + error;
        }
    }
}
