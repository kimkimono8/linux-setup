export class _BgOffscreenApiImplV2 {
    init() { }
    async copyToClipboard(text) {
        js.dom.copyToClipboard(text);
    }
    async parseDOMContents(htmlContent, ...selectors) {
        try {
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
    getLogo(src) {
        return js.logo.getBase64Logo(src);
    }
}
