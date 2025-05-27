import { settingsTab, settingsUI } from "../Context.js";
import { AdvancedSettingsData } from "./AdvancedSettings.Data.js";
import { AdvancedSettingsElem } from "./AdvancedSettings.Elem.js";
export class AdvancedSettingsUI {
    elem = new AdvancedSettingsElem();
    data = new AdvancedSettingsData();
    async showUI() {
        this.elem.init();
        await this.data.init();
        this.initCheckboxes();
        this.addListeners();
        js.dom.setContent(settingsUI.elem.tabContent, this.elem.container);
        UIUtil.addSlimScroll(this.elem.container, { clientWidthHeight: true });
    }
    addListeners() {
        this.elem.container.addEventListener("click", e => this.handleSettingClick(e));
    }
    initCheckboxes() {
        this.elem.disableBadgeCountCheckbox.checked = this.data.disableBadgeCount;
        this.elem.disableWebsiteVaultIconCheckbox.checked = this.data.disableWebsiteVaultIcon;
        this.elem.disableWebsiteKeyboardShortcutCheckbox.checked = this.data.disableWebsiteKeyboardShortcut;
        this.elem.disableClickToLoginCheckbox.checked = this.data.disableClickToLogin;
        this.elem.disableShadowRootCheckbox.checked = this.data.disableShadowRoot;
    }
    async handleSettingClick(e) {
        try {
            const target = e.target;
            const parentElem = js.dom.findParent({ selector: target, criteria: x => x.matches(".advanced-settings-field"), limitTop: this.elem.container });
            if (!parentElem) {
                return;
            }
            const checkboxInput = js.selector.selectFrom(parentElem, `input[type="checkbox"]`);
            checkboxInput.checked = !checkboxInput.checked;
            const settingName = checkboxInput.dataset.setting_name;
            if (!settingName) {
                throw "NO_SETTING_NAME";
            }
            const settingValue = checkboxInput.checked;
            settingsTab.changeSetting(settingName, settingValue);
        }
        catch (e) {
            logError(e);
        }
    }
}
