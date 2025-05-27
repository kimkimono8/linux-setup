import { vuiMain } from "../provider/VUi/main.js";
vuiMain();
import { popup } from "../../popup/Popup.js";
import { VtEventScopes } from "../service/vt/constants/constants.js";
import { VtApiPortNames } from "../service/vt/constants/VtApiPortNames.js";
import { context as accountsContext } from "./accountsUI/Context.js";
import { pp } from "./pp.js";
async function closeTab() {
    await bgApi.other.sidePanelClosed();
    await js.time.delay(0.1);
    window.close();
}
class BgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    login = new BgLoginEventHandler();
}
class BgLoginEventHandler {
    unlocked() {
        closeTab();
    }
}
export class SidePanelApiServer {
    static init() {
        const apiServer = portApi.createApiServer();
        apiServer.init({ name: VtApiPortNames.SIDE_PANEL, fnObj: new SidePanelApiServer() });
    }
}
class SidePanelMain {
    async main() {
        globalThis["sidePanel"] = true;
        new BgEventListener().init();
        SidePanelApiServer.init();
        await popup.init();
        await vt.init({ logPrefix: "SIDE_PANEL:" });
        pp.mainUI.showUI = js.fn.emptyFn;
        pp.mainUI.closeUI = js.fn.emptyFn;
        js.dom.closeWindow = js.fn.emptyFn;
        await accountsContext.accountsUI.showUI();
    }
}
const sidePanelMain = new SidePanelMain();
sidePanelMain.main();
