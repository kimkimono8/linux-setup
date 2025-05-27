import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { InvalidCharConsumer } from "../../../../common/ui/util/InvalidCharConsumer.js";
import { regexUtil } from "../../../../common/util/regexUtil.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class BasePasswordAddNameLogoComponent {
    p = null;
    userLogoString = "";
    autoLogoString = "";
    createUI() {
        this.userLogoString = "";
        this.autoLogoString = "";
        this.addListeners();
    }
    async checkName() {
        try {
            this.setErrorMessage("");
            const newName = this.getName();
            if (!newName) {
                return;
            }
            const errorMsg = await this.checkPasswordName(newName);
            const currentName = this.getName();
            const nameUpdated = currentName != newName;
            if (nameUpdated) {
                return;
            }
            this.setErrorMessage(errorMsg);
        }
        catch (e) {
            logError(e);
        }
    }
    async checkFinalName() {
        try {
            const name = this.getName();
            const errorMsg = await this.checkPasswordName(name);
            this.setErrorMessage(errorMsg);
            const isValid = !Boolean(errorMsg);
            if (isValid) {
                return true;
            }
            const input = this.getNameInput();
            UIUtil1.inst.scrollIntoView(input);
            input.focus();
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    async checkPasswordName(name) {
        try {
            if (!name) {
                return i18n(VI18N.PLEASE_ENTER) + " " + i18n(VI18N.PASSWORD).toLocaleLowerCase() + " " + i18n(VI18N.NAME).toLocaleLowerCase();
            }
            const invalidChars = regexUtil.getNonClearTextChars(name);
            if (invalidChars.length) {
                return i18n(VI18N.PASSWORD) + " " + this.p.util.getMustNotContain(VI18N.NAME, invalidChars);
            }
            return "";
        }
        catch (e) {
            logError(e);
            return e + "";
        }
    }
    setErrorMessage(errorMsg) {
        this.p.text("[data-field_row='name'] [data-error]", errorMsg);
    }
    setName(name) {
        try {
            const input = this.getNameInput();
            input.value = name;
            this.checkName();
        }
        catch (e) {
            logError(e);
        }
    }
    getName() {
        try {
            const name = this.getNameInput().value;
            return name;
        }
        catch (e) {
            logError(e);
            return "';";
        }
    }
    focusName() {
        this.getNameInput().focus();
    }
    getNameInput() {
        return this.p.select("[data-name]");
    }
    async setLogo(logoSrc) {
        try {
            this.userLogoString = logoSrc;
            this.showPreview(logoSrc);
        }
        catch (e) {
            logError(e);
        }
    }
    showPreview(logoSrc) {
        try {
            if (!logoSrc) {
                return;
            }
            const logoPreview = this.p.select("[data-logo_preview]");
            logoPreview.src = logoSrc;
            logoPreview.parentElement.classList.add("add-password-display-icon-remove");
        }
        catch (e) {
            logError(e);
        }
    }
    async removeLogo() {
        try {
            this.userLogoString = "";
            this.autoLogoString = "";
            const logoPreview = this.p.select("[data-logo_preview]");
            logoPreview.src = "/images/password/icon-upload.svg";
            logoPreview.parentElement.classList.remove("add-password-display-icon-remove");
        }
        catch (e) {
            logError(e);
        }
    }
    getApiLogoInput() {
        try {
            const logoString = this.userLogoString || this.autoLogoString || "";
            return logoString;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async updateAutoLogo(url) {
        try {
            if (this.userLogoString) {
                return;
            }
            const logo = await bgApi.other.getLogo(url);
            if (!logo) {
                return;
            }
            this.autoLogoString = logo;
            this.showPreview(logo);
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        const nameInput = this.getNameInput();
        new InvalidCharConsumer().consumeInvalidChars(nameInput, regexUtil.vaultRegex.cleartext);
    }
}
