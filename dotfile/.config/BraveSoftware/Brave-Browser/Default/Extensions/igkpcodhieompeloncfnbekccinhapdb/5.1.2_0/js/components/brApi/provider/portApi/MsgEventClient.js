import { ZVRuntimeMsgType } from "./interface.js";
import { ScopeFnGetter } from "./ScopeFnGetter.js";
export class MsgEventClient {
    needOrigin = false;
    needUrl = false;
    fnGetter = null;
    scope = "";
    constructor() {
        js.fn.bindThis(this, [this.onMessage]);
    }
    init(scope, fnObj) {
        chrome.runtime.onMessage.addListener(this.onMessage);
        this.fnGetter = new ScopeFnGetter(fnObj);
        this.scope = scope;
    }
    onMessage(msg, sender) {
        try {
            if (msg.type != ZVRuntimeMsgType.EVENT_MSG) {
                return;
            }
            this.initCheck(sender);
            if (!this.isValidSender(sender)) {
                return;
            }
            const eventMsg = msg.value;
            if (eventMsg.scope != this.scope) {
                return;
            }
            const event = eventMsg.event;
            const fnResult = this.fnGetter.getFn(event.path);
            if (!fnResult) {
                return;
            }
            const { fn, parentObj } = fnResult;
            fn.apply(parentObj, event.args);
        }
        catch (e) {
            logError(e);
        }
    }
    initCheck(sender) {
        this.initCheck = js.fn.emptyFn;
        this.needOrigin = Boolean(sender.origin);
        this.needUrl = Boolean(sender.url);
    }
    isValidSender(sender) {
        try {
            if (this.needOrigin != Boolean(sender.origin)) {
                return false;
            }
            if (this.needUrl != Boolean(sender.url)) {
                return false;
            }
            return true;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
