import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { Theme } from "../../common/ui/Theme.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { UIElemContainer } from "../../src/uiUtil/export.js";
class BgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    settings = new BgSettingsEventHandler();
}
class BgSettingsEventHandler {
    themeChanged() {
        Theme.inst.refreshTheme();
    }
}
class AlertFrameUIElem extends UIElemContainer {
    contentElem;
    loadingElem;
    titleElem;
    messageElem;
    closeElem;
    okButton;
    init() {
        this.container = document.body;
        this.contentElem = this.select("[data-content_div]");
        this.loadingElem = this.select("#dot_loading");
        this.titleElem = this.select("[data-msg_title]");
        this.messageElem = this.select("[data-msg_content]");
        this.okButton = this.select("[data-ok_button]");
        this.closeElem = this.select("[data-close_icon]");
    }
}
class AlertFrameUI {
    elem = new AlertFrameUIElem();
    init() {
        js.fn.bindThis(this, [this.closeFrame]);
        this.elem.init();
        UIUtil.addI18n(this.elem.container);
        this.addListeners();
    }
    setTitle(title) {
        js.dom.setText(this.elem.titleElem, title);
    }
    setMessage(msg) {
        js.dom.setText(this.elem.messageElem, msg);
    }
    addListeners() {
        this.elem.okButton.addEventListener("click", this.closeFrame);
        this.elem.closeElem.addEventListener("click", this.closeFrame);
        this.elem.container.addEventListener("click", e => this.onOverlayClick(e));
    }
    onOverlayClick(e) {
        try {
            if (this.elem.contentElem.contains(e.target)) {
                return;
            }
            this.closeFrame();
        }
        catch (e) {
            logError(e);
        }
    }
    closeFrame() {
        try {
            if (js.window.isTopFrame()) {
                bgApi.tab.closeTab();
                return;
            }
            bgApi.tab.closeFrame();
        }
        catch (e) {
            logError(e);
        }
    }
}
class AlertFrameController {
    ui = null;
    async show() {
        this.ui = new AlertFrameUI();
        this.ui.init();
        const alertConfig = await this.getAlertConfig();
        this.ui.setTitle(alertConfig.title || "Zoho Vault");
        this.ui.setMessage(alertConfig.message);
        js.dom.hide(this.ui.elem.loadingElem);
        js.dom.show(this.ui.elem.contentElem);
    }
    async getAlertConfig() {
        const config = await ztabStorage.load(TabStorageKeys.ALERT_CONFIG, { message: "" });
        info(AlertFrame.name, "config: ", config);
        return config;
    }
}
class AlertFrame {
    static async main() {
        await vt.init({ logPrefix: "ALERT_FRAME:" });
        Theme.inst.init();
        UIUtil.init();
        new BgEventListener().init();
        new AlertFrameController().show();
    }
}
AlertFrame.main();
