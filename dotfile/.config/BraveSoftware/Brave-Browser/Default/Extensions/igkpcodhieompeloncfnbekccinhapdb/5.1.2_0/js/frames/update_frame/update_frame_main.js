import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { Theme } from "../../common/ui/Theme.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
const theme = new Theme();
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
class UpdateFrameMain {
    listener = new UpdateFrameUIListener();
    updateFrameData = null;
    async main() {
        await vt.init({ logPrefix: "UPDATE_FRAME:" });
        UIUtil1.inst.init();
        UIUtil.init();
        theme.init();
        const bgEventListener = new BgEventListener();
        bgEventListener.init();
        globalDomListener.register("uf", this.listener);
        this.updateFrameData = await bgApi.updateFrame.getData();
        if (this.updateFrameData == null) {
            await bgApi.tab.closeFrame();
            return;
        }
        await this.initUI();
        bgApi.other.updateLogo(true);
    }
    async initUI() {
        try {
            js.selector.select("#name").textContent = this.updateFrameData.name;
            this.initField("username");
            this.initField("password");
            await this.initSaveAsNewButton();
        }
        catch (e) {
            logError(e);
        }
    }
    initField(key) {
        try {
            const labelDiv = js.selector.select("#" + key + "_label");
            labelDiv.textContent = this.updateFrameData[key + "Field"].label;
            const fieldDiv = js.selector.select("#" + key);
            const field = this.updateFrameData[key];
            fieldDiv.textContent = js.dom.getPasswordMask(field);
            fieldDiv.dataset.value = field;
        }
        catch (e) {
            logError(e);
        }
    }
    async initSaveAsNewButton() {
        try {
            const allowedClassifications = await bgApi.secret.getAddPasswordClassifications();
            const hasValidClassifications = allowedClassifications.length > 0;
            if (hasValidClassifications) {
                return;
            }
            js.dom.hide("#save_as_new_button");
        }
        catch (e) {
            logError(e);
        }
    }
}
class UpdateFrameUIListener {
    clickedShowHide(e) {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const eye_container = js.selector.closest(e.target, "[data-eye_for]");
        const eye_icon = js.selector.selectFrom(eye_container, "i");
        const input = js.selector.select(eye_container.dataset.eye_for);
        const hide_password = input.dataset.type == "text";
        const auto_hide = eye_container.dataset.auto_hide_eye !== undefined;
        const value = input.dataset.value;
        if (hide_password) {
            input.dataset.type = "password";
            input.textContent = js.dom.getPasswordMask(value);
            eye_icon.dataset.tooltip_content = "i18n:view";
            eye_icon.className = "icon-view";
            if (auto_hide) {
                clearTimeout(+eye_container.dataset.auto_hide_timeout);
            }
            return;
        }
        input.dataset.type = "text";
        input.textContent = value;
        eye_icon.dataset.tooltip_content = "i18n:hide";
        eye_icon.className = "icon-hide";
        if (auto_hide) {
            eye_container.dataset.auto_hide_timeout = "" + setTimeout(() => this.clickedShowHide(e), 10000);
        }
    }
    async clickedUpdate() {
        try {
            this.showLoading();
            await bgApi.updateFrame.updateSecret();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e + "");
        }
        finally {
            this.hideLoading();
        }
    }
    async clickedNeverSave() {
        try {
            this.showLoading();
            const tabUrl = await bgApi.tab.getTabUrl();
            const domain = js.url.getHostName(tabUrl);
            (await bgApi.settings.neverSave.add(domain)).result;
            this.clickedClose();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e + "");
        }
    }
    async clickedSaveAsNew() {
        this.showLoading();
        bgApi.updateFrame.saveAsNew();
    }
    async clickedEdit() {
        this.showLoading();
        bgApi.updateFrame.editSecret();
    }
    clickedClose() {
        bgApi.updateFrame.closeUpdateFrame({ restoreFoucs: true });
    }
    showLoading() {
        try {
            js.dom.showOld("#loading");
        }
        catch (e) {
            logError(e);
        }
    }
    hideLoading() {
        try {
            js.dom.hideOld("#loading");
        }
        catch (e) {
            logError(e);
        }
    }
}
const updateFrameMain = new UpdateFrameMain();
updateFrameMain.main();
export default {};
