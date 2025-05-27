import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { SFTheme } from "./SiteFrame.js";
import { SFMainUIController } from "./main_ui/SFMainUIController.js";
import { SFPasswordsUIController } from "./passwords_ui/SFPasswordsUIController.js";
export class SFBgEventListener {
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
        secretId;
        SFPasswordsUIController.inst.onSecretAddedEvent();
    }
    changed(secretId) {
        secretId;
        SFPasswordsUIController.inst.onSecretChangedEvent(secretId);
    }
    removed(secretIds) {
        secretIds;
        SFPasswordsUIController.inst.onSecretsRemovedEvent();
    }
}
class BgLoginEventHandler {
    locked() {
        bgApi.siteFrame.closeSiteFrame();
    }
}
class BgSettingsEventHandler {
    themeChanged() {
        SFTheme.inst.refreshTheme();
    }
    settingChanged(name, _value) {
        try {
            switch (name) {
                case LocalStorageKeys.DOMAIN_MATCH_MODE:
                    SFMainUIController.inst.onSyncedEvent();
                    break;
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgSyncEventHandler {
    syncing() {
        try {
            SFMainUIController.inst.onSyncingEvent();
        }
        catch (e) {
            logError(e);
        }
    }
    synced() {
        try {
            SFMainUIController.inst.onSyncedEvent();
        }
        catch (e) {
            logError(e);
        }
    }
}
