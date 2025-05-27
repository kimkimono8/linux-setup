import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { regexUtil } from "../../../../common/util/regexUtil.js";
export class BasePasswordAddUrlComponent {
    p = null;
    createUI() {
        try {
            const urlContainer = this.p.select("[data-url_container]");
            const url_row = this.getUrlRow();
            urlContainer.append(url_row);
        }
        catch (e) {
            logError(e);
        }
    }
    getUrlRow(n = "") {
        try {
            const elem = UIUtil.createElem({ template: "#add_password_url_row_template" });
            js.dom.setChildText(elem, "[data-url_n]", n);
            return elem;
        }
        catch (e) {
            logError(e);
            return document.createElement("div");
        }
    }
    addUrlBelow(urlRow) {
        try {
            const newUrlRow = this.getUrlRow();
            urlRow.after(newUrlRow);
            this.updateUrlNumbering();
            return newUrlRow;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    updateUrlNumbering() {
        try {
            const urlContainer = this.p.select("[data-url_container]");
            let count = 0;
            for (let url_row of Array.from(urlContainer.children)) {
                js.selector.selectFrom(url_row, "[data-url_n]").textContent = (++count) + "";
            }
            if (urlContainer.children.length == 1) {
                js.selector.selectFrom(urlContainer, "[data-url_n]").textContent = "";
            }
        }
        catch (e) {
            logError(e);
        }
    }
    checkUrlInput(input) {
        try {
            const errorElem = js.selector.selectFrom(js.selector.closest(input, "[data-field_row]"), "[data-error]");
            errorElem.textContent = "";
            const url = input.value;
            if (!url) {
                return true;
            }
            const validResult = regexUtil.checkValidVaultUrl(url);
            if (validResult.ok) {
                return true;
            }
            errorElem.textContent = validResult.error;
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkFinalUrlInputs() {
        try {
            const nonEmptyUrlInputs = this.getNonEmptyUrlInputs();
            const errorInput = nonEmptyUrlInputs.find(x => !this.checkUrlInput(x));
            if (!errorInput) {
                return true;
            }
            errorInput.focus();
            UIUtil1.inst.scrollIntoView(errorInput);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getNonEmptyUrlInputs() {
        try {
            const urlInputs = this.p.selectAll("[data-url_container] input");
            const nonEmptyUrlInputs = urlInputs.filter(x => x.value);
            return nonEmptyUrlInputs;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async autoFillLogo() {
        try {
            const firstUrlInput = this.p.select("[data-url_container] [data-url_row] input");
            const url = firstUrlInput.value;
            const isValidUrl = url && regexUtil.isValidVaultUrl(url);
            if (!isValidUrl) {
                return;
            }
            this.p.nameLogoComponent.updateAutoLogo(url);
        }
        catch (e) {
            logError(e);
        }
    }
    setUrls(urls) {
        try {
            if (!urls.length) {
                return;
            }
            const urlRow = this.p.select("[data-url_container] [data-url_row]");
            for (let i = 1; i < urls.length; i++) {
                this.addUrlBelow(urlRow);
            }
            const urlInputs = this.p.selectAll("[data-url_container] input");
            let curUrlInput;
            for (let i = 0; i < urls.length; i++) {
                curUrlInput = urlInputs[i];
                curUrlInput.value = urls[i];
                this.checkUrlInput(curUrlInput);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getUrls() {
        try {
            const nonEmptyUrlInputs = this.getNonEmptyUrlInputs();
            const urls = nonEmptyUrlInputs.map(x => x.value);
            return urls;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
}
