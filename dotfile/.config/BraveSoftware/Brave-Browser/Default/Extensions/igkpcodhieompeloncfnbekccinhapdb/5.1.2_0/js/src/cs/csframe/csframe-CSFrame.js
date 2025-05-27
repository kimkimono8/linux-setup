import { exp_alertFrame } from "./csframe-AlertFrame.js";
import { exp_cardFrame } from "./csframe-CardFrame.js";
import { exp_cardSaveFrame } from "./csframe-CardSaveFrame.js";
import { exp_cardUpdateFrame } from "./csframe-CardUpdateFrame.js";
import { exp_confirmFrame } from "./csframe-ConfirmFrame.js";
import { exp_formFrame } from "./csframe-FormFrame.js";
import { exp_resetFrame } from "./csframe-ResetFrame.js";
import { exp_saveFrame } from "./csframe-SaveFrame.js";
import { exp_siteFrame } from "./csframe-SiteFrame.js";
import { exp_updateFrame } from "./csframe-UpdateFrame.js";
import { util } from "./csframe-util.js";
class CSFrame {
    alert = exp_alertFrame;
    confirm = exp_confirmFrame;
    siteFrame = exp_siteFrame;
    saveFrame = exp_saveFrame;
    updateFrame = exp_updateFrame;
    cardFrame = exp_cardFrame;
    cardSave = exp_cardSaveFrame;
    formFrame = exp_formFrame;
    cardUpdate = exp_cardUpdateFrame;
    resetFrame = exp_resetFrame;
    async init() {
        try {
            if (!csutil.window.isTopFrame()) {
                return;
            }
            await js.dom.waitDomLoad();
            await this.saveFrame.restore();
            await this.updateFrame.restore();
            await this.resetFrame.restore();
            await this.cardSave.restore();
            await this.cardUpdate.restore();
        }
        catch (e) {
            logError(e);
        }
    }
    async closeFrame(params = {}) {
        try {
            this.saveFrame.close();
            this.updateFrame.close();
            this.resetFrame.close();
            this.cardSave.close();
            this.cardUpdate.close();
            this.alert.close();
            this.confirm.close();
            if (params.restoreFoucs) {
                util.restoreFocus();
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async closeAllFrames() {
        try {
            await this.closeFrame();
            await this.siteFrame.close();
            await this.cardFrame.close();
        }
        catch (e) {
            logError(e);
        }
    }
}
export const exp_csframe = new CSFrame();
