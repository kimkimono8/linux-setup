import { JEventListenersImpl } from "../JEventListeners.js";
var State;
(function (State) {
    State["PENDING"] = "PENDING";
    State["RESOLVED"] = "RESOLVED";
    State["REJECTED"] = "REJECTED";
})(State || (State = {}));
export class PromiseRRImpl {
    state = State.PENDING;
    val = null;
    listeners;
    constructor() {
        this.listeners = new JEventListenersImpl();
    }
    resolve(val = null) {
        this.changeState(State.RESOLVED, val);
    }
    reject(err = null) {
        this.changeState(State.REJECTED, err);
    }
    changeState(state, val) {
        if (this.state != State.PENDING) {
            return;
        }
        this.val = val;
        this.state = state;
        this.listeners.dispatch(state, [val]);
        this.listeners = null;
    }
    then(resolvedCallback, rejectedCallback) {
        switch (this.state) {
            case State.RESOLVED:
                resolvedCallback(this.val);
                return this;
            case State.REJECTED:
                if (!rejectedCallback) {
                    return this;
                }
                rejectedCallback(this.val);
                return this;
        }
        if (resolvedCallback) {
            this.listeners.add(State.RESOLVED, resolvedCallback);
        }
        if (rejectedCallback) {
            this.listeners.add(State.REJECTED, rejectedCallback);
        }
        return this;
    }
    isPending() {
        return this.state == State.PENDING;
    }
}
