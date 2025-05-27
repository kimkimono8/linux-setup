import { sidePanelHandler } from "../Context.js";
export class RuntimeMsgHandler {
    init() {
        try {
            const h = this;
            brApi.runtime.onMessage(function (msg, sender) {
                h.handleMessage(msg, sender);
                return false;
            });
        }
        catch (e) {
            logError(e);
        }
    }
    async handleMessage(msg, sender) {
        try {
            if (!msg.fn) {
                return false;
            }
            const { fn, args } = msg;
            if (!this[fn]) {
                return false;
            }
            this[fn](args, sender);
        }
        catch (e) {
            logError(e);
        }
        return false;
    }
    openSidePanel(_args, sender) {
        sidePanelHandler.open(sender.tab.windowId, { tabId: sender.tab.id, frameId: sender.frameId });
    }
}
