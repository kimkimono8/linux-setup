import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { cl } from "./cardList.js";
export class CardListListeners {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    login = new BgLoginEventHandler();
    settings = new BgSettingsEventHandler();
    sync = new BgSyncEventHandler();
    ;
    secret = new BgSecretEventHandler();
}
class BgSecretEventHandler {
    added() {
        cl.initUI();
    }
    changed() {
        cl.initUI();
    }
    removed() {
        cl.initUI();
    }
}
class BgLoginEventHandler {
    locked() {
        cl.initUI();
    }
    unlocked() {
        cl.initUI();
    }
}
class BgSettingsEventHandler {
    async themeChanged() {
        await cl.theme.refreshTheme();
        cl.setArrow();
    }
}
class BgSyncEventHandler {
    syncing() {
        try {
            cl.syncing();
        }
        catch (e) {
            logError(e);
        }
    }
    synced() {
        try {
            cl.synced();
        }
        catch (e) {
            logError(e);
        }
    }
}
