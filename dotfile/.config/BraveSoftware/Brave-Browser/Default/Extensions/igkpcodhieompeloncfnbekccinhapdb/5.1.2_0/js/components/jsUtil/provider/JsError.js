export function jserror(e, log = true) {
    if (e instanceof JSError) {
        return e;
    }
    const error = new JSError(e);
    if (log) {
        console.error(error);
    }
    return error;
}
class JSError extends Error {
    [Symbol.toPrimitive]() {
        return "" + this.message;
    }
}
