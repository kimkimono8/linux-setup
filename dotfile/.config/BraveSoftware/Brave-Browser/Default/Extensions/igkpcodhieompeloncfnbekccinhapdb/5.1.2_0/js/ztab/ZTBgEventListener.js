import { VtEventScopes } from "../src/service/vt/constants/constants.js";
import { settingsUI } from "../src/ztab/settingsUI/export.js";
import { zt } from "./zt.js";
export class ZTBgEventListener {
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
    added(secretId) {
        try {
            zt.passwordsOldUI.secretAdded(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    changed(secretId) {
        try {
            zt.passwordsOldUI.secretChanged(secretId);
        }
        catch (e) {
            logError(e);
        }
    }
    removed(secretIds) {
        try {
            zt.passwordsOldUI.secretsRemoved(secretIds);
            zt.trashUI.secretsRemoved(secretIds);
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgLoginEventHandler {
    locked() {
        bgApi.ztab.closeZTab();
    }
    loggedOut() {
        bgApi.ztab.closeZTab();
    }
}
class BgSettingsEventHandler {
    themeChanged() {
        zt.theme.refreshTheme();
    }
    changed() {
        try {
            settingsUI.refreshUI();
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgSyncEventHandler {
    syncing() {
        try {
            zt.mainUI.syncing();
            zt.passwordsOldUI.syncing();
            zt.foldersUI.syncing();
            zt.trashUI.syncing();
        }
        catch (e) {
            logError(e);
        }
    }
    synced() {
        try {
            zt.mainUI.synced();
            zt.passwordsOldUI.synced();
            zt.foldersUI.synced();
            zt.trashUI.synced();
        }
        catch (e) {
            logError(e);
        }
    }
}
