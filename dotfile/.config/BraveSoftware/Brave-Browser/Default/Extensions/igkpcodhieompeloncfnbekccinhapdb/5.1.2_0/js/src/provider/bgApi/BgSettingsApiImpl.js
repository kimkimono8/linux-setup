export class BgSettingsApiImpl {
    context;
    prefix = "settings.";
    neverSave;
    constructor(context) {
        this.context = context;
        this.neverSave = new BgSettingsNeverSaveApiImpl(context);
    }
    change(name, value) {
        return this.context.apiClient.callApi({ path: this.prefix + this.change.name, args: [name, value] });
    }
    setFont(font) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setFont.name, args: [font] });
    }
    setDarkMode(enable) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setDarkMode.name, args: [enable] });
    }
    isSystemLockSupported() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isSystemLockSupported.name });
    }
    setThemeColor(color) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setThemeColor.name, args: [color] });
    }
}
class BgSettingsNeverSaveApiImpl {
    context;
    prefix = "settings.neverSave.";
    constructor(context) {
        this.context = context;
    }
    async add(domain) {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.add.name, args: [domain] }));
    }
    async remove(domain) {
        return fnOut.parse(await this.context.apiClient.callApi({ path: this.prefix + this.remove.name, args: [domain] }));
    }
    getAll() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getAll.name });
    }
    isPresent(domain) {
        return this.context.apiClient.callApi({ path: this.prefix + this.isPresent.name, args: [domain] });
    }
}
