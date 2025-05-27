import { globalDomListener } from "../../../common/ui/globalDomListener.js";
import { formUtil } from "../../../common/util/formUtil.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { CARD_FIELDS } from "../../../src/vutil/types/PasswordCategory.js";
import { zt } from "../../zt.js";
import { BasePasswordAddUI } from "../password_add/BasePasswordAddUI.js";
import { BasePasswordAddUtil } from "../password_add/BasePasswordAddUtil.js";
import { BaseOneAuthSecretsComponent } from "../password_add/base_password_add_components/BaseOneAuthSecretsComponent.js";
import { BasePasswordAddDescriptionComponent } from "../password_add/base_password_add_components/BasePasswordAddDescriptionComponent.js";
import { BasePasswordAddNameLogoComponent } from "../password_add/base_password_add_components/BasePasswordAddNameLogoComponent.js";
import { BasePasswordAddNotesComponent } from "../password_add/base_password_add_components/BasePasswordAddNotesComponent.js";
import { BasePasswordAddPolicyComponent } from "../password_add/base_password_add_components/BasePasswordAddPolicyComponent.js";
import { BasePasswordAddTagComponent } from "../password_add/base_password_add_components/BasePasswordAddTagComponent.js";
import { BasePasswordAddTotpComponent } from "../password_add/base_password_add_components/BasePasswordAddTotpComponent.js";
import { BasePasswordAddUrlComponent } from "../password_add/base_password_add_components/BasePasswordAddUrlComponent.js";
import { PasswordEditUIListener } from "./PasswordEditUIListener.js";
import { PasswordEditClassificationComponent } from "./password_edit_components/PasswordEditClassificationComponent.js";
import { PasswordEditCustomFieldComponent } from "./password_edit_components/PasswordEditCustomFieldComponent.js";
import { PasswordEditFileComponent } from "./password_edit_components/PasswordEditFileComponent.js";
import { PasswordEditSecretTypeComponent } from "./password_edit_components/PasswordEditSecretTypeComponent.js";
export class PasswordEditUI extends BasePasswordAddUI {
    containerSelector = "#edit_password_container";
    overlaySelector = "#edit_password_overlay";
    templateSelector = "#edit_password_template";
    secretEditUIInput = null;
    listener = new PasswordEditUIListener();
    util = new BasePasswordAddUtil();
    secretTypeComponent = new PasswordEditSecretTypeComponent();
    nameLogoComponent = new BasePasswordAddNameLogoComponent();
    policyComponent = new BasePasswordAddPolicyComponent();
    totpComponent = new BasePasswordAddTotpComponent();
    notesComponent = new BasePasswordAddNotesComponent();
    urlComponent = new BasePasswordAddUrlComponent();
    tagComponent = new BasePasswordAddTagComponent();
    descriptionComponent = new BasePasswordAddDescriptionComponent();
    classificationComponent = new PasswordEditClassificationComponent();
    customFieldComponent = new PasswordEditCustomFieldComponent();
    fileComponent = new PasswordEditFileComponent();
    oneAuthSecretsComponent = new BaseOneAuthSecretsComponent();
    deletedFiles = [];
    auditedTotpKeyShown = false;
    async init() {
        this.init = async () => { };
        super.init();
        globalDomListener.register("password_edit", this.listener);
    }
    async createUI() {
        await super.createUI();
    }
    async edit(secretId) {
        try {
            zt.mainUI.showDotLoading();
            const secretEditUIInput = await bgApi.secret.edit.getUIInput(secretId);
            await this.editUIInput(secretEditUIInput);
            const isPaymentCardCategory = await formUtil.isPaymentCardCategory(secretEditUIInput.typeId);
            const isAddressCategory = await formUtil.isAddressCategory(secretEditUIInput.typeId);
            if (isPaymentCardCategory) {
                this.p.select('#user-group-modal-title').textContent = await i18n(VI18N.EDIT_CARD);
                this.setValidityValues(this.secretEditUIInput.plainSecretData.valid_thru);
            }
            else if (isAddressCategory) {
                this.p.select('#user-group-modal-title').textContent = await i18n(VI18N.EDIT_ADDRESS);
                this.setDropDownValues(this.secretEditUIInput.plainSecretData);
            }
            else {
                this.p.select('#user-group-modal-title').textContent = await i18n(VI18N.EDIT_PASSWORD);
            }
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async showFilledUICard(prefillInput, secretId) {
        try {
            zt.mainUI.showDotLoading();
            const secretEditUIInput = await bgApi.secret.edit.getUIInput(secretId);
            await this.editUIInput(secretEditUIInput);
            this.p.select('#user-group-modal-title').textContent = await i18n(VI18N.EDIT_CARD);
            this.prefillCardValues(prefillInput, secretEditUIInput.typeId);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async prefillCardValues(prefillInput, typeId) {
        try {
            this.nameLogoComponent.setName(prefillInput.name);
            this.classificationComponent.setClassification(prefillInput.classification);
            const secret_type = await bgApi.secretType.get(typeId);
            for (let field of secret_type.fields) {
                const element = this.p.select("#" + field.type + "_" + field.name);
                element.value = prefillInput[field.name];
                if (field.name == CARD_FIELDS.VALID_UPTO) {
                    this.setValidityValues(prefillInput[field.name]);
                }
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async editUIInput(secretEditUIInput) {
        try {
            zt.mainUI.showDotLoading();
            this.secretEditUIInput = secretEditUIInput;
            this.deletedFiles = [];
            this.auditedTotpKeyShown = false;
            await this.showUI();
            await this.fillEditInput();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
        finally {
            zt.mainUI.hideDotLoading();
        }
    }
    async fillEditInput() {
        try {
            await this.secretTypeComponent.setInitValues(this.secretEditUIInput.plainSecretData);
            this.nameLogoComponent.setName(this.secretEditUIInput.name);
            this.nameLogoComponent.setLogo(this.secretEditUIInput.logo);
            this.policyComponent.setPolicyId(this.secretEditUIInput.policyId);
            this.totpComponent.setTotpUrl(this.secretEditUIInput.totpUrl);
            this.notesComponent.setNotes(this.secretEditUIInput.notes);
            this.urlComponent.setUrls(this.secretEditUIInput.urls);
            this.tagComponent.setTags(this.secretEditUIInput.tags);
            this.descriptionComponent.setDescription(this.secretEditUIInput.description);
            this.customFieldComponent.setCustomColumns(this.secretEditUIInput.customColumns);
            this.classificationComponent.setClassification(this.secretEditUIInput.classification);
            this.oneAuthSecretsComponent.setSecret(this.secretEditUIInput);
        }
        catch (e) {
            throw jserror(e);
        }
    }
    async getEditMessage(selectedTypeId) {
        const isPaymentCard = await formUtil.isPaymentCardCategory(selectedTypeId);
        if (isPaymentCard) {
            return VI18N.CARD_EDITED_SUCCESSFULLY;
        }
        const isAddress = await formUtil.isAddressCategory(selectedTypeId);
        if (isAddress) {
            await this.secretTypeComponent.addressComponent.checkForNewTags();
            return VI18N.ADDRESS_EDITED_SUCCESSFULLY;
        }
        return VI18N.PASSWORD_EDITED_SUCCESSFULLY;
    }
    async savePassword() {
        try {
            const selectedTypeId = this.secretEditUIInput.typeId;
            const isPaymentCard = await formUtil.isPaymentCardCategory(selectedTypeId);
            const hasValidInput = (await this.nameLogoComponent.checkFinalName()) &&
                this.secretTypeComponent.checkFinalFields() &&
                (isPaymentCard ? true : await this.policyComponent.checkFinalPolicy()) &&
                (await this.totpComponent.checkFinalTotp()) &&
                this.urlComponent.checkFinalUrlInputs() &&
                this.tagComponent.checkFinalTags() &&
                this.descriptionComponent.checkFinalDescription() &&
                this.customFieldComponent.checkFinalCustomColumn() &&
                this.fileComponent.checkFileSizeCount();
            const isInvalid = !hasValidInput;
            if (isInvalid) {
                return;
            }
            const secretId = this.secretEditUIInput.secretId;
            const classification = this.classificationComponent.getClassification();
            const isShared = this.secretEditUIInput.shared;
            const secretEditInput = {
                secretId,
                name: this.nameLogoComponent.getName(),
                logo: this.nameLogoComponent.getApiLogoInput(),
                policyId: this.policyComponent.getPolicyId(),
                classification,
                plainSecretData: this.secretTypeComponent.getPlainSecretData(),
                totpUrl: await this.totpComponent.getTotpUrl(),
                notes: this.notesComponent.getNotes(),
                urls: this.urlComponent.getUrls(),
                tags: this.tagComponent.getTags(),
                files: (await this.fileComponent.getApiFileInfos(isShared)),
                deletedFiles: this.deletedFiles,
                description: this.descriptionComponent.getDescription(),
                customColumns: this.customFieldComponent.getCustomColumns(),
                oneauth_id: this.oneAuthSecretsComponent.getSelectedSecretId()
            };
            try {
                await bgApi.secret.edit.update(secretEditInput);
            }
            catch (e) {
                VUI.notification.showError(e);
                return;
            }
            const successMsgKey = await this.getEditMessage(selectedTypeId);
            VUI.notification.showSuccess(i18n(successMsgKey), 2);
            this.hideForm();
            this.p.refreshList();
        }
        catch (e) {
            throw jserror(e);
        }
    }
}
