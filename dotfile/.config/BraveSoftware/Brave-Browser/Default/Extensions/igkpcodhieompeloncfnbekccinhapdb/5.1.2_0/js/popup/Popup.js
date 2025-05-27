import { setGlobal } from "../common/global/global.js";
import { UIUtil1 } from "../common/ui/ui_util.js";
import { pp } from "../src/popup/pp.js";
import { PPBgEventListener } from "./PPBgEventListener.js";
import { PPTheme } from "./PPTheme.js";
import { PopupApiServer } from "./PopupServer.js";
import { FoldersUI } from "./folders_ui/FoldersUI.js";
import { MainUI } from "./main_ui/MainUI.js";
import { PasswordsUI } from "./passwords_ui/PasswordsUI.js";
class Popup {
    async init() {
        await vt.init({ logPrefix: "POPUP:" });
        pp.theme = new PPTheme();
        pp.mainUI = new MainUI();
        pp.passwordsUI = new PasswordsUI();
        pp.foldersUI = new FoldersUI();
        pp.generatorUI = VUI.components.createGeneratorUI();
        pp.bgEventListener = new PPBgEventListener();
        UIUtil.init();
        PopupApiServer.init();
        UIUtil1.inst.init();
        pp.theme.init();
        pp.bgEventListener.init();
    }
}
export const popup = new Popup();
setGlobal("popup", popup);
