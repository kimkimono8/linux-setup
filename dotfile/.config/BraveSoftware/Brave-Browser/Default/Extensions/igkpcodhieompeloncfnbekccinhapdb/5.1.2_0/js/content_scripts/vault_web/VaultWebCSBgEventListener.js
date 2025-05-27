import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { vaultDomEventServer } from "./event_server/VaultDomEventServer.js";
export class VaultWebCSBgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    settings = new BgSettingsEventHandler();
}
class BgSettingsEventHandler {
    themeChanged(info) {
        if (info && info.from == "web") {
            return;
        }
        vaultDomEventServer.themeChanged();
    }
    settingChanged(name, value) {
        switch (name) {
            case "CLEAR_CLIPBOARD":
                vaultDomEventServer.syncClearClipboardTime(value);
                break;
        }
    }
}
