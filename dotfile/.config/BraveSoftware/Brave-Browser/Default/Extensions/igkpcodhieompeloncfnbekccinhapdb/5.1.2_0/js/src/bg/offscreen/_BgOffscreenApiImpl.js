import { VtApiPortNames } from "../../service/vt/constants/VtApiPortNames.js";
export class _BgOffscreenApiImpl {
    apiClient;
    setupPromise = null;
    init() {
        this.apiClient = portApi.createApiClient();
        this.apiClient.init({ name: VtApiPortNames.OFFSCREEN });
    }
    async copyToClipboard(text) {
        await this.setupDoc();
        return this.apiClient.callApi({ path: this.copyToClipboard.name, args: [text] });
    }
    async setupDoc() {
        if (this.setupPromise) {
            return this.setupPromise;
        }
        this.setupPromise = js.promise.createNew();
        try {
            const offscreenUrl = brApi.runtime.getUrl("/html/offscreen.html");
            if (await this.isAlreadyOpen(offscreenUrl)) {
                return;
            }
            await chrome.offscreen.createDocument({
                url: offscreenUrl,
                reasons: [chrome.offscreen.Reason.CLIPBOARD, chrome.offscreen.Reason.DOM_PARSER],
                justification: "for copying contents to clipboard, parsing dom(to get server error message - if error from server is of type text/html), getting websites favIcon"
            });
        }
        finally {
            this.setupPromise.resolve();
            this.setupPromise = null;
        }
    }
    async isAlreadyOpen(url) {
        try {
            const clients = await bgUtil.getClients();
            return clients.some(x => x.url == url);
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async parseDOMContents(htmlContent, ...selectors) {
        await this.setupDoc();
        return this.apiClient.callApi({ path: this.parseDOMContents.name, args: [htmlContent, ...selectors] });
    }
    async getLogo(src) {
        await this.setupDoc();
        return this.apiClient.callApi({ path: this.getLogo.name, args: [src] });
    }
}
