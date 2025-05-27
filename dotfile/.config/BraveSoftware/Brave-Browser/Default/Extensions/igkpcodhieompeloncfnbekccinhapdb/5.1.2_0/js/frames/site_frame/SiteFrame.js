import { Theme } from "../../common/ui/Theme.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { SFBgEventListener } from "./SFBgEventListener.js";
import { SFMainUIController } from "./main_ui/SFMainUIController.js";
export class SFTheme extends Theme {
    static instance = null;
    constructor() { super(); }
    static get inst() {
        if (!this.instance) {
            this.instance = new SFTheme();
            this.instance.init();
        }
        return this.instance;
    }
    arrowClass = "m-t-10";
    setArrow(arrow) {
        this.arrowClass = arrow;
    }
    getThemeClass() {
        return super.getThemeClass() + " zvd-body " + this.arrowClass;
    }
}
export class SiteFrame {
    async init() {
        try {
            await vt.init({ logPrefix: "SITE_FRAME:" });
            UIUtil.init();
            UIUtil1.inst.init();
            SFTheme.inst;
            new SFBgEventListener().init();
            this.addKeyboardListener();
            await SFMainUIController.inst.showUI();
            bgApi.other.updateLogo(false);
        }
        catch (e) {
            logError(e);
        }
    }
    addKeyboardListener() {
        try {
            VUI.keyboard.onKeyDown(document.documentElement, {
                Escape(e) {
                    if (e.target instanceof HTMLInputElement && e.target.value) {
                        return;
                    }
                    bgApi.siteFrame.closeSiteFrame({ restoreFoucs: true });
                }
            });
        }
        catch (e) {
            logError(e);
        }
    }
}
