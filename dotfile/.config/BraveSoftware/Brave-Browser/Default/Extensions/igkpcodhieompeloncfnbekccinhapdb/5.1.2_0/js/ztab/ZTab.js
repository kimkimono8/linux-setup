import { UIUtil1 } from "../common/ui/ui_util.js";
import { PasswordsUI } from "../src/ztab/passwords_ui/Passwords.UI.js";
import { ZTabGeneratorUI } from "../src/ztab/generator/ZTabGenerator.UI.js";
import { ZTBgEventListener } from "./ZTBgEventListener.js";
import { ZTabTaskHandler } from "./ZTabTaskHandler.js";
import { ZTabTheme } from "./ZTabTheme.js";
import { FoldersUI } from "./folders_ui/FoldersUI.js";
import { MainUI } from "./main_ui/MainUI.js";
import { PasswordsOldUI } from "./passwords_ui/PasswordsUI.js";
import { TrashUI } from "./trash_ui/TrashUI.js";
import { zt } from "./zt.js";
import { ZTabApiServer } from "./ztabServer.js";
export class ZTab {
    async init() {
        zt.theme = new ZTabTheme();
        zt.bgEventListener = new ZTBgEventListener();
        zt.taskHandler = new ZTabTaskHandler();
        zt.mainUI = new MainUI();
        zt.passwordsOldUI = new PasswordsOldUI();
        zt.passwordsUI = new PasswordsUI();
        zt.foldersUI = new FoldersUI();
        zt.trashUI = new TrashUI();
        zt.generatorUI = new ZTabGeneratorUI();
        await js.time.delay(0.1);
        await vt.init({ logPrefix: "ZTAB:" });
        UIUtil.init();
        await UIUtil1.inst.waitForConnectable();
        await this.checkUnlock();
        await this.waitDomLoadV1();
        UIUtil1.inst.init();
        ZTabApiServer.init();
        zt.theme.init();
        zt.mainUI.showUI();
        zt.bgEventListener.init();
    }
    async checkUnlock() {
        try {
            const unlocked = await bgApi.login.isUnlocked();
            if (unlocked) {
                return;
            }
            await bgApi.ztab.closeZTab();
            await js.time.waitForever();
        }
        catch (e) {
            logError(e);
        }
    }
    async waitDomLoadV1() {
        let documentLoaded = false;
        while (true) {
            documentLoaded = document.readyState == "complete";
            if (documentLoaded) {
                return;
            }
            await js.time.delay(0.2);
        }
    }
}
