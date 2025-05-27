import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { globalDomListener } from "../../common/ui/globalDomListener.js";
import { Theme } from "../../common/ui/Theme.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { SaveFrameFolderComponent } from "./SaveFrameFolderComponent.js";
import { SaveFramePasswordAdd } from "./SaveFramePasswordAdd.js";
import { SaveFrameUIListeners } from "./SaveFrameUIListeners.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { SecretClassification } from "../../src/service/bgApi/types/Secret.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
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
export class SaveFrameMain {
    saveFrameData = null;
    listener = new SaveFrameUIListeners();
    passwordAdd = new SaveFramePasswordAdd();
    folderComponent = new SaveFrameFolderComponent();
    async main() {
        try {
            await vt.init({ logPrefix: "SAVE_FRAME:" });
            this.listener.p = this;
            this.passwordAdd.p = this;
            UIUtil1.inst.init();
            theme.init();
            UIUtil.init();
            const bgEventListener = new BgEventListener();
            bgEventListener.init();
            globalDomListener.register("sf", this.listener);
            this.saveFrameData = await this.getSaveFrameData();
            if (this.saveFrameData == null) {
                await bgApi.tab.closeFrame();
                return;
            }
            await this.initUI();
            bgApi.other.updateLogo(true);
        }
        catch (e) {
            logError(e);
        }
    }
    async getSaveFrameData() {
        try {
            const saveFrameData = await bgApi.saveFrame.getData();
            return saveFrameData;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    async initUI() {
        try {
            const nameInput = js.selector.select("#name");
            nameInput.value = this.saveFrameData.name;
            nameInput.focus();
            this.folderComponent.createUI();
            this.initUserNameFields("username");
            this.initField("password");
            await this.initClassification();
        }
        catch (e) {
            logError(e);
        }
    }
    initUserNameFields(key) {
        try {
            const field = this.saveFrameData[key];
            const fieldDiv = js.selector.select("#" + key);
            fieldDiv.textContent = field;
            fieldDiv.dataset.value = field;
        }
        catch (e) {
            logError(e);
        }
    }
    initField(key) {
        try {
            const field = this.saveFrameData[key];
            const fieldDiv = js.selector.select("#" + key);
            fieldDiv.textContent = js.dom.getPasswordMask(field);
            fieldDiv.dataset.value = field;
        }
        catch (e) {
            logError(e);
        }
    }
    async initClassification() {
        try {
            const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
            const classificationInput = js.selector.select("[data-classification]");
            if (isPersonalPlan) {
                classificationInput.checked = false;
                js.dom.hide("[data-classification_container]");
                return;
            }
            const allowedClassifications = await this.saveFrameData.allowedClassifications;
            if (allowedClassifications.length == 2) {
                return;
            }
            classificationInput.disabled = true;
            const disabledClass = "personal-enterprise-switch-disabled";
            js.selector.select("[data-classification_label]").classList.add(disabledClass);
            if (!allowedClassifications.includes(SecretClassification.PERSONAL)) {
                classificationInput.checked = true;
                js.selector.select("[data-classification_label]").dataset.tooltip_content = i18n(VI18N.PERSONAL_PASSWORD_RESTRICTED);
                return;
            }
            classificationInput.checked = false;
            js.selector.select("[data-classification_label]").dataset.tooltip_content = i18n(VI18N.ENTERPRISE_PASSWORD_RESTRICTED);
        }
        catch (e) {
            logError(e);
        }
    }
}
const saveFrameMain = new SaveFrameMain();
saveFrameMain.main();
export default {};
