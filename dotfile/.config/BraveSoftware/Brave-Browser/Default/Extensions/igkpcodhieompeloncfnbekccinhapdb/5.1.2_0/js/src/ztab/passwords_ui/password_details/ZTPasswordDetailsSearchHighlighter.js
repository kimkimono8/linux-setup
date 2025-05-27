import { PasswordDetailsSearchHighlight, PasswordDetailsSearchHighlighter } from "../../../common/ui/passwords_ui/password_details/PasswordDetailsSearchHighlighter.js";
import { TextHighlighter } from "../../../uiUtil/export.js";
export class ZTPasswordDetailsSearchHighlighter extends PasswordDetailsSearchHighlighter {
    async highlightSearch() {
        try {
            this.removeHighlight();
            await super.highlightSearch();
        }
        catch (e) {
            logError(e);
        }
    }
    removeHighlight() {
        const highlightedElems = js.selector.selectAll("." + TextHighlighter.getHighlightSpanClass(), this.elem);
        highlightedElems.forEach(x => x.replaceWith(x.textContent));
    }
    highlightWordMatch() {
        new ZTPasswordDetailsSearchHighlight(this.elem, this.searchString, this.secret).highlightExact();
    }
    highlightWordInclude() {
        new ZTPasswordDetailsSearchHighlight(this.elem, this.searchString, this.secret).highlightInclude();
    }
}
class ZTPasswordDetailsSearchHighlight extends PasswordDetailsSearchHighlight {
    highlightTags() {
        const reqTag = this.getRequiredTag();
        const tagElem = js.selector.selectFrom(this.elem, `[data-tag="${reqTag}"]`);
        js.dom.setContent(tagElem, TextHighlighter.highlight(this.searchString, reqTag));
    }
    getRequiredTag() {
        const tags = this.secret.tags;
        const exactMatch = tags.find(x => x.toLocaleLowerCase() == this.searchString);
        if (exactMatch) {
            return exactMatch;
        }
        return tags.find(x => x.toLocaleLowerCase().includes(this.searchString));
    }
}
