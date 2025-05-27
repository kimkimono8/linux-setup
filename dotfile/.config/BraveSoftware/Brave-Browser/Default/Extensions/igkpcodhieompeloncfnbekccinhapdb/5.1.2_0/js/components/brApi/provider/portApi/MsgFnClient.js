import { ZVRuntimeApiMsgType, ZVRuntimeMsgType } from "./interface.js";
export class MsgFnClient {
    to;
    checkConnectionBeforeApiCall = false;
    async init(param) {
        try {
            if (!param.name) {
                throw "param.name null";
            }
            this.to = param.name;
            this.checkConnectionBeforeApiCall = param.checkConnectionBeforeApiCall;
        }
        catch (e) {
            logError(e);
        }
    }
    async isConnectable(param = null) {
        try {
            await this.callApiFn({ path: "", connect: param });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async callApi(param) {
        try {
            if (this.checkConnectionBeforeApiCall) {
                await this.waitForConnection(param.connect);
            }
            return this.callApiFn(param);
        }
        catch (e) {
            logError(e);
        }
    }
    async callApiFn(param) {
        try {
            const { path, args } = param;
            const msg = {
                type: ZVRuntimeMsgType.API_MSG,
                value: {
                    type: ZVRuntimeApiMsgType.REQUEST_MSG,
                    value: { to: this.to, path, args },
                }
            };
            return this.sendMessage(msg, param);
        }
        catch (e) {
            logError(e);
        }
    }
    async waitForConnection(param) {
        try {
            const delaySeconds = 0.3;
            for (let i = 0; i < 1e5; i++) {
                if (await this.isConnectable(param)) {
                    return;
                }
                await js.time.delay(delaySeconds);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    sendMessage(msg, param) {
        try {
            const replyHandler = new ReplyHandler(this.to);
            if (!param.connect) {
                chrome.runtime.sendMessage(msg, null, replyHandler.onReply);
                return replyHandler.promise;
            }
            chrome.tabs.sendMessage(param.connect.tabId, msg, { frameId: param.connect.frameId ?? 0 }, replyHandler.onReply);
            return replyHandler.promise;
        }
        catch (e) {
            logError(e);
            throw "UNABLE_TO_SEND_MESSAGE";
        }
    }
}
class ReplyHandler {
    name;
    promise;
    constructor(name) {
        this.name = name;
        this.promise = js.promise.createNew();
        js.fn.bindThis(this, [this.onReply]);
    }
    onReply(msg) {
        try {
            if (chrome.runtime.lastError || !msg) {
                const errorMsg = chrome.runtime.lastError || "UNABLE_TO_CONNECT: " + this.name;
                this.promise.reject(errorMsg);
                return;
            }
            const respVal = msg.result;
            const value = fnOut.getResult(respVal);
            if (!respVal.ok) {
                this.promise.reject(value);
                return;
            }
            this.promise.resolve(value);
        }
        catch (e) {
            logError(e);
        }
    }
}
