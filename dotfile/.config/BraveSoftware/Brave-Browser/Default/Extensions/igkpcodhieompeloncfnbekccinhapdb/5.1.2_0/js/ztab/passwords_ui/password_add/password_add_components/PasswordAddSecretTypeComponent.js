import { SecretType } from "../../../../src/service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
import { BasePasswordAddSecretTypeComponent } from "../base_password_add_components/BasePasswordAddSecretTypeComponent.js";
export class PasswordAddSecretTypeComponent extends BasePasswordAddSecretTypeComponent {
    p = null;
    cardTypeId = "";
    addressTypeId = "";
    async createUI() {
        try {
            await this.initData();
            const secretTypes = await this.getUISecretTypes();
            const selectInput = this.p.select("[data-secret_type_select]");
            const fragment = document.createDocumentFragment();
            for (let type of secretTypes) {
                fragment.append(new Option(type.name, type.id, false, false));
            }
            selectInput.append(fragment);
            try {
                const typeId = this.p.p.query.typeId || this.getWebAccountTypeId(secretTypes);
                js.selector.selectFrom(selectInput, "option[value='" + typeId + "']").selected = true;
            }
            catch (e) {
                logError(e);
            }
            $(selectInput).select2({
                dropdownParent: $(this.p.getContainerSelector()),
                sorter: x => x.sort((a, b) => a.text.localeCompare(b.text))
            });
            const selectedTypeId = $(selectInput).select2("data")[0].id;
            await this.addSecretTypeFields(selectedTypeId);
            $(selectInput).on('select2:select', this.p.listener.handleSecretTypeChange);
        }
        catch (e) {
            logError(e);
        }
    }
    async addSecretTypeFields(typeId) {
        try {
            await super.addSecretTypeFields(typeId);
            this.setFormTitle(typeId);
        }
        catch (e) {
            logError(e);
        }
    }
    async initData() {
        try {
            const stored = await zlocalStorage.loadAll({
                [LocalStorageKeys.PAYMENT_CARD_TYPE_ID]: "",
                [LocalStorageKeys.ADDRESS_TYPE_ID]: "",
            });
            this.cardTypeId = stored[LocalStorageKeys.PAYMENT_CARD_TYPE_ID];
            this.addressTypeId = stored[LocalStorageKeys.ADDRESS_TYPE_ID];
        }
        catch (e) {
            logError(e);
        }
    }
    setFormTitle(typeId) {
        try {
            this.p.select('#user-group-modal-title').textContent = i18n(this.getFormTitle(typeId));
        }
        catch (e) {
            logError(e);
        }
    }
    getFormTitle(typeId) {
        try {
            switch (typeId) {
                case this.cardTypeId:
                    return VI18N.ADD_CARD;
                case this.addressTypeId:
                    return VI18N.ADD_ADDRESS;
                default:
                    return VI18N.ADD_PASSWORD;
            }
        }
        catch (e) {
            logError(e);
            return VI18N.ADD_PASSWORD;
        }
    }
    async getUISecretTypes() {
        try {
            const secretTypes = await bgApi.secretType.getAll();
            const enabledTypes = secretTypes.filter(x => x.enabled);
            const fileRestrictionFilteredTypes = await this.filterFileRestrictedTypes(enabledTypes);
            const showOnlyUserTypes = await zlocalStorage.load(LocalStorageKeys.SHOW_ONLY_USER_DEFINED_SEC_TYPES, false);
            if (!showOnlyUserTypes) {
                return fileRestrictionFilteredTypes;
            }
            const zuid = await zlocalStorage.load(LocalStorageKeys.ZUID, "");
            const userAndDefaultSecretTypes = fileRestrictionFilteredTypes.filter(secretType => !secretType.added_by || (secretType.added_by == zuid));
            return userAndDefaultSecretTypes;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    async filterFileRestrictedTypes(secretTypes) {
        try {
            const isFileAllowed = await zlocalStorage.load(LocalStorageKeys.ALLOW_FILE_ATTACHMENT, true);
            if (isFileAllowed) {
                return secretTypes;
            }
            const noMandatoryFileTypes = secretTypes.filter(x => !x.fields.some(x => x.type == SecretType.FIELD_TYPE.FILE && x.isMandatory));
            const noOnlyFileTypes = noMandatoryFileTypes.filter(x => x.fields.some(x => x.type != SecretType.FIELD_TYPE.FILE));
            return noOnlyFileTypes;
        }
        catch (e) {
            logError(e);
            return secretTypes;
        }
    }
    getSelectedTypeId() {
        try {
            const selectInput = this.p.select("[data-secret_type_select]");
            const secretTypeId = $(selectInput).val();
            return secretTypeId;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async handleSecretTypeChange() {
        try {
            const additionalFldSelectAll = this.p.select('input[data-af_select_all_checkbox]');
            additionalFldSelectAll.checked = false;
            const selectedTypeId = this.getSelectedTypeId();
            const retainFields = [
                SecretType.FIELD_TYPE.TEXT,
                SecretType.FIELD_TYPE.PASSWORD,
                SecretType.FIELD_TYPE.TEXTAREA,
            ];
            const values = retainFields.map(x => this.getNonEmptyInputs(x).map(x => x.value));
            await this.p.secretTypeComponent.addSecretTypeFields(selectedTypeId);
            for (let i of js.loop.range(retainFields.length)) {
                this.fillPreEnteredFields(this.getInputs(retainFields[i]), values[i]);
            }
            const cardTypeID = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
            if (selectedTypeId != cardTypeID) {
                this.p.policyComponent.validateNonEmptyPasswordInputs();
            }
            this.p.nameLogoComponent.focusName();
        }
        catch (e) {
            logError(e);
        }
    }
    fillPreEnteredFields(inputs, values) {
        try {
            const length = Math.min(inputs.length, values.length);
            for (let i = 0; i < length; i++) {
                inputs[i].value = values[i];
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getWebAccountTypeId(secretTypes) {
        try {
            const webAccountType = secretTypes.find(x => (x.name == "Web Account") && (x.added_by == ""));
            if (!webAccountType) {
                throw ["WEB_ACCOUNT_TYPE_NOT_FOUND", secretTypes];
            }
            return webAccountType.id;
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
}
