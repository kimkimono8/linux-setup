import { RequestMessage } from "./RequestMessage.js";
import { ResponseMessage } from "./ResponseMessage.js";
export class DomMsgClient {
    endpoint;
    nextRequestId;
    respPromiseMap = new Map();
    constructor(endpoint, nextRequestId) {
        this.endpoint = endpoint;
        this.nextRequestId = nextRequestId;
    }
    static createNew(endpoint) {
        const client = new DomMsgClient(endpoint, Date.now());
        document.addEventListener(endpoint + ".response", event => client.handleResponse(event.detail));
        return client;
    }
    async call(fnName, ...args) {
        try {
            if (!await this.checkConnectable()) {
                throw "NOT_CONNECTED";
            }
            const id = this.nextRequestId++;
            const reqMsg = RequestMessage.createNew({ id, fnName, args });
            const promise = js.promise.createNew();
            this.respPromiseMap.set(id, promise);
            reqMsg.sendTo(this.endpoint);
            return promise;
        }
        catch (e) {
            return fnOut.error(e);
        }
    }
    async checkConnectable() {
        try {
            const promise = js.promise.createTimed(0.1);
            this.callFn("echo", "...").then(x => promise.resolve(x));
            await promise;
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async callFn(fnName, ...args) {
        const id = this.nextRequestId++;
        const reqMsg = RequestMessage.createNew({ id, fnName, args });
        const promise = js.promise.createNew();
        this.respPromiseMap.set(id, promise);
        reqMsg.sendTo(this.endpoint);
        return promise;
    }
    handleResponse(responseMessage) {
        try {
            const respMsg = ResponseMessage.parse(responseMessage);
            const promise = this.respPromiseMap.get(respMsg.id);
            this.respPromiseMap.delete(respMsg.id);
            if (respMsg.error) {
                promise.resolve(fnOut.error(respMsg.error));
                return;
            }
            promise.resolve(fnOut.result(respMsg.out));
        }
        catch (e) {
            logError(e);
        }
    }
}
