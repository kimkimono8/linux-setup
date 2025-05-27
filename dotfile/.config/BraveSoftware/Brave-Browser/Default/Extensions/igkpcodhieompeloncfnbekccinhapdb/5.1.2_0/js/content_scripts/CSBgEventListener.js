import { csframe } from "../src/cs/csframe/export.js";
import { VtEventScopes } from "../src/service/vt/constants/constants.js";
import { cs } from "./cs.js";
export class CSBgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    login = new BgLoginEventHandler();
    settings = new BgSettingsEventHandler();
    secret = new BgSecretEventHandler();
}
class BgSecretEventHandler {
    added() {
        try {
            zicon.onSecretAddEdited();
        }
        catch (e) {
            logError(e);
        }
    }
    changed() {
        try {
            zicon.onSecretAddEdited();
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgLoginEventHandler {
    locked() {
        try {
            zicon.onLocked();
            csframe.closeFrame();
            cs.savePasswordHandler.disableSave();
            cs.sitePasswordChangeObserver.disableSave();
        }
        catch (e) {
            logError(e);
        }
    }
    unlocked() {
        try {
            zicon.onUnlocked();
            cs.savePasswordHandler.enableSave();
            cs.sitePasswordChangeObserver.enableSave();
        }
        catch (e) {
            logError(e);
        }
    }
    loggedOut() {
        try {
            zicon.onLoggedOut();
            csframe.closeAllFrames();
            cs.savePasswordHandler.disableSave();
            cs.sitePasswordChangeObserver.disableSave();
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgSettingsEventHandler {
    settingChanged(name, value) {
        try {
            zicon.onSettingChanged(name, value);
        }
        catch (e) {
            logError(e);
        }
    }
}
