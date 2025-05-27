export class BgTabApiImpl {
    context;
    prefix = "tab.";
    constructor(context) {
        this.context = context;
    }
    async loadFromMemory(key, defaultVal) {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadFromMemory.name, args: [key, defaultVal] });
    }
    async loadFromDomainMemory(key, defaultVal) {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadFromDomainMemory.name, args: [key, defaultVal] });
    }
    async saveToMemory(key, val) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveToMemory.name, args: [key, val] });
    }
    async saveToDomainMemory(key, val, allowedDomains) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveToDomainMemory.name, args: [key, val, allowedDomains] });
    }
    async removeFromMemory(key) {
        return this.context.apiClient.callApi({ path: this.prefix + this.removeFromMemory.name, args: [key] });
    }
    async clearMemory() {
        return this.context.apiClient.callApi({ path: this.prefix + this.clearMemory.name });
    }
    async showConfirmFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.showConfirmFrame.name });
    }
    async closeFrame() {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeFrame.name });
    }
    async getFrameId() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getFrameId.name });
    }
    async getTabDomain() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTabDomain.name });
    }
    async getTabUrl() {
        return this.context.apiClient.callApi({ path: this.prefix + this.getTabUrl.name });
    }
    async saveZIconSelector(selector) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveZIconSelector.name, args: [selector] });
    }
    async loadZIconSelectors() {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadZIconSelectors.name });
    }
    async isNeverSaveUrl() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isNeverSaveUrl.name });
    }
    async allowPermanentUse(secretId, allowedUrl) {
        return this.context.apiClient.callApi({ path: this.prefix + this.allowPermanentUse.name, args: [secretId, allowedUrl] });
    }
    async finishReset(successfull) {
        return this.context.apiClient.callApi({ path: this.prefix + this.finishReset.name, args: [successfull] });
    }
    async setConfirmUse(frameId, allow) {
        return this.context.apiClient.callApi({ path: this.prefix + this.setConfirmUse.name, args: [frameId, allow] });
    }
    async closeTab() {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeTab.name });
    }
    async closeTabWithId(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeTabWithId.name, args: [tabId] });
    }
    async checkDevToolsOpen() {
        return this.context.apiClient.callApi({ path: this.prefix + this.checkDevToolsOpen.name });
    }
    async showAlert(config) {
        return this.context.apiClient.callApi({ path: this.prefix + this.showAlert.name, args: [config] });
    }
    async checkConnectable() {
        return this.context.apiClient.isConnectable();
    }
    downloadFileInCS(param) {
        return this.context.apiClient.callApi({ path: this.prefix + this.downloadFileInCS.name, args: [param] });
    }
    async loadZMapsCountries() {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsCountries.name });
    }
    async loadZMapsStates(country) {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsStates.name, args: [country] });
    }
    async loadZMapsDistricts(country, state) {
        return this.context.apiClient.callApi({ path: this.prefix + this.loadZMapsDistricts.name, args: [country, state] });
    }
    async saveNewCountry(country) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveNewCountry.name, args: [country] });
    }
    async saveNewState(country, state) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveNewState.name, args: [country, state] });
    }
    async saveNewCity(country, state, city) {
        return this.context.apiClient.callApi({ path: this.prefix + this.saveNewCity.name, args: [country, state, city] });
    }
    isLoginDomainPath() {
        return this.context.apiClient.callApi({ path: this.prefix + this.isLoginDomainPath.name });
    }
    hasDevToolsOpened() {
        return this.context.apiClient.callApi({ path: this.prefix + this.hasDevToolsOpened.name });
    }
}
