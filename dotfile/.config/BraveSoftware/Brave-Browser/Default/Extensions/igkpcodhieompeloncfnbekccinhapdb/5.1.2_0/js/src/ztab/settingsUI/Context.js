import { NeverSaveElem } from "./NeverSaveElem.js";
import { UI } from "./SettingsUI.UI.js";
import { AdvancedSettingsUI } from "./advanced/AdvancedSettings.UI.js";
import { SettingsTabUI } from "./settings/SettingsTab.UI.js";
export let settingsUI = new UI();
export let settingsTab = null;
export let advancedSettingsTab = null;
class Context {
    neverSaveElem;
    init() {
        this.neverSaveElem = new NeverSaveElem();
        settingsTab = new SettingsTabUI();
        advancedSettingsTab = new AdvancedSettingsUI();
        settingsUI.init();
        this.neverSaveElem.init();
    }
}
export const context = new Context();
