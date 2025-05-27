import { accountsUI } from "../src/popup/accountsUI/export.js";
import { pp } from "../src/popup/pp.js";
import { settingsUI } from "../src/popup/settingsUI/export.js";
import { VtEventScopes } from "../src/service/vt/constants/constants.js";
export class PPBgEventListener {
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
    changed(secretId) {
        try {
            pp.passwordsUI.secretChanged(secretId);
            pp.mainUI.refreshDomainMatchingCount();
        }
        catch (e) {
            logError(e);
        }
    }
    removed(secretIds) {
        try {
            pp.passwordsUI.secretsRemoved(secretIds);
            pp.mainUI.refreshDomainMatchingCount();
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgLoginEventHandler {
    locked() {
        try {
            if (accountsUI.isCheckingAccount()) {
                return;
            }
            window.location.reload();
        }
        catch (e) {
            logError(e);
        }
    }
}
class BgSettingsEventHandler {
    themeChanged() {
        pp.theme.refreshTheme();
    }
}
class BgSyncEventHandler {
    syncing() {
        pp.mainUI.syncing();
        pp.passwordsUI.syncing();
        settingsUI.syncing();
    }
    synced() {
        try {
            pp.mainUI.synced();
            pp.passwordsUI.synced();
            pp.foldersUI.synced();
            settingsUI.synced();
        }
        catch (e) {
            logError(e);
        }
    }
}
