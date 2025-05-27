import { ZVError } from "../../../common/error/ZVError.js";
import { globalDomListener } from "../../../common/ui/globalDomListener.js";
import { formUtil } from "../../../common/util/formUtil.js";
import { SecretType } from "../../../src/service/bgApi/types/SecretType.js";
import { LocalStorageKeys } from "../../../src/service/storage/constants/LocalStorageKeys.js";
import { VI18N } from "../../../src/service/vt/VI18n.js";
import { CARD_FIELDS } from "../../../src/vutil/types/PasswordCategory.js";
import { zt } from "../../zt.js";
import { BasePasswordAddUI } from "./BasePasswordAddUI.js";
import { BasePasswordAddUtil } from "./BasePasswordAddUtil.js";
import { PasswordAddUIListener } from "./PasswordAddUIListener.js";
import { BaseOneAuthSecretsComponent } from "./base_password_add_components/BaseOneAuthSecretsComponent.js";
import { BasePasswordAddClassificationComponent } from "./base_password_add_components/BasePasswordAddClassificationComponent.js";
import { BasePasswordAddCustomFieldComponent } from "./base_password_add_components/BasePasswordAddCustomFieldComponent.js";
import { BasePasswordAddDescriptionComponent } from "./base_password_add_components/BasePasswordAddDescriptionComponent.js";
import { BsaePasswordAddFileComponent } from "./base_password_add_components/BasePasswordAddFileComponent.js";
import { BasePasswordAddNotesComponent } from "./base_password_add_components/BasePasswordAddNotesComponent.js";
import { BasePasswordAddPolicyComponent } from "./base_password_add_components/BasePasswordAddPolicyComponent.js";
import { BasePasswordAddTagComponent } from "./base_password_add_components/BasePasswordAddTagComponent.js";
import { BasePasswordAddTotpComponent } from "./base_password_add_components/BasePasswordAddTotpComponent.js";
import { BasePasswordAddUrlComponent } from "./base_password_add_components/BasePasswordAddUrlComponent.js";
import { PasswordAddFolderComponent } from "./password_add_components/PasswordAddFolderComponent.js";
import { PasswordAddNameLogoComponent } from "./password_add_components/PasswordAddNameLogoComponent.js";
import { PasswordAddSecretTypeComponent } from "./password_add_components/PasswordAddSecretTypeComponent.js";
export class PasswordAddUI extends BasePasswordAddUI {
    listener = new PasswordAddUIListener();
    util = new BasePasswordAddUtil();
    secretTypeComponent = new PasswordAddSecretTypeComponent();
    nameLogoComponent = new PasswordAddNameLogoComponent();
    folderComponent = new PasswordAddFolderComponent();
    policyComponent = new BasePasswordAddPolicyComponent();
    totpComponent = new BasePasswordAddTotpComponent();
    notesComponent = new BasePasswordAddNotesComponent();
    urlComponent = new BasePasswordAddUrlComponent();
    tagComponent = new BasePasswordAddTagComponent();
    descriptionComponent = new BasePasswordAddDescriptionComponent();
    customFieldComponent = new BasePasswordAddCustomFieldComponent();
    classificationComponent = new BasePasswordAddClassificationComponent();
    fileComponent = new BsaePasswordAddFileComponent();
    oneAuthSecretsComponent = new BaseOneAuthSecretsComponent();
    async init() {
        this.init = async () => { };
        super.init();
        this.folderComponent.p = this;
        globalDomListener.register("password_add", this.listener);
    }
    async createUI() {
        await super.createUI();
        this.folderComponent.createUI();
    }
    async showFilledUI(prefillInput) {
        try {
            await this.showUI();
            await this.prefillValues(prefillInput);
            this.prefillName(prefillInput);
            await js.time.delay(0.5);
            this.nameLogoComponent.focusName();
        }
        catch (e) {
            logError(e);
        }
    }
    async showFilledUIAddress() {
        try {
            await this.showUI();
            const addressCat = await zlocalStorage.load(LocalStorageKeys.ADDRESS_TYPE_ID, "");
            await this.selectCategory(addressCat);
            await js.time.delay(0.5);
            this.nameLogoComponent.focusName();
        }
        catch (e) {
            ZVError.error(e);
        }
    }
    async showFilledUICard(prefillInput) {
        try {
            await this.showUI();
            const cardCat = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
            await this.selectCategory(cardCat);
            this.prefillCardValues(prefillInput);
            await js.time.delay(0.5);
            this.nameLogoComponent.focusName();
        }
        catch (e) {
            logError(e);
        }
    }
    async selectCategory(id) {
        const categories = this.p.select("[data-secret_type_select]");
        categories.value = id;
        categories.dispatchEvent(new Event('change'));
        await this.secretTypeComponent.handleSecretTypeChange();
    }
    async prefillCardValues(prefillInput) {
        try {
            if (prefillInput == null) {
                return;
            }
            this.nameLogoComponent.setName(prefillInput.name);
            this.classificationComponent.setClassification(prefillInput.classification);
            this.prefillFolder(prefillInput);
            const selectedTypeId = this.secretTypeComponent.getSelectedTypeId();
            const secret_type = await bgApi.secretType.get(selectedTypeId);
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
    async prefillValues(prefillInput) {
        try {
            this.nameLogoComponent.setName(prefillInput.name);
            this.prefillLogo(prefillInput);
            this.prefillFolder(prefillInput);
            if (prefillInput.typeId) {
                await this.secretTypeComponent.addSecretTypeFields(prefillInput.typeId);
                this.secretTypeComponent.setSelectedTypeId(prefillInput.typeId);
            }
            this.secretTypeComponent.setFieldValues(SecretType.FIELD_TYPE.TEXT, prefillInput.texts);
            this.secretTypeComponent.setFieldValues(SecretType.FIELD_TYPE.PASSWORD, prefillInput.passwords);
            this.urlComponent.setUrls(prefillInput.urls);
            this.descriptionComponent.setDescription(prefillInput.description);
            this.classificationComponent.setClassification(prefillInput.classification);
            if (prefillInput.description) {
                this.secretTypeComponent.showRemoveAdditionalField(this.descriptionComponent.containerSelector);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async prefillLogo(prefillInput) {
        try {
            const hasValidLogo = Boolean(prefillInput.logo);
            if (hasValidLogo) {
                this.nameLogoComponent.setLogo(prefillInput.logo);
                return;
            }
            const hasValidUrl = prefillInput.urls.length > 0 && (js.url.isValid(prefillInput.urls[0]));
            if (!hasValidUrl) {
                return;
            }
            const logo = await bgApi.other.getLogo(prefillInput.urls[0]);
            if (logo) {
                this.nameLogoComponent.setLogo(logo);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    prefillFolder(prefillInput) {
        try {
            if (prefillInput.folderId) {
                this.folderComponent.prefillFolderId(prefillInput.folderId);
                return;
            }
            if (prefillInput.newFolderName) {
                this.folderComponent.prefillNewFolderName(prefillInput.newFolderName);
                return;
            }
        }
        catch (e) {
            logError(e);
        }
    }
    async getSaveMessage(selectedTypeId) {
        const isPaymentCard = await formUtil.isPaymentCardCategory(selectedTypeId);
        const isAddress = await formUtil.isAddressCategory(selectedTypeId);
        if (isPaymentCard) {
            return VI18N.CARD_ADDED_SUCCESSFULLY;
        }
        if (isAddress) {
            await this.secretTypeComponent.addressComponent.checkForNewTags();
            return VI18N.ADDRESS_ADDED_SUCCESSFULLY;
        }
        return VI18N.PASSWORD_ADDED_SUCCESSFULLY;
    }
    async savePassword() {
        try {
            const selectedTypeId = this.secretTypeComponent.getSelectedTypeId();
            const isPaymentCard = await formUtil.isPaymentCardCategory(selectedTypeId);
            const hasValidInput = (await this.nameLogoComponent.checkFinalName()) &&
                this.secretTypeComponent.checkFinalFields() &&
                this.folderComponent.checkFinalFolderName() &&
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
            const classification = this.classificationComponent.getClassification();
            const isShared = await bgApi.crypto.getIsShared(classification);
            const secretAddInput = {
                typeId: this.secretTypeComponent.getSelectedTypeId(),
                name: this.nameLogoComponent.getName(),
                logo: this.nameLogoComponent.getApiLogoInput(),
                newFolderName: this.folderComponent.getNewFolderName(),
                folderId: this.folderComponent.getFolderId(),
                policyId: this.policyComponent.getPolicyId(),
                classification,
                plainSecretData: this.secretTypeComponent.getPlainSecretData(),
                totpUrl: await this.totpComponent.getTotpUrl(),
                notes: this.notesComponent.getNotes(),
                urls: this.urlComponent.getUrls(),
                tags: this.tagComponent.getTags(),
                files: (await this.fileComponent.getApiFileInfos(isShared)),
                description: this.descriptionComponent.getDescription(),
                customColumns: this.customFieldComponent.getCustomColumns(),
                oneauth_id: this.oneAuthSecretsComponent.getSelectedSecretId()
            };
            await this.addSecret(secretAddInput);
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
    }
    async addSecret(input) {
        try {
            const secret = await bgApi.secret.add(input);
            const successMsgKey = await this.getSaveMessage(secret.type_id);
            VUI.notification.showSuccess(i18n(successMsgKey), 2);
            zt.passwordsUI.sidebar.refreshUI();
            this.hideForm();
            this.p.setShowSecretOnTop(secret.id);
            await this.p.refreshList();
        }
        catch (e) {
            logError(e);
            VUI.notification.showError(e);
        }
    }
    async prefillName(prefillInput) {
        try {
            const name = prefillInput.name;
            const newName = await bgApi.secret.suggestNewName({ domain: name });
            if (name == newName) {
                return;
            }
            this.nameLogoComponent.setName(newName);
        }
        catch (e) {
            logError(e);
        }
    }
}
