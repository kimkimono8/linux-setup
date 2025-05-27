import { gg } from "../GG.js";
import { ZVRuntimeMsgType } from "./interface.js";
export class MsgEventServer {
    scope = "";
    init(scope) {
        this.scope = scope;
    }
    async dispatch(eventPath, eventArgs = null) {
        try {
            const msg = this.getEventMsg(eventPath, eventArgs);
            try {
                chrome.runtime.sendMessage(msg, null, function () { chrome.runtime.lastError; });
            }
            catch (e) { }
            const tabs = await gg.brApi.tab.getAllTabs();
            for (let tab of tabs) {
                try {
                    chrome.tabs.sendMessage(tab.id, msg, null, function () { chrome.runtime.lastError; });
                }
                catch (e) { }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getEventMsg(eventPath, eventArgs) {
        try {
            return {
                type: ZVRuntimeMsgType.EVENT_MSG,
                value: {
                    scope: this.scope,
                    event: { path: eventPath, args: eventArgs }
                }
            };
        }
        catch (e) {
            logError(e);
            throw "FAILED_TO_GET_EVENT_MSG";
        }
    }
}
