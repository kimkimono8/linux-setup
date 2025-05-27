import { vuiMain } from "../../src/provider/VUi/main.js";
vuiMain();
import { Theme } from "../../common/ui/Theme.js";
import { UIUtil1 } from "../../common/ui/ui_util.js";
import { regexUtil } from "../../common/util/regexUtil.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { VI18N } from "../../src/service/vt/VI18n.js";
import { VtEventScopes } from "../../src/service/vt/constants/constants.js";
import { CARD_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
import { SaveFrameFolderComponent } from "../save_frame/SaveFrameFolderComponent.js";
import { SecretClassification, CardAddPreFillInput } from "../../src/service/bgApi/types/Secret.js";
const theme = new Theme();
class BgEventListener {
    init() {
        portApi.createEventClient().init(VtEventScopes.BG, this);
    }
    settings = new BgSettingsEventHandler();
}
class BgSettingsEventHandler {
    themeChanged() {
        theme.refreshTheme();
    }
}
class CardFrame {
    cardFrameData = null;
    static timers = [];
    name = "";
    folderComponent = new SaveFrameFolderComponent();
    async main() {
        await vt.init({ logPrefix: "CARD_FRAME:" });
        UIUtil.init();
        UIUtil1.inst.init();
        theme.init();
        new BgEventListener().init();
        this.cardFrameData = await ztabStorage.load(TabStorageKeys.SAVE_CARD_FRAME_DATA);
        if (this.cardFrameData == null) {
            this.close();
            return;
        }
        this.initListeners();
        await this.initUI();
    }
    async initUI() {
        try {
            this.initField(CARD_FIELDS.NUMBER, true);
            this.initField(CARD_FIELDS.NAME, false);
            this.initField(CARD_FIELDS.CVV, true);
            this.initField(CARD_FIELDS.VALID_UPTO, false);
            this.initFolders();
            await this.initClassification();
            this.initTexts();
        }
        catch (e) {
            logError(e);
        }
    }
    async initField(key, mask) {
        try {
            let value = this.cardFrameData.current[key];
            if (value == undefined && this.cardFrameData.state == "update") {
                value = await bgApi.crypto.decrypt(this.cardFrameData.secret.encrypted.fields[key], this.cardFrameData.secret.shared);
                this.cardFrameData.current[key] = value;
            }
            else if (value == undefined) {
                value = "";
            }
            const fieldDiv = js.selector.select("#" + key);
            const masked = key == CARD_FIELDS.NUMBER ? value.replace(/\S(?=.{4})/g, "*").replace(/(.{4})/g, '$1 ') : js.dom.getPasswordMask(value);
            fieldDiv.textContent = mask ? masked : value;
            fieldDiv.dataset.value = value;
        }
        catch (e) {
            logError(e);
        }
    }
    async initFolders() {
        if (this.cardFrameData.state == "new") {
            this.folderComponent.placeholder = await i18n(VI18N.SELECT_CREATE_FOLDER);
            this.folderComponent.createUI();
        }
        else {
            $("div[data-field_row='folder']").removeClass('dis-block');
            $("div[data-field_row='folder']").addClass('dis-hide');
        }
    }
    async initClassification() {
        try {
            const isPersonalPlan = await zlocalStorage.load(LocalStorageKeys.IS_PERSONAL_PLAN, false);
            const classificationInput = js.selector.select("[data-classification]");
            if (isPersonalPlan) {
                classificationInput.checked = false;
                js.dom.hide("[data-classification_container]");
                return;
            }
            const allowedClassifications = await this.cardFrameData.allowedClassifications;
            if (allowedClassifications.length == 2) {
                return;
            }
            classificationInput.disabled = true;
            const disabledClass = "personal-enterprise-switch-disabled";
            js.selector.select("[data-classification_label]").classList.add(disabledClass);
            if (!allowedClassifications.includes(SecretClassification.PERSONAL)) {
                classificationInput.checked = true;
                js.selector.select("[data-classification_label]").dataset.tooltip_content = i18n(VI18N.PERSONAL_PASSWORD_RESTRICTED);
                return;
            }
            classificationInput.checked = false;
            js.selector.select("[data-classification_label]").dataset.tooltip_content = i18n(VI18N.ENTERPRISE_PASSWORD_RESTRICTED);
        }
        catch (e) {
            logError(e);
        }
    }
    initTexts() {
        const nameInput = js.selector.select("#name");
        if (this.cardFrameData.state == "update") {
            js.selector.select('#title').innerText = i18n(VI18N.UPDATE_CARD);
            js.selector.select('#save_button').innerText = i18n(VI18N.UPDATE);
            nameInput.value = this.cardFrameData.secret.name;
        }
        nameInput.focus();
    }
    initListeners() {
        js.selector.select("#close_a").addEventListener("click", this.close);
        js.selector.select("#not_now_button").addEventListener("click", this.close);
        if (this.cardFrameData.state == "update") {
            js.selector.select("#save_button").addEventListener("click", this.updateCard.bind(this));
            js.selector.select("#edit_a").addEventListener("click", this.editInTabView.bind(this));
        }
        else {
            js.selector.select("#save_button").addEventListener("click", this.addCard.bind(this));
            js.selector.select("#edit_a").addEventListener("click", this.addInTabView.bind(this));
        }
        js.selector.select("#cardNumberView").addEventListener("click", this.showHideCardNumber.bind(this));
        js.selector.select("#cardCvvView").addEventListener("click", this.showHideCVV.bind(this));
    }
    showHideCardNumber(e) {
        const field = e.currentTarget.getAttribute('data-type');
        let value = this.cardFrameData.current[field];
        const maskedValue = value.replace(/\S(?=.{4})/g, "*").replace(/(.{4})/g, '$1 ');
        value = value.replace(/(.{4})/g, '$1 ');
        this.showHide(e, maskedValue, value);
    }
    showHideCVV(e) {
        const field = e.currentTarget.getAttribute('data-type');
        let value = this.getValue(this.cardFrameData.current[field]);
        const maskedValue = value.replace(/\S()/g, "*");
        this.showHide(e, maskedValue, value);
    }
    showHide(e, maskedValue, value) {
        const fieldId = e.currentTarget.getAttribute('data-type');
        const icon = e.currentTarget.querySelector('i');
        const timerSeconds = 10;
        const resetField = function () {
            document.getElementById(fieldId).innerText = maskedValue;
            icon.className = "icon-view";
            icon.dataset.tooltip_content = "i18n:view";
            if (CardFrame.timers[fieldId] != undefined) {
                clearTimeout(CardFrame.timers[fieldId]);
                delete CardFrame.timers[fieldId];
            }
        };
        if (icon.className == "icon-view") {
            document.getElementById(fieldId).innerText = value;
            CardFrame.timers[fieldId] = setTimeout(resetField, timerSeconds * 1000);
            icon.className = "icon-hide";
            icon.dataset.tooltip_content = "i18n:hide";
        }
        else {
            resetField();
        }
    }
    close() {
        bgApi.cardFrame.closeSaveCardFrame();
    }
    async getSecretInput() {
        const enterprise = js.selector.select(`input[name="classification"]`).checked;
        const classification = enterprise ? SecretClassification.ENTERPRISE : SecretClassification.PERSONAL;
        return {
            typeId: await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, ""),
            name: this.name,
            logo: "",
            policyId: await zlocalStorage.load(LocalStorageKeys.DEFAULT_POLICY_ID, ""),
            classification,
            plainSecretData: this.cardFrameData.current,
            notes: "",
            totpUrl: "",
            urls: [],
            description: "",
            customColumns: [],
            files: [],
            tags: [],
            folderId: this.folderComponent.getFolderId(),
            newFolderName: this.folderComponent.getNewFolderName(),
            oneauth_id: ""
        };
    }
    async getDataToUpdate() {
        const secret = this.cardFrameData.secret;
        const apiInput = {
            secretId: secret.id,
            name: this.name,
            logo: secret.logo,
            policyId: secret.policy_id,
            classification: document.getElementById('classification').checked ? SecretClassification.PERSONAL : SecretClassification.ENTERPRISE,
            plainSecretData: this.cardFrameData.current,
            notes: secret.encrypted.notes,
            customColumns: secret.encrypted.custom_columns,
            urls: secret.urls,
            tags: secret.tags,
            description: secret.description,
            deletedFiles: [],
            totpUrl: secret.encrypted.totp,
        };
        if (secret.oneauth_id) {
            apiInput.oneauth_id = secret.oneauth_id;
        }
        if (secret.encrypted.totp) {
            apiInput.totpUrl = secret.encrypted.totp;
        }
        return apiInput;
    }
    checkNameField() {
        const name = document.getElementById('name').value;
        if (name == "") {
            throw "Name " + i18n(VI18N.MUST_NOT_BE_EMPTY);
        }
        const nonClearTextChars = regexUtil.getNonClearTextChars(name);
        if (nonClearTextChars.length > 0) {
            throw "Name " + i18n(VI18N.MUST_NOT_CONTAIN) + " " + nonClearTextChars.join();
        }
        this.name = name;
    }
    alterMessage(message) {
        if (!message) {
            return "";
        }
        message = message.replace("secret", "payment card");
        message = message.replace("password", "payment card");
        return message;
    }
    async addCard() {
        try {
            this.checkNameField();
            const addSecretInput = await this.getSecretInput();
            js.dom.showOld("#loading");
            await bgApi.secret.add(addSecretInput);
            this.close();
        }
        catch (e) {
            js.dom.hideOld("#loading");
            e = this.alterMessage(e);
            VUI.notification.showError(e);
        }
    }
    async updateCard() {
        try {
            this.checkNameField();
            const editInput = await this.getDataToUpdate();
            js.dom.showOld("#loading");
            await bgApi.secret.edit.update(editInput);
            this.close();
        }
        catch (e) {
            js.dom.hideOld("#loading");
            e = this.alterMessage(e);
            VUI.notification.showError(e);
        }
    }
    async encryptObject(plainObj, isShared) {
        try {
            const encryptedObj = {};
            for (let key in plainObj) {
                encryptedObj[key] = await bgApi.crypto.encrypt(plainObj[key], isShared);
            }
            return encryptedObj;
        }
        catch (e) {
            logError(e);
            return {};
        }
    }
    addInTabView() {
        const cardData = this.getCardDataForTab();
        bgApi.ztab.addPaymentCard(cardData);
        this.close();
    }
    editInTabView() {
        const cardData = this.getCardDataForTab();
        bgApi.ztab.editPaymentCard(cardData, this.cardFrameData.secret.id);
        this.close();
    }
    getCardDataForTab() {
        const name = document.getElementById('name').value;
        const classification = document.getElementById('classification').checked;
        const cardData = new CardAddPreFillInput();
        cardData.card_holder_name = this.getValue(this.cardFrameData.current.card_holder_name);
        cardData.card_number = this.cardFrameData.current.card_number;
        cardData.cvv = this.getValue(this.cardFrameData.current.cvv);
        cardData.valid_thru = this.cardFrameData.current.valid_thru;
        cardData.name = name;
        cardData.classification = classification.toString();
        cardData.folderId = this.folderComponent.getFolderId();
        cardData.newFolderName = this.folderComponent.getNewFolderName();
        return cardData;
    }
    getValue(value) {
        return value == undefined ? "" : value;
    }
}
const cardFrame = new CardFrame();
cardFrame.main();
