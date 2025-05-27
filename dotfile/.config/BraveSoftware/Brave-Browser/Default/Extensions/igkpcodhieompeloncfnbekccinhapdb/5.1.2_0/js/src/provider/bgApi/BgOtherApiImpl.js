export class BgOtherApiImpl {
    context;
    prefix = "other.";
    constructor(context) {
        this.context = context;
    }
    async updateLastActive() {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateLastActive.name });
    }
    async copyToClipboard(text, options) {
        return this.context.apiClient.callApi({ path: this.prefix + this.copyToClipboard.name, args: [text, options] });
    }
    async getLogo(url) {
        return this.context.apiClient.callApi({ path: this.prefix + this.getLogo.name, args: [url] });
    }
    async closeUnlockTab() {
        return this.context.apiClient.callApi({ path: this.prefix + this.closeUnlockTab.name });
    }
    async sendRuntimeMessage(msg) {
        return this.context.apiClient.callApi({ path: this.prefix + this.sendRuntimeMessage.name, args: [msg] });
    }
    async clearClipboard() {
        return this.context.apiClient.callApi({ path: this.prefix + this.clearClipboard.name });
    }
    updateLogo(force) {
        return this.context.apiClient.callApi({ path: this.prefix + this.updateLogo.name, args: [force] });
    }
    echo(x) {
        return this.context.apiClient.callApi({ path: this.prefix + this.echo.name, args: [x] });
    }
    sidePanelClosed() {
        return this.context.apiClient.callApi({ path: this.prefix + this.sidePanelClosed.name });
    }
    devToolsOpened(tabId) {
        return this.context.apiClient.callApi({ path: this.prefix + this.devToolsOpened.name, args: [tabId] });
    }
    devToolsCloseTab() {
        return this.context.apiClient.callApi({ path: this.prefix + this.devToolsCloseTab.name });
    }
}
