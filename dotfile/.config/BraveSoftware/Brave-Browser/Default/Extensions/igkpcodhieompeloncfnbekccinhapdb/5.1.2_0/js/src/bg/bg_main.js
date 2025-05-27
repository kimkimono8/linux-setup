import { alarmHandler, inactivityHandler, initContext } from "./Context.js";
import { bgInit } from "./bgInit.js";
import { DevMain } from "./dev/DevMain.js";
export function bgSyncMain() {
    initContext();
    const fn = js.fn.emptyFn;
    chrome.runtime.onConnect.addListener(fn);
    chrome.runtime.onInstalled.addListener(fn);
    chrome.runtime.onMessage.addListener(fn);
    chrome.tabs.onActivated.addListener(fn);
    chrome.tabs.onUpdated.addListener(fn);
    chrome.windows.onFocusChanged.addListener(fn);
    chrome.contextMenus.onClicked.addListener(fn);
    chrome.runtime.onStartup.addListener(fn);
    if (chrome.alarms) {
        chrome.alarms.onAlarm.addListener(fn);
    }
    if (chrome.idle) {
        chrome.idle.onStateChanged.addListener(fn);
    }
    alarmHandler.init();
    inactivityHandler.init();
    chrome.cookies.onChanged.addListener(fn);
    bgMain.main();
}
class BgMain {
    main() {
        bgInit().then(() => new DevMain().init());
    }
}
const bgMain = new BgMain();
