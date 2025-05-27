import { LocalStorageKeys } from "../../src/service/storage/constants/LocalStorageKeys.js";
import { setGlobal } from "../global/global.js";
class CardFillingUtil {
    numberRegEx = new RegExp(/.*(card|cc|acct|account).?(number|no|num)|card.?#|card.?no|cc.?num|acct.?num|nummer|credito|numero|número|numéro|カード番号|Номер.*карты|信用卡号|信用卡号码|信用卡卡號|카드/, 'i');
    nameRegEx = new RegExp(/.*(card|account|cc).?(holder|name|owner)|name.*\\bon\\b.*card|cc.?name|name.*on.*card|cc.?full.?name|owner|karteninhaber|name.*auf.*der.*karte|nombre.*tarjeta|nom.*carte|nome.*cart|名前|Имя.*карты|信用卡开户名|开户名|持卡人姓名|持卡人姓名/, 'i');
    nameFilterRegEx = new RegExp(/.*((first|last|user|guest|company|login|Vor|Nach|employer|employee|billing|signin).?)name/, 'i');
    monthRegEx = new RegExp(/.*(cc|card|account|acc|exp.*).?(month|mon|mm)|month|.?mes/, 'i');
    yearRegEx = new RegExp(/.*(cc|card|account|acc|exp.*).?(year|yyyy|yy|yr)|year|.?anio/, 'i');
    monthRegEx2 = new RegExp(/.*(cc|card|account|acc|exp.*)?.?(month|mon|mm)|month/, 'i');
    yearRegEx2 = new RegExp(/.*(cc|card|account|acc|exp.*)?.?(year|yyyy|yy|yr)|year/, 'i');
    cvvOrcidRegEx = new RegExp(/card identification|^verification|security.?code|cvn|cvv|cvc|csc|codigo.?seguridad/, 'i');
    labelRegEx = new RegExp(/.*(card|account|cc).?(label|alias)/, 'i');
    expiryCommonRegEx = new RegExp(/.*(expir|exp.*date|mm.yy|ablauf|gueltig|gültig|fecha|date.*exp|scadenza|有効期限|validade|Срок действия карты)/, 'i');
    cancelButtonRegEx = new RegExp(/.*(cancel|later|skip|not.?now|back)/, 'i');
    isValidCardValue(field) {
        let value = field.value;
        if (value == undefined || value == "") {
            return false;
        }
        if (field.tagName == 'SELECT') {
            if (parseInt(field.value) == 0 || isNaN(parseInt(field.value))) {
                return false;
            }
        }
        return true;
    }
    extractCardMonth(validThru) {
        if (validThru == "") {
            return 0;
        }
        validThru = validThru.split("/");
        return validThru.length > 0 ? this.getValidMonth(validThru[0]) : 0;
    }
    extractCardYear(validThru) {
        if (validThru == "") {
            return 0;
        }
        validThru = validThru.split("/");
        return validThru.length > 1 ? this.getValidYear(validThru[1]) : 0;
    }
    getValidMonth(num) {
        if (isNaN(num)) {
            return this.getMonthNumber(num);
        }
        num = parseInt(num);
        if (num > 0 && num <= 12) {
            return num < 10 ? "0" + num : num;
        }
        return 0;
    }
    getMonthNumber(str) {
        const monthMap = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        };
        const monthRegex = new RegExp(Object.keys(monthMap).join("|"), "i");
        const match = str.match(monthRegex);
        if (match) {
            return monthMap[match[0]];
        }
        return 0;
    }
    getValidYear(num) {
        if (isNaN(num)) {
            return 0;
        }
        else if (num <= 0) {
            return 0;
        }
        num = num.toString().trim();
        if (num.length == 2) {
            return "20" + num;
        }
        else if (num.length == 4 && num[0] == "2") {
            return num;
        }
        else {
            return 0;
        }
    }
    getValidThru(month, year) {
        month = this.getValidMonth(month);
        month = month == 0 ? "mm" : month;
        year = this.getValidYear(year);
        year = year == 0 ? "yyyy" : year;
        if (month == "mm" && year == "yyyy") {
            return "";
        }
        return month + " / " + year;
    }
    formatValidThru(validThru) {
        const month = this.extractCardMonth(validThru);
        const year = this.extractCardYear(validThru);
        return this.getValidThru(month, year);
    }
    findMonthOption(element, value) {
        if (element.tagName.toLowerCase() != "select") {
            return value;
        }
        const allOptions = element.options;
        for (let option of allOptions) {
            const elmValue = option.value;
            if (this.getValidMonth(elmValue) == value) {
                return elmValue;
            }
        }
        return 0;
    }
    getYearForInput(element, value) {
        if (element.hasAttribute('maxlength')) {
            const length = element.getAttribute('maxlength');
            return value.toString().substring(length);
        }
        return value;
    }
    findYearOption(element, value) {
        if (element.tagName.toLowerCase() != "select") {
            return this.getYearForInput(element, value);
        }
        const allOptions = element.options;
        for (let option of allOptions) {
            const elmValue = option.value;
            if (this.getValidYear(elmValue) == value) {
                return elmValue;
            }
        }
        if (value.toString().length == 4) {
            return this.findYearOption(element, value.toString().substring(2));
        }
        return 0;
    }
    checkAttribute(elem, attr, regex) {
        const attrValue = $(elem).attr(attr);
        if (typeof attr !== 'undefined' && attr != false) {
            return regex.test(attrValue);
        }
        return false;
    }
    async getPaymentCardCategoryId() {
        try {
            return await zlocalStorage.load(LocalStorageKeys.PAYMENT_CARD_TYPE_ID, "");
        }
        catch (e) {
            logError(e);
            return "";
        }
    }
    async isPaymentCardCategory(categoryId) {
        try {
            const paymentCardId = await this.getPaymentCardCategoryId();
            return paymentCardId == categoryId;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
}
export const cardFillingUtil = new CardFillingUtil();
setGlobal("cardFillingUtil", cardFillingUtil);
