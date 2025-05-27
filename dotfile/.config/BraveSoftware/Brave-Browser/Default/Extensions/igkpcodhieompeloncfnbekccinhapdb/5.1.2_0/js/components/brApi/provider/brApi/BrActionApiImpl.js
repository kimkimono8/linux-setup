const WHITE_COLOR = "white";
export class BrActionApiImpl {
    static getInstance(isV2) {
        return isV2 ? new BrActionApiImplV2() : new BrActionApiImpl();
    }
    setIcon(pathObj) {
        chrome.action.setIcon({ path: pathObj });
    }
    setTitle(title) {
        chrome.action.setTitle({ title });
    }
    setBadgeColor(color) {
        chrome.action.setBadgeBackgroundColor({ color });
        if (chrome.action.setBadgeTextColor) {
            chrome.action.setBadgeTextColor({ color: WHITE_COLOR });
        }
    }
    setBadgeText(text) {
        chrome.action.setBadgeText({ text });
    }
}
class BrActionApiImplV2 {
    setIcon(pathObj) {
        chrome.browserAction.setIcon({ path: pathObj });
    }
    setTitle(title) {
        chrome.browserAction.setTitle({ title });
    }
    setBadgeColor(color) {
        chrome.browserAction.setBadgeBackgroundColor({ color });
        if (globalThis.browser && globalThis.browser.browserAction.setBadgeTextColor) {
            globalThis.browser.browserAction.setBadgeTextColor({ color: WHITE_COLOR });
        }
    }
    setBadgeText(text) {
        chrome.browserAction.setBadgeText({ text });
    }
}
