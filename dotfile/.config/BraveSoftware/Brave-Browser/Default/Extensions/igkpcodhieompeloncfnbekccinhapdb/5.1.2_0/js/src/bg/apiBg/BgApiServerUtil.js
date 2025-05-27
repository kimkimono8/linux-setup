export class ApiServerUtil {
    static getTabId(port) {
        try {
            return port?.tab.id ?? port.sender?.tab?.id;
        }
        catch (e) {
            logError(e);
            return -1;
        }
    }
    static getFrameId(port) {
        try {
            return port?.frameId ?? port.sender?.frameId;
        }
        catch (e) {
            logError(e);
            return -1;
        }
    }
    static getTabUrl(port) {
        try {
            return port?.tab.url ?? port.sender?.tab?.url;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    static getTab(port) {
        try {
            return port?.tab ?? port.sender?.tab;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
}
