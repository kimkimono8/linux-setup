import { cardFillingUtil } from "../../common/util/cardFillingUtil.js";
import { userAction } from "../../src/cs/csfill/export.js";
import { Secret } from "../../src/service/bgApi/types/Secret.js";
import { TabStorageKeys } from "../../src/service/storage/constants/TabStorageKeys.js";
import { CSCardFieldMasking } from "./csCardFieldMasking.js";
export class CardField {
    static NUMBER = "ccnumber";
    static NAME = "ccname";
    static LABEL = "cclabel";
    static CVV = "cccvv";
    static MONTH = "ccmonth";
    static YEAR = "ccyear";
    static EXPIRATION = "ccexpiration";
}
export class CSCardFiller extends CSCardFieldMasking {
    async fillCard(secret) {
        const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
        if (devToolsOpen && !Secret.hasViewPermission(secret.sharing_level)) {
            return;
        }
        const cardData = await ztabStorage.load(TabStorageKeys.FORM_FRAME_DATA);
        cardData.card = secret;
        this.fillCCData(cardData);
    }
    async fillCCInIframe(data) {
        const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
        const hasViewPermission = Secret.hasViewPermission(data.sharing_level);
        const masking = !hasViewPermission;
        if (devToolsOpen && masking) {
            return;
        }
        for (let field of Object.keys(data.card)) {
            const element = document.querySelector('input[' + this.attributeName + '-iframe="' + field + '"],select[' + this.attributeName + '-iframe="' + field + '"]');
            const value = data.card[field];
            if (element != undefined && value != undefined) {
                this.addDevToolsListenerIframe(masking, element);
                await userAction.fill(element, value);
                masking ? await this.applyMasking(element) : await this.removeMasking(element);
            }
        }
    }
    async fillField(formId, name, value, masking) {
        const field = document.querySelector('input[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name + ']');
        value = value == undefined ? "" : value;
        if (field != undefined) {
            masking ? await this.applyMasking(field) : this.removeMasking(field);
            userAction.fill(field, value);
        }
        return field;
    }
    async fillDateField(formId, name, value, masking) {
        let field = document.querySelector('select[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name + ']');
        const maskingFunc = masking ? this.applyMasking.bind(this) : this.removeMasking.bind(this);
        if (field == undefined) {
            field = document.querySelector('input[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=' + name + ']');
        }
        if (field != undefined && value != 0) {
            await maskingFunc(field);
            value = name == "ccmonth" ? cardFillingUtil.findMonthOption(field, value) : cardFillingUtil.findYearOption(field, value);
            await userAction.fill(field, value.toString());
            await maskingFunc(field);
        }
    }
    async fillValidThru(formId, value, masking) {
        const expiration = document.querySelector('input[' + this.attributeName + '-parent=' + formId + '][' + this.attributeName + '=ccexpiration]');
        if (expiration != undefined && value != "") {
            const month = cardFillingUtil.extractCardMonth(value);
            let validThru = month + "/";
            const year = cardFillingUtil.extractCardYear(value);
            if (expiration.placeholder != undefined && year != "") {
                if (expiration.placeholder.toLowerCase().indexOf("yyyy") != -1) {
                    validThru += year;
                }
                else {
                    validThru += (year % 100);
                }
            }
            masking ? await this.applyMasking(expiration) : this.removeMasking(expiration);
            userAction.fill(expiration, validThru);
        }
    }
    async fillCCData(data) {
        const formId = data.parent;
        if ($('form[' + this.formAttribute + '=' + formId + ']').length == 0 && $('body[' + this.formAttribute + '=' + formId + ']').length == 0) {
            return;
        }
        const hasViewPermission = Secret.hasViewPermission(data.card.sharing_level);
        const masking = !hasViewPermission;
        const devToolsOpen = await bgApi.tab.checkDevToolsOpen();
        if (masking && devToolsOpen) {
            return;
        }
        this.addDevToolsListener(masking, formId);
        const ccnumner = await this.fillField(formId, "ccnumber", data.card.encrypted.fields.card_number, masking);
        await this.fillField(formId, "ccname", data.card.encrypted.fields.card_holder_name, masking);
        await this.fillField(formId, "cclabel", data.card.name, masking);
        await this.fillField(formId, "cccvv", data.card.encrypted.fields.cvv, masking);
        const monthValue = cardFillingUtil.extractCardMonth(data.card.encrypted.fields.valid_thru);
        await this.fillDateField(formId, "ccmonth", monthValue, masking);
        const yearValue = cardFillingUtil.extractCardYear(data.card.encrypted.fields.valid_thru);
        await this.fillDateField(formId, "ccyear", yearValue, masking);
        await this.fillValidThru(formId, data.card.encrypted.fields.valid_thru, masking);
        masking ? null : ccnumner.click();
    }
}
