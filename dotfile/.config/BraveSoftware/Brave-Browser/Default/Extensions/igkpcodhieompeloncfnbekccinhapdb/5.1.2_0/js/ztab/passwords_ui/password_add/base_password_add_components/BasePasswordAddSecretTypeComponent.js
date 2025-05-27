import { globalNodeData } from "../../../../common/ui/globalNodeData.js";
import { cardFillingUtil } from "../../../../common/util/cardFillingUtil.js";
import { formUtil } from "../../../../common/util/formUtil.js";
import { Policy } from "../../../../src/service/bgApi/types/Generator.js";
import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { ADDRESS_FIELDS, CARD_FIELDS } from "../../../../src/vutil/types/PasswordCategory.js";
import { BaseAddressComponent } from "./BaseAddressComponent.js";
import { SecretTypeFieldElemCreator } from "./SecretTypeFieldElemCreator.js";
const FIELD_TYPE = SecretType.FIELD_TYPE;
export class BasePasswordAddSecretTypeComponent {
    p = null;
    editSecretData = null;
    inputSelector = "[data-fields_container] input, [data-fields_container] textarea" +
        ", [data-optional_file_fields] input, [data-optional_file_fields] textarea";
    fieldCreator = new SecretTypeFieldElemCreator();
    addressComponent = new BaseAddressComponent();
    additionalFieldsData;
    additionalFileFields = {};
    fileAllowed = true;
    async createUI() {
    }
    getAdditionalFields() {
        const oneauth_secrets = "[data-oneauthsecretscontainer]";
        const url = "[data-url_container]";
        const totp = "#totp_fields";
        const description = "[data-description_container]";
        const notes = "#notes";
        return { oneauth_secrets, url, description, totp, notes };
    }
    async alterFormData(category) {
        const policyUsage = await this.p.policyComponent.getPolicyUsage();
        policyUsage != Policy.USAGE.DEFAULT ? this.p.show("[data-policy_container]") : this.p.hide("[data-policy_container]");
        this.additionalFieldsData = this.getAdditionalFields();
        switch (category.name) {
            case SecretType.DEFAULT.WEB_ACCOUNT:
            case SecretType.DEFAULT.BANK_ACCOUNT:
            case SecretType.DEFAULT.WINDOWS:
            case SecretType.DEFAULT.UNIX:
                if (category.added_by == "") {
                    delete this.additionalFieldsData.url;
                }
                break;
            case SecretType.DEFAULT.PAYMENT_CARD:
                delete this.additionalFieldsData.notes;
                this.p.hide("[data-policy_container]");
                break;
            case SecretType.DEFAULT.ADDRESS:
                this.p.hide("[data-policy_container]");
                break;
            default:
                if (category.added_by != "") {
                    delete this.additionalFieldsData.url;
                }
        }
        if (!this.p.oneAuthSecretsComponent.oneAuthConfigured) {
            delete this.additionalFieldsData.oneauth_secrets;
        }
        if (!this.additionalFieldsData.notes) {
            this.p.show("#notes");
        }
        this.hideAdditionalFields();
    }
    showRemoveAdditionalField(selector) {
        try {
            this.p.show(selector);
            const additionalFieldList = this.p.select('[data-additionalFieldsList]');
            const fieldElem = js.selector.selectFrom(additionalFieldList, "[data-field_selector='" + selector + "']");
            fieldElem.closest("li").remove();
        }
        catch (e) {
            logError(e);
        }
    }
    async hideAdditionalFields() {
        await this.removeUsedFields();
        this.p.select('[data-additionalFieldsList]').textContent = "";
        const afData = Object.keys(this.additionalFieldsData);
        const fileData = Object.keys(this.additionalFileFields);
        if (afData.length + fileData.length == 0) {
            this.p.hide("[data-additional_fields]");
            return;
        }
        const selectAllOption = '[data-additional_fields_select_all]';
        (afData.length + fileData.length < 2) ? this.p.hide(selectAllOption) : this.p.show(selectAllOption);
        for (let field of afData) {
            this.setAdditionalField(field, this.additionalFieldsData[field]);
            this.p.hide(this.additionalFieldsData[field]);
        }
        for (let fieldName of fileData) {
            const fieldLabel = this.additionalFileFields[fieldName];
            const selector = "[data-name='" + fieldName + "']";
            this.setAdditionalField(fieldLabel, selector, false);
            this.p.hide(selector);
        }
    }
    async removeUsedFields() {
        if (!this.editSecretData) {
            return;
        }
        const secret = this.editSecretData;
        if (this.additionalFieldsData.url && secret.urls.length > 0) {
            delete this.additionalFieldsData.url;
        }
        if (this.additionalFieldsData.totp && secret.totpUrl.length > 0) {
            delete this.additionalFieldsData.totp;
        }
        if (this.additionalFieldsData.description && secret.description.length > 0) {
            delete this.additionalFieldsData.description;
        }
        const oneAuthConfigured = this.p.oneAuthSecretsComponent.oneAuthConfigured;
        if (this.additionalFieldsData.oneauth_secrets && secret.oneauthId.length > 0 && oneAuthConfigured) {
            delete this.additionalFieldsData.oneauth_secrets;
        }
        if (this.additionalFieldsData.custom_fields && secret.customColumns.length > 0) {
            delete this.additionalFieldsData.custom_fields;
        }
        if (this.additionalFieldsData.notes && secret.notes.length > 0) {
            delete this.additionalFieldsData.notes;
        }
        await this.removeUsedFileFields();
    }
    async removeUsedFileFields() {
        if (this.editSecretData.files.length == 0) {
            return;
        }
        for (let fileData of this.editSecretData.files) {
            if (this.additionalFileFields[fileData.column]) {
                delete this.additionalFileFields[fileData.column];
            }
        }
    }
    async setAdditionalField(fieldLabel, selector, needI18N = true) {
        const additionFieldsList = this.p.select('[data-additionalFieldsList]');
        const elem = UIUtil.createElem({ template: "#additional_field_item" });
        const checkbox = js.selector.selectFrom(elem, "[data-field_selector]");
        checkbox.dataset.field_selector = selector;
        const listener = this.editSecretData ? "password_edit" : "password_add";
        checkbox.dataset.on_click = listener + ".clickedAdditionalFieldItem";
        additionFieldsList.append(elem);
        const label = js.selector.selectFrom(elem, "[data-fieldName]");
        label.innerText = needI18N ? await i18n(fieldLabel) : fieldLabel;
    }
    async addAddressFields(secretType) {
        const fieldsFragment = document.createDocumentFragment();
        const twoFields = document.createElement('div');
        twoFields.setAttribute("class", "zv-label-group-panel-two-col");
        const fieldsContainer = this.p.select("[data-fields_container]");
        const files_fragment_optional = document.createDocumentFragment();
        js.dom.setContent(this.p.select("[data-optional_file_fields]"), files_fragment_optional);
        for (let field of secretType.fields) {
            if (field.isDeleted) {
                continue;
            }
            switch (field.name) {
                case ADDRESS_FIELDS.ZIP:
                case ADDRESS_FIELDS.MOBILE:
                    twoFields.append(this.fieldCreator.createAddress(field).elem);
                    break;
                default:
                    fieldsFragment.append(this.fieldCreator.createAddress(field).elem);
                    break;
            }
        }
        fieldsFragment.append(twoFields);
        js.dom.setContent(fieldsContainer, fieldsFragment);
        await this.addressComponent.formatAddressFields(fieldsContainer);
        await this.alterFormData(secretType);
    }
    async addCardFields(secretType) {
        const fieldsFragment = document.createDocumentFragment();
        const twoFields = document.createElement('div');
        twoFields.setAttribute("class", "zv-label-group-panel-two-col");
        const fields_container = this.p.select("[data-fields_container]");
        const files_fragment_optional = document.createDocumentFragment();
        js.dom.setContent(this.p.select("[data-optional_file_fields]"), files_fragment_optional);
        for (let field of secretType.fields) {
            if (field.isDeleted) {
                continue;
            }
            switch (field.name) {
                case CARD_FIELDS.CVV:
                case CARD_FIELDS.VALID_UPTO:
                    twoFields.append(this.fieldCreator.createCard(field).elem);
                    break;
                default:
                    fieldsFragment.append(this.fieldCreator.createCard(field).elem);
                    break;
            }
        }
        fieldsFragment.append(twoFields);
        js.dom.setContent(fields_container, fieldsFragment);
        this.formatValidityDropdowns(fields_container);
        await this.alterFormData(secretType);
    }
    async formatValidityDropdowns(fields_container) {
        const selectTags = fields_container.querySelectorAll('select');
        for (let tag of selectTags) {
            if (tag.name == "expiry_year") {
                let year = new Date().getFullYear();
                for (let i = -1; i <= 30; i++) {
                    let opt = document.createElement("option");
                    opt.value = i < 0 ? "0" : (year + i);
                    opt.textContent = i < 0 ? "yyyy" : year + i + "";
                    tag.append(opt);
                }
            }
            $(tag).select2({
                minimumResultsForSearch: -1
            });
            $(tag).on("change", this.setValidityValues);
        }
    }
    async setValidityValues() {
        const month = $('[data-expiry_month]').val();
        const year = $('[data-expiry_year]').val();
        const validity = cardFillingUtil.getValidThru(month, year);
        $('#text_valid_thru').val(validity);
    }
    async addSecretTypeFields(typeId) {
        try {
            const secretType = await bgApi.secretType.get(typeId);
            this.fileAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_FILE_ATTACHMENT, true);
            this.additionalFileFields = {};
            const isPaymentCard = await formUtil.isPaymentCardCategory(secretType.id);
            const isAddress = await formUtil.isAddressCategory(secretType.id);
            if (isPaymentCard) {
                this.addCardFields(secretType);
                return;
            }
            if (isAddress) {
                this.addAddressFields(secretType);
                return;
            }
            const fields_container = this.p.select("[data-fields_container]");
            const fieldsFragment = document.createDocumentFragment();
            const files_fragment_optional = document.createDocumentFragment();
            const filteredFields = secretType.fields.filter(x => !x.isDeleted);
            const fileRestrictionFilteredFields = this.removeFileRestrictedFields(filteredFields);
            for (let field of fileRestrictionFilteredFields) {
                this.addField(fieldsFragment, field);
            }
            js.dom.setContent(fields_container, fieldsFragment);
            js.dom.setContent(this.p.select("[data-optional_file_fields]"), files_fragment_optional);
            await this.alterFormData(secretType);
        }
        catch (e) {
            logError(e);
        }
    }
    addTypeField(field) {
        try {
            const fieldsContainer = this.p.select("[data-fields_container]");
            this.addField(fieldsContainer, field);
        }
        catch (e) {
            logError(e);
        }
    }
    removeFileRestrictedFields(fields) {
        try {
            if (this.fileAllowed) {
                return fields;
            }
            return fields.filter(x => x.type != FIELD_TYPE.FILE);
        }
        catch (e) {
            logError(e);
            return fields;
        }
    }
    addField(fragement, field) {
        try {
            const { elem, input } = this.fieldCreator.create(field);
            fragement.append(elem);
            if (field.type != FIELD_TYPE.FILE) {
                return;
            }
            this.p.fileComponent.addFileSource(input);
            if (!field.isMandatory) {
                this.additionalFileFields[field.name] = field.label;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    isOptionalFileEndAppend() {
        return true;
    }
    getMandatoryFields(type) {
        return this.getFilteredInputs((input, field) => input.type == type && field.isMandatory);
    }
    checkFinalFields() {
        try {
            const inputs = this.getMandatoryInputs();
            const emptyInput = inputs.find(x => this.p.isEmptyInput(x));
            if (!emptyInput) {
                return true;
            }
            const secretTypeField = globalNodeData.getNodeData(emptyInput);
            const errorI18nKey = secretTypeField.type == SecretType.FIELD_TYPE.FILE ? VI18N.PLEASE_UPLOAD_YOUR : VI18N.PLEASE_ENTER_YOUR;
            this.p.util.setInputError(emptyInput, i18n(errorI18nKey, secretTypeField.label));
            this.p.util.focusInput(emptyInput);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    setFieldValues(type, values) {
        try {
            const inputs = this.getInputs(type);
            const end = Math.min(values.length, inputs.length);
            for (let i = 0; i < end; i++) {
                inputs[i].value = values[i] || "";
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getPlainSecretData() {
        try {
            const secretData = {};
            let secretTypeField = null;
            for (let input of this.getAllInputs()) {
                secretTypeField = globalNodeData.getNodeData(input);
                if (input.type == SecretType.FIELD_TYPE.FILE) {
                    secretData[secretTypeField.name] = this.p.isEmptyInput(input) ? "" : secretTypeField.name;
                    continue;
                }
                secretData[secretTypeField.name] = input.value;
            }
            return secretData;
        }
        catch (e) {
            throw jserror(e + "");
        }
    }
    getAllInputs() {
        return this.p.selectAll(this.inputSelector);
    }
    getInputs(type) {
        return this.getFilteredInputs(x => x.type == type);
    }
    getNonEmptyInputs(type) {
        return this.getFilteredInputs(x => x.type == type && !this.p.isEmptyInput(x));
    }
    setSelectedTypeId(typeId) {
        const selectInput = this.p.select("[data-secret_type_select]");
        $(selectInput).val(typeId).trigger("change.select2");
    }
    getMandatoryInputs() {
        return this.getFilteredInputs((_, field) => field.isMandatory);
    }
    getFilteredInputs(filterFn) {
        return this.getAllInputs().filter(x => filterFn(x, globalNodeData.getNodeData(x)));
    }
}
