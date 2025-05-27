export class PortConnectorProvider {
    getConnector(params) {
        if (params.frameId != null) {
            return this.frameConnect(params);
        }
        if (params.tabId != null) {
            return this.tabConnect(params);
        }
        return this.normalConnect(params);
    }
    normalConnect(params) {
        return function () {
            return chrome.runtime.connect(null, { name: params.portName });
        };
    }
    tabConnect(params) {
        return function () {
            return chrome.tabs.connect(params.tabId, { name: params.portName });
        };
    }
    frameConnect(params) {
        return function () {
            return chrome.tabs.connect(params.tabId, { name: params.portName, frameId: params.frameId });
        };
    }
}
