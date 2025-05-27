import { VtColors } from "../../src/service/vt/constants/VtColors.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
import { setGlobal } from "../global/global.js";
export class Theme {
    static FONT = {
        OPENSANS: "OPENSANS",
        ZOHOPUVI: "ZOHOPUVI"
    };
    static instance = null;
    static get inst() {
        return this.instance || (this.instance = new Theme());
    }
    static async loadTheme() {
        const keyObj = {
            [VtSettings.THEME]: VtColors.BLUE,
            [VtSettings.DARK_MODE]: false,
            [VtSettings.FONT]: Theme.FONT.ZOHOPUVI
        };
        const stored = await zlocalStorage.loadAll(keyObj);
        const vaultTheme = {
            color: stored[VtSettings.THEME],
            darkMode: stored[VtSettings.DARK_MODE],
            font: stored[VtSettings.FONT],
        };
        return vaultTheme;
    }
    init() {
        this.refreshTheme();
    }
    async setColor(color) {
        return bgApi.settings.setThemeColor(color);
    }
    async setDarkMode(enable) {
        return bgApi.settings.setDarkMode(enable);
    }
    async setFont(font) {
        return bgApi.settings.setFont(font);
    }
    async refreshTheme() {
        const theme = await Theme.loadTheme();
        const fontClass = this.getFontClass(theme.font);
        const skinColor = "skin-" + theme.color;
        const darkModeClasss = theme.darkMode ? skinColor + "-nightmode nightmode" : "";
        const className = `${this.getThemeClass()} ${skinColor} ${fontClass} ${darkModeClasss}`;
        document.body.className = className;
        this.refreshUI(theme.color, theme.darkMode);
    }
    refreshUI(color, darkMode) {
        color;
        darkMode;
    }
    getThemeClass() {
        return "";
    }
    getFontClass(font) {
        switch (font) {
            case Theme.FONT.ZOHOPUVI: return "zvf-zohopuvi";
            case Theme.FONT.OPENSANS:
            default:
                return "zvf-opensans";
        }
    }
}
setGlobal(Theme.name, Theme);
