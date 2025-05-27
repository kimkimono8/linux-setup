import { bgEventServer } from "../../src/bg/Context.js";
import { bg } from "../../src/bg/bg.js";
import { VtSettings } from "../../src/service/vt/constants/VtSettings.js";
export class ThemeHandler {
    async setColor(color) {
        await zlocalStorage.save(VtSettings.THEME, color);
        bgEventServer.settings.themeChanged();
        await bg.vaultSettings.changeSettingInServer(bg.vaultSettings.SERVER_NAME.THEME, color.toUpperCase() + "THEME");
    }
    async setDarkMode(enable) {
        await zlocalStorage.save(VtSettings.DARK_MODE, enable);
        bgEventServer.settings.themeChanged();
        await bg.vaultSettings.changeSettingInServer(bg.vaultSettings.SERVER_NAME.DARK_MODE, (+enable) + "");
    }
    async setFont(font) {
        await zlocalStorage.save(VtSettings.FONT, font);
        bgEventServer.settings.themeChanged();
        await bg.vaultSettings.changeSettingInServer(bg.vaultSettings.SERVER_NAME.FONT, font.toLowerCase());
    }
}
