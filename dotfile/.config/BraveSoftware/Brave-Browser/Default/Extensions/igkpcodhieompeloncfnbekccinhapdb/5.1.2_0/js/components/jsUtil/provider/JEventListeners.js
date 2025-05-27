import { gg } from "./GG.js";
export class JEventListenersImpl {
    constructor() { }
    listenerMap = {};
    add(eventName, listener) {
        const listeners = this.getListeners(eventName);
        listeners.push(listener);
    }
    dispatch(eventName, eventArgs = []) {
        const listeners = Array.from(this.getListeners(eventName));
        for (let listener of listeners) {
            listener.apply(null, eventArgs);
        }
    }
    remove(eventName, listener) {
        const listeners = this.getListeners(eventName);
        gg.js.array.removeElem(listeners, listener);
    }
    getListeners(eventName) {
        const existing = this.listenerMap[eventName];
        if (existing) {
            return existing;
        }
        const newListeners = [];
        this.listenerMap[eventName] = newListeners;
        return newListeners;
    }
}
