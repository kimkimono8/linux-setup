import { accountDb } from "../Context.js";
export class BgSettingsApiImpl {
    neverSave = new BgSettingsNeverSaveApiImpl();
    async change(name, value) {
        return bg.vaultSettings.changeSettingFromUI(name, value);
    }
    async setThemeColor(color) {
        return bg.themeHandler.setColor(color);
    }
    async setDarkMode(enable) {
        return bg.themeHandler.setDarkMode(enable);
    }
    async setFont(font) {
        return bg.themeHandler.setFont(font);
    }
    async isSystemLockSupported() {
        return bg.vaultSettings.supportsSystemLock();
    }
}
class BgSettingsNeverSaveApiImpl {
    async getAll() {
        return accountDb.neverSaveTable.loadAll();
    }
    async add(domain) {
        return bg.neverSaveUrls.addDomain(domain);
    }
    async remove(domain) {
        return bg.neverSaveUrls.removeDomain(domain);
    }
    async isPresent(domain) {
        return accountDb.neverSaveTable.has(domain);
    }
}
