import { vtMain } from "../provider/vt/main.js";
import { bgApiMain } from "../provider/bgApi/main.js";
vtMain();
bgApiMain();
async function main() {
    await vt.init({ logPrefix: "DEV_TOOLS:" });
    bgApi.other.devToolsOpened(chrome?.devtools?.inspectedWindow?.tabId);
    chrome.runtime.onMessage.addListener(function (msg, _sender, sendResponse) {
        try {
            if (!msg || !msg.fn_name) {
                return false;
            }
            const { fn_name } = msg;
            switch (fn_name) {
                case "is_dev_tools_open": {
                    const [tabId] = msg.args;
                    if (tabId == chrome.devtools.inspectedWindow.tabId) {
                        sendResponse(true);
                        return true;
                    }
                    return false;
                }
            }
        }
        catch (e) {
            logError(e);
        }
        return false;
    });
}
main();
function devToolsOpened() {
    chrome.tabs ? sendMessageToCS() : sendMessageToBG();
}
function sendMessageToBG() {
    chrome.runtime.sendMessage({
        action: "devToolsOpened",
        tabId: chrome.devtools.inspectedWindow.tabId
    }, null, function (_resp) { chrome.runtime.lastError; });
}
function sendMessageToCS() {
    chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, { action: "devToolsOpened" }, null, function (_resp) { chrome.runtime.lastError; });
}
devToolsOpened();
