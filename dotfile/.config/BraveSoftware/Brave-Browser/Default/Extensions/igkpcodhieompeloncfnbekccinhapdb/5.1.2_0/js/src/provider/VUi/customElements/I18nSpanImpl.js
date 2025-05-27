export class I18nSpanImpl extends HTMLElement {
    key = "";
    constructor() {
        super();
        this.key = this.textContent;
    }
    connectedCallback() {
        this.setI18n(this.key);
    }
    setI18n(s) {
        const [key, ...placeholders] = s.split(",");
        super.textContent = brApi.i18n.textOf(key, placeholders);
    }
    get textContent() {
        return super.textContent;
    }
    set textContent(x) {
        this.setI18n(x);
    }
    setText(key, ...placeholders) {
        super.textContent = brApi.i18n.textOf(key, placeholders);
    }
    toString() {
        return "test";
    }
}
export class NoI18nSpanImpl extends HTMLElement {
}
