import { Theme } from "../../../common/ui/Theme.js";
import { VaultDomEvent } from "./VaultDomEventClient.js";
class DomEventServer {
    name;
    constructor(name) {
        this.name = name;
    }
    dispatch(eventName, ...args) {
        const eventObj = {
            name: eventName,
            args: args
        };
        const customEvent = new CustomEvent(this.name, { detail: JSON.stringify(eventObj) });
        document.dispatchEvent(customEvent);
    }
}
class VaultDomEventServer extends VaultDomEvent {
    server = null;
    constructor() {
        super();
        this.server = new DomEventServer(this.eventName);
    }
    async themeChanged() {
        const themeObj = await Theme.loadTheme();
        this.server.dispatch(this.themeChanged.name, themeObj);
    }
    async tryUnlock() {
        this.server.dispatch(this.tryUnlock.name);
    }
    syncClearClipboardTime(seconds) {
        this.server.dispatch(this.syncClearClipboardTime.name, seconds);
    }
}
export const vaultDomEventServer = new VaultDomEventServer();
