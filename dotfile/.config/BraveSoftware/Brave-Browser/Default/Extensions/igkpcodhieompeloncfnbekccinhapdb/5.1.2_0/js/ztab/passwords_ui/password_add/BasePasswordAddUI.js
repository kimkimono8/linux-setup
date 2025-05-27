import { ZVError } from "../../../common/error/ZVError.js";
import { UIUtil1 } from "../../../common/ui/ui_util.js";
import { cardFillingUtil } from "../../../common/util/cardFillingUtil.js";
import { SecretType } from "../../../src/service/bgApi/types/SecretType.js";
import { ADDRESS_FIELDS } from "../../../src/vutil/types/PasswordCategory.js";
import { BasePasswordFormUI } from "../BasePasswordFormUI.js";
export class BasePasswordAddUI extends BasePasswordFormUI {
    containerSelector = "#add_password_container";
    overlaySelector = "#add_password_overlay";
    templateSelector = "#add_password_template";
    p = null;
    listener = null;
    util = null;
    secretTypeComponent = null;
    nameLogoComponent = null;
    policyComponent = null;
    totpComponent = null;
    notesComponent = null;
    urlComponent = null;
    tagComponent = null;
    descriptionComponent = null;
    classificationComponent = null;
    customFieldComponent = null;
    fileComponent = null;
    oneAuthSecretsComponent = null;
    async init() {
        this.util.p = this;
        this.listener.p = this;
        this.secretTypeComponent.p = this;
        this.nameLogoComponent.p = this;
        this.policyComponent.p = this;
        this.totpComponent.p = this;
        this.notesComponent.p = this;
        this.urlComponent.p = this;
        this.tagComponent.p = this;
        this.descriptionComponent.p = this;
        this.classificationComponent.p = this;
        this.customFieldComponent.p = this;
        this.fileComponent.p = this;
        this.oneAuthSecretsComponent.p = this;
    }
    async showUI() {
        await this.init();
        if (this.elem) {
            this.elem.remove();
        }
        this.elem = UIUtil.createElem({ preRender: true, template: this.templateSelector });
        await this.createUI();
        this.showContainer();
        this.nameLogoComponent.focusName();
    }
    async createUI() {
        await this.oneAuthSecretsComponent.createUI();
        await this.secretTypeComponent.createUI();
        this.nameLogoComponent.createUI();
        await this.policyComponent.createUI();
        this.totpComponent.createUI();
        this.urlComponent.createUI();
        await this.tagComponent.createUI();
        this.descriptionComponent.createUI();
        this.customFieldComponent.createUI();
        await this.classificationComponent.createUI();
        this.addSlimScroll();
    }
    addSlimScroll() {
        try {
            const scrollElem = this.select(".add_password_form_scrollable_div");
            if (scrollElem) {
                UIUtil1.inst.slimScroll(scrollElem, document.documentElement.clientHeight - 165);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getContainerSelector() {
        return this.containerSelector;
    }
    getBasePasswordsUI() {
        return this.p;
    }
    isEmptyInput(input) {
        try {
            if (!input) {
                throw "EMPTY_INPUT";
            }
            switch (input.type) {
                case SecretType.FIELD_TYPE.TEXT:
                case SecretType.FIELD_TYPE.PASSWORD:
                case SecretType.FIELD_TYPE.TEXTAREA:
                    return !Boolean(input.value);
            }
            if (input.type == SecretType.FIELD_TYPE.FILE) {
                const fileSource = this.fileComponent.getFileSource(input);
                return fileSource.isEmpty();
            }
            throw "NEW_CASE";
        }
        catch (e) {
            logError(e);
            return true;
        }
    }
    async setValidityValues(validity) {
        if (!validity) {
            return;
        }
        try {
            const month = cardFillingUtil.extractCardMonth(validity);
            const year = cardFillingUtil.extractCardYear(validity);
            $('[data-expiry_year]').val(year).trigger("change");
            $('[data-expiry_month]').val(month).trigger("change");
        }
        catch (e) {
            throw logError(e);
        }
    }
    async setDropDownValues(secretData) {
        try {
            const country = secretData[ADDRESS_FIELDS.COUNTRY];
            const state = secretData[ADDRESS_FIELDS.STATE];
            const city = secretData[ADDRESS_FIELDS.CITY];
            this.fillAddressDropdown(country, ADDRESS_FIELDS.COUNTRY);
            setTimeout(() => { this.fillAddressDropdown(state, ADDRESS_FIELDS.STATE); }, 100);
            setTimeout(() => { this.fillAddressDropdown(city, ADDRESS_FIELDS.CITY); }, 200);
        }
        catch (e) {
            throw ZVError.error(e);
        }
    }
    async fillAddressDropdown(value, fieldName) {
        const field = $('select[name="' + fieldName + '"]');
        if ($('select[name="' + fieldName + '"] option[value="' + value + '"]').length) {
            field.val(value).trigger("change");
            return;
        }
        let opt = document.createElement("option");
        opt.value = value;
        opt.innerHTML = value;
        opt.selected = true;
        field.append(opt);
    }
}
