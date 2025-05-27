import { VtEventScopes } from "../../service/vt/constants/constants.js";
class BgEventServerContext {
    eventServer;
}
export class BgEventServer {
    context = new BgEventServerContext();
    init() {
        const eventServer = this.context.eventServer = portApi.createEventServer();
        eventServer.init(VtEventScopes.BG);
    }
    login = new BgLoginEventServer(this.context);
    secret = new BgSecretEventServer(this.context);
    settings = new BgSettingsEventServer(this.context);
    sync = new BgSyncEventServer(this.context);
}
class BgSyncEventServer {
    context;
    prefix = "sync.";
    constructor(context) {
        this.context = context;
    }
    synced() {
        this.context.eventServer.dispatch(this.prefix + this.synced.name);
    }
    syncing() {
        this.context.eventServer.dispatch(this.prefix + this.syncing.name);
    }
}
class BgSettingsEventServer {
    context;
    prefix = "settings.";
    constructor(context) {
        this.context = context;
    }
    changed() {
        this.context.eventServer.dispatch(this.prefix + this.changed.name);
    }
    settingChanged(name, value) {
        this.context.eventServer.dispatch(this.prefix + this.settingChanged.name, [name, value]);
    }
    themeChanged(info) {
        this.context.eventServer.dispatch(this.prefix + this.themeChanged.name, [info]);
    }
}
class BgSecretEventServer {
    context;
    prefix = "secret.";
    constructor(context) {
        this.context = context;
    }
    added(secretId) {
        this.context.eventServer.dispatch(this.prefix + this.added.name, [secretId]);
    }
    changed(secretId) {
        this.context.eventServer.dispatch(this.prefix + this.changed.name, [secretId]);
    }
    removed(secretIds) {
        this.context.eventServer.dispatch(this.prefix + this.removed.name, [secretIds]);
    }
}
class BgLoginEventServer {
    context;
    prefix = "login.";
    constructor(context) {
        this.context = context;
    }
    locked() {
        this.context.eventServer.dispatch(this.prefix + this.locked.name);
    }
    loggedOut() {
        this.context?.eventServer?.dispatch?.(this.prefix + this.loggedOut.name);
    }
    unlocked() {
        this.context.eventServer.dispatch(this.prefix + this.unlocked.name);
    }
}
