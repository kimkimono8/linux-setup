export class _TextHighlighter {
    static highlight(pattern, text) {
        const reqPattern = pattern.toLocaleLowerCase();
        return this.highlightInclude(reqPattern, text) ||
            this.highlightPattern(reqPattern, text);
    }
    static highlightUrlDomain(pattern, url) {
        try {
            if (!js.url.isValid(url)) {
                return null;
            }
            const urlObj = new URL(url);
            const domain = js.url.getParentDomain(url);
            const highlightedNode = this.highlight(pattern, domain);
            const preDomain = urlObj.hostname.slice(0, urlObj.hostname.length - domain.length);
            const splitMark = "x".repeat(url.length);
            urlObj.hostname = splitMark;
            const parts = (urlObj + "").split(splitMark);
            const fragment = document.createDocumentFragment();
            fragment.append(parts[0], preDomain, highlightedNode, parts[1]);
            return fragment;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    static highlightInclude(pattern, text) {
        const index = text.toLocaleLowerCase().indexOf(pattern);
        if (index == -1) {
            return null;
        }
        const parts = [
            text.slice(0, index),
            this.getHighlightSpan(text.slice(index, index + pattern.length)),
            text.slice(index + pattern.length)
        ];
        return this.getFragment(parts);
    }
    static getHighlightSpan(ch) {
        const span = document.createElement("span");
        span.textContent = ch;
        span.className = this.getHighlightSpanClass();
        return span;
    }
    static getHighlightSpanClass() {
        return "match-highlight-text";
    }
    static highlightPattern(pattern, text) {
        const nodes = text.split("");
        let patternI = 0;
        for (let i = 0; patternI < pattern.length && i < text.length; i++) {
            if (pattern[patternI] == text[i].toLocaleLowerCase()) {
                nodes[i] = this.getHighlightSpan(text[i]);
                patternI++;
            }
        }
        return this.getFragment(nodes);
    }
    static getFragment(parts) {
        const fragment = document.createDocumentFragment();
        fragment.append(...parts);
        return fragment;
    }
}
