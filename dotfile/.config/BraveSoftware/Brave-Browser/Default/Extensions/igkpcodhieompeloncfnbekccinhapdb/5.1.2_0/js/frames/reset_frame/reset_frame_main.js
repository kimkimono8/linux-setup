import { Theme } from "../../common/ui/Theme.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { bgApiMain } from "../../src/provider/bgApi/main.js";
import { vtMain } from "../../src/provider/vt/main.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { VtApiPortNames } from "../../src/service/vt/constants/VtApiPortNames.js";
vtMain();
bgApiMain();
const theme = new Theme();
let resetFrameMain = null;
class BgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    settings = new BgSettingsEventHandler();
}
class BgSettingsEventHandler {
    themeChanged() {
        theme.refreshTheme();
    }
}
class ResetUIApiServer {
    static init() {
        const fnMap = {
            async updateProgress() {
                resetFrameMain.updateProgress();
            }
        };
        const apiServer = portApi.createApiServer();
        apiServer.init({
            name: VtApiPortNames.RESET,
            fnObj: fnMap
        });
    }
}
class ResetFrameMain {
    MSG_SUCCESS = "We have successfully changed your password. The new password has been updated to your Zoho Vault account.";
    MSG_FAILED = "Sorry, unable to reset your password for this website.";
    async main() {
        await vt.init({ logPrefix: "RESET_FRAME:" });
        UIUtil1.inst.init();
        theme.init();
        const eventListener = new BgEventListener();
        eventListener.init();
        ResetUIApiServer.init();
        this.updateProgress();
    }
    async updateProgress() {
        try {
            const progress = await ztabStorage.load(TabStorageKeys.RESET_PROGRESS, 10);
            if (progress == -1) {
                this.showCompleted(false);
                return;
            }
            if (progress >= 100) {
                this.showCompleted(true);
                return;
            }
            const elem = js.selector.select("#percentValue");
            elem.textContent = progress + "%";
        }
        catch (e) {
            logError(e);
        }
    }
    async showCompleted(successfull) {
        const msg = successfull ? this.MSG_SUCCESS : this.MSG_FAILED;
        js.selector.select("#progressContent").innerText = msg;
        js.selector.select("#loadingDiv").style.display = "none";
        js.selector.select("#percentValue").textContent = "";
        document.body.style.cursor = "pointer";
        document.body.addEventListener("click", function () {
            bgApi.tab.closeFrame();
        });
    }
}
resetFrameMain = new ResetFrameMain();
resetFrameMain.main();
export default {};
