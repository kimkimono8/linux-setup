import { frameUrls } from "../../common/enum/frameUrls.js";
import { ZVError } from "../../common/error/ZVError.js";
import { setGlobal } from "../../common/global/global.js";
import { cardFillingUtil } from "../../common/util/cardFillingUtil.js";
import { SecretQuery } from "../../src/service/bgApi/types/SecretQuery.js";
import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { CARD_FIELDS } from "../../src/vutil/types/PasswordCategory.js";
import { CSFormDetector } from "../formFilling/csFormDetector.js";
export class CSCardFieldDetector extends CSFormDetector {
    inputTags;
    inputAndSelectTags;
    attributeName = "data-zvault-cc";
    formAttribute = "data-zvault-cc-form";
    frameUrl = frameUrls.CARD_FRAME;
    cardCategoryId = null;
    async init() {
        this.cardCategoryId = await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
    }
    async populateVaultIconsCC() {
        const cardCategoryId = this.cardCategoryId;
        if (cardCategoryId == null) {
            return;
        }
        this.inputTags = $("input:not([type=hidden],[type=radio],[type=checkbox],[type=file])");
        this.inputAndSelectTags = $('input:not([type=hidden],[type=radio],[type=checkbox]),select');
        const ccnumber = await this.detectFields(this.inputTags, cardFillingUtil.numberRegEx, "ccnumber");
        const cvv = await this.detectFields(this.inputTags, cardFillingUtil.cvvOrcidRegEx, "cccvv");
        const ccname = await this.detectFields(this.inputTags, cardFillingUtil.nameRegEx, "ccname", true, ccnumber.length ? null : cardFillingUtil.nameFilterRegEx);
        const ccexpiry = await this.detectExpiryField(ccnumber.length);
        const cclabel = await this.detectFields(this.inputTags, cardFillingUtil.labelRegEx, "cclabel");
        if (ccnumber.length > 0) {
            this.fillVaultIconInCCForm();
            this.setSubmitListeners();
        }
        else if (cvv.length == 1) {
            this.fillVaultIconInCCForm(true);
        }
        else {
            this.removeCustomAttributes(false);
        }
        this.iframeCheck({ ccnumber, cccvv: cvv, ccname, cclabel, ccexpiration: ccexpiry });
    }
    async iframeCheck(allFields) {
        const fieldsArray = [];
        let count = 0;
        for (let field of Object.keys(allFields)) {
            if (allFields[field] == true || allFields[field].length) {
                count++;
                fieldsArray.push(field);
            }
        }
        if (!count) {
            return;
        }
        if (fieldsArray.length) {
            const frameId = await bgApi.tab.getFrameId();
            const iframeData = {
                [frameId]: {
                    fields: fieldsArray,
                    hostUrl: js.url.getHost(window.location.href)
                }
            };
            bgApi.cardFrame.checkIframeFields(iframeData);
        }
    }
    async detectExpiryField(numberField) {
        try {
            let expField = await this.detectFields(this.inputTags, cardFillingUtil.expiryCommonRegEx, "ccexpiration");
            let mmField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.monthRegEx, "ccmonth");
            let yyField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.yearRegEx, "ccyear");
            if (expField.length == 0 && mmField.length == 0 && yyField.length == 0) {
                mmField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.monthRegEx2, "ccmonth");
                yyField = await this.detectFields(this.inputAndSelectTags, cardFillingUtil.yearRegEx2, "ccyear");
            }
            if ((mmField.length == 0 || yyField.length == 0) && expField.length == 0 && numberField) {
                const form = document.querySelector("[data-zvault-cc-form='ccform" + this.formIndex + "']");
                const label = form.querySelector("[aria-label='MM/YY']");
                expField = label.querySelectorAll('input');
                this.markCCField(expField[0], "ccexpiration");
            }
            const isExpiryPresent = (mmField.length && yyField.length) || expField.length;
            if (!isExpiryPresent) {
                this.removeAttributesFromArray([mmField], false);
                this.removeAttributesFromArray([yyField], false);
            }
            return isExpiryPresent;
        }
        catch (e) {
            ZVError.error(e);
            return false;
        }
    }
    setSubmitListeners() {
        for (let i = 0; i < this.formIndex; i++) {
            const formName = "ccform" + i;
            const form = document.querySelector('form[' + this.formAttribute + '="' + formName + '"]');
            if (form != undefined) {
                const buttons = form.querySelectorAll('button,input[type="submit"],input[type="button"]');
                this.buttonListeners(buttons, formName);
            }
        }
    }
    fillVaultIconInCCForm(isOnlyCVVFied = false) {
        for (let index = 0; index < this.formIndex; index++) {
            const ccfields = $('input[' + this.attributeName + '-parent=ccform' + index + ']');
            const ccSelectFields = $('select[' + this.attributeName + '-parent=ccform' + index + ']');
            if (this.ccFieldVariety(ccfields, ccSelectFields) >= 3 || isOnlyCVVFied) {
                for (let ccElement of ccfields) {
                    if (ccElement.type.toLowerCase() == 'button' || ccElement.type.toLowerCase() == "submit") {
                        continue;
                    }
                    this.fillVaultIcon(ccElement, true);
                }
            }
            else {
                for (let ccElement of ccfields) {
                    ccElement.removeAttribute(this.attributeName + '-parent');
                    ccElement.removeAttribute(this.attributeName);
                }
            }
        }
    }
    ccFieldVariety(allInput, allSelect) {
        if (!(allInput.length + allSelect.length)) {
            return 0;
        }
        const variety = {};
        for (let element of allInput) {
            const type = element.getAttribute(this.attributeName);
            variety[type] = true;
        }
        for (let element of allSelect) {
            const type = element.getAttribute(this.attributeName);
            variety[type] = true;
        }
        return Object.keys(variety).length;
    }
    buttonListeners(allButtons, formName) {
        for (let button of allButtons) {
            if (button != undefined && !button.innerText.match(cardFillingUtil.cancelButtonRegEx)) {
                this.cardFormSubmitted = this.cardFormSubmitted.bind(this);
                $(button).unbind();
                $(button).click(this.cardFormSubmitted);
                button.setAttribute(this.attributeName + "-parent", formName);
            }
        }
    }
    cardFormSubmitted(e) {
        const formId = e.target.getAttribute(this.attributeName + '-parent');
        const form = document.querySelector('form[' + this.formAttribute + '=' + formId + ']');
        const fields = form.querySelectorAll('input,select');
        const data = {};
        let month;
        let year;
        for (let field of fields) {
            if (field.hasAttribute(this.attributeName) && cardFillingUtil.isValidCardValue(field)) {
                switch (field.getAttribute(this.attributeName)) {
                    case 'ccnumber':
                        data.card_number = field.value.replaceAll(" ", "");
                        break;
                    case 'ccname':
                        data.card_holder_name = field.value;
                        break;
                    case 'ccmonth':
                        month = field.value;
                        break;
                    case 'ccyear':
                        year = field.value;
                        break;
                    case 'cccvv':
                        data.cvv = field.value;
                        break;
                    case "ccexpiration":
                        data.valid_thru = cardFillingUtil.formatValidThru(field.value);
                        break;
                }
            }
        }
        if (month != undefined || year != undefined) {
            data.valid_thru = cardFillingUtil.getValidThru(month, year);
        }
        this.checkFilledCard(data);
    }
    async checkCardDiff(card, data) {
        const cardHolderName = await this.isCardFieldDifferent(card, data, CARD_FIELDS.NAME);
        const cardCvv = await this.isCardFieldDifferent(card, data, CARD_FIELDS.CVV);
        const validThru = await this.isCardFieldDifferent(card, data, CARD_FIELDS.VALID_UPTO);
        return (cardHolderName || cardCvv || validThru);
    }
    async isCardFieldDifferent(card, data, field) {
        const stored = await bgApi.crypto.decrypt(card.encrypted.fields[field], card.shared);
        const entered = data[field];
        if (entered == undefined || entered == "") {
            return false;
        }
        else if (stored == entered) {
            return false;
        }
        return true;
    }
    async checkFilledCard(data) {
        const isUnlocked = await bgApi.login.isUnlocked();
        if (!isUnlocked) {
            return;
        }
        if (data.card_number == null || data.card_number.length == 0) {
            return;
        }
        const cardCategory = await bgApi.cardFrame.getCardCategory();
        const savePrompt = await zlocalStorage.load(LocalStorageKeys.CARD_SAVE_PROMPT, true);
        const addSecret = await zlocalStorage.load(LocalStorageKeys.ALLOW_ADD_SECRET, true);
        if (savePrompt && addSecret && cardCategory.enabled) {
            const query = SecretQuery.newBuilder().build();
            query.typeId = cardCategory.id;
            const secretQueryResult = await bgApi.cardFrame.getSecrets(query);
            let cardState = {
                current: data,
                type: "card",
                state: "new"
            };
            for (let card of secretQueryResult) {
                const cardNumber = await bgApi.crypto.decrypt(card.encrypted.fields[CARD_FIELDS.NUMBER], card.shared);
                if (cardNumber == data.card_number) {
                    const updateCardFrame = await this.checkCardDiff(card, data);
                    if (updateCardFrame) {
                        cardState.secret = card;
                        cardState.state = "update";
                        bgApi.cardFrame.showUpdateCardFrame(cardState);
                    }
                    return;
                }
            }
            ztabStorage.save(TabStorageKeys.SAVE_CARD_FRAME_DATA, cardState);
            bgApi.cardFrame.showSaveCardFrame(cardState);
        }
    }
}
export const csCardFieldDetector = new CSCardFieldDetector();
setGlobal("csCardFieldDetector", csCardFieldDetector);
