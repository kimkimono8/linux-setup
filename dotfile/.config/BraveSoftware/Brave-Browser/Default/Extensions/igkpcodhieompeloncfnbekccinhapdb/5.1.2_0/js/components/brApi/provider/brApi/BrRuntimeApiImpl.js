import { BrPlatforms } from "../../service/enum.js";
import { gg } from "../GG.js";
export class BrRuntimeApiImpl {
    async reload() {
        chrome.runtime.reload();
    }
    getUrl(path) {
        return chrome.runtime.getURL(path);
    }
    removeConnectListener(listener) {
        chrome.runtime.onConnect.removeListener(listener);
    }
    connect(portName) {
        return chrome.runtime.connect("", { name: portName });
    }
    connectTab(portName, tabId) {
        return chrome.tabs.connect(tabId, { name: portName });
    }
    async sendMessage(msg) {
        return new Promise((res, rej) => chrome.runtime.sendMessage(msg, gg.util.createCallback(res, rej)));
    }
    sendMsgNoReply(msg) {
        return chrome.runtime.sendMessage(msg);
    }
    onMessage(listener) {
        chrome.runtime.onMessage.addListener(listener);
    }
    removeOnMessageListener(listener) {
        chrome.runtime.onMessage.removeListener(listener);
    }
    async broadcastMsg(msg) {
        try {
            try {
                await chrome.runtime.sendMessage(msg);
            }
            catch (e) { }
            const tabs = await gg.brApi.tab.getAllTabs();
            for (let tab of tabs) {
                if (!tab.url?.startsWith("http")) {
                    continue;
                }
                try {
                    await chrome.tabs.sendMessage(tab.id, msg);
                }
                catch (e) { }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async getOS() {
        try {
            const { os } = await this.getPlatformInfo();
            switch (os) {
                case BrPlatforms.WINDOWS:
                case BrPlatforms.LINUX:
                case BrPlatforms.MAC:
                    return os;
                default:
                    return BrPlatforms.OTHER;
            }
        }
        catch (e) {
            return BrPlatforms.OTHER;
        }
    }
    async getPlatformInfo() {
        return chrome.runtime.getPlatformInfo();
    }
    onStartup(listener) {
        chrome.runtime.onStartup.addListener(listener);
    }
    onInstall(listener) {
        chrome.runtime.onInstalled.addListener(listener);
    }
    getManifest() {
        try {
            return chrome?.runtime.getManifest?.();
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
}
