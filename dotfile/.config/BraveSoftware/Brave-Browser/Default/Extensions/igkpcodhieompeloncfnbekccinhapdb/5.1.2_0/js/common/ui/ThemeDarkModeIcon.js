export class ThemeDarkModeIcon {
    setDarkMode(enable) {
        enable ? this.enableDarkMode() : this.disableDarkMode();
    }
    async enableDarkMode() {
        const iconElem = js.selector.select("#dark_mode_icon");
        if (!iconElem) {
            return;
        }
        iconElem.className = "icon-light-theme";
        iconElem.dataset.tooltip_content = "i18n:turn_off_dark_mode";
        const settingsDarkModeElem = js.selector.select("#dark_mode");
        if (settingsDarkModeElem) {
            settingsDarkModeElem.checked = true;
        }
    }
    async disableDarkMode() {
        const iconElem = js.selector.select("#dark_mode_icon");
        if (!iconElem) {
            return;
        }
        iconElem.className = "icon-dark-theme";
        iconElem.dataset.tooltip_content = "i18n:turn_on_dark_mode";
        const settingsDarkModeElem = js.selector.select("#dark_mode");
        if (settingsDarkModeElem) {
            settingsDarkModeElem.checked = false;
        }
    }
}
