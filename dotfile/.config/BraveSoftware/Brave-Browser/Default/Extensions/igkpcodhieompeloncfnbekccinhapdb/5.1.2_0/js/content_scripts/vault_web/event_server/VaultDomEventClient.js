class DomEventClient {
    name;
    fnObjMap;
    static create(name, fnObjMap) {
        return new DomEventClient(name, fnObjMap);
    }
    constructor(name, fnObjMap) {
        this.name = name;
        this.fnObjMap = fnObjMap;
        this.init();
    }
    init() {
        document.addEventListener(this.name, this.handleEvent.bind(this));
    }
    async handleEvent(domEvent) {
        try {
            const event = JSON.parse(domEvent.detail);
            const fn = event.name && this.fnObjMap[event.name];
            if (!fn) {
                console.error("unhandled event: ", event);
                return;
            }
            await fn.apply(null, event.args);
        }
        catch (e) {
            logError(e);
        }
    }
}
export class VaultDomEvent {
    eventName = "zv.ext.event";
}
class VaultDomEventClient extends VaultDomEvent {
    static create() {
        return new VaultDomEventClient();
    }
    constructor() {
        super();
        this.init();
    }
    init() {
        DomEventClient.create(this.eventName, this);
    }
    themeChanged(themeObj) { themeObj; }
    tryUnlock() { }
    syncClearClipboardTime(seconds) { seconds; }
}
VaultDomEventClient;
