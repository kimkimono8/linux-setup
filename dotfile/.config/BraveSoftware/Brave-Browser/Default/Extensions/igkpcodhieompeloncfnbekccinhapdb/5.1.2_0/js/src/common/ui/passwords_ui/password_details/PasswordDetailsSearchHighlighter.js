import { globalNodeData } from "../../../../../common/ui/globalNodeData.js";
import { SecretHighlightFields } from "../../../../service/vt/constants/constants.js";
import { TextHighlighter } from "../../../../uiUtil/export.js";
import { SecretSearchUtil } from "../../../vault/SecretSearchUtil.js";
import { PasswordDetailsUtil } from "./PasswordDetailsUtil.js";
export class PasswordDetailsSearchHighlighter {
    elem = null;
    secret = null;
    searchString = "";
    secretType = null;
    init(elem, secret, searchString, secretType) {
        this.elem = elem;
        this.secret = secret;
        this.searchString = searchString.toLocaleLowerCase();
        this.secretType = secretType;
    }
    async highlightSearch() {
        try {
            const highlightField = await bgApi.secret.getSearchHighlightField(this.secret, this.searchString);
            const FIELD = SecretHighlightFields;
            switch (highlightField) {
                case FIELD.NAME:
                    this.highlightName();
                    return;
                case FIELD.UI_TEXT:
                    this.highlightUIText();
                    return;
                case FIELD.WORDS:
                    this.highlightWordMatch();
                    return;
                case FIELD.WORDS_INCLUDE:
                    this.highlightWordInclude();
                    return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    highlightName() {
        const nameElem = js.selector.selectFrom(this.elem, PasswordDetailsUtil.elem.NAME);
        js.dom.setContent(nameElem, TextHighlighter.highlight(this.searchString, this.secret.name));
    }
    highlightUIText() {
        const fieldName = this.getUIFieldName();
        if (!fieldName) {
            return;
        }
        const fieldValueElem = js.selector.selectFrom(this.elem, `[data-field_name="${fieldName}"] [data-value]`);
        if (!fieldValueElem) {
            return;
        }
        js.dom.setContent(fieldValueElem, TextHighlighter.highlight(this.searchString, fieldValueElem.textContent));
    }
    getUIFieldName() {
        try {
            for (let fieldName of this.secretType.ui_fields) {
                if (this.secret.encrypted.fields[fieldName]) {
                    return fieldName;
                }
            }
            return null;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    highlightWordMatch() {
        new PasswordDetailsSearchHighlight(this.elem, this.searchString, this.secret).highlightExact();
    }
    highlightWordInclude() {
        new PasswordDetailsSearchHighlight(this.elem, this.searchString, this.secret).highlightInclude();
    }
}
export class PasswordDetailsSearchHighlight {
    elem = null;
    searchString = "";
    secret = null;
    checkPresent = null;
    highlightUrlSearch = null;
    constructor(elem, searchString, secret) {
        this.elem = elem;
        this.searchString = searchString;
        this.secret = secret;
    }
    highlightExact() {
        this.checkPresent = this.checkPresentExact;
        this.highlightUrlSearch = this.highlightUrlExact;
        this.highlight();
    }
    highlightInclude() {
        this.checkPresent = this.checkPresentInclude;
        this.highlightUrlSearch = this.highlightUrlInclude;
        this.highlight();
    }
    highlight() {
        const tagSearchWords = SecretSearchUtil.getTagSearchWords(this.secret);
        if (this.checkPresent(tagSearchWords)) {
            this.highlightTags();
            return;
        }
        const descriptionSearchWords = SecretSearchUtil.getDescriptionSearchWords(this.secret);
        if (this.checkPresent(descriptionSearchWords)) {
            this.highlightElemValue(PasswordDetailsUtil.elem.DESCRIPTION, this.secret.description);
            return;
        }
        const urlSearchWords = SecretSearchUtil.getUrlSearchWords(this.secret);
        if (this.checkPresent(urlSearchWords)) {
            this.highlightUrlSearch();
            return;
        }
    }
    checkPresentExact(words) {
        return words.includes(this.searchString);
    }
    checkPresentInclude(words) {
        return words.some(x => x.includes(this.searchString));
    }
    highlightElemValue(selector, value) {
        const reqElem = js.selector.selectFrom(this.elem, selector);
        js.dom.setContent(reqElem, TextHighlighter.highlight(this.searchString, value));
    }
    highlightTags() {
        this.highlightElemValue(PasswordDetailsUtil.elem.TAG, this.secret.tags.join(", "));
    }
    highlightUrlExact() {
        new UrlSearchHighlight(this.elem, this.searchString).highlightMatch();
    }
    highlightUrlInclude() {
        new UrlSearchHighlight(this.elem, this.searchString).highlightInclude();
    }
}
class UrlSearchHighlight {
    elem = null;
    searchString = "";
    checkDomain = null;
    constructor(elem, searchString) {
        this.elem = elem;
        this.searchString = searchString;
    }
    highlightMatch() {
        this.checkDomain = this.checkDomainMatch;
        this.highlight();
    }
    highlightInclude() {
        this.checkDomain = this.checkDomainInclude;
        this.highlight();
    }
    highlight() {
        const allUrlElems = js.selector.selectAll(PasswordDetailsUtil.elem.URL, this.elem);
        for (let urlElem of allUrlElems) {
            if (this.highlightUrlElem(urlElem)) {
                return;
            }
        }
    }
    highlightUrlElem(elem) {
        const { url } = globalNodeData.getNodeData(elem);
        if (!js.url.isValid(url)) {
            return false;
        }
        const domain = js.url.getParentDomain(url).toLocaleLowerCase();
        if (!this.checkDomain(domain)) {
            return false;
        }
        const urlValueElem = js.selector.selectFrom(elem, "[data-url]");
        js.dom.setContent(urlValueElem, TextHighlighter.highlightUrlDomain(this.searchString, url));
        return true;
    }
    checkDomainMatch(domain) {
        return domain == this.searchString;
    }
    checkDomainInclude(domain) {
        return domain.includes(this.searchString);
    }
}
