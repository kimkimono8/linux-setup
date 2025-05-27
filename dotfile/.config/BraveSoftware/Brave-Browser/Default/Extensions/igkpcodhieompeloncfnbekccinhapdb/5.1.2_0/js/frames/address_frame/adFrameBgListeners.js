import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { AdFrameTheme } from "./adFrameTheme.js";
import { al } from "./addressList.js";
export class AdFrameBgListeners {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    login = new BgLoginEventHandler();
    settings = new BgSettingsEventHandler();
    sync = new BgSyncEventHandler();
    ;
}
class BgLoginEventHandler {
    locked() {
        al.showLocked();
    }
    unlocked() {
        al.unlocked();
    }
    loggedOut() {
    }
}
class BgSettingsEventHandler {
    async themeChanged() {
        await AdFrameTheme.inst.refreshTheme();
        AdFrameTheme.inst.setArrow();
    }
}
class BgSyncEventHandler {
    sync = false;
    syncing() {
        try {
            this.sync = true;
        }
        catch (e) {
            logError(e);
        }
    }
    synced() {
        try {
            if (this.sync) {
                this.sync = false;
                al.showTab();
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
