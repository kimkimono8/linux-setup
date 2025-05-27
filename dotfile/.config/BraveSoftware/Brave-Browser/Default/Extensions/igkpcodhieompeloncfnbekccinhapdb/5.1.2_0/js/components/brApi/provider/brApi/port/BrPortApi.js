import { gg } from "../../GG.js";
import { PortConnectorProvider } from "./PortConnector.js";
export class BrPortApiImpl {
    connectProvider = new PortConnectorProvider();
    async connect(params) {
        return new PortProvider(this.connectProvider.getConnector(params), params.noRetry ?? false).connect();
    }
    onConnect(params) {
        const portFunc = function (port) {
            if (port.name != params.portName) {
                return;
            }
            port.postMessage("connected");
            params.listener(port);
        };
        chrome.runtime.onConnect.addListener(portFunc);
        return portFunc;
    }
}
class PortProvider {
    connector;
    portName;
    maxRetryAttempts = 120;
    constructor(connector, noRetry) {
        this.connector = connector;
        gg;
        if (noRetry) {
            this.maxRetryAttempts = 1;
        }
    }
    async connect() {
        try {
            const NEXT_CALL_DELAY_SECONDS = 0.5;
            let port;
            for (let _ of js.loop.range(this.maxRetryAttempts)) {
                try {
                    port = this.connector();
                    await this.waitForResponse(port);
                    if (port) {
                        return port;
                    }
                }
                catch (e) {
                    console.info(e);
                }
                await js.time.delay(NEXT_CALL_DELAY_SECONDS);
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async waitForResponse(port) {
        const connectedPromise = js.promise.createNew();
        port.onDisconnect.addListener(function () {
            if (chrome.runtime.lastError) {
                connectedPromise.reject(chrome.runtime.lastError.message);
                return;
            }
            connectedPromise.reject("disconnected...");
        });
        port.onMessage.addListener(function f() {
            connectedPromise.resolve();
            port.onMessage.removeListener(f);
        });
        setTimeout(() => connectedPromise.reject("connection_timeout..."), 200);
        await connectedPromise;
    }
}
