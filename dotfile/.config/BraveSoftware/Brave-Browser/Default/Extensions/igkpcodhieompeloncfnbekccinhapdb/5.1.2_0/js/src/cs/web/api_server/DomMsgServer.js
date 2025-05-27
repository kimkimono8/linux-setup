import { RequestMessage } from "./RequestMessage.js";
import { ResponseMessage } from "./ResponseMessage.js";
export class DomMsgServer {
    endpoint;
    fnMap;
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    static createNew(endpoint, fnMap) {
        const server = new DomMsgServer(endpoint);
        server.fnMap = fnMap;
        document.addEventListener(endpoint + ".request", event => server.handleRequest(event.detail));
    }
    async handleRequest(requestMessage) {
        const respMsg = ResponseMessage.createNew();
        try {
            const reqMsg = RequestMessage.parse(requestMessage);
            respMsg.id = reqMsg.id;
            const fn = this.getFn(reqMsg.fnName);
            respMsg.out = await fn.apply(this.fnMap, reqMsg.args);
        }
        catch (e) {
            logError(e);
            respMsg.error = e + "";
        }
        respMsg.sendTo(this.endpoint);
    }
    getFn(fnName) {
        if (this.fnMap[fnName]) {
            return this.fnMap[fnName];
        }
        if (fnName == this.echo.name) {
            return this.echo;
        }
        throw "NOT_FOUND: " + fnName;
    }
    echo(x) {
        return x;
    }
}
