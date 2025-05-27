import { Theme } from "../common/ui/Theme.js";
import { ThemeDarkModeIcon } from "../common/ui/ThemeDarkModeIcon.js";
import { settingsUI } from "../src/ztab/settingsUI/export.js";
export class ZTabTheme extends Theme {
    icon = new ThemeDarkModeIcon();
    refreshUI(_color, darkMode) {
        settingsUI.refreshUI();
        this.icon.setDarkMode(darkMode);
    }
    getThemeClass() {
        return super.getThemeClass() + " ext-app-view";
    }
}
