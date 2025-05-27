import { context } from "./Context.js";
export class VUtil {
    search = context.searchUtil;
    async getValidSaveDomains() {
        try {
            const urls = await this.getSaveUrls();
            const parentDomains = urls.map(x => js.url.getParentDomain(x));
            return parentDomains;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async getSaveUrls() {
        try {
            if (this.isTopFrame()) {
                return [window.location.href];
            }
            return [
                await bgApi.tab.getTabUrl(),
                window.location.href
            ];
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    isTopFrame() {
        try {
            return window == window.top;
        }
        catch (e) {
            return false;
        }
    }
}
