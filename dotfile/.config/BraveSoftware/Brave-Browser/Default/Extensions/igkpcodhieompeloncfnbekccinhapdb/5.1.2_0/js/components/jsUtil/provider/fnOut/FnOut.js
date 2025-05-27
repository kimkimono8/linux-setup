export class FnOutImpl {
    ok;
    out;
    constructor(ok, out) {
        this.ok = ok;
        this.out = out;
    }
    get result() {
        if (!this.ok) {
            throw this.out;
        }
        return this.out;
    }
    get error() {
        return this.out;
    }
    [Symbol.toPrimitive]() {
        return "" + this.out;
    }
}
