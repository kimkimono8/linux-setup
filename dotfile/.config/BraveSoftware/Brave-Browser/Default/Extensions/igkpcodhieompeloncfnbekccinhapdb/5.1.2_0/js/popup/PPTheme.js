import { Theme } from "../common/ui/Theme.js";
import { ThemeDarkModeIcon } from "../common/ui/ThemeDarkModeIcon.js";
export class PPTheme extends Theme {
    icon = new ThemeDarkModeIcon();
    refreshUI(color, darkMode) {
        color;
        this.icon.setDarkMode(darkMode);
    }
}
