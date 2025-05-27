import { bgApiMain } from "../provider/bgApi/main.js";
import { vtMain } from "../provider/vt/main.js";
import { VtApiPortNames } from "../service/vt/constants/VtApiPortNames.js";
vtMain();
bgApiMain();
class OffscreenDoc {
    async main() {
        await vt.init({ logPrefix: "OFFSCREEN:" });
        const server = portApi.createApiServer();
        server.init({ name: VtApiPortNames.OFFSCREEN, fnObj: this });
    }
    init() { }
    async copyToClipboard(text) {
        js.dom.copyToClipboard(text);
    }
    async parseDOMContents(htmlContent, ...selectors) {
        try {
            selectors.pop();
            const dom = new DOMParser().parseFromString(htmlContent, "text/html");
            const elements = selectors.map(selector => dom.querySelector(selector));
            const contents = elements.map(x => x ? x.textContent : "");
            return contents;
        }
        catch (e) {
            console.error(e, e + "");
            return [];
        }
    }
    async getLogo(src) {
        return js.logo.getBase64Logo(src);
    }
}
const offscreenDoc = new OffscreenDoc();
offscreenDoc.main();
export default {};
