import { Message } from "./Message.js";
export class RequestMessage extends Message {
    id;
    fnName;
    args;
    constructor(id, fnName, args) {
        super();
        this.id = id;
        this.fnName = fnName;
        this.args = args;
    }
    static createNew({ id = 0, fnName = "", args = [] }) {
        return new RequestMessage(id, fnName, args);
    }
    static parse(msg) {
        const { id, fnName, args } = super.parse(msg);
        return new RequestMessage(id, fnName, args);
    }
    sendTo(endpoint) {
        return super.sendTo(endpoint + ".request");
    }
}
