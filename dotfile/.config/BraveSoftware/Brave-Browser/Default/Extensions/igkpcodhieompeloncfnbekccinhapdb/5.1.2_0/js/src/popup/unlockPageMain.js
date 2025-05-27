import { vuiMain } from "../provider/VUi/main.js";
vuiMain();
import { popup } from "../../popup/Popup.js";
import { VtEventScopes } from "../service/vt/constants/constants.js";
import { context as accountsContext } from "./accountsUI/Context.js";
import { pp } from "./pp.js";
async function closeTab() {
    await bgApi.other.sidePanelClosed();
    await js.time.delay(0.1);
    await bgApi.other.closeUnlockTab();
    await js.time.delay(0.1);
    await bgApi.tab.closeTab();
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
class UnlockPageMain {
    async main() {
        new BgEventListener().init();
        await popup.init();
        await vt.init({ logPrefix: "UNLOCK_PAGE:" });
        pp.mainUI.showUI = js.fn.emptyFn;
        pp.mainUI.closeUI = js.fn.emptyFn;
        js.dom.closeWindow = js.fn.emptyFn;
        await accountsContext.accountsUI.showUI();
    }
}
const unlockPageMain = new UnlockPageMain();
unlockPageMain.main();
