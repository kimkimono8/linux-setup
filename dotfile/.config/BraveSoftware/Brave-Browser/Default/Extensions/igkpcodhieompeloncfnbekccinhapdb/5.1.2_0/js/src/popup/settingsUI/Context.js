import { SettingsUI } from "./SettingsUI.js";
class Context {
    settingsUI;
    init() {
        this.settingsUI = new SettingsUI();
    }
}
export const context = new Context();
