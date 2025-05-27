import { Message } from "./Message.js";
export class ResponseMessage extends Message {
    id;
    out;
    error;
    constructor(id, out, error) {
        super();
        this.id = id;
        this.out = out;
        this.error = error;
    }
    static createNew({ id = 0, error = "", out = null } = {}) {
        return new ResponseMessage(id, error, out);
    }
    static parse(msg) {
        const { id, out, error } = super.parse(msg);
        return new ResponseMessage(id, out, error);
    }
    sendTo(endpoint) {
        return super.sendTo(endpoint + ".response");
    }
}
