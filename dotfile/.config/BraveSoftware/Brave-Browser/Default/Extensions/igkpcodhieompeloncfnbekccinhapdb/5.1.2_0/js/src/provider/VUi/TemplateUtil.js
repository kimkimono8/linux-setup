export class TemplateUtil {
    create(params) {
        try {
            const templateElem = js.selector.select(params.template);
            if (!templateElem) {
                throw "NO_TEMPLATE_ELEM: " + params.template;
            }
            const elem = templateElem.content.cloneNode(true).firstElementChild;
            this.addI18n(elem);
            if (params.preRender) {
                this.preRender(elem);
            }
            return elem;
        }
        catch (e) {
            logError(e);
            return document.createElement("div");
        }
    }
    addI18n(elem) {
        try {
            const elems = js.selector.selectAll("[data-i18n_key]", elem);
            for (let elem of elems) {
                const [key, ...args] = elem.dataset.i18n_key.split(",");
                elem.textContent = i18n(key, ...args) || elem.textContent;
            }
            this.addI18nToPlaceHolders(elem);
        }
        catch (e) {
            logError(e);
        }
    }
    addI18nToPlaceHolders(elem) {
        try {
            const inputs = js.selector.selectAll("input[placeholder^='i18n:']", elem);
            const SLICE_START = "i18n:".length;
            let i18nKey = "";
            for (let input of inputs) {
                i18nKey = input.placeholder.slice(SLICE_START);
                input.placeholder = i18n(i18nKey) || "";
            }
        }
        catch (e) {
            logError(e);
        }
    }
    preRender(elem) {
        const parent = this.getPreRenderParent();
        js.dom.setContent(parent, elem);
    }
    getPreRenderParent() {
        for (let i = 0; true; i++) {
            const curElem = js.selector.select("#pre_render_" + i);
            if (!curElem) {
                return this.createPreRenderElem(i);
            }
            if (curElem.firstElementChild) {
                continue;
            }
            return curElem;
        }
    }
    createPreRenderElem(n) {
        const elem = document.createElement("div");
        elem.classList.add("pre-render");
        elem.id = "pre_render_" + n;
        document.body.append(elem);
        return elem;
    }
}
