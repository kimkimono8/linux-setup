import { gg } from "../GG.js";
import { ZVRuntimeApiMsgType, ZVRuntimeMsgType } from "./interface.js";
import { ScopeFnGetter } from "./ScopeFnGetter.js";
export class MsgFnServer {
    name = "";
    fnGetter = null;
    constructor() {
        js.fn.bindThis(this, [this.onMessage]);
    }
    init(param) {
        try {
            if (!param.name) {
                throw "param.name null";
            }
            if (!param.fnObj) {
                throw "param.fnObj null";
            }
            this.name = param.name;
            this.fnGetter = new ScopeFnGetter(param.fnObj);
            gg.brApi.runtime.onMessage(this.onMessage);
        }
        catch (e) {
            logError(e);
        }
    }
    disconnect() {
        gg.brApi.runtime.removeOnMessageListener(this.onMessage);
    }
    onMessage(msg, sender, sendResponse) {
        try {
            if (msg.type != ZVRuntimeMsgType.API_MSG) {
                return false;
            }
            const apiMsg = msg.value;
            if (apiMsg.type != ZVRuntimeApiMsgType.REQUEST_MSG) {
                return false;
            }
            const apiReqMsg = apiMsg.value;
            if (apiReqMsg.to != this.name) {
                return false;
            }
            this.callApi(apiReqMsg, sender, sendResponse);
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async callApi(msg, sender, sendResponse) {
        try {
            if (msg.path.length == 0) {
                sendResponse(this.getResponseMsg(fnOut.OK));
                return;
            }
            const fnResult = this.fnGetter.getFn(msg.path);
            if (!fnResult) {
                sendResponse(this.getResponseMsg(fnOut.error("FN_NOT_FOUND: " + JSON.stringify(msg.path))));
                return;
            }
            const { fn, parentObj } = fnResult;
            msg.args = msg.args || [];
            msg.args.push(sender);
            const value = await fn.apply(parentObj, msg.args);
            sendResponse(this.getResponseMsg(fnOut.result(value)));
        }
        catch (e) {
            sendResponse(this.getResponseMsg(fnOut.error(e)));
            logError(e);
        }
    }
    getResponseMsg(result) {
        try {
            const msg = {
                result
            };
            return msg;
        }
        catch (e) {
            logError(e);
            throw "UNABLE_TO_GET_RESPONSE_MSG";
        }
    }
}
